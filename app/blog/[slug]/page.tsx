// blog/[slug]/page.tsx
"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { usePostStore } from "@/lib/post-store"
import { useCommentStore } from "@/lib/comment-store"
import CommentComponent from "@/components/Comment"
import CommentForm from "@/components/CommentForm"
import { useAuthStore } from "@/lib/auth-store"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  const { currentPost, loading: postLoading, error: postError, fetchPostBySlug, clearCurrentPost } = usePostStore()

  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    fetchCommentsForPost,
    createComment,
    updateComment,
    deleteComment,
    clearComments,
  } = useCommentStore()

  const { user, fetchUser } = useAuthStore()
  const isUserAuthenticated = !!user
  const currentUserId = user?._id || null

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  useEffect(() => {
    if (slug) {
      fetchPostBySlug(slug)
    }

    return () => {
      clearCurrentPost()
      clearComments()
    }
  }, [slug, fetchPostBySlug, clearCurrentPost, clearComments])

  useEffect(() => {
    if (currentPost?._id && isUserAuthenticated) {
      fetchCommentsForPost(currentPost._id)
    }
  }, [currentPost?._id, fetchCommentsForPost, isUserAuthenticated])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleCommentSubmit = async (content: string) => {
    if (currentPost?._id && isUserAuthenticated) {
      await createComment(currentPost._id, content)
    }
  }

  const handleCommentUpdate = async (commentId: string, content: string) => {
    if (currentPost?._id && isUserAuthenticated) {
      await updateComment(currentPost._id, commentId, content)
    }
  }

  const handleCommentDelete = async (commentId: string) => {
    if (currentPost?._id && isUserAuthenticated && window.confirm("Are you sure you want to delete this comment?")) {
      await deleteComment(currentPost._id, commentId)
    }
  }

  if (postLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-4 xs:py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-3 xs:mt-4 text-sm xs:text-base text-gray-600">Loading post...</p>
          </div>
        </div>
      </div>
    )
  }

  if (postError || !currentPost) {
    return (
      <div className="min-h-screen bg-gray-100 py-4 xs:py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Post Not Found</h1>
            <p className="text-sm xs:text-base text-gray-600 mb-4 xs:mb-6">{postError || "The post you're looking for doesn't exist."}</p>
            <Link href="/blog" className="inline-block px-4 xs:px-6 py-2 xs:py-3 text-sm xs:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 xs:py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Back to Blog Link */}
        <div className="mb-4 xs:mb-6">
          <Link href="/blog" className="inline-flex items-center text-sm xs:text-base text-blue-600 hover:text-blue-800">
            ← Back to Blog
          </Link>
        </div>

        {/* Main Post Content */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 xs:mb-8">
          {/* Main Image */}
          {currentPost.mainImage?.url && (
            <div className="relative h-48 xs:h-56 sm:h-64 md:h-96 w-full">
              <Image
                src={currentPost.mainImage.url || "https://via.placeholder.com/400x300/e5e7eb/6b7280?text=Blog+Post"}
                alt={currentPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-4 xs:p-6 sm:p-8">
            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-6 text-xs xs:text-sm text-gray-600">
              {currentPost.category && (
                <span className="bg-blue-100 text-blue-800 px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm">{currentPost.category}</span>
              )}
              <span className="text-xs xs:text-sm">By {currentPost.author}</span>
              <span className="text-xs xs:text-sm hidden xs:inline">{formatDate(currentPost.createdAt)}</span>
              <span className="text-xs xs:hidden">
                {new Date(currentPost.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl xs:text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 xs:mb-6 leading-tight xs:leading-tight">{currentPost.title}</h1>

            {/* Excerpt */}
            {currentPost.excerpt && <p className="text-base xs:text-lg sm:text-xl text-gray-600 mb-6 xs:mb-8 font-medium leading-relaxed">{currentPost.excerpt}</p>}

            {isUserAuthenticated ? (
              <div
                className="prose prose-sm xs:prose-base sm:prose-lg max-w-none mb-6 xs:mb-8"
                dangerouslySetInnerHTML={{ __html: currentPost.content }}
              />
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 xs:p-6 sm:p-8 mb-6 xs:mb-8 text-center">
                <div className="max-w-sm xs:max-w-md mx-auto">
                  <div className="mb-3 xs:mb-4">
                    <svg
                      className="mx-auto h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base xs:text-lg font-medium text-gray-900 mb-2">Login Required</h3>
                  <p className="text-sm xs:text-base text-gray-600 mb-3 xs:mb-4">Please log in to read the full article and access all content.</p>
                  <Link
                    href="/login"
                    className="inline-block px-4 xs:px-6 py-2 xs:py-3 text-sm xs:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Login to Continue
                  </Link>
                </div>
              </div>
            )}

            {isUserAuthenticated && (
              <>
                {/* Tags */}
                {currentPost.tags && currentPost.tags.length > 0 && (
                  <div className="border-t pt-4 xs:pt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2 xs:mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-1 xs:gap-2">
                      {currentPost.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Images */}
                {currentPost.otherImages && currentPost.otherImages.length > 0 && (
                  <div className="border-t pt-4 xs:pt-6 mt-4 xs:mt-6">
                    <h3 className="text-base xs:text-lg font-medium text-gray-900 mb-3 xs:mb-4">Gallery</h3>
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 xs:gap-4">
                      {currentPost.otherImages.map((image, index) => (
                        <div key={index} className="relative h-32 xs:h-40 sm:h-48 rounded-lg overflow-hidden">
                          <Image
                            src={image.url || "https://via.placeholder.com/400x300/e5e7eb/6b7280?text=Gallery+Image"}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </article>

        {isUserAuthenticated ? (
          <div className="space-y-4 xs:space-y-6">
            <h2 className="text-xl xs:text-2xl font-bold text-gray-900">Comments ({comments.length})</h2>

            {/* Comment Form */}
            <CommentForm onSubmit={handleCommentSubmit} loading={commentsLoading} />

            {/* Comments List */}
            {commentsError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 xs:p-4">
                <p className="text-sm xs:text-base text-red-600">Error loading comments: {commentsError}</p>
              </div>
            )}

            {commentsLoading && comments.length === 0 ? (
              <div className="text-center py-6 xs:py-8">
                <div className="animate-spin rounded-full h-6 w-6 xs:h-8 xs:w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-sm xs:text-base text-gray-600">Loading comments...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-6 xs:py-8">
                <p className="text-sm xs:text-base text-gray-600">No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              <div className="space-y-3 xs:space-y-4">
                {comments.map((comment) => (
                  <CommentComponent
                    key={comment._id}
                    comment={comment}
                    currentUserId={currentUserId}
                    onDelete={handleCommentDelete}
                    onUpdate={handleCommentUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-4 xs:p-6 sm:p-8 text-center">
            <div className="max-w-sm xs:max-w-md mx-auto">
              <div className="mb-3 xs:mb-4">
                <svg className="mx-auto h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-2.93-.515l-3.124 1.562a.8.8 0 01-1.15-.746L6.077 17.73A7.956 7.956 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                  />
                </svg>
              </div>
              <h3 className="text-base xs:text-lg font-medium text-gray-900 mb-2">Join the Conversation</h3>
              <p className="text-sm xs:text-base text-gray-600 mb-3 xs:mb-4">Log in to read and participate in the discussion with other readers.</p>
              <Link
                href="/login"
                className="inline-block px-4 xs:px-6 py-2 xs:py-3 text-sm xs:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Login to Comment
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}