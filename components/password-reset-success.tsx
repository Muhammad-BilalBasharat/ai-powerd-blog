"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

type PasswordResetSuccessProps = {
  onBackToLogin?: () => void
}

export function PasswordResetSuccess({ onBackToLogin }: PasswordResetSuccessProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
      <div className="mb-6">
        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-primary mb-2">Password Reset Successful</h1>
        <p className="text-gray-600">
          Your password has been successfully updated. You can now log in with your new password.
        </p>
      </div>

      <Button
        onClick={onBackToLogin}
        className="w-full h-12 bg-secondary hover:bg-tertiary text-white font-medium text-base rounded-lg transition-colors"
      >
        Back to Login
      </Button>
    </div>
  )
}

