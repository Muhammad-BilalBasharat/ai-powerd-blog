import { ResetPasswordForm } from "@/components/reset-password-form"

interface ResetPasswordPageProps {
  params: {
    token: string
  }
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <ResetPasswordForm token={params.token} />
    </main>
  )
}
