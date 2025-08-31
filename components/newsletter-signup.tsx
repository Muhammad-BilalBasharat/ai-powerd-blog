"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNewsletterStore } from "@/lib/newsletter-store"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const { subscribe, loading, error, success, clearMessages } = useNewsletterStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await subscribe({ email })
    
    if (!error) {
      setEmail("")
    }
  }

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        clearMessages()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, success, clearMessages])

  return (
    <div className="bg-gray-100 p-8 rounded-lg max-w-2xl w-full text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>

      <p className="text-gray-600 mb-8 text-lg">Receive coding tips and resources updates. No spam.</p>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-4 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
          required
          disabled={loading}
        />
        <Button 
          type="submit" 
          className="bg-secondary hover:bg-tertiary text-white px-8 py-2 rounded-md font-medium disabled:opacity-50"
          disabled={loading || !email}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      {success && (
        <p className="text-green-600 text-sm mb-2 animate-fade-in">
          {success}
        </p>
      )}

      {error && (
        <p className="text-red-600 text-sm mb-2 animate-fade-in">
          {error}
        </p>
      )}

      <p className="text-gray-600 text-sm">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  )
}