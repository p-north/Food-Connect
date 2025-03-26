import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config/api';

// Define the interface for our store state
interface User {
  id?: string;
  email: string;
  name: string;
  accountType: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
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
  error: null,
  verificationPending: false,
  emailToVerify: null,
  
  // Login action
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
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
        isLoading: false
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
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },
  
  // Signup action
  signup: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(`${API_URL}/auth/signup`, {
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
      await axios.post('http://localhost:5000/api/auth/verify-email', {
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
      set({ isLoading: true });
      await axios.post('http://localhost:5001/api/auth/logout', {}, { withCredentials: true });
      set({ 
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    } catch (err) {
      set({ isLoading: false });
      // Even if logout fails on server, clear user data from client
      set({ user: null, isAuthenticated: false });
    }
  },
  
  // Check authentication status
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get('http://localhost:5001/api/auth/check-auth', { 
        withCredentials: true 
      });
      
      set({ 
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (err) {
      set({ 
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  },
  
  // Clear error
  clearError: () => set({ error: null })
}));

export default useAuthStore;
