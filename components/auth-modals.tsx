"use client"

import Link from "next/link"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useMutation } from "@apollo/client/react"
import { useState, useEffect, useRef } from "react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Eye, EyeOff, CircleCheck, ArrowLeft, Loader } from "lucide-react"
import { useTranslation } from "react-i18next"

// type and api:
import { cn } from "@/lib/utils"
import { useToast } from "@/lib/toast"
import { ShopLoginResponse } from "@/types/shop"
import { useShopStore } from "@/store/shop-store"
import { MUTATION_SHOP_REGISTER, MUTATION_VERIFY_SHOP_EMAIL, MUTATION_SHOP_LOGIN, MUTATION_SHOP_FORGOT_PASSWORD, MUTATION_RESEND_VERIFY_SHOP_EMAIL, MUTATION_SHOP_RESET_PASSWORD } from "@/app/api/shop/auth"

// components:
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"


export type AuthModalType = "signin" | "signup" | "forgot-password" | "verification" | "reset-password" | "signup-verification" | null

interface AuthModalsProps {
   activeModal: AuthModalType
   onModalChange: (modal: AuthModalType) => void
}

export function AuthModals({ activeModal, onModalChange }: AuthModalsProps) {
   const router = useRouter()
   const { t } = useTranslation("shop-landing")
   const { successMessage, errorMessage } = useToast()

   // Shop store
   const setShop = useShopStore((state) => state.setShop)

   // Shop mutations
   const [shopRegister, { loading: registerLoading }] = useMutation(MUTATION_SHOP_REGISTER)
   const [verifyShopEmail, { loading: verifyLoading }] = useMutation(MUTATION_VERIFY_SHOP_EMAIL)
   const [shopLogin, { loading: loginLoading }] = useMutation<ShopLoginResponse>(MUTATION_SHOP_LOGIN)
   const [shopForgotPassword, { loading: forgotPasswordLoading }] = useMutation(MUTATION_SHOP_FORGOT_PASSWORD)
   const [resendShopOTP, { loading: resendLoading }] = useMutation(MUTATION_RESEND_VERIFY_SHOP_EMAIL)
   const [shopResetPassword, { loading: resetPasswordLoading }] = useMutation(MUTATION_SHOP_RESET_PASSWORD)

   // Sign In form state
   const [signInEmail, setSignInEmail] = useState("")
   const [signInPassword, setSignInPassword] = useState("")
   const [showSignInPassword, setShowSignInPassword] = useState(false)

   // Sign Up form state
   const [signUpEmail, setSignUpEmail] = useState("")
   const [signUpPassword, setSignUpPassword] = useState("")
   const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("")
   const [showSignUpPassword, setShowSignUpPassword] = useState(false)
   const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false)

   // Password validation
   const [passwordValidation, setPasswordValidation] = useState({
      minLength: false,
      mixedChars: false,
      noEmail: true,
   })

   // Forgot Password state
   const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")

   // Verification Code state
   const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""])
   const [resendCountdown, setResendCountdown] = useState(60)
   const [canResend, setCanResend] = useState(false)
   const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

   // Reset Password state
   const [verifiedOtp, setVerifiedOtp] = useState("")
   const [newPassword, setNewPassword] = useState("")
   const [confirmNewPassword, setConfirmNewPassword] = useState("")
   const [showNewPassword, setShowNewPassword] = useState(false)
   const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
   const [resetPasswordValidation, setResetPasswordValidation] = useState({
      minLength: false,
      mixedChars: false,
      noEmail: true,
   })

   // Sign Up password validation
   useEffect(() => {
      const hasMinLength = signUpPassword.length >= 8
      const hasMixedChars = /[a-zA-Z]/.test(signUpPassword) && /[0-9]/.test(signUpPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(signUpPassword)
      const emailPrefix = signUpEmail.split("@")[0].toLowerCase()
      const noEmail = !emailPrefix || !signUpPassword.toLowerCase().includes(emailPrefix)

      setPasswordValidation({
         minLength: hasMinLength,
         mixedChars: hasMixedChars,
         noEmail: noEmail,
      })
   }, [signUpPassword, signUpEmail])

   // Reset password validation
   useEffect(() => {
      const hasMinLength = newPassword.length >= 8
      const hasMixedChars = /[a-zA-Z]/.test(newPassword) && /[0-9]/.test(newPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
      const emailPrefix = forgotPasswordEmail.split("@")[0].toLowerCase()
      const noEmail = !emailPrefix || !newPassword.toLowerCase().includes(emailPrefix)

      setResetPasswordValidation({
         minLength: hasMinLength,
         mixedChars: hasMixedChars,
         noEmail: noEmail,
      })
   }, [newPassword, forgotPasswordEmail])

   // Countdown timer for resend code
   useEffect(() => {
      let timer: NodeJS.Timeout
      if ((activeModal === "verification" || activeModal === "signup-verification") && resendCountdown > 0) {
         timer = setInterval(() => {
            setResendCountdown((prev) => {
               if (prev <= 1) {
                  setCanResend(true)
                  return 0
               }
               return prev - 1
            })
         }, 1000)
      }
      return () => clearInterval(timer)
   }, [activeModal, resendCountdown])

   const handleSignInSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (!signInEmail || !signInPassword) {
         errorMessage({ message: t("enterEmailPassword") })
         return
      }

      try {
         const response = await shopLogin({
            variables: {
               where: {
                  email: signInEmail,
                  password: signInPassword,
               },
            },
         })

         if (response.data?.shopLogin?.success && response.data.shopLogin.data) {
            const { token, data } = response.data.shopLogin.data

            // Check shop status before setting token
            if (data.status === "PENDING") {
               // Shop has not provided all data yet, redirect to application page
               // Set token temporarily for application form
               Cookies.set("shop_auth_token", token)
               setShop(data)
               onModalChange(null)
               router.push("/shop-landing/application")
               return
            }

            if (data.status === "APPROVED") {
               // Shop is under review by admin, redirect to application page to show status
               Cookies.set("shop_auth_token", token)
               setShop(data)
               onModalChange(null)
               router.push("/shop-landing/application")
               return
            }

            // Save token to cookie (shop uses separate token key from customer)
            Cookies.set("shop_auth_token", token)

            // Save shop data to store
            setShop(data)

            successMessage({ message: t("loginSuccessful") })
            onModalChange(null)
            router.push("/shop-dashboard")
         } else {
            const error = response.data?.shopLogin?.error
            errorMessage({ message: error?.message || t("loginFailed") })
         }
      } catch (error) {
         console.error("Login error:", error)
         errorMessage({ message: t("loginError") })
      }
   }

   const handleSignUpSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      // Validate empty fields
      if (!signUpEmail || !signUpPassword) {
         errorMessage({ message: t("enterEmailPassword") })
         return
      }

      // Validate passwords match
      if (signUpPassword !== signUpConfirmPassword) {
         errorMessage({ message: t("passwordsDoNotMatch") })
         return
      }

      // Validate password requirements
      if (!passwordValidation.minLength || !passwordValidation.mixedChars || !passwordValidation.noEmail) {
         errorMessage({ message: t("meetPasswordRequirements") })
         return
      }

      try {
         const response = await shopRegister({
            variables: {
               data: {
                  email: signUpEmail,
                  password: signUpPassword,
               },
            },
         })

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const result = response.data as any
         if (result?.shopRegister?.success) {
            successMessage({ message: t("registrationSuccess") })
            // After sign up, show verification modal
            setForgotPasswordEmail(signUpEmail)
            setResendCountdown(60)
            setCanResend(false)
            setOtpDigits(["", "", "", "", "", ""])
            onModalChange("signup-verification")
         } else {
            const error = result?.shopRegister?.error
            errorMessage({ message: error?.message || t("registrationFailed") })
         }
      } catch (error) {
         console.error("Registration error:", error)
         errorMessage({ message: t("registrationError") })
      }
   }

   const switchToSignUp = () => {
      onModalChange("signup")
   }

   const switchToSignIn = () => {
      onModalChange("signin")
   }

   const openForgotPassword = () => {
      setForgotPasswordEmail(signInEmail)
      onModalChange("forgot-password")
   }

   const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (!forgotPasswordEmail) {
         errorMessage({ message: t("enterEmailAddress") })
         return
      }

      try {
         const response = await shopForgotPassword({
            variables: {
               email: forgotPasswordEmail,
            },
         })

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const result = response.data as any
         if (result?.shopForgotPassword?.success) {
            successMessage({ message: t("verificationCodeSent") })
            setResendCountdown(60)
            setCanResend(false)
            setOtpDigits(["", "", "", "", "", ""])
            onModalChange("verification")
         } else {
            const error = result?.shopForgotPassword?.error
            errorMessage({ message: error?.message || t("verificationCodeFailed") })
         }
      } catch (error) {
         console.error("Forgot password error:", error)
         errorMessage({ message: t("genericError") })
      }
   }

   const handleOtpChange = (index: number, value: string) => {
      if (value.length > 1) {
         value = value.slice(-1)
      }
      if (!/^\d*$/.test(value)) return

      const newOtpDigits = [...otpDigits]
      newOtpDigits[index] = value
      setOtpDigits(newOtpDigits)

      // Auto-focus next input
      if (value && index < 5) {
         otpInputRefs.current[index + 1]?.focus()
      }
   }

   const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
         otpInputRefs.current[index - 1]?.focus()
      }
   }

   const handleResendCode = async () => {
      if (!canResend || resendLoading) return

      try {
         const response = await resendShopOTP({
            variables: {
               data: {
                  email: forgotPasswordEmail,
               },
            },
         })

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const result = response.data as any
         if (result?.shopResendOTP?.success) {
            successMessage({ message: t("codeResent") })
            setResendCountdown(60)
            setCanResend(false)
         } else {
            const error = result?.shopResendOTP?.error
            errorMessage({ message: error?.message || t("resendFailed") })
         }
      } catch (error) {
         console.error("Resend code error:", error)
         errorMessage({ message: t("genericError") })
      }
   }

   const handleVerificationSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const otp = otpDigits.join("")

      try {
         const response = await verifyShopEmail({
            variables: {
               data: {
                  email: forgotPasswordEmail,
                  otp: otp,
               },
            },
         })

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const result = response.data as any
         if (result?.shopVerifyOTP?.success) {
            // Store OTP for reset password mutation
            setVerifiedOtp(otp)
            setNewPassword("")
            setConfirmNewPassword("")
            onModalChange("reset-password")
         } else {
            const error = result?.shopVerifyOTP?.error
            errorMessage({ message: error?.message || t("verificationFailed") })
         }
      } catch (error) {
         console.error("Verification error:", error)
         errorMessage({ message: t("verificationError") })
      }
   }

   const handleSignupVerificationSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const otp = otpDigits.join("")

      try {
         const response = await verifyShopEmail({
            variables: {
               data: {
                  email: forgotPasswordEmail,
                  otp: otp,
               },
            },
         })

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const result = response.data as any
         if (result?.shopVerifyOTP?.success) {
            // Save token to cookie for shop update mutation
            const token = result?.shopVerifyOTP?.data?.token
            if (token) {
               Cookies.set("shop_auth_token", token)
            }
            successMessage({ message: t("emailVerified") })
            onModalChange(null)
            router.push("/shop-landing/application")
         } else {
            const error = result?.shopVerifyOTP?.error
            errorMessage({ message: error?.message || t("verificationFailed") })
         }
      } catch (error) {
         console.error("Verification error:", error)
         errorMessage({ message: t("verificationError") })
      }
   }

   const handleResetPasswordSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      // Validate passwords match
      if (newPassword !== confirmNewPassword) {
         errorMessage({ message: t("passwordsDoNotMatch") })
         return
      }

      // Validate password requirements
      if (!resetPasswordValidation.minLength || !resetPasswordValidation.mixedChars || !resetPasswordValidation.noEmail) {
         errorMessage({ message: t("meetPasswordRequirements") })
         return
      }

      try {
         const response = await shopResetPassword({
            variables: {
               data: {
                  email: forgotPasswordEmail,
                  otp: verifiedOtp,
                  new_password: newPassword,
               },
            },
         })

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const result = response.data as any
         if (result?.shopResetPassword?.success) {
            successMessage({ message: t("passwordResetSuccess") })
            // Clear states
            setVerifiedOtp("")
            setNewPassword("")
            setConfirmNewPassword("")
            setForgotPasswordEmail("")
            onModalChange("signin")
         } else {
            const error = result?.shopResetPassword?.error
            errorMessage({ message: error?.message || t("passwordResetFailed") })
         }
      } catch (error) {
         console.error("Reset password error:", error)
         errorMessage({ message: t("genericError") })
      }
   }

   const backToSignIn = () => {
      onModalChange("signin")
   }

   const backToForgotPassword = () => {
      onModalChange("forgot-password")
   }

   const backToVerification = () => {
      onModalChange("verification")
   }

   const backToSignUp = () => {
      onModalChange("signup")
   }

   const handleModalClose = () => {
      onModalChange(null)
   }

   return (
      <>
         {/* Sign In Modal */}
         <Dialog open={activeModal === "signin"} onOpenChange={(open) => !open && handleModalClose()}>
            <DialogContent className="w-full h-[90vh] sm:h-auto sm:max-h-[90vh] max-w-full sm:max-w-md rounded-t-xl sm:rounded-lg p-0 gap-0 overflow-hidden overflow-y-auto fixed bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
               <VisuallyHidden>
                  <DialogTitle className="text-md sm:text-xl">{t("signInToTemuSeller")}</DialogTitle>
               </VisuallyHidden>
               <div className="relative py-4 sm:py-0">
                  <div className="p-6 sm:p-8">
                     <h2 className="text-md sm:text-2xl font-bold text-center text-gray-900 mb-6">{t("signIn")}</h2>

                     <form onSubmit={handleSignInSubmit} className="space-y-5">
                        <div>
                           <Label className="text-sm text-gray-900 mb-2 block">
                              {t("emailOrPhone")} <span className="text-rose-500">*</span>
                           </Label>
                           <Input
                              type="text"
                              value={signInEmail}
                              onChange={(e) => setSignInEmail(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                           />
                        </div>

                        <div>
                           <Label className="text-sm text-gray-900 mb-2 block">
                              {t("password")} <span className="text-rose-500">*</span>
                           </Label>
                           <div className="relative">
                              <Input
                                 type={showSignInPassword ? "text" : "password"}
                                 value={signInPassword}
                                 onChange={(e) => setSignInPassword(e.target.value)}
                                 className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                              <button
                                 type="button"
                                 onClick={() => setShowSignInPassword(!showSignInPassword)}
                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                 {showSignInPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                           </div>
                           <div className="text-right mt-2">
                              <button
                                 type="button"
                                 onClick={openForgotPassword}
                                 className="text-sm text-gray-600 hover:text-gray-900"
                              >
                                 {t("forgotPassword")}
                              </button>
                           </div>
                        </div>

                        <Button
                           type="submit"
                           disabled={loginLoading}
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 sm:py-6 rounded-lg text-sm sm:text-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {loginLoading ? (
                              <>
                                 <Loader className="h-5 w-5 animate-spin " />
                                 {t("signingIn")}
                              </>
                           ) : (
                              t("continue")
                           )}
                        </Button>

                        <p className="text-center text-xs sm:text-sm text-gray-600">
                           {t("bySigningUp")}{" "}
                           <Link href="/shop-landing/seller-policy" className="text-xs sm:text-sm text-blue-500 hover:underline">
                              {t("sellerPrivacyPolicy")}
                           </Link>
                           .
                        </p>

                        <div className="border-t border-gray-200 pt-4">
                           <p className="text-center text-sm font-semibold text-gray-900">
                              {t("dontHaveAccount")}{" "}&nbsp;
                              <button
                                 type="button"
                                 onClick={switchToSignUp}
                                 className="cursor-pointer text-orange-500 font-semibold hover:underline"
                              >
                                 {t("signUp")}
                              </button>
                           </p>
                        </div>
                     </form>
                  </div>
               </div>
            </DialogContent>
         </Dialog>

         {/* Sign Up Modal */}
         <Dialog open={activeModal === "signup"} onOpenChange={(open) => !open && handleModalClose()}>
            <DialogContent className="w-full h-[90vh] sm:h-auto sm:max-h-[90vh] max-w-full sm:max-w-md rounded-t-xl sm:rounded-lg p-0 gap-0 overflow-hidden overflow-y-auto fixed bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
               <VisuallyHidden>
                  <DialogTitle>{t("signUpToSellOnTemu")}</DialogTitle>
               </VisuallyHidden>
               <div className="relative py-4 sm:py-0">
                  <div className="bg-orange-50 p-6 sm:p-8 pb-4">
                     <h2 className="text-xl font-bold text-center text-gray-900 mb-4">{t("signUpToSellOnTemu")}</h2>

                     <div className="flex items-center justify-center gap-3">
                        <div className="flex items-baseline gap-1">
                           <span className="text-3xl font-bold text-orange-500">0%</span>
                           <span className="text-sm text-orange-500">{t("commissionFees")}</span>
                        </div>
                        <div className="text-gray-300">|</div>
                        <div className="flex items-baseline gap-1">
                           <span className="text-3xl font-bold text-orange-500">1</span>
                           <span className="text-xl font-bold text-orange-500">{t("minute")}</span>
                           <span className="text-sm text-orange-500">{t("quickSignup")}</span>
                        </div>
                     </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-4">
                     <form onSubmit={handleSignUpSubmit} className="space-y-4">
                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              {t("emailOrPhone")}
                           </Label>
                           <Input
                              type="text"
                              value={signUpEmail}
                              onChange={(e) => setSignUpEmail(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                           />
                        </div>
                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              {t("password")}
                           </Label>
                           <div className="relative">
                              <Input
                                 type={showSignUpPassword ? "text" : "password"}
                                 value={signUpPassword}
                                 onChange={(e) => setSignUpPassword(e.target.value)}
                                 className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                              <button
                                 type="button"
                                 onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                 {showSignUpPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                           </div>

                           <div className="mt-2 space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                 <CircleCheck className={cn("h-4 w-4", passwordValidation.minLength ? "text-green-500" : "text-gray-300")} />
                                 <span className={cn(passwordValidation.minLength ? "text-gray-700" : "text-gray-500")}>
                                    {t("passwordMinLength")}
                                 </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                 <CircleCheck className={cn("h-4 w-4", passwordValidation.mixedChars ? "text-green-500" : "text-gray-300")} />
                                 <span className={cn(passwordValidation.mixedChars ? "text-gray-700" : "text-gray-500")}>
                                    {t("passwordMixedChars")}
                                 </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                 <CircleCheck className={cn("h-4 w-4", passwordValidation.noEmail ? "text-green-500" : "text-gray-300")} />
                                 <span className={cn(passwordValidation.noEmail ? "text-gray-700" : "text-gray-500")}>
                                    {t("passwordNoEmail")}
                                 </span>
                              </div>
                           </div>
                        </div>

                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              {t("confirmPassword")}
                           </Label>
                           <div className="relative">
                              <Input
                                 type={showSignUpConfirmPassword ? "text" : "password"}
                                 value={signUpConfirmPassword}
                                 onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                                 className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                              <button
                                 type="button"
                                 onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                 {showSignUpConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                           </div>
                        </div>

                        <Button
                           type="submit"
                           disabled={registerLoading}
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-lg text-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {registerLoading ? (
                              <>
                                 <Loader className="h-5 w-5 animate-spin " />
                                 {t("creatingAccount")}
                              </>
                           ) : (
                              t("continue")
                           )}
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                           {t("bySigningUp")}{" "}
                           <Link href="/shop-landing/seller-policy" className="text-blue-500 underline">
                              {t("sellerPrivacyPolicy")}
                           </Link>
                           .
                        </p>

                        <div className="border-t border-gray-200 pt-4">
                           <p className="text-center text-sm font-semibold text-gray-900">
                              {t("alreadyHaveAccount")}{" "}
                              <button
                                 type="button"
                                 onClick={switchToSignIn}
                                 className="cursor-pointer text-orange-500 font-semibold hover:underline"
                              >
                                 {t("signIn")}
                              </button>
                           </p>
                        </div>
                     </form>
                  </div>
               </div>
            </DialogContent>
         </Dialog>

         {/* Forgot Password Modal */}
         <Dialog open={activeModal === "forgot-password"} onOpenChange={(open) => !open && handleModalClose()}>
            <DialogContent className="w-full h-[90vh] sm:h-auto sm:max-h-[90vh] max-w-full sm:max-w-md rounded-t-xl sm:rounded-lg p-0 gap-0 overflow-hidden overflow-y-auto fixed bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
               <VisuallyHidden>
                  <DialogTitle>{t("forgotPasswordTitle")}</DialogTitle>
               </VisuallyHidden>
               <div className="relative py-4 sm:py-0">
                  <div className="p-6 sm:p-8">
                     <button
                        type="button"
                        onClick={backToSignIn}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-4"
                     >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">{t("back")}</span>
                     </button>

                     <h2 className="text-md sm:text-2xl font-bold text-gray-900 mb-2">{t("forgotPasswordTitle")}</h2>
                     <p className="text-gray-600 text-sm mb-6">
                        {t("enterEmailForVerification")}
                     </p>

                     <form onSubmit={handleForgotPasswordSubmit} className="space-y-5">
                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              {t("email")} <span className="text-rose-500">*</span>
                           </Label>
                           <Input
                              type="email"
                              value={forgotPasswordEmail}
                              onChange={(e) => setForgotPasswordEmail(e.target.value)}
                              placeholder={t("enterYourEmailAddress")}
                              className="text-sm w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                           />
                        </div>

                        <Button
                           type="submit"
                           disabled={forgotPasswordLoading}
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 sm:py-6 rounded-md sm:rounded-lg text-sm sm:text-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {forgotPasswordLoading ? (
                              <>
                                 <Loader className="h-5 w-5 animate-spin " />
                                 {t("sending")}
                              </>
                           ) : (
                              t("continue")
                           )}
                        </Button>
                     </form>
                  </div>
               </div>
            </DialogContent>
         </Dialog>

         {/* Verification Code Modal */}
         <Dialog open={activeModal === "verification"} onOpenChange={(open) => !open && handleModalClose()}>
            <DialogContent className="w-full h-[90vh] sm:h-auto sm:max-h-[90vh] max-w-full sm:max-w-md rounded-t-xl sm:rounded-lg p-0 gap-0 overflow-hidden overflow-y-auto fixed bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
               <VisuallyHidden>
                  <DialogTitle>{t("enterVerificationCodeTitle")}</DialogTitle>
               </VisuallyHidden>
               <div className="relative py-4 sm:py-0">
                  <div className="p-6 sm:p-8">
                     <button
                        type="button"
                        onClick={backToForgotPassword}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-4"
                     >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">{t("back")}</span>
                     </button>

                     <h2 className="text-md sm:text-2xl font-bold text-gray-900 mb-2">{t("enterVerificationCodeTitle")}</h2>
                     <p className="text-gray-600 text-sm mb-6">
                        {t("enterCodeSentTo")}{" "}
                        <span className="text-orange-500 font-medium">{forgotPasswordEmail}</span>
                     </p>

                     <form onSubmit={handleVerificationSubmit} className="space-y-5">
                        <div className="flex justify-center gap-2">
                           {otpDigits.map((digit, index) => (
                              <input
                                 key={index}
                                 ref={(el) => { otpInputRefs.current[index] = el }}
                                 type="text"
                                 inputMode="numeric"
                                 maxLength={1}
                                 value={digit}
                                 onChange={(e) => handleOtpChange(index, e.target.value)}
                                 onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                 className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                              />
                           ))}
                        </div>

                        <div className="text-center">
                           <button
                              type="button"
                              onClick={handleResendCode}
                              disabled={!canResend || resendLoading}
                              className={cn(
                                 "text-sm",
                                 canResend && !resendLoading ? "text-orange-500 hover:underline cursor-pointer" : "text-gray-400"
                              )}
                           >
                              {resendLoading ? t("sending") : canResend ? t("resendCode") : t("resendCodeWithTimer", { seconds: resendCountdown })}
                           </button>
                        </div>

                        <Button
                           type="submit"
                           disabled={otpDigits.some((d) => !d) || verifyLoading}
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 sm:py-6 rounded-sm sm:rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {verifyLoading ? (
                              <>
                                 <Loader className="h-5 w-5 animate-spin " />
                                 {t("verifying")}
                              </>
                           ) : (
                              t("continue")
                           )}
                        </Button>
                     </form>
                  </div>
               </div>
            </DialogContent>
         </Dialog>

         {/* Reset Password Modal */}
         <Dialog open={activeModal === "reset-password"} onOpenChange={(open) => !open && handleModalClose()}>
            <DialogContent className="w-full h-[90vh] sm:h-auto sm:max-h-[90vh] max-w-full sm:max-w-md rounded-t-xl sm:rounded-lg p-0 gap-0 overflow-hidden overflow-y-auto fixed bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
               <VisuallyHidden>
                  <DialogTitle>{t("resetPasswordTitle")}</DialogTitle>
               </VisuallyHidden>
               <div className="relative py-4 sm:py-0">
                  <div className="p-6 sm:p-8">
                     <button
                        type="button"
                        onClick={backToVerification}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-4"
                     >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">{t("back")}</span>
                     </button>

                     <h2 className="text-md sm:text-2xl font-bold text-gray-900 mb-2">{t("resetPasswordTitle")}</h2>
                     <p className="text-gray-600 text-sm mb-6">
                        {t("createNewPassword")}
                     </p>

                     <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              {t("newPassword")} <span className="text-rose-500">*</span>
                           </Label>
                           <div className="relative">
                              <Input
                                 type={showNewPassword ? "text" : "password"}
                                 value={newPassword}
                                 onChange={(e) => setNewPassword(e.target.value)}
                                 className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                              <button
                                 type="button"
                                 onClick={() => setShowNewPassword(!showNewPassword)}
                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                 {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                           </div>

                           <div className="mt-2 space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                 <CircleCheck className={cn("h-4 w-4", resetPasswordValidation.minLength ? "text-green-500" : "text-gray-300")} />
                                 <span className={cn(resetPasswordValidation.minLength ? "text-gray-700" : "text-gray-500")}>
                                    {t("passwordMinLength")}
                                 </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                 <CircleCheck className={cn("h-4 w-4", resetPasswordValidation.mixedChars ? "text-green-500" : "text-gray-300")} />
                                 <span className={cn(resetPasswordValidation.mixedChars ? "text-gray-700" : "text-gray-500")}>
                                    {t("passwordMixedChars")}
                                 </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                 <CircleCheck className={cn("h-4 w-4", resetPasswordValidation.noEmail ? "text-green-500" : "text-gray-300")} />
                                 <span className={cn(resetPasswordValidation.noEmail ? "text-gray-700" : "text-gray-500")}>
                                    {t("passwordNoEmail")}
                                 </span>
                              </div>
                           </div>
                        </div>

                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              {t("confirmNewPassword")} <span className="text-rose-500">*</span>
                           </Label>
                           <div className="relative">
                              <Input
                                 type={showConfirmNewPassword ? "text" : "password"}
                                 value={confirmNewPassword}
                                 onChange={(e) => setConfirmNewPassword(e.target.value)}
                                 className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                              <button
                                 type="button"
                                 onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                 {showConfirmNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                           </div>
                        </div>

                        <Button
                           type="submit"
                           disabled={resetPasswordLoading}
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 sm:py-6 rounded-lg text-sm sm:text-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {resetPasswordLoading ? (
                              <>
                                 <Loader className="h-5 w-5 animate-spin " />
                                 {t("resetting")}
                              </>
                           ) : (
                              t("resetPasswordButton")
                           )}
                        </Button>
                     </form>
                  </div>
               </div>
            </DialogContent>
         </Dialog>

         {/* Sign Up Verification Modal */}
         <Dialog open={activeModal === "signup-verification"} onOpenChange={(open) => !open && handleModalClose()}>
            <DialogContent className="w-full h-[90vh] sm:h-auto sm:max-h-[90vh] max-w-full sm:max-w-md rounded-t-xl sm:rounded-lg p-0 gap-0 overflow-hidden overflow-y-auto fixed bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
               <VisuallyHidden>
                  <DialogTitle>{t("verifyYourEmail")}</DialogTitle>
               </VisuallyHidden>
               <div className="relative py-4 sm:py-0">
                  <div className="p-6 sm:p-8">
                     <button
                        type="button"
                        onClick={backToSignUp}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-4"
                     >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">{t("back")}</span>
                     </button>

                     <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("verifyYourEmail")}</h2>
                     <p className="text-gray-600 text-sm mb-6">
                        {t("enterCodeSentTo")}{" "}
                        <span className="text-orange-500 font-medium">{forgotPasswordEmail}</span>
                     </p>

                     <form onSubmit={handleSignupVerificationSubmit} className="space-y-5">
                        <div className="flex justify-center gap-2">
                           {otpDigits.map((digit, index) => (
                              <input
                                 key={index}
                                 ref={(el) => { otpInputRefs.current[index] = el }}
                                 type="text"
                                 inputMode="numeric"
                                 maxLength={1}
                                 value={digit}
                                 onChange={(e) => handleOtpChange(index, e.target.value)}
                                 onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                 className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                              />
                           ))}
                        </div>

                        <div className="text-center">
                           <button
                              type="button"
                              onClick={handleResendCode}
                              disabled={!canResend || resendLoading}
                              className={cn(
                                 "text-sm",
                                 canResend && !resendLoading ? "text-orange-500 hover:underline cursor-pointer" : "text-gray-400"
                              )}
                           >
                              {resendLoading ? t("sending") : canResend ? t("resendCode") : t("resendCodeWithTimer", { seconds: resendCountdown })}
                           </button>
                        </div>

                        <Button
                           type="submit"
                           disabled={otpDigits.some((d) => !d) || verifyLoading}
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-lg text-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {verifyLoading ? (
                              <>
                                 <Loader className="h-5 w-5 animate-spin " />
                                 {t("verifying")}
                              </>
                           ) : (
                              t("verifyAndContinue")
                           )}
                        </Button>
                     </form>
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </>
   )
}
