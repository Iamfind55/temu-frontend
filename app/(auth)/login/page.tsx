"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login("tao**e29@gmail.com", password)
    router.push("/account/orders")
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
        <div className="mx-auto max-w-6xl">
          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Sign in</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-green-600">
              <Lock className="h-4 w-4" />
              <span>All data is safeguarded</span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3 rounded-lg border bg-white p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-green-600">Price adjustment</div>
                <div className="text-muted-foreground">Within 30 days</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-white p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-green-600">Free shipping</div>
                <div className="text-muted-foreground">excludes local items</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-white p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="9 22 9 12 15 12 15 22"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-green-600">Free returns</div>
                <div className="text-muted-foreground">Up to 90 days</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-white p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 11l3 3L22 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-green-600">Delivery guarantee</div>
                <div className="text-muted-foreground">Refund for any issue</div>
              </div>
            </div>
          </div>

          {/* Login forms */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left side - Previous account */}
            <div className="rounded-lg border bg-white p-8">
              <h2 className="mb-6 text-lg font-semibold">Sign in with a previously used account</h2>

              <div className="mb-6 flex flex-col items-center">
                <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <svg
                    className="h-10 w-10 text-muted-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="7" r="4" strokeWidth="2" />
                  </svg>
                </div>
                <div className="text-lg font-semibold">ta***29</div>
                <div className="text-sm text-muted-foreground">tao**e29@gmail.com</div>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium">Password</label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    type="password"
                    placeholder="Please enter a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12"
                  />
                </div>

                <Button type="submit" className="mb-3 h-12 w-full bg-primary text-lg font-semibold hover:bg-primary/90">
                  Sign in
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="mb-4 h-12 w-full text-base font-medium bg-transparent"
                >
                  Use another way to sign in
                </Button>

                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <Link href="#" className="hover:text-foreground">
                    Remove account
                  </Link>
                  <span>|</span>
                  <Link href="#" className="hover:text-foreground">
                    Trouble signing in?
                  </Link>
                </div>
              </form>
            </div>

            {/* Right side - Other sign in methods */}
            <div className="rounded-lg border bg-white p-8">
              <h2 className="mb-6 text-lg font-semibold">Register / Sign in with another account</h2>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="h-12 w-full justify-start gap-3 text-base font-medium bg-transparent"
                >
                  <Mail className="h-5 w-5" />
                  Continue with Email
                </Button>

                <Button
                  variant="outline"
                  className="h-12 w-full justify-start gap-3 text-base font-medium bg-transparent"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  className="h-12 w-full justify-start gap-3 text-base font-medium bg-transparent"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </Button>

                <Button
                  variant="outline"
                  className="h-12 w-full justify-start gap-3 text-base font-medium bg-transparent"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  Continue with Apple
                </Button>

                <Button
                  variant="outline"
                  className="h-12 w-full justify-start gap-3 text-base font-medium bg-transparent"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" strokeWidth="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Continue with phone number
                </Button>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            By signing in or continuing, you agree to our{" "}
            <Link href="#" className="text-primary hover:underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  )
}
