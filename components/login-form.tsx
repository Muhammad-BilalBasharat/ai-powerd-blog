"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuthStore } from "@/lib/auth-store"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type LoginFormData = {
  email: string
  password: string
}

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const router = useRouter()
  const { login, loading, error } = useAuthStore() // Remove 'user' from here

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>()

  // Remove this problematic code:
  // if (user && !isLoggingIn) {
  //   router.push("/")
  // }

  // Handle error display
  if (error && isLoggingIn) {
    toast.error(error)
    setIsLoggingIn(false)
  }

  const onSubmit = async (data: LoginFormData) => {
    setIsLoggingIn(true)
    
    try {
      await login(data.email, data.password)
      
      // Success - show toast and redirect
      toast.success("Login successful! Redirecting...", {
        duration: 2000,
      })
      
      // Reset form
      reset()
      
      // Redirect after successful login
      setTimeout(() => {
        router.push("/") // Change this to your desired redirect path
        setIsLoggingIn(false)
      }, 1500)
      
    } catch (err) {
      setIsLoggingIn(false)
      console.error("Login error:", err)
    }
  }

  return (
    <>      
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                {/* Email Field */}
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={errors.email ? "border-red-500" : ""}
                    disabled={loading || isLoggingIn}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      href="/forgotpassword" 
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                      disabled={loading || isLoggingIn}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                      disabled={loading || isLoggingIn}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex flex-col gap-3">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading || isLoggingIn}
                  >
                    {(loading || isLoggingIn) ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
