"use client"

import type React from "react"

import { useForm, Controller } from "react-hook-form"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"


type FormData = {
  digit0: string
  digit1: string
  digit2: string
  digit3: string
  digit4: string
  digit5: string
}

export default function EmailVerification() {
  const { control, handleSubmit, reset, watch, setValue } = useForm<FormData>({
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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const watchedValues = watch()
  const isComplete = Object.values(watchedValues).every((digit) => digit !== "")

  const handleInputChange = (index: number, value: string, onChange: (value: string) => void) => {
    if (value.length > 1) return // Prevent multiple characters

    onChange(value)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !watchedValues[`digit${index}` as keyof FormData] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    const verificationCode = Object.values(data).join("")
    console.log("Submitting verification code:", verificationCode)
    console.log("Form data breakdown:", data)
    console.log("Individual digits:", Object.values(data))

    // Simulate verification process
    setTimeout(() => {
      reset()
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
      setIsSubmitting(false)
      console.log("[v0] Verification process completed for code:", verificationCode)
      console.log("[v0] Form has been reset and focus returned to first input")
    }, 2000)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Verify Your Email</h1>
        <p className="text-gray-600 text-sm">Enter the 6-digit code sent to your email address.</p>
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
                  className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
              )}
            />
          ))}
        </div>

        <Button
          type="submit"
        //   disabled={!isComplete || isSubmitting}
          className="w-full bg-secondary hover:bg-tertiary text-white font-medium py-3 rounded-lg transition-colors"
        >
          {isSubmitting ? "Verifying..." : "Verify Email"}
        </Button>
      </form>
    </div>
  )
}

