"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/lib/auth-store"

type ForgotPasswordFormData = {
  email: string
}

export default function ForgotPasswordForm() {
  const { forgotPassword, loading, error } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    mode: "onBlur",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data.email)
      setIsSubmitted(true)
    } catch (err) {
      console.error("Forgot password failed:", err)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold" style={{ color: "#002928" }}>
            Check Your Email
          </CardTitle>
          <CardDescription>We've sent a password reset link to {getValues("email")}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold" style={{ color: "#002928" }}>
          Forgot Password
        </CardTitle>
        <CardDescription>Enter your email address and we'll send you a link to reset your password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium" style={{ color: "#002928" }}>
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={
                {
                  "--tw-ring-color": "#158df3",
                  borderColor: errors.email ? "#ef4444" : "#e5e7eb",
                } as React.CSSProperties
              }
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          
          {/* Display API error if any */}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md font-medium text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-secondary hover:bg-tertiary"
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "tertiary"
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "secondary"
              }
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}