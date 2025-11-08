"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, ChevronLeft, Loader } from "lucide-react"

import { useMutation } from "@apollo/client/react"

import { useToast } from "@/lib/toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"

import { MUTATION_CUSTOMER_FORGOT_PASSWORD } from "@/app/api/auth"
import { IForgotPasswordResponse } from "@/app/interface/customer"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { successMessage, errorMessage } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [forgotPassword] = useMutation<IForgotPasswordResponse>(MUTATION_CUSTOMER_FORGOT_PASSWORD)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      errorMessage({ message: "Email is required!", duration: 2000 })
      return
    }

    setIsLoading(true)

    try {
      const { data } = await forgotPassword({
        variables: { email }
      })

      if (data?.customerForgotPassword?.success) {
        successMessage({
          message: "Reset code sent! Check your email.",
          duration: 3000
        })

        setTimeout(() => {
          router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
        }, 1500)
      } else {
        errorMessage({
          message: data?.customerForgotPassword?.error?.message || "Failed to send reset code",
          duration: 3000
        })
      }
    } catch (error) {
      errorMessage({
        message: "An unexpected error occurred. Please try again.",
        duration: 3000
      })
    } finally {
      setIsLoading(false)
    }
  }

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
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="mb-8 text-center">
            <h1 className="mb-3 text-xl font-bold">Forgot password</h1>
            <p className="text-sm text-muted-foreground">
              Confirm your email address below, and we'll send you a 6-digit password reset code.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email address <span className="text-rose-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                placeholder="Enter your email address"
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full bg-orange-500 text-sm font-semibold hover:bg-orange-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Submit"
              )}
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
