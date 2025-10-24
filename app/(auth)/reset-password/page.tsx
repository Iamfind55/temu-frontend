"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { Lock, Eye, EyeOff } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const code = searchParams.get("code") || ""
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordQuality, setPasswordQuality] = useState<string>("-")

  const calculatePasswordQuality = (pwd: string) => {
    if (pwd.length === 0) return "-"
    if (pwd.length < 8) return "Weak"

    let strength = 0
    if (pwd.length >= 12) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/\d/.test(pwd)) strength++
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++

    if (strength >= 3) return "Strong"
    if (strength >= 2) return "Medium"
    return "Weak"
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setPasswordQuality(calculatePasswordQuality(value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 8) {
      alert("Password must be at least 8 characters long")
      return
    }

    console.log("[v0] Resetting password for:", email, "with code:", code)

    alert("Password reset successfully!")
    router.push("/login")
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

      <div className="container mx-auto px-4 py-12 h-[70vh]">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl font-bold">Create a new password</h1>
            <p className="text-sm text-muted-foreground">
              Enter a new password you would like to associate with your account below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Minimum 8 characters required"
                  className="h-12 pr-10 text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="mt-2 text-sm">
                <span className="font-medium">Password quality: </span>
                <span
                  className={
                    passwordQuality === "Strong"
                      ? "text-green-600"
                      : passwordQuality === "Medium"
                        ? "text-yellow-600"
                        : passwordQuality === "Weak"
                          ? "text-red-600"
                          : "text-muted-foreground"
                  }
                >
                  {passwordQuality}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Don't use a password from another site, or something too obvious like your pet's name.
              </p>
            </div>

            <Button
              type="submit"
              className="h-12 w-full bg-orange-500 text-lg font-semibold hover:bg-orange-600 rounded-full"
              disabled={password.length < 8}
            >
              Submit
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
