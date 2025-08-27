// app/blog/page.tsx
"use client"

import { useEffect, useState, useMemo } from "react"
import { usePostStore } from "@/lib/post-store"
import BlogPostCard from "@/components/BlogPostCard"
import SearchAndFilter from "@/components/SearchAndFilter"

export default function BlogPage() {
  const { posts, loading, error, fetchPosts } = usePostStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // Get unique categories from posts with null checks
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(posts.map((post) => post.category).filter((category) => category && category.trim() !== "")),
    ]
    return uniqueCategories
  }, [posts])

  // Filter posts based on search and category with proper null checks
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Ensure post is published first
      if (!post.isPublished) return false

      // Search functionality with null checks
      const matchesSearch =
        searchQuery === "" ||
        [post.title, post.content, post.slug, post.excerpt].some(
          (field) => field && typeof field === "string" && field.toLowerCase().includes(searchQuery.toLowerCase()),
        )

      // Category filter with null check
      const matchesCategory = selectedCategory === "" || (post.category && post.category === selectedCategory)

      return matchesSearch && matchesCategory
    })
  }, [posts, searchQuery, selectedCategory])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
            <button
              onClick={() => fetchPosts()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const publishedPosts = posts.filter((p) => p.isPublished)

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchAndFilter
          onSearch={setSearchQuery}
          onCategoryFilter={setSelectedCategory}
          categories={categories}
          currentCategory={selectedCategory}
        />

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchQuery || selectedCategory ? "No posts found matching your criteria." : "No posts available."}
            </p>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("")
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredPosts.length} of {publishedPosts.length} posts
                {(searchQuery || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("")
                    }}
                    className="ml-4 text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    Clear filters
                  </button>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
