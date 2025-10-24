"use client"

import Link from "next/link"
import type React from "react"
import { Lock, ChevronLeft } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"

export default function VerifyOtpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "tao**e29@gmail.com"

  const [countdown, setCountdown] = useState(50)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    const newOtp = [...otp]

    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i]
      }
    }

    setOtp(newOtp)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")

    if (otpCode.length === 6) {
      router.push(`/reset-password?email=${encodeURIComponent(email)}&code=${otpCode}`)
    }
  }

  const handleResend = () => {
    setCountdown(50)
    setOtp(["", "", "", "", "", ""])
  }

  const isComplete = otp.every((digit) => digit !== "")

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-white">
        <div className="container mx-auto flex items-center gap-2 px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-400 font-bold text-white">
              <span className="text-xs">Temu</span>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-sm text-green-600">
            <Lock className="h-4 w-4" />
            <span>All data will be encrypted</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 h-[80vh]">
        <div className="mx-auto max-w-md">
          <Link
            href="/forgot-password"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl font-bold">Enter the password reset code</h1>
            <p className="text-sm text-muted-foreground">
              Please check your mailbox now! Enter the 6-digit password reset code sent to{" "}
              <span className="text-primary">{email}</span>. The code expires after 2 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium">Password reset code</label>
              <div className="flex items-center justify-between gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="h-14 w-14 text-center text-xl font-semibold"
                  />
                ))}
              </div>
              <div className="mt-3 text-right">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={countdown > 0}
                  className="text-sm text-muted-foreground hover:text-primary disabled:cursor-not-allowed"
                >
                  {countdown > 0 ? `${countdown}s Resend code` : "Resend code"}
                </button>
              </div>
            </div>

            {/* Help text */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Didn't receive the email?</p>
              <ol className="list-inside list-decimal space-y-1">
                <li>Make sure your email address is correct.</li>
                <li>Please check your spam folder.</li>
              </ol>
            </div>

            <Button
              type="submit"
              className="h-12 w-full bg-orange-500 text-sm font-semibold hover:bg-orange-600 rounded-full"
              disabled={!isComplete}
            >
              Continue
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden sm:block">
        <SiteFooter />
      </div>
    </div>
  )
}
