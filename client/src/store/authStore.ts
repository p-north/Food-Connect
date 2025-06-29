import { create } from 'zustand';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';


// Configure axios to include credentials and set base URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

// Interfaces for type safety
interface User {
  id?: string;
  email: string;
  name: string;
  accountType: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  error: string | null;
  verificationPending: boolean;
  emailToVerify: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: { email: string; password: string; firstName: string; accountType: string }) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

// Create a signal for request cancellation
let abortController: AbortController | null = null;

const useAuthStore = create<AuthState>((set, get) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  verificationPending: false,
  emailToVerify: null,

  clearError: () => set({ error: null, isCheckingAuth: false }),

  login: async (email: string, password: string) => {
    try {
      abortController?.abort(); // Cancel any previous request
      abortController = new AbortController();
      set({ isLoading: true, error: null, isCheckingAuth: true });

      const response = await axios.post(
        '/auth/login',
        { email, password },
        { signal: abortController.signal }
      );

      const userData: User = {
        email: response.data.email,
        name: response.data.name,
        accountType: response.data.accType || 'user',
      };

      // Store in secure storage (e.g., avoid localStorage for sensitive data)
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');

      set({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        isCheckingAuth: false,
      });
    } catch (err: any) {
      const error = err as AxiosError;
      let errorMessage = 'Login failed';
      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.status === 400) {
        errorMessage = 'Please provide email and password';
      } else if (error.code === 'ERR_CANCELED') {
        errorMessage = 'Request canceled';
      } else if (!error.response) {
        errorMessage = 'Server not responding';
      }
      set({ error: errorMessage, isLoading: false, isCheckingAuth: false });
      throw err;
    } finally {
      abortController = null;
    }
  },

  signup: async (userData: { email: string; password: string; firstName: string; accountType: string }) => {
    try {
      abortController?.abort();
      abortController = new AbortController();
      set({ isLoading: true, error: null });

      const response = await axios.post(
        '/auth/signup',
        {
          email: userData.email,
          password: userData.password,
          name: userData.firstName,
          accountType: userData.accountType,
        },
        { signal: abortController.signal }
      );

      set({
        verificationPending: true,
        emailToVerify: userData.email,
        isLoading: false,
      });
    } catch (err: any) {
      const error = err as AxiosError;
      let errorMessage = 'Signup failed';
      if (error.response?.status === 409) {
        errorMessage = 'Email already in use';
      } else if (error.code === 'ERR_CANCELED') {
        errorMessage = 'Request canceled';
      } else if (!error.response) {
        errorMessage = 'Server not responding';
      }
      set({ error: errorMessage, isLoading: false });
      throw err;
    } finally {
      abortController = null;
    }
  },

  verifyEmail: async (code: string) => {
    try {
      abortController?.abort();
      abortController = new AbortController();
      set({ isLoading: true, error: null });

      await axios.post(
        '/auth/verify-email',
        { code },
        { signal: abortController.signal }
      );

      set({
        verificationPending: false,
        emailToVerify: null,
        isLoading: false,
      });
    } catch (err: any) {
      const error = err as AxiosError;
      set({
        error: 'Verification failed. Please check your code and try again.',
        isLoading: false,
      });
      throw err;
    } finally {
      abortController = null;
    }
  },

  logout: async () => {
    try {
      abortController?.abort();
      abortController = new AbortController();
      set({ isLoading: true, isCheckingAuth: true });

      // Clear local storage first (client-side)
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');

      // Make logout request
      await axios.post(
        '/auth/logout',
        {},
        {
          signal: abortController.signal,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Clear auth state
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isCheckingAuth: false,
        error: null,
        verificationPending: false,
        emailToVerify: null,
      });
    } catch (err: any) {
      const error = err as AxiosError;
      console.error('Error during logout:', error);
      // Ensure local state is cleared even if server logout fails
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isCheckingAuth: false,
        error: error.message || 'Logout failed',
        verificationPending: false,
        emailToVerify: null,
      });
    } finally {
      abortController = null;
    }
  },

  checkAuth: async () => {
    try {
      abortController?.abort();
      abortController = new AbortController();
      set({ isCheckingAuth: true });

      const storedUser = localStorage.getItem('user');
      const storedAuth = localStorage.getItem('isAuthenticated');

      if (storedUser && storedAuth === 'true') {
        set({
          user: JSON.parse(storedUser) as User,
          isAuthenticated: true,
          isCheckingAuth: false,
          error: null,
        });
        return;
      }

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 5000);
      });

      const authCheckPromise = axios.get<{ user: User | null }>('/check-auth', {
        signal: abortController.signal,
      });

      const response = (await Promise.race([authCheckPromise, timeoutPromise])) as { data: { user: User | null } };

      if (response.data.user) {
        const userData = response.data.user;
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');

        set({
          user: userData,
          isAuthenticated: true,
          isCheckingAuth: false,
          error: null,
        });
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');

        set({
          user: null,
          isAuthenticated: false,
          isCheckingAuth: false,
          error: null,
        });
      }
    } catch (error: any) {
      const err = error as Error | AxiosError;
      console.error('Auth check failed:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');

      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
        error: err.message === 'Request timeout' ? 'Auth check timed out' : null,
      });
    } finally {
      abortController = null;
    }
  },
}));

// Axios interceptor for token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post('/auth/refresh-token', {}, { withCredentials: true });
        return axios(originalRequest);
      } catch (refreshError) {
        // Logout on refresh failure
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default useAuthStore;