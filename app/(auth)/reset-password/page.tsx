"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { useTranslation } from "react-i18next"
import { Lock, Eye, EyeOff, Loader } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { useToast } from "@/lib/toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"
import { MUTATION_CUSTOMER_RESET_PASSWORD } from "@/app/api/auth"
import { IResetPasswordResponse } from "@/app/interface/customer"

export default function ResetPasswordPage() {
  const { t } = useTranslation('customer-auth')
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get("code") || ""
  const email = searchParams.get("email") || ""
  const { successMessage, errorMessage } = useToast()

  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordQuality, setPasswordQuality] = useState<string>("-")
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [resetPassword] = useMutation<IResetPasswordResponse>(MUTATION_CUSTOMER_RESET_PASSWORD)

  const calculatePasswordQuality = (pwd: string): string => {
    if (pwd.length === 0) return "-"
    if (pwd.length < 8) return "weak"

    let strength = 0
    if (pwd.length >= 12) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/\d/.test(pwd)) strength++
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++

    if (strength >= 3) return "strong"
    if (strength >= 2) return "medium"
    return "weak"
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setPasswordQuality(calculatePasswordQuality(value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (password.length < 8) {
      errorMessage({ message: t('passwordMinLength'), duration: 2000 })
      return
    }

    if (password !== confirmPassword) {
      errorMessage({ message: t('passwordsDoNotMatch'), duration: 2000 })
      return
    }

    if (!email || !code) {
      errorMessage({ message: t('missingEmailOrCode'), duration: 2000 })
      return
    }

    setIsLoading(true)

    try {
      const { data } = await resetPassword({
        variables: {
          data: {
            email,
            otp: code,
            new_password: password
          }
        }
      })

      if (data?.customerResetPassword?.success) {
        successMessage({
          message: t('passwordResetSuccessfully'),
          duration: 3000
        })

        setTimeout(() => {
          router.push("/login")
        }, 1500)
      } else {
        errorMessage({
          message: data?.customerResetPassword?.error?.message || t('failedToResetPassword'),
          duration: 3000
        })
      }
    } catch (error) {
      errorMessage({
        message: t('unexpectedError'),
        duration: 3000
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordQualityColor = () => {
    switch (passwordQuality) {
      case "strong":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "weak":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getPasswordQualityText = () => {
    switch (passwordQuality) {
      case "strong":
        return t('passwordStrong')
      case "medium":
        return t('passwordMedium')
      case "weak":
        return t('passwordWeak')
      default:
        return "-"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sm:border-b bg-white">
        <div className="container mx-auto flex items-center gap-2 px-4 py-4">
          <Link href="/" className="hidden sm:flex items-center gap-2">
            <span className="bg-orange-500 text-white font-extrabold text-2xl px-3 py-1 rounded-lg tracking-wider">
              TAMU
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-sm text-green-600">
            <Lock className="h-4 w-4" />
            <span>{t('allDataEncrypted')}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 min-h-[70vh]">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl font-bold">{t('createNewPassword')}</h1>
            <p className="text-sm text-muted-foreground">
              {t('createNewPasswordDesc')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                {t('password')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder={t('minimumCharactersRequired')}
                  className="h-12 pr-10"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="mt-2 text-sm">
                <span className="font-medium">{t('passwordQuality')} </span>
                <span className={getPasswordQualityColor()}>{getPasswordQualityText()}</span>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                {t('confirmPassword')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('reenterPassword')}
                  className="h-12 pr-10"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{t('passwordsDoNotMatch')}</p>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              {t('passwordTip')}
            </p>

            <Button
              type="submit"
              disabled={isLoading || password.length < 8 || password !== confirmPassword}
              className="h-12 w-full bg-orange-500 text-sm font-semibold hover:bg-orange-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader className=" h-4 w-4 animate-spin" />
                  {t('resetting')}
                </>
              ) : (
                t('submit')
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
