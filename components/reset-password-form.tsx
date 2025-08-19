"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"
import { PasswordResetSuccess } from "./password-reset-success"

type ResetPasswordFormProps = {
  token: string
}

type FormData = {
  newPassword: string
  confirmPassword: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const newPassword = watch("newPassword")

  const onSubmit = async (data: FormData) => {
    console.log("Password reset submitted with token:", token)
    console.log("Form data:", data)
    // Add your API call here to reset password using the token

    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
    setIsSuccess(true)
  }

  if (isSuccess) {
    return <PasswordResetSuccess onBackToLogin={() => (window.location.href = "/login")} />
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-primary mb-8 text-center">Reset Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
          <Input
            type="password"
            placeholder="••••••"
            {...register("newPassword", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="pl-12 h-12 border-2 border-primary bg-white text-gray-800 placeholder:text-gray-500 focus:border-green-600 focus:ring-primary"
          />
          {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
          <Input
            type="password"
            placeholder="Confirm New Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === newPassword || "Passwords do not match",
            })}
            className="pl-12 h-12 border-2 border-primary bg-white text-gray-800 placeholder:text-gray-500 focus:border-green-600 focus:ring-primary"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-secondary hover:bg-tertiary text-white font-medium text-base rounded-lg transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Setting Password..." : "Set New Password"}
        </Button>
      </form>
    </div>
  )
}
