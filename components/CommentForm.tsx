// CommentForm.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"

interface CommentFormProps {
  onSubmit: (content: string) => void
  loading?: boolean
}

export default function CommentForm({ onSubmit, loading = false }: CommentFormProps) {
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content.trim())
      setContent("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-4 xs:p-6 shadow-sm">
      <div className="space-y-3 xs:space-y-4">
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Add a comment
          </label>
          <textarea
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 text-sm xs:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="Share your thoughts..."
            disabled={loading}
          />
        </div>

        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-0">
          <p className="text-xs xs:text-sm text-gray-500">{content.length}/500 characters</p>
          <button
            type="submit"
            disabled={!content.trim() || loading}
            className="inline-flex items-center justify-center gap-2 px-3 xs:px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full xs:w-auto"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Post Comment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}