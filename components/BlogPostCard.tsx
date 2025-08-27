"use client"

import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/lib/post-store"
import { User, ArrowRight, Calendar, Clock, Lock } from "lucide-react"
import { useAuthStore } from "@/lib/auth-store"
import { useEffect } from "react"

interface BlogPostCardProps {
  post: Post
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const { user, fetchUser } = useAuthStore()
  const isUserAuthenticated = !!user

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })

  const postSlug = post.slug || post._id

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl xs:rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      {/* Cover Image */}
      <div className="relative h-60 xs:h-48 w-full overflow-hidden">
        {/* Main Image */}
        <div className="relative">
           <Link href={`/blog/${postSlug}`}>
          <Image
            src={post.mainImage?.url || "/placeholder.svg"}
            alt={post.title || "Blog post image"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1024px"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlNWU3ZWIiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjNmI3MjgwIj5CbG9nIFBvc3Q8L3RleHQ+PC9zdmc+"
          />
        </Link>
        </div>
        <Link href={`/blog/${postSlug}`}>
          <Image
            src={post.mainImage?.url || "/placeholder.svg"}
            alt={post.title || "Blog post image"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 absolute"
          />
        </Link>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Category badge */}
        {post.category && (
          <span className="absolute top-4 xs:top-3 left-4 xs:left-3 rounded-full px-3 xs:px-2 py-1 xs:py-0.5 text-xs xs:text-[10px] font-semibold text-white shadow-md bg-blue-600">
            {post.category}
          </span>
        )}

        {!isUserAuthenticated && (
          <div className="absolute top-4 xs:top-3 right-4 xs:right-3 flex items-center gap-1 rounded-full bg-red-500/80 text-white text-xs xs:text-[10px] px-3 xs:px-2 py-1 xs:py-0.5 backdrop-blur">
            <Lock size={12} className="xs:w-3 xs:h-3" /> 
            <span className="xs:hidden">Login Required</span>
            <span className="hidden xs:inline">Login</span>
          </div>
        )}

        {isUserAuthenticated && (
          <span className="absolute top-4 xs:top-3 right-4 xs:right-3 flex items-center gap-1 rounded-full bg-black/60 text-white text-xs xs:text-[10px] px-3 xs:px-2 py-1 xs:py-0.5 backdrop-blur">
            <Clock size={12} className="xs:w-3 xs:h-3" /> 5 min
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 xs:p-4 gap-4 xs:gap-3">
        {/* Title */}
        <h3 className="text-xl xs:text-lg font-bold leading-snug xs:leading-tight text-gray-900">
          <Link href={`/blog/${postSlug}`} className="hover:text-blue-600 transition-colors">
            {post.title || "Untitled Post"}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-600 text-sm xs:text-xs leading-relaxed xs:leading-normal line-clamp-3 xs:line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 xs:gap-1 mt-2 xs:mt-1">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="rounded-full text-xs xs:text-[10px] font-medium px-3 xs:px-2 py-1 xs:py-0.5 border bg-blue-50 text-blue-600 border-blue-200"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="rounded-full bg-gray-100 text-gray-500 text-xs xs:text-[10px] px-3 xs:px-2 py-1 xs:py-0.5 border border-gray-200">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4 xs:pt-3 border-t border-gray-200 space-y-4 xs:space-y-3">
        <div className="flex justify-between items-center gap-2">
            {/* Author and Date - Same Line */}
          <div className="flex justify-between gap-4 xs:gap-3">
            {/* Author Badge */}
            <div className="flex items-center gap-2 xs:gap-1 text-xs xs:text-[10px] text-gray-500 bg-gray-50 px-3 xs:px-2 py-2 xs:py-1 rounded-full">
              <User size={12} className="xs:w-3 xs:h-3" />
              <span className="font-medium">{post.author || "Unknown Author"}</span>
            </div>

            {/* Date Badge */}
            <div className="flex items-center gap-2 xs:gap-1 text-xs xs:text-[10px] text-gray-500 bg-gray-50 px-3 xs:px-2 py-2 xs:py-1 rounded-full">
              <Calendar size={12} className="xs:w-3 xs:h-3" />
              <span className="xs:hidden">{formatDate(post.createdAt)}</span>
              <span className="hidden xs:inline">{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </div>
        </div>

            {/* <div>
            <Link
              href={`/blog/${postSlug}`}
              className={`w-full inline-flex items-center justify-center gap-2 xs:gap-1 rounded-full xs:rounded-full px-6 xs:px-4 py-3 xs:py-2 text-sm xs:text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all ${
                isUserAuthenticated
                  ? "bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800"
                  :  "bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800"
              }`}
            >
              <span>{isUserAuthenticated ? "Read More" : "Preview Article"}</span>
              <ArrowRight size={16} className="xs:w-4 xs:h-4" />
            </Link>
          </div> */}
          </div>

          {/* Read More Button - Full Width */}
           <div>
            <Link
              href={`/blog/${postSlug}`}
              className={`w-full inline-flex items-center justify-center gap-2 xs:gap-1 rounded-full xs:rounded-full px-6 xs:px-4 py-3 xs:py-2 text-sm xs:text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all ${
                isUserAuthenticated
                  ? "bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800"
                  :  "bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800"
              }`}
            >
              <span>{isUserAuthenticated ? "Read More" : "Preview Article"}</span>
              <ArrowRight size={16} className="xs:w-4 xs:h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

// Grid layout
export function BlogPostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-10 xs:gap-4 sm:grid-cols-2 xs:grid-cols-1 lg:grid-cols-4 md:grid-cols-4">
      {posts.map((post) => (
        <BlogPostCard key={post._id} post={post} />
      ))}
    </div>
  )
}