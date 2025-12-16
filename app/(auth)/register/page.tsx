"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@apollo/client/react"
import { Lock, ChevronLeft, Loader } from "lucide-react"

import { useToast } from "@/lib/toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"

import { MUTATION_CUSTOMER_REGISTER_EMAIL } from "@/app/api/auth"
import { IRegisterEmailResponse } from "@/app/interface/customer"

export default function RegisterPage() {
  const router = useRouter()
  const { successMessage, errorMessage } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [customerRegister] = useMutation<IRegisterEmailResponse>(MUTATION_CUSTOMER_REGISTER_EMAIL)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      errorMessage({ message: "Email is required!", duration: 2000 })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errorMessage({ message: "Please enter a valid email address", duration: 2000 })
      return
    }

    setIsLoading(true)

    try {
      const { data } = await customerRegister({
        variables: {
          data: {
            email
          }
        }
      })

      if (data?.customerRegister?.success) {
        successMessage({
          message: "Verification code sent! Check your email.",
          duration: 3000
        })

        setTimeout(() => {
          router.push(`/verify-otp-register?email=${encodeURIComponent(email)}`)
        }, 1500)
      } else {
        errorMessage({
          message: data?.customerRegister?.error?.message || "Failed to send verification code",
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

      <div className="container mx-auto px-4 py-12 min-h-[80vh]">
        <div className="mx-auto max-w-md">
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Sign In
          </Link>

          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email address to get started. We'll send you a verification code.
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
                "Continue"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 font-bold hover:text-orange-600">
                Sign in
              </Link>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="#" className="text-blue-600 font-bold hover:underline cursor-pointer">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-blue-600 font-bold hover:underline cursor-pointer">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <SiteFooter />
      </div>
    </div>
  )
}
