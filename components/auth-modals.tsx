"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Eye, EyeOff, CircleCheck, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export type AuthModalType = "signin" | "signup" | "forgot-password" | "verification" | "reset-password" | null

interface AuthModalsProps {
   activeModal: AuthModalType
   onModalChange: (modal: AuthModalType) => void
}

export function AuthModals({ activeModal, onModalChange }: AuthModalsProps) {
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
   const [resendCountdown, setResendCountdown] = useState(30)
   const [canResend, setCanResend] = useState(false)
   const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

   // Reset Password state
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
      if (activeModal === "verification" && resendCountdown > 0) {
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

   const handleSignInSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Sign In:", { email: signInEmail, password: signInPassword })
   }

   const handleSignUpSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Sign Up:", { email: signUpEmail, password: signUpPassword, confirmPassword: signUpConfirmPassword })
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

   const handleForgotPasswordSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Forgot Password:", { email: forgotPasswordEmail })
      setResendCountdown(30)
      setCanResend(false)
      setOtpDigits(["", "", "", "", "", ""])
      onModalChange("verification")
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

   const handleResendCode = () => {
      if (canResend) {
         console.log("Resending code to:", forgotPasswordEmail)
         setResendCountdown(30)
         setCanResend(false)
      }
   }

   const handleVerificationSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const otp = otpDigits.join("")
      console.log("Verification Code:", { otp, email: forgotPasswordEmail })
      setNewPassword("")
      setConfirmNewPassword("")
      onModalChange("reset-password")
   }

   const handleResetPasswordSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Reset Password:", { newPassword, confirmNewPassword })
      onModalChange("signin")
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

   const handleModalClose = () => {
      onModalChange(null)
   }

   return (
      <>
         {/* Sign In Modal */}
         <Dialog open={activeModal === "signin"} onOpenChange={(open) => !open && handleModalClose()}>
            <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
               <VisuallyHidden>
                  <DialogTitle>Sign in to Temu Seller</DialogTitle>
               </VisuallyHidden>
               <div className="relative">
                  <div className="p-6 sm:p-8">
                     <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Sign in</h2>

                     <form onSubmit={handleSignInSubmit} className="space-y-5">
                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              Email or phone number
                           </Label>
                           <Input
                              type="text"
                              value={signInEmail}
                              onChange={(e) => setSignInEmail(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                           />
                        </div>

                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              Password
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
                                 Forgot password?
                              </button>
                           </div>
                        </div>

                        <Button
                           type="submit"
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-lg text-md transition-colors"
                        >
                           Continue
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                           By continuing, you agree to our{" "}
                           <Link href="/seller-privacy-policy" className="text-blue-500 hover:underline">
                              Seller Privacy Policy
                           </Link>
                           .
                        </p>

                        <div className="border-t border-gray-200 pt-4">
                           <p className="text-center text-sm font-semibold text-gray-900">
                              Don't have a Temu seller account?{" "}&nbsp;
                              <button
                                 type="button"
                                 onClick={switchToSignUp}
                                 className="cursor-pointer text-orange-500 font-semibold hover:underline"
                              >
                                 Sign up
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
            <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto">
               <VisuallyHidden>
                  <DialogTitle>Sign up to sell on Temu</DialogTitle>
               </VisuallyHidden>
               <div className="relative">
                  <div className="bg-orange-50 p-6 sm:p-8 pb-4">
                     <h2 className="text-xl font-bold text-center text-gray-900 mb-4">Sign up to sell on Temu</h2>

                     <div className="flex items-center justify-center gap-3">
                        <div className="flex items-baseline gap-1">
                           <span className="text-3xl font-bold text-orange-500">0%</span>
                           <span className="text-sm text-orange-500">Commission Fees</span>
                        </div>
                        <div className="text-gray-300">|</div>
                        <div className="flex items-baseline gap-1">
                           <span className="text-3xl font-bold text-orange-500">1</span>
                           <span className="text-xl font-bold text-orange-500">Min</span>
                           <span className="text-sm text-orange-500">Quick Signup</span>
                        </div>
                     </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-4">
                     <form onSubmit={handleSignUpSubmit} className="space-y-4">
                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              Email or phone number
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
                              Password
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
                                    Use minimum 8 characters
                                 </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                 <CircleCheck className={cn("h-4 w-4", passwordValidation.mixedChars ? "text-green-500" : "text-gray-300")} />
                                 <span className={cn(passwordValidation.mixedChars ? "text-gray-700" : "text-gray-500")}>
                                    A mix of letters, numbers and symbols
                                 </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                 <CircleCheck className={cn("h-4 w-4", passwordValidation.noEmail ? "text-green-500" : "text-gray-300")} />
                                 <span className={cn(passwordValidation.noEmail ? "text-gray-700" : "text-gray-500")}>
                                    Don't use your email or email prefix in the password
                                 </span>
                              </div>
                           </div>
                        </div>

                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              Confirm password
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
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-lg text-md transition-colors"
                        >
                           Continue
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                           By continuing, you agree to our{" "}
                           <Link href="/seller-privacy-policy" className="text-blue-500 underline">
                              Seller Privacy Policy
                           </Link>
                           .
                        </p>

                        <div className="border-t border-gray-200 pt-4">
                           <p className="text-center text-sm font-semibold text-gray-900">
                              Already have a Temu seller account?{" "}
                              <button
                                 type="button"
                                 onClick={switchToSignIn}
                                 className="cursor-pointer text-orange-500 font-semibold hover:underline"
                              >
                                 Sign in
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
            <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
               <VisuallyHidden>
                  <DialogTitle>Forgot password</DialogTitle>
               </VisuallyHidden>
               <div className="relative">
                  <div className="p-6 sm:p-8">
                     <button
                        type="button"
                        onClick={backToSignIn}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-4"
                     >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back</span>
                     </button>

                     <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot password</h2>
                     <p className="text-gray-600 text-sm mb-6">
                        Enter your email address and we'll send you a verification code.
                     </p>

                     <form onSubmit={handleForgotPasswordSubmit} className="space-y-5">
                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              Email
                           </Label>
                           <Input
                              type="email"
                              value={forgotPasswordEmail}
                              onChange={(e) => setForgotPasswordEmail(e.target.value)}
                              placeholder="Enter your email address"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                           />
                        </div>

                        <Button
                           type="submit"
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-lg text-md transition-colors"
                        >
                           Continue
                        </Button>
                     </form>
                  </div>
               </div>
            </DialogContent>
         </Dialog>

         {/* Verification Code Modal */}
         <Dialog open={activeModal === "verification"} onOpenChange={(open) => !open && handleModalClose()}>
            <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
               <VisuallyHidden>
                  <DialogTitle>Enter verification code</DialogTitle>
               </VisuallyHidden>
               <div className="relative">
                  <div className="p-6 sm:p-8">
                     <button
                        type="button"
                        onClick={backToForgotPassword}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-4"
                     >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back</span>
                     </button>

                     <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter verification code</h2>
                     <p className="text-gray-600 text-sm mb-6">
                        Enter the 6-digit code sent to{" "}
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
                              disabled={!canResend}
                              className={cn(
                                 "text-sm",
                                 canResend ? "text-orange-500 hover:underline cursor-pointer" : "text-gray-400"
                              )}
                           >
                              {canResend ? "Resend code" : `${resendCountdown}s Resend code`}
                           </button>
                        </div>

                        <Button
                           type="submit"
                           disabled={otpDigits.some((d) => !d)}
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-lg text-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           Continue
                        </Button>
                     </form>
                  </div>
               </div>
            </DialogContent>
         </Dialog>

         {/* Reset Password Modal */}
         <Dialog open={activeModal === "reset-password"} onOpenChange={(open) => !open && handleModalClose()}>
            <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto">
               <VisuallyHidden>
                  <DialogTitle>Reset password</DialogTitle>
               </VisuallyHidden>
               <div className="relative">
                  <div className="p-6 sm:p-8">
                     <button
                        type="button"
                        onClick={backToVerification}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-4"
                     >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back</span>
                     </button>

                     <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset password</h2>
                     <p className="text-gray-600 text-sm mb-6">
                        Create a new password for your account.
                     </p>

                     <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              New password
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
                                    Use minimum 8 characters
                                 </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                 <CircleCheck className={cn("h-4 w-4", resetPasswordValidation.mixedChars ? "text-green-500" : "text-gray-300")} />
                                 <span className={cn(resetPasswordValidation.mixedChars ? "text-gray-700" : "text-gray-500")}>
                                    A mix of letters, numbers and symbols
                                 </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                 <CircleCheck className={cn("h-4 w-4", resetPasswordValidation.noEmail ? "text-green-500" : "text-gray-300")} />
                                 <span className={cn(resetPasswordValidation.noEmail ? "text-gray-700" : "text-gray-500")}>
                                    Don't use your email or email prefix in the password
                                 </span>
                              </div>
                           </div>
                        </div>

                        <div>
                           <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                              Confirm new password
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
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-lg text-md transition-colors"
                        >
                           Reset password
                        </Button>
                     </form>
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </>
   )
}
