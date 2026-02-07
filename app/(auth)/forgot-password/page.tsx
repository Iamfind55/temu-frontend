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
import { useTranslation } from "react-i18next"
import { SiteFooter } from "@/components/site-footer"

import { MUTATION_CUSTOMER_FORGOT_PASSWORD } from "@/app/api/auth"
import { IForgotPasswordResponse } from "@/app/interface/customer"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { successMessage, errorMessage } = useToast()
  const { t } = useTranslation('customer-auth')
  const [forgotPassword] = useMutation<IForgotPasswordResponse>(MUTATION_CUSTOMER_FORGOT_PASSWORD)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      errorMessage({ message: t('emailRequired'), duration: 2000 })
      return
    }

    setIsLoading(true)

    try {
      const { data } = await forgotPassword({
        variables: { email }
      })

      if (data?.customerForgotPassword?.success) {
        successMessage({
          message: t('resetCodeSent'),
          duration: 3000
        })

        setTimeout(() => {
          router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
        }, 1500)
      } else {
        errorMessage({
          message: data?.customerForgotPassword?.error?.message || t('failedToSendResetCode'),
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

      <div className="container mx-auto px-4 py-4 sm:py-12 h-[80vh]">
        <div className="mx-auto max-w-md">
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            {t('back')}
          </Link>

          <div className="mb-8 text-center">
            <h1 className="mb-3 text-xl font-bold">{t('forgotPassword')}</h1>
            <p className="text-sm text-muted-foreground">
              {t('forgotPasswordDesc')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                {t('emailAddress')} <span className="text-rose-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                placeholder={t('enterYourEmailAddress')}
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
                  <Loader className=" h-4 w-4 animate-spin" />
                  {t('sending')}
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
