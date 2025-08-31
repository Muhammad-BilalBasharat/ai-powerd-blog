"use client";

import { create } from "zustand";
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
};

type AuthStore = {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshTimeoutId: NodeJS.Timeout | null; 
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  refreshToken: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  scheduleTokenRefresh: () => void; 
};

export const useAuthStore = create<AuthStore>((set, get) => {
  const makeAuthenticatedRequest = async (requestFn: () => Promise<any>) => {
    try {
      return await requestFn();
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          await axiosInstance.post("/auth/refresh-token");
          return await requestFn();
        } catch (refreshError) {
          set({ user: null });
          throw refreshError;
        }
      }
      throw error;
    }
  };

  return {
    user: null,
    loading: false,
    error: null,
    refreshTimeoutId: null,

    scheduleTokenRefresh: () => {
      const state = get();
      
      if (state.refreshTimeoutId) {
        clearTimeout(state.refreshTimeoutId);
      }

      const timeoutId = setTimeout(async () => {
        try {
          await get().refreshToken();
          get().scheduleTokenRefresh();
        } catch (error) {
          console.error('Scheduled token refresh failed:', error);
          set({ user: null });
        }
      }, 14 * 60 * 1000); // 14 minutes

      set({ refreshTimeoutId: timeoutId });
    },

    signup: async (name, email, password) => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.post("/auth/signup", {
          name,
          email,
          password,
        });
        set({ user: res.data.user, loading: false });
        
        get().scheduleTokenRefresh();
        
      } catch (err: any) {
        set({
          error: err.response?.data?.message || "Signup failed",
          loading: false,
        });
      }
    },

    login: async (email, password) => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        set({ user: res.data.user, loading: false });
        
        get().scheduleTokenRefresh();
        
      } catch (err: any) {
        set({
          error: err.response?.data?.message || "Login failed",
          loading: false,
        });
      }
    },

    logout: async () => {
      const state = get();
      
      if (state.refreshTimeoutId) {
        clearTimeout(state.refreshTimeoutId);
        set({ refreshTimeoutId: null });
      }
      
      try {
        await axiosInstance.post("/auth/logout");
        set({ user: null });
      } catch (err) {
        console.error("Logout failed", err);
        set({ user: null });
      }
    },

    fetchUser: async () => {
      set({ loading: true, error: null });
      try {
        const res = await makeAuthenticatedRequest(() => 
          axiosInstance.get("/auth/me")
        );
        set({ user: res.data.user, loading: false });
        
        if (res.data.user) {
          get().scheduleTokenRefresh();
        }
        
      } catch (err: any) {
        set({
          error: err.response?.data?.message || null,
          loading: false,
          user: null,
        });
      }
    },

    refreshToken: async () => {
      try {
        await axiosInstance.post("/auth/refresh-token");
      } catch (err) {
        console.error("Token refresh failed", err);
        set({ user: null });
        throw err;
      }
    },

    forgotPassword: async (email) => {
      set({ loading: true, error: null });
      try {
        await axiosInstance.post("/auth/forgot-password", { email });
        set({ loading: false });
      } catch (err: any) {
        set({
          error: err.response?.data?.message || "Forgot password failed",
          loading: false,
        });
      }
    },

    resetPassword: async (token, newPassword) => {
      set({ loading: true, error: null });
      try {
        await axiosInstance.post(`/auth/reset-password/${token}`, {
          newPassword: newPassword,
        });
        set({ loading: false });
      } catch (err: any) {
        set({
          error: err.response?.data?.message || "Reset password failed",
          loading: false,
        });
      }
    },

    verifyEmail: async (token) => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.post("/auth/verify-email", {
          verificationToken: token,
        });
        set({ loading: false, error: null });
        if (res.data.user) {
          set({ user: res.data.user });
          get().scheduleTokenRefresh();
        }
        return res.data;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Email verification failed";
        set({
          error: errorMessage,
          loading: false,
        });
        throw new Error(errorMessage);
      }
    },
  };
});