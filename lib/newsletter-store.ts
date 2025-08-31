// lib/newsletter-store.ts
"use client";

import { create } from "zustand";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export type Subscriber = {
  _id: string;
  email: string;
  createdAt: string;
};

type SubscribeData = {
  email: string;
};

type NewsletterStore = {
  subscribers: Subscriber[];
  subscriberCount: number;
  loading: boolean;
  error: string | null;
  success: string | null;
  
  subscribe: (data: SubscribeData) => Promise<void>;
  getAllSubscribers: () => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
  clearMessages: () => void;
};

export const useNewsletterStore = create<NewsletterStore>((set) => ({
  subscribers: [],
  subscriberCount: 0,
  loading: false,
  error: null,
  success: null,

  subscribe: async (data: SubscribeData) => {
    set({ loading: true, error: null, success: null });
    try {
      const res = await axiosInstance.post("/newsletter/subscribe", data);
      
      if (res.data.success) {
        set({ 
          success: res.data.message,
          loading: false 
        });
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to subscribe to newsletter",
        loading: false,
      });
    }
  },

  getAllSubscribers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/newsletter/subscribers");
      
      if (res.data.success) {
        set({ 
          subscribers: res.data.data,
          subscriberCount: res.data.count,
          loading: false 
        });
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch subscribers",
        loading: false,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  clearSuccess: () => {
    set({ success: null });
  },

  clearMessages: () => {
    set({ error: null, success: null });
  },
}));