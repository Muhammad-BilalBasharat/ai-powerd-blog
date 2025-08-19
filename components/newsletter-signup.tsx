"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    console.log("Newsletter signup:", email)
  }

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
        />
        <Button type="submit" className="bg-secondary hover:bg-tertiary text-white px-8 py-2 rounded-md font-medium">
          Subscribe
        </Button>
      </form>

      <p className="text-gray-500 text-sm">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  )
}
