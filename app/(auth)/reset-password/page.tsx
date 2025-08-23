import { ResetPasswordForm } from "@/components/reset-password-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <ResetPasswordForm token="your-token-here" />
    </main>
  )
}
