// components/SearchAndFilter.tsx
"use client"

import { useState, useEffect } from "react"

interface SearchAndFilterProps {
  onSearch: (query: string) => void
  onCategoryFilter: (category: string) => void
  categories: string[]
  currentCategory: string
}

export default function SearchAndFilter({
  onSearch,
  onCategoryFilter,
  categories,
  currentCategory,
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchQuery)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchQuery, onSearch])

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 px-4 xs:px-3">
      <div className="text-center mb-12 xs:mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8 xs:mb-6">
          <span>New: AI feature integrated</span>
          <span className="text-purple-500">✨</span>
        </div>
        <h1 className="text-4xl md:text-5xl xs:text-3xl font-bold text-primary text-center mb-6 xs:mb-5 leading-tight">
          Your own{" "}
          <span className="text-tertiary">blogging</span>
          <br />
          platform.
        </h1>
        <p className="text-lg xs:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12 xs:mb-10 xs:px-2">
          This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.
        </p>
      </div>
      <div className="mb-8 xs:mb-6">
        <div className="flex max-w-xl mx-auto bg-white rounded-full border border-gray-200 overflow-hidden shadow-sm xs:max-w-sm">
          <input
            type="text"
            placeholder="Search for blogs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-6 xs:px-4 py-3 xs:py-2.5 text-base xs:text-sm border-none focus:outline-none placeholder-gray-400 text-gray-700"
          />
          <button
            onClick={() => onSearch(searchQuery)}
            className="px-8 xs:px-6 py-3 xs:py-2.5 bg-secondary hover:bg-tertiary text-white font-medium xs:text-sm transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex gap-3 xs:gap-2 justify-center flex-wrap">
        <button
          onClick={() => onCategoryFilter("")}
          className={`px-3 xs:px-4 py-1 xs:py-2 rounded-full text-sm xs:text-xs font-medium transition-all duration-200 ${
            currentCategory === ""
              ? "bg-tertiary text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryFilter(category)}
            className={`px-3 xs:px-4 py-1 xs:py-2 rounded-full text-sm xs:text-xs font-medium transition-all duration-200 ${
              currentCategory === category
                ? "bg-tertiary text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}