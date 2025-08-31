"use client"

import { useState } from "react"
import { User, Edit, Trash2, Check, X } from "lucide-react"

interface Comment {
  _id: string
  content: string
  userId: {
    _id: string
    name: string
    email: string
    role: string
  }
  postId: string
  createdAt: string
  updatedAt: string
}

interface CommentProps {
  comment: Comment
  currentUserId: string | null
  onDelete: (commentId: string) => void
  onUpdate: (commentId: string, content: string) => void
}

export default function CommentComponent({ comment, currentUserId, onDelete, onUpdate }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  const handleSave = () => {
    if (editContent.trim() !== comment.content) {
      onUpdate(comment._id, editContent.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditContent(comment.content)
    setIsEditing(false)
  }

  const isOwner = currentUserId === comment.userId._id

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 xs:p-6 shadow-sm">
      <div className="flex items-start gap-3 xs:gap-4">
        <div className="w-8 h-8 xs:w-10 xs:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
          <User size={16} className="xs:w-5 xs:h-5" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1 xs:gap-2 mb-2">
            <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
              <span className="font-medium text-gray-900 text-sm xs:text-base">{comment.userId.name}</span>
              <span className="text-xs xs:text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
              {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
                <span className="text-xs text-gray-400">(edited)</span>
              )}
            </div>

            {isOwner && (
              <div className="flex items-center gap-1 xs:gap-2 self-start xs:self-center">
                {!isEditing && (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit comment"
                    >
                      <Edit size={14} className="xs:w-4 xs:h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(comment._id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete comment"
                    >
                      <Trash2 size={14} className="xs:w-4 xs:h-4" />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-3 text-sm xs:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Write your comment..."
              />
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors w-full xs:w-auto justify-center"
                >
                  <Check size={14} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition-colors w-full xs:w-auto justify-center"
                >
                  <X size={14} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-sm xs:text-base leading-relaxed">{comment.content}</p>
          )}
        </div>
      </div>
    </div>
  )
}