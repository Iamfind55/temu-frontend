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

import { MUTATION_CUSTOMER_REGISTER_EMAIL } from "@/app/api/auth"
import { IRegisterEmailResponse } from "@/app/interface/customer"

export default function RegisterPage() {
  const router = useRouter()
  const { successMessage, errorMessage } = useToast()
  const { t } = useTranslation('customer-auth')
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [customerRegister] = useMutation<IRegisterEmailResponse>(MUTATION_CUSTOMER_REGISTER_EMAIL)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      errorMessage({ message: t('emailRequired'), duration: 2000 })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errorMessage({ message: t('invalidEmailAddress'), duration: 2000 })
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
          message: t('verificationCodeSent'),
          duration: 3000
        })

        setTimeout(() => {
          router.push(`/verify-otp-register?email=${encodeURIComponent(email)}`)
        }, 1500)
      } else {
        errorMessage({
          message: data?.customerRegister?.error?.message || t('failedToSendVerificationCode'),
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

      <div className="container mx-auto px-4 py-4 sm:py-12 min-h-[80vh]">
        <div className="mx-auto max-w-md">
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            {t('backToSignIn')}
          </Link>

          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl font-bold">{t('createYourAccount')}</h1>
            <p className="text-sm text-muted-foreground">
              {t('createAccountDesc')}
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
                t('continue')
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {t('alreadyHaveAccount')}{" "}
              <Link href="/login" className="text-orange-500 font-bold hover:text-orange-600">
                {t('signIn')}
              </Link>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            {t('byContinuing')}{" "}
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
