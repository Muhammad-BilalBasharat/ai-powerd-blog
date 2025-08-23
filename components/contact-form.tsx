"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, User, FileText, Edit3, ArrowRight } from "lucide-react"
import toast from "react-hot-toast"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "",
    phone: "",
    message: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success) {
        toast.success("Message sent successfully ✅")
        setFormData({ name: "", email: "", serviceType: "", phone: "", message: "" })
      } else {
        toast.error("Failed to send message ❌")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-primary text-center">Contact Us</h1>

      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Drop Us A Message</h2>
            <p className="text-blue-600 text-sm">
              Your Email Address Will Not Be Published.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Row - Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600" />
              </div>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600" />
              </div>
            </div>

            {/* Second Row - Service Type and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Input
                  type="text"
                  name="serviceType"
                  placeholder="Write Service Type *"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600" />
              </div>
              <div className="relative">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Enter Your Phone (Optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600" />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="relative">
              <Textarea
                name="message"
                placeholder="Enter Your Message *"
                value={formData.message}
                onChange={handleInputChange}
                className="pl-12 pt-4 min-h-[120px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                required
              />
              <Edit3 className="absolute left-4 top-4 w-4 h-4 text-blue-600" />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 h-auto font-medium"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
