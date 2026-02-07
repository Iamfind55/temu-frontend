"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useMutation } from "@apollo/client/react"
import { useTranslation } from "react-i18next"
import { Lock, Eye, EyeOff, Loader, ChevronLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { useToast } from "@/lib/toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"
import { calculatePasswordQuality } from "./functions"
import { signIn } from "@/app/redux/slice/customerAuthSlice"
import { MUTATION_CUSTOMER_CREATE_PASSWORD } from "@/app/api/auth"
import { ICreatePasswordResponse } from "@/app/interface/customer"

export default function CreatePasswordPage() {
  const { t } = useTranslation('customer-auth')
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const { successMessage, errorMessage } = useToast()

  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordQuality, setPasswordQuality] = useState<string>("-")
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [createPassword] = useMutation<ICreatePasswordResponse>(MUTATION_CUSTOMER_CREATE_PASSWORD)

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

    if (!email) {
      errorMessage({ message: t('emailMissing'), duration: 2000 })
      return
    }

    setIsLoading(true)

    try {
      const { data } = await createPassword({
        variables: {
          data: {
            email,
            password
          }
        }
      })

      if (data?.customerCreatePassword?.success && data.customerCreatePassword.data) {
        const token = data.customerCreatePassword.data.token
        const customerData = data.customerCreatePassword.data.data

        // Store auth token in cookie
        document.cookie = `auth_token=${token}; path=/; max-age=3600`

        // Store customer data in Redux
        dispatch(
          signIn({
            id: customerData.id,
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            username: customerData.username,
            email: customerData.email,
            phone_number: customerData.phone_number,
            dob: customerData.dob,
            image: customerData.image,
            status: customerData.status,
            created_at: customerData.created_at,
          })
        )

        successMessage({
          message: t('accountCreatedSuccessfully'),
          duration: 3000
        })

        setTimeout(() => {
          router.push("/account/orders")
        }, 1500)
      } else {
        errorMessage({
          message: data?.customerCreatePassword?.error?.message || t('failedToCreatePassword'),
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
      case "Strong":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "Weak":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getPasswordQualityText = () => {
    switch (passwordQuality) {
      case "Strong":
        return t('passwordStrong')
      case "Medium":
        return t('passwordMedium')
      case "Weak":
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

      <div className="container mx-auto px-4 py-4 sm:py-12 min-h-[70vh]">
        <div className="mx-auto max-w-md">
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            {t('backHome')}
          </Link>
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl font-bold">{t('createYourPassword')}</h1>
            <p className="text-sm text-muted-foreground">
              {t('createYourPasswordDesc')}
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
                  {t('creatingAccount')}
                </>
              ) : (
                t('createAccount')
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            {t('byCreatingAccount')}{" "}
            <Link href="#" className="text-blue-600 font-bold hover:underline cursor-pointer">
              {t('termsOfUse')}
            </Link>{" "}
            {t('and')}{" "}
            <Link href="#" className="text-blue-600 font-bold hover:underline cursor-pointer">
              {t('privacyPolicy')}
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
