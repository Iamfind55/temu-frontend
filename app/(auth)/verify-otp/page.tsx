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
            <svg
              className="iconmain-1nkfa w-15 h-15 text-white"
              aria-label="temu"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1024 1024"
              width="1em"
              height="1em"
              fill="#fb7701"
              stroke="none"
            >
              <path
                d="M683.9 136.5c-0.8 5.6-1.2 11.3-1.2 17.1l0 68.3c0 28.3 22.9 51.2 51.2 51.2l151.1 0c1.6 9.3 2.5 18.9 2.5 28.6l0 420.6c0 91.2-74 165.2-165.2 165.2l-420.6 0c-91.2 0-165.2-74-165.2-165.2l0-420.6c0-91.2 74-165.2 165.2-165.2l382.2 0z m96.2 388.5c-8.8 0-16 7.3-15.9 16.4l0 68.3c0 21.5-11.8 32.5-31.3 32.5-19.5 0-31.3-11.4-31.3-33.5l0-67.3c0-9-7.1-16.3-16-16.4-8.8 0-16 7.3-15.9 16.4l0 68.1c0 39.9 23.8 60.2 62.8 60.2 38.9 0 63.6-20.1 63.6-61.2l0-67.1c0-9-7.1-16.3-16-16.4z m-247 0l-9.9 0c-8.8 0-15.9 7.3-16 16.4l0 112c0 9 7.1 16.3 16 16.3 8.8 0 15.9-7.3 15.9-16.3l0-73.5 26.9 38.8c5.6 8 17.2 8 22.9 0l26.9-38.8 0 73.5c0 9 7.1 16.3 15.9 16.3 8.8 0 15.9-7.3 16-16.3l0-112c0-9-7.1-16.3-16-16.4l-9.9 0c-3.8 0-7.4 1.9-9.6 5.1l-34.8 53.6-34.8-53.6c-2.2-3.2-5.8-5.1-9.5-5.1z m-201 0l-93.3 0c-8.8 0-15.9 7.3-15.9 16.4 0 9 7.1 16.3 15.9 16.3l30.7 0 0 95.5c0 9 7.1 16.3 15.9 16.3 8.8 0 15.9-7.3 16-16.3l0-95.5 30.7 0c8.8 0 15.9-7.3 15.9-16.3 0-9-7.1-16.3-15.9-16.4z m137.8 0l-86.3 0c-8.8 0-15.9 7.3-16 16.4l0 111.8c0 9 7.1 16.3 16 16.3l86.3 0c8.8 0 15.9-7.3 16-16.3 0-9-7.1-16.3-16-16.3l-70.4 0 0-23.3 61.4 0c8.8 0 15.9-7.3 15.9-16.3 0-9-7.1-16.3-15.9-16.4l-61.4 0 0-23.2 70.4 0c8.8 0 15.9-7.3 16-16.3 0-9-7.1-16.3-16-16.4z m-156-170.7l-3.1 0.1c-12.2 0.9-20.6 6.4-25.3 13.8-5.6-8.6-16-14.6-31.8-13.8l-0.3 0.3c-1.5 2.4-9.2 16.1 2.3 31.1 2.3 2.4 7.7 9.4 5.5 18.2l-32 53.1c-2.6 4.3-1.5 9.9 2.6 12.8 8.3 5.9 24.9 14.2 53.6 14.1 28.7 0 45.4-8.2 53.7-14.1l1.3-1.1c3-3.1 3.6-7.9 1.3-11.7l-32-53-0.2-0.7c-1.7-7.8 2.6-14.1 5.1-17l0.6-0.6c11.4-15 3.7-28.7 2.3-31.1l-0.3-0.3-3.3-0.1z m71.6 4.6c-2.9 2.4-7.8 8.5-11.9 13.9l-2.9 3.8c-2.2 3-3.8 5.2-4 5.6-13.9 20.2-13.1 25.1 4.7 36.5 10 6.4 18.1-1.9 21.6-4.3-1.7 10.7-6.7 27.4-14.4 39.2-4.2-3.2-7.2-5.7-9.1-7.5-2.4-2.2-6.1-2.1-8.4 0.2-1.1 1.1-1.7 2.6-1.6 4.2 0 1.6 0.7 3.1 1.9 4.1 18.5 17.3 42.9 27.2 68.8 27.3 26 0 50.5-9.8 69-27.3 2.4-2.2 2.5-5.9 0.2-8.3-2.3-2.4-5.9-2.5-8.3-0.2-1.4 1.3-2.9 2.6-4.4 3.9l-8.1-18.6c-1.3-3.2-2.7-7.2-4.4-12.1 0.8-2 2.4-4 4.9-6.4 1.8-1.8 3.2-3.6 4.2-5.4 5.4-8.7 2.3-13.8 0.7-17.2-3.8-8.1-9.9-5.4-14.2-0.7-5.4 5.8-10.6 8.3-19.1 10.3-7 1.7-12.5 0.8-17-2.1-6.2-4-15.8-18.6-15.8-18.6-11-22.3-25.2-26.1-32.4-20.3z m233.8-2.4c-23.2 22.6-0.9 71.8-43.2 92.7-4.7 2.3-8.5-5.3-14.7-5.2-17.7 0.1-51.3 16.1-52.7 24.1-1.1 6.6 13.3 11.9 55.7 11.9 36.9 0 48.8-57.5 61.7-57.6 12.9 0 6.9 52.2 5.6 57.6l13.5 0c-1.2-5.4-2-21.8-2-45 0-23.1 4.1-28.3 7.3-45.7 2.8-15.2-19.1-28.4-31.2-32.8z m132.5 1.8l-37.8 0c-24.5 0-44.8 19.4-46.5 44.5l-2.8 40.1c-1.3 19 13.4 35.2 32.1 35.2l72.2 0c18.6 0 33.4-16.2 32-35.2l-2.7-40.1c-1.7-25-22-44.4-46.5-44.5z m-321.5 92.3c11.4 0 20.1 5.7 23.4 16.4-7.7 2.1-15.6 3.1-23.5 3.1-11.9 0-16.2-1.1-23.8-3.3 3.1-9.3 13.2-16.2 23.9-16.2z m285.4-59l0 1.1c0 9.7 7.7 17.6 17.2 17.6 9.5 0 17.2-7.9 17.2-17.6l0-1.1c0-4.3 15.2-4.3 15.2 0l0 1.1c0 18.3-14.5 33.2-32.4 33.2-17.9 0-32.4-14.9-32.4-33.2l0-1.1c0-4.3 15.2-4.3 15.2 0z m171.8-340.4c56.6 0 102.4 45.8 102.4 102.4 0 56.6-45.8 102.4-102.4 102.4l-153.6 0c-18.9 0-34.1-15.3-34.2-34.1l0-68.3c0-56.6 45.8-102.4 102.4-102.4l85.4 0z m-59.4 43c-4.2 0-7.4 1.3-9.7 3.9-2.2 2.6-3.4 6.4-3.3 11.4l0 53.1c0 8.4-1.6 14.8-4.9 19-3.2 4.3-7.9 6.4-14 6.4-6.2 0-10.9-2.1-14.1-6.4-3.2-4.3-4.9-10.6-4.9-19l0-53.1c0-5-1.1-8.8-3.3-11.4-2.2-2.6-5.5-3.9-9.8-3.9-4.2 0-7.4 1.3-9.7 3.9-2.3 2.6-3.4 6.4-3.5 11.4l0 52.7c0 8.4 1 15.9 3 22.3 2 6.4 4.9 11.7 8.7 16 3.9 4.3 8.6 7.5 14.2 9.6 5.6 2.1 12.1 3.2 19.4 3.2 9.7 0 17.9-1.9 24.6-5.6 6.7-3.8 11.7-9.5 15.1-17.1 3.4-7.6 5.1-17.1 5-28.4l0-52.7c0-5-1.1-8.8-3.2-11.4-2.2-2.6-5.4-3.9-9.6-3.9z m71.6-0.3c-6.4 0-12.2 0.9-17.4 2.7-5.2 1.8-9.7 4.4-13.4 7.6-3.8 3.3-6.7 7.3-8.7 11.9-2 4.7-3.1 9.8-3.1 15.6 0 8.7 2.2 15.7 6.7 21.2 4.5 5.5 11.3 9.3 20.4 11.5l16.7 4.1c4.5 1.1 7.6 2.4 9.4 3.9 1.8 1.5 2.6 3.6 2.6 6.1 0 2.8-1.3 5.2-3.7 7.1-2.5 1.9-6.9 2.9-13.3 2.9-4 0-8.3-0.5-12.8-1.6-4.6-1.1-8.7-2.6-12.3-4.6-2.8-1.4-5.2-1.8-7.4-1.1-2.2 0.7-4 2.1-5.3 4.1-1.3 2-2.1 4.4-2.4 7-0.3 2.6 0.1 5.1 1.1 7.5 1 2.4 2.9 4.2 5.4 5.6 3 1.6 6.3 3.1 10 4.3 3.7 1.2 7.6 2.1 11.8 2.7 4.1 0.6 8.1 0.9 11.9 0.9 6.6 0 12.5-0.9 17.8-2.6 5.2-1.8 9.7-4.2 13.4-7.5 3.7-3.2 6.6-7.1 8.6-11.7 2-4.6 3-9.8 3-15.5 0-8.4-2.3-15.3-6.9-20.5-4.6-5.3-11.5-9-20.7-11.3l-16.6-4.2c-4.5-1.1-7.5-2.4-9.2-4-1.7-1.6-2.5-3.5-2.5-5.8 0-2.3 0.6-4.3 1.9-6.1 1.3-1.8 3.2-3.1 5.7-4 2.5-0.9 5.5-1.4 9-1.4 3.2 0 6.6 0.4 10 1 3.5 0.7 6.6 1.8 9.4 3.3 3 1.4 5.5 1.8 7.7 1.2 2.1-0.6 3.9-1.8 5.1-3.7 1.3-1.9 2-4 2.2-6.5 0.2-2.5-0.2-4.8-1.1-7.2-1-2.3-2.5-4.1-4.7-5.4-3.7-2.5-8.1-4.4-13.3-5.6-5.1-1.3-10.1-1.9-15-1.9z"
              ></path>
            </svg>
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
