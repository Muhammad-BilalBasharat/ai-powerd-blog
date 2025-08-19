"use client";

import { create } from "zustand";
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/auth";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Always send cookies
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
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  refreshToken: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (
    token: string,
    newPassword: string
  ) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  signup: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/signup", {
        name,
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
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
      const res = await axiosInstance.post("/login", {
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/logout");
      set({ user: null });
    } catch (err) {
      console.error("Logout failed", err);
    }
  },

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/me");
      set({ user: res.data.user, loading: false });
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
      await axiosInstance.post("/refresh-token");
    } catch (err) {
      console.error("Token refresh failed", err);
      set({ user: null });
    }
  },

  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/forgot-password", { email });
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
      await axiosInstance.post(`/reset-password/${token}`, {
        password: newPassword,
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
      await axiosInstance.get(`/verify-email/${token}`);
      set({ loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Email verification failed",
        loading: false,
      });
    }
  },
}));
