// lib/post-store.ts
"use client";

import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export type Image = {
  url: string;
  fileId: string;
};

export  type Post = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  mainImage?: Image;
  otherImages?: Image[];
  category: string;
  isPublished: boolean;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
};

type CreatePostData = {
  title: string;
  content: string;
  author: string;
  tags?: string;
  category?: string;
  isPublished?: boolean;
  excerpt?: string;
  mainImage?: File;
  otherImages?: File[];
};

type UpdatePostData = {
  title?: string;
  content?: string;
  author?: string;
  tags?: string;
  removeMainImage?: boolean;
  removeOtherImageIds?: string[];
  mainImage?: File;
  otherImages?: File[];
};

type PostStore = {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  fetchPostById: (id: string) => Promise<void>;
  fetchPostBySlug: (slug: string) => Promise<void>;
  createPost: (data: CreatePostData) => Promise<void>;
  updatePost: (id: string, data: UpdatePostData) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  clearError: () => void;
  clearCurrentPost: () => void;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  currentPost: null,
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/posts/posts");
      set({ posts: res.data.posts, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch posts",
        loading: false,
      });
    }
  },

  fetchPostById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/posts/post/${id}`);
      set({ currentPost: res.data.post, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch post",
        loading: false,
      });
    }
  },

  fetchPostBySlug: async (slug: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/posts/post-by-slug/${slug}`);
      set({ currentPost: res.data.post, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch post",
        loading: false,
      });
    }
  },

  createPost: async (data: CreatePostData) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("author", data.author);
      if (data.tags) formData.append("tags", data.tags);
      if (data.category) formData.append("category", data.category);
      if (data.isPublished !== undefined) formData.append("isPublished", data.isPublished.toString());
      if (data.excerpt) formData.append("excerpt", data.excerpt);

      if (data.mainImage) formData.append("mainImage", data.mainImage);
      if (data.otherImages) {
        data.otherImages.forEach((file) => {
          formData.append("otherImages", file);
        });
      }

      const res = await axiosInstance.post("/posts/create-post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newPost = res.data.post;
      set(state => ({ 
        posts: [newPost, ...state.posts], 
        currentPost: newPost,
        loading: false 
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create post",
        loading: false,
      });
    }
  },

  updatePost: async (id: string, data: UpdatePostData) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();

      if (data.title) formData.append("title", data.title);
      if (data.content) formData.append("content", data.content);
      if (data.author) formData.append("author", data.author);
      if (data.tags) formData.append("tags", data.tags);
      if (data.removeMainImage) formData.append("removeMainImage", "true");
      if (data.removeOtherImageIds && data.removeOtherImageIds.length > 0) {
        formData.append("removeOtherImageIds", data.removeOtherImageIds.join(","));
      }

      if (data.mainImage) formData.append("mainImage", data.mainImage);
      if (data.otherImages) {
        data.otherImages.forEach((file) => {
          formData.append("otherImages", file);
        });
      }

      const res = await axiosInstance.put(`/posts/update-post/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedPost = res.data.post;
      set(state => ({
        posts: state.posts.map(post => post._id === id ? updatedPost : post),
        currentPost: state.currentPost?._id === id ? updatedPost : state.currentPost,
        loading: false
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to update post",
        loading: false,
      });
    }
  },

  deletePost: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/posts/delete-post/${id}`);
      set(state => ({
        posts: state.posts.filter(post => post._id !== id),
        currentPost: state.currentPost?._id === id ? null : state.currentPost,
        loading: false
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to delete post",
        loading: false,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  clearCurrentPost: () => {
    set({ currentPost: null });
  },
}));


