import { create } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../config/api';

// with every request, also place cookies in header
axios.defaults.withCredentials = true;

// Define the interface for our store state
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
  signup: (userData: any) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

// Create the store
const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  verificationPending: false,
  emailToVerify: null,
  
  // Clear error
  clearError: () => set({ error: null, isCheckingAuth: false }),
  
  // Login action
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null, isCheckingAuth: true });
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      }, { withCredentials: true });
      
      console.log(response.data);
      
      set({ 
        user: {
          ...response.data,
          accountType: response.data.accType
        },
        isAuthenticated: true,
        isLoading: false,
        isCheckingAuth: false
      });
    } catch (err: any) {
      let errorMessage = 'Login failed';
      if (err.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (err.response?.status === 400) {
        errorMessage = 'Please provide email and password';
      } else if (!err.response) {
        errorMessage = 'Server not responding';
      }
      set({ error: errorMessage, isLoading: false, isCheckingAuth: false });
      throw err;
    }
  },
  
  // Signup action
  signup: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        email: userData.email,
        password: userData.password,
        name: userData.firstName,
        accountType: userData.accountType
      }, { withCredentials: true });
      
      set({ 
        verificationPending: true,
        emailToVerify: userData.email,
        isLoading: false
      });
    } catch (err: any) {
      let errorMessage = 'Signup failed';
      if (err.response?.status === 409) {
        errorMessage = 'Email already in use';
      } else if (!err.response) {
        errorMessage = 'Server not responding';
      }
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },
  
  // Verify email action
  verifyEmail: async (code) => {
    try {
      set({ isLoading: true, error: null });
      await axios.post(`${BASE_URL}/auth/verify-email`, {
        code
      }, { withCredentials: true });
      
      set({ 
        verificationPending: false,
        emailToVerify: null,
        isLoading: false
      });
    } catch (err: any) {
      set({ 
        error: 'Verification failed. Please check your code and try again.',
        isLoading: false
      });
      throw err;
    }
  },
  
  // Logout action
  logout: async () => {
    try {
      console.log('Starting logout process');
      set({ isLoading: true, isCheckingAuth: true });
      
      // Clear any local storage items
      localStorage.clear();
      
      // Make the logout request
      await axios.post(`${BASE_URL}/auth/logout`, {}, { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Server logout successful');
      
      // Clear the auth state
      set({ 
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isCheckingAuth: false,
        error: null,
        verificationPending: false,
        emailToVerify: null
      });
      
      console.log('Local state cleared');
    } catch (err) {
      console.error('Error during logout:', err);
      set({ 
        isLoading: false,
        isCheckingAuth: false
      });
      // Even if logout fails on server, clear user data from client
      set({ 
        user: null, 
        isAuthenticated: false,
        error: null,
        verificationPending: false,
        emailToVerify: null
      });
      console.log('Local state cleared after error');
    }
  },
  
  // Check authentication status
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await axios.get<{ user: User | null }>(`${BASE_URL}/auth/check`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.data.user) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isCheckingAuth: false,
          error: null
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isCheckingAuth: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
        error: 'Unable to verify authentication status'
      });
    }
  }
}));

// Add axios interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, logout the user
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default useAuthStore;
