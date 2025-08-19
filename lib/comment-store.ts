"use client";

import { create } from "zustand";
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/posts";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Always send cookies
});

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type Comment = {
  _id: string;
  content: string;
  userId: User;
  postId: string;
  createdAt: string;
  updatedAt: string;
};

type CommentStore = {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  fetchCommentsForPost: (postId: string) => Promise<void>;
  createComment: (postId: string, content: string) => Promise<void>;
  updateComment: (postId: string, commentId: string, content: string) => Promise<void>;
  deleteComment: (postId: string, commentId: string) => Promise<void>;
  clearError: () => void;
  clearComments: () => void;
};

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  loading: false,
  error: null,

  fetchCommentsForPost: async (postId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/posts/${postId}/comments`);
      set({ comments: res.data.comments, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch comments",
        loading: false,
      });
    }
  },

  createComment: async (postId: string, content: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post(`/posts/${postId}/comments`, { content });
      const newComment = res.data.comment;
      set(state => ({
        comments: [...state.comments, newComment],
        loading: false
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create comment",
        loading: false,
      });
    }
  },

  updateComment: async (postId: string, commentId: string, content: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.put(`/posts/${postId}/comments/${commentId}`, { content });
      const updatedComment = res.data.comment;
      set(state => ({
        comments: state.comments.map(comment => 
          comment._id === commentId ? updatedComment : comment
        ),
        loading: false
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to update comment",
        loading: false,
      });
    }
  },

  deleteComment: async (postId: string, commentId: string) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
      set(state => ({
        comments: state.comments.filter(comment => comment._id !== commentId),
        loading: false
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to delete comment",
        loading: false,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  clearComments: () => {
    set({ comments: [] });
  },
}));