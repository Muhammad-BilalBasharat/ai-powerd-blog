"use client"

import type React from "react"
import { useForm, Controller } from "react-hook-form"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/auth-store" // Update this import path
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type FormData = {
  digit0: string
  digit1: string
  digit2: string
  digit3: string
  digit4: string
  digit5: string
}

export default function EmailVerification() {
  const { control, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: {
      digit0: "",
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
    },
  })

  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))
  
  const { verifyEmail, loading} = useAuthStore()
  const router = useRouter()

  const watchedValues = watch()
  const isComplete = Object.values(watchedValues).every((digit) => digit !== "")

  const handleInputChange = (index: number, value: string, onChange: (value: string) => void) => {
   
    if (!/^\d*$/.test(value)) return
    if (value.length > 1) return

    onChange(value)

  
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !watchedValues[`digit${index}` as keyof FormData] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    
    if (!/^\d+$/.test(pastedData)) {
      toast.error("Please paste only numbers", {
        position: "top-center",
        duration: 2000,
      })
      return
    }

    const digits = pastedData.split("")
    digits.forEach((digit, index) => {
      if (index < 6) {
        const fieldName = `digit${index}` as keyof FormData
        control._formValues[fieldName] = digit
      }
    })
    const lastIndex = Math.min(digits.length - 1, 5)
    inputRefs.current[lastIndex]?.focus()
  }
  const onSubmit = async (data: FormData) => {
    const verificationCode = Object.values(data).join("")
  
    
    try {
      await verifyEmail(verificationCode)
      toast.success("Email verified successfully!")
      setTimeout(() => {
          router.push("/login")
          reset() 
      }, 2500)

      
    } catch (err: any) {
      toast.error(err.message || "Invalid verification code. Please try again.")
      reset()
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }
  }
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Verify Your Email</h1>
        <p className="text-gray-600 text-sm">
          Enter the 6-digit code sent to your email address.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3 justify-center mb-6">
          {Array.from({ length: 6 }, (_, index) => (
            <Controller
              key={index}
              name={`digit${index}` as keyof FormData}
              control={control}
              rules={{
                required: "This field is required",
                pattern: {
                  value: /^[0-9]$/,
                  message: "Must be a single digit",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <input
                  ref={(el) => {
                    if (inputRefs.current) {
                      inputRefs.current[index] = el
                    }
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value, onChange)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                  autoComplete="off"
                />
              )}
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={!isComplete || loading}
          className="w-full bg-secondary hover:bg-tertiary text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </Button>
      </form>
    </div>
  )
}