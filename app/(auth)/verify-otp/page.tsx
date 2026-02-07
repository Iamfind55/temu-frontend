"use client"

import Link from "next/link"
import type React from "react"
import { useMutation } from "@apollo/client/react"
import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect } from "react"
import { Lock, ChevronLeft, Loader } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { useToast } from "@/lib/toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"
import { IVerifyOtpResponse, IResendOtpResponse } from "@/app/interface/customer"
import { MUTATION_CUSTOMER_OTP_VERIFY, MUTATION_CUSTOMER_RESEND_OTP } from "@/app/api/auth"

export default function VerifyOtpPage() {
  const { t } = useTranslation('customer-auth')
  const router = useRouter()
  const searchParams = useSearchParams()
  const { successMessage, errorMessage } = useToast()
  const email = searchParams.get("email") || ""

  const [countdown, setCountdown] = useState(120)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const [verifyOtp] = useMutation<IVerifyOtpResponse>(MUTATION_CUSTOMER_OTP_VERIFY)
  const [resendOtp] = useMutation<IResendOtpResponse>(MUTATION_CUSTOMER_RESEND_OTP)

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
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

    const nextEmptyIndex = newOtp.findIndex(digit => digit === "")
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")

    if (otpCode.length !== 6) {
      errorMessage({ message: t('enterAll6Digits'), duration: 2000 })
      return
    }
    if (!email) {
      errorMessage({ message: t('emailMissing'), duration: 2000 })
      return
    }
    setIsLoading(true)
    try {
      const { data } = await verifyOtp({
        variables: {
          data: {
            otp: otpCode,
            email: email
          }
        }
      })

      if (data?.customerVerifyOtp?.success) {
        successMessage({
          message: t('otpVerified'),
          duration: 3000
        })

        setTimeout(() => {
          router.push(`/reset-password?email=${encodeURIComponent(email)}&code=${otpCode}`)
        }, 1500)
      } else {
        errorMessage({
          message: data?.customerVerifyOtp?.error?.message || t('invalidOtpCode'),
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

  const handleResend = async () => {
    if (countdown > 0) return

    if (!email) {
      errorMessage({ message: t('emailMissing'), duration: 2000 })
      return
    }

    try {
      const { data } = await resendOtp({
        variables: {
          data: {
            email: email
          }
        }
      })

      if (data?.customerResendOTP?.success) {
        successMessage({
          message: t('otpResent'),
          duration: 3000
        })
        setCountdown(120)
        setOtp(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      } else {
        errorMessage({
          message: data?.customerResendOTP?.error?.message || t('failedToResendOtp'),
          duration: 3000
        })
      }
    } catch (error) {
      errorMessage({
        message: t('unexpectedError'),
        duration: 3000
      })
    }
  }

  const isComplete = otp.every((digit) => digit !== "")

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
            href="/forgot-password"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            {t('back')}
          </Link>

          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl font-bold">{t('enterPasswordResetCode')}</h1>
            <p className="text-sm text-muted-foreground">
              {t('enterPasswordResetCodeDesc')}{" "}
              <span className="font-medium text-foreground">{email}</span>. {t('codeExpiresAfter2Hours')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium">
                {t('passwordResetCode')} <span className="text-rose-500">*</span>
              </label>
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
                    aria-label={`Digit ${index + 1}`}
                    disabled={isLoading}
                  />
                ))}
              </div>
              <div className="mt-3 text-right">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={countdown > 0}
                  className="text-sm text-muted-foreground hover:text-primary disabled:cursor-not-allowed disabled:hover:text-muted-foreground"
                >
                  {countdown > 0 ? t('resendCodeIn', { countdown }) : t('resendCode')}
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{t('didntReceiveEmail')}</p>
              <ol className="list-inside list-decimal space-y-1">
                <li>{t('checkEmailCorrect')}</li>
                <li>{t('checkSpamFolder')}</li>
              </ol>
            </div>

            <Button
              type="submit"
              disabled={!isComplete || isLoading}
              className="h-12 w-full bg-orange-500 text-sm font-semibold hover:bg-orange-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader className=" h-4 w-4 animate-spin" />
                  {t('verifying')}
                </>
              ) : (
                t('continue')
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
