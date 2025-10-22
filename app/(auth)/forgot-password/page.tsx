"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, ChevronLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("tao**e29@gmail.com")
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Simple header */}
      <div className="border-b bg-white">
        <div className="container mx-auto flex items-center gap-2 px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-white">
              <span className="text-xs">US</span>
            </div>
            <span className="text-2xl font-bold text-primary">TEMU</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Lock className="h-4 w-4" />
            <span>All data will be encrypted</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md">
          {/* Back button */}
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>

          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl font-bold">Forgot password</h1>
            <p className="text-sm text-muted-foreground">
              Confirm your email address below, and we'll send you a 6-digit password reset code.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            <Button
              type="submit"
              className="h-12 w-full bg-primary text-lg font-semibold hover:bg-primary/90"
              disabled={submitted}
            >
              {submitted ? "Sending..." : "Submit"}
            </Button>

            {submitted && (
              <div className="rounded-lg bg-green-50 p-4 text-center text-sm text-green-600">
                Reset code sent! Check your email.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
