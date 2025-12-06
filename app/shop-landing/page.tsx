"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { TrendingUp, Zap, DollarSign, Headphones, Eye, EyeOff, CreditCard, MessageCircle, Wallet, ChevronUp, ChevronDown, ArrowLeft, Loader, CircleCheck } from "lucide-react"
import { useMutation } from "@apollo/client/react"
import Cookies from "js-cookie"

// Components
import { cn } from "@/lib/utils"
import { useToast } from "@/lib/toast"
import { MUTATION_SHOP_REGISTER, MUTATION_VERIFY_SHOP_EMAIL, MUTATION_RESEND_VERIFY_SHOP_EMAIL } from "@/app/api/shop/auth"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AuthModals, AuthModalType } from "@/components/auth-modals"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export default function ShopLandingPage() {
   const router = useRouter()
   const { successMessage, errorMessage } = useToast()
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
   const [activeModal, setActiveModal] = useState<AuthModalType>(null)

   // Hero sign up verification state
   const [isHeroVerificationOpen, setIsHeroVerificationOpen] = useState(false)
   const [heroOtpDigits, setHeroOtpDigits] = useState(["", "", "", "", "", ""])
   const [heroResendCountdown, setHeroResendCountdown] = useState(60)
   const [heroCanResend, setHeroCanResend] = useState(false)

   // Form state
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")

   // Password validation state
   const [passwordValidation, setPasswordValidation] = useState({
      minLength: false,
      mixedChars: false,
      noEmail: true,
   })

   // Mutations
   const [shopRegister, { loading: registerLoading }] = useMutation(MUTATION_SHOP_REGISTER)
   const [verifyShopEmail, { loading: verifyLoading }] = useMutation(MUTATION_VERIFY_SHOP_EMAIL)
   const [resendShopOTP, { loading: resendLoading }] = useMutation(MUTATION_RESEND_VERIFY_SHOP_EMAIL)

   // Password validation effect
   useEffect(() => {
      const hasMinLength = password.length >= 8
      const hasMixedChars = /[a-zA-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)
      const emailPrefix = email.split("@")[0].toLowerCase()
      const noEmail = !emailPrefix || !password.toLowerCase().includes(emailPrefix)

      setPasswordValidation({
         minLength: hasMinLength,
         mixedChars: hasMixedChars,
         noEmail: noEmail,
      })
   }, [password, email])

   const features = [
      { icon: TrendingUp, text: "Trending Platform" },
      { icon: Zap, text: "Fast First Sale" },
      { icon: DollarSign, text: "Cost-efficient from the Start" },
      { icon: Headphones, text: "Personalized Seller Support" },
   ]

   const whySellFeatures = [
      {
         icon: TrendingUp,
         titleHighlight: "Trending",
         titleNormal: "Platform",
         highlightFirst: true,
         description: "Thanks to Temu's global popularity and influence, you'll be able to easily promote your products to more potential customers.",
      },
      {
         icon: CreditCard,
         titleHighlight: "First Sale",
         titleNormal: "Fast",
         highlightFirst: false,
         description: "With Temu's high traffic, 50% of new sellers make their first sale within 20 days.",
         footnote: "2",
      },
      {
         icon: Wallet,
         titleHighlight: "Cost-efficient",
         titleNormal: "from the Start",
         highlightFirst: true,
         description: "Benefit from cost-efficiency in store setup, selling, operation and marketing",
      },
      {
         icon: MessageCircle,
         titleHighlight: "Personalized",
         titleNormal: "Seller Support",
         highlightFirst: true,
         description: "Our dedicated team of specialists is here to support your success. From onboarding to boosting product competitiveness, our experienced team provides the guidance you need every step.",
      },
   ]

   const faqItems = [
      {
         question: "How do I become a Temu seller?",
         answer: (
            <div className="space-y-3">
               <p>You can register as a Temu seller in four simple steps:</p>
               <p><strong>Step 1</strong>: Enter your business information. We accept business types including Corporation, Partnership, and Sole Proprietorship. You also have the option to join as an individual seller.</p>
               <p><strong>Step 2</strong>: Provide your seller information. This includes details like certificate type, address, and seller name.</p>
               <p><strong>Step 3</strong>: Set up your Temu store by adding your store name, logo, and contact information.</p>
               <p><strong>Step 4</strong>: Complete the verification process and start selling on Temu.</p>
            </div>
         ),
      },
      {
         question: "What documentation is required to become a Temu seller?",
         answer: (
            <div className="space-y-4">
               <div>
                  <p className="font-medium mb-2">For individual applicants, the following information and documents are required for verification:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                     <li>Full legal name (first name, last name, and middle name if applicable)</li>
                     <li>Citizenship</li>
                     <li>Date of birth</li>
                     <li>Place of birth</li>
                     <li>Residential address</li>
                     <li>Government-issued driver's license ID or passport</li>
                     <li>ID expiration date</li>
                  </ol>
               </div>
               <div>
                  <p className="font-medium mb-2">For business applicants, the following company registration information is required:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                     <li>Business type</li>
                     <li>Business name</li>
                     <li>Employer Identification Number (EIN)</li>
                     <li>Registered business address</li>
                  </ol>
               </div>
               <div>
                  <p className="font-medium mb-2">Additionally, beneficial owners, legal representatives, or executives of the company may need to provide:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                     <li>Legal name</li>
                     <li>Citizenship</li>
                     <li>Date of birth</li>
                     <li>Residential address</li>
                     <li>Government-issued driver's license ID or passport</li>
                     <li>ID expiration date</li>
                  </ol>
               </div>
            </div>
         ),
      },
      {
         question: "Are there any fees to register as a local seller on Temu?",
         answer: (
            <p>Temu does not charge any registration fees. You can register as a Temu seller for free.</p>
         ),
      },
      {
         question: "What types of proof of address are accepted?",
         answer: (
            <p>We accept Bank statements/Bank confirmation letters, third-party payment statements, and water, electricity, and gas bills are all supported. The proof of address must contain the company name (or the name of the company representative) and address.</p>
         ),
      },
   ]

   const toggleFaq = (index: number) => {
      setOpenFaqIndex(openFaqIndex === index ? null : index)
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      // Validate empty fields
      if (!email || !password) {
         errorMessage({ message: "Please enter email and password" })
         return
      }

      // Validate passwords match
      if (password !== confirmPassword) {
         errorMessage({ message: "Passwords do not match" })
         return
      }

      // Validate password requirements
      if (!passwordValidation.minLength || !passwordValidation.mixedChars || !passwordValidation.noEmail) {
         errorMessage({ message: "Please meet all password requirements" })
         return
      }

      try {
         const response = await shopRegister({
            variables: {
               data: {
                  email: email,
                  password: password,
               },
            },
         })

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const result = response.data as any
         if (result?.shopRegister?.success) {
            successMessage({ message: "Registration successful! Please verify your email." })
            // Show verification modal
            setHeroResendCountdown(60)
            setHeroCanResend(false)
            setHeroOtpDigits(["", "", "", "", "", ""])
            setIsHeroVerificationOpen(true)
         } else {
            const error = result?.shopRegister?.error
            errorMessage({ message: error?.message || "Registration failed. Please try again." })
         }
      } catch (error) {
         console.error("Registration error:", error)
         errorMessage({ message: "An error occurred during registration. Please try again." })
      }
   }

   const handleHeroOtpChange = (index: number, value: string) => {
      if (value.length > 1) {
         value = value.slice(-1)
      }
      if (!/^\d*$/.test(value)) return

      const newOtpDigits = [...heroOtpDigits]
      newOtpDigits[index] = value
      setHeroOtpDigits(newOtpDigits)

      // Auto-focus next input
      if (value && index < 5) {
         const nextInput = document.getElementById(`hero-otp-${index + 1}`)
         nextInput?.focus()
      }
   }

   const handleHeroOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !heroOtpDigits[index] && index > 0) {
         const prevInput = document.getElementById(`hero-otp-${index - 1}`)
         prevInput?.focus()
      }
   }

   const handleHeroResendCode = async () => {
      if (!heroCanResend || resendLoading) return

      try {
         const response = await resendShopOTP({
            variables: {
               data: {
                  email: email,
               },
            },
         })

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const result = response.data as any
         if (result?.shopResendOTP?.success) {
            successMessage({ message: "Verification code resent!" })
            setHeroResendCountdown(60)
            setHeroCanResend(false)
         } else {
            const error = result?.shopResendOTP?.error
            errorMessage({ message: error?.message || "Failed to resend code. Please try again." })
         }
      } catch (error) {
         console.error("Resend code error:", error)
         errorMessage({ message: "An error occurred. Please try again." })
      }
   }

   const handleHeroVerificationSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const otp = heroOtpDigits.join("")

      try {
         const response = await verifyShopEmail({
            variables: {
               data: {
                  email: email,
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
               Cookies.set("auth_token", token)
            }
            successMessage({ message: "Email verified successfully!" })
            setIsHeroVerificationOpen(false)
            router.push("/shop-landing/application")
         } else {
            const error = result?.shopVerifyOTP?.error
            errorMessage({ message: error?.message || "Verification failed. Please try again." })
         }
      } catch (error) {
         console.error("Verification error:", error)
         errorMessage({ message: "An error occurred during verification. Please try again." })
      }
   }

   // Countdown timer for hero verification
   useEffect(() => {
      let timer: NodeJS.Timeout
      if (isHeroVerificationOpen && heroResendCountdown > 0) {
         timer = setInterval(() => {
            setHeroResendCountdown((prev) => {
               if (prev <= 1) {
                  setHeroCanResend(true)
                  return 0
               }
               return prev - 1
            })
         }, 1000)
      }
      return () => clearInterval(timer)
   }, [isHeroVerificationOpen, heroResendCountdown])

   return (
      <div className="min-h-screen">
         <section className="relative min-h-[90vh] flex items-start">
            <div className="absolute inset-0 z-0">
               <Image
                  src="/images/shop-hero-bg.webp"
                  alt=""
                  fill
                  className="object-cover"
                  priority
               />
               <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start justify-start">
                  <div className="hidden sm:block text-white">
                     <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                        Start Selling to<br />
                        Millions of<br />
                        Buyers on Temu
                     </h1>

                     <div className="space-y-4">
                        {features.map((feature, index) => (
                           <div key={index} className="flex items-center gap-3">
                              <feature.icon className="h-6 w-6 text-white" />
                              <span className="text-lg font-medium">{feature.text}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="flex justify-center lg:justify-end">
                     <div className="bg-white rounded-sm sm:rounded-md p-4 sm:p-8 w-full max-w-md shadow-2xl">
                        <div className="text-center mb-6">
                           <h2 className="text-md sm:text-2xl font-bold text-gray-900 mb-3">Sign up</h2>
                           <span className="inline-block bg-orange-500 text-white text-xs sm:text-sm font-medium px-4 py-1 rounded-sm">
                              0% Commission Fees
                           </span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
                           <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                 Email or phone number <span className="text-rose-500">*</span>
                              </Label>
                              <Input
                                 type="text"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                 placeholder=""
                              />
                           </div>

                           <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                 Password <span className="text-rose-500">*</span>
                              </Label>
                              <div className="relative">
                                 <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder=""
                                 />
                                 <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                 >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                 </button>
                              </div>
                              <div className="mt-2 space-y-1">
                                 <div className="flex items-center gap-2 text-xs">
                                    <CircleCheck className={cn("h-3 w-3", passwordValidation.minLength ? "text-green-500" : "text-gray-300")} />
                                    <span className={cn(passwordValidation.minLength ? "text-gray-700" : "text-gray-500")}>
                                       Use minimum 8 characters
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-2 text-xs">
                                    <CircleCheck className={cn("h-3 w-3", passwordValidation.mixedChars ? "text-green-500" : "text-gray-300")} />
                                    <span className={cn(passwordValidation.mixedChars ? "text-gray-700" : "text-gray-500")}>
                                       A mix of letters, numbers and symbols
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-2 text-xs">
                                    <CircleCheck className={cn("h-3 w-3", passwordValidation.noEmail ? "text-green-500" : "text-gray-300")} />
                                    <span className={cn(passwordValidation.noEmail ? "text-gray-700" : "text-gray-500")}>
                                       Don't use your email prefix in password
                                    </span>
                                 </div>
                              </div>
                           </div>

                           <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                 Confirm password <span className="text-rose-500">*</span>
                              </Label>
                              <div className="relative">
                                 <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder=""
                                 />
                                 <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                 >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                 </button>
                              </div>
                           </div>

                           <Button
                              type="submit"
                              disabled={registerLoading}
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 sm:py-6 rounded-md text-sm sm:text-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                              {registerLoading ? (
                                 <>
                                    <Loader className="h-5 w-5 animate-spin mr-2" />
                                    Creating account...
                                 </>
                              ) : (
                                 "Continue"
                              )}
                           </Button>

                           <p className="text-center text-xs sm:text-sm text-gray-600">
                              By continuing, you agree to our{" "}
                              <Link href="/shop-landing/seller-policy" className="text-blue-500 underline ">
                                 Seller Privacy Policy
                              </Link>
                              .
                           </p>

                           <p className="text-center text-sm sm:text-md text-gray-700 font-bold">
                              Already have a Temu seller account?{" "}&nbsp;
                              <button
                                 type="button"
                                 onClick={() => setActiveModal("signin")}
                                 className="text-orange-500 font-bold hover:underline"
                              >
                                 Sign in
                              </button>
                           </p>
                        </form>
                     </div>
                  </div>
               </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                     <div className="flex items-center justify-start gap-4 sm:border-r sm:border-gray-600 sm:pr-8">
                        <span className="text-xl sm:text-6xl font-bold text-white">1</span>
                        <div className="text-white">
                           <p className="text-md sm:text-lg font-semibold">Minute</p>
                           <p className="text-sm text-gray-300">Create your account</p>
                        </div>
                     </div>

                     <div className="flex items-center justify-center gap-4 sm:border-r sm:border-gray-600 sm:px-8">
                        <span className="text-xl sm:text-6xl font-bold text-white">10</span>
                        <div className="text-white">
                           <p className="text-md sm:text-lg font-semibold">Minutes</p>
                           <p className="text-sm text-gray-300">Complete your application</p>
                        </div>
                     </div>

                     <div className="flex items-center justify-end gap-4 sm:pl-8">
                        <span className="text-xl sm:text-6xl font-bold text-white">1</span>
                        <div className="text-white">
                           <p className="text-md sm:text-lg font-semibold">Day</p>
                           <p className="text-sm text-gray-300">Receive application results<sup>1</sup></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="flex items-center justify-center bg-orange-50 py-12 sm:py-24">
            <div className="container px-4 sm:px-6 lg:px-8">
               <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-16">
                  Why Sell on Temu?
               </h2>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-14">
                  {whySellFeatures.map((feature, index) => (
                     <div key={index} className="relative bg-white rounded-md sm:rounded-2xl p-6 sm:p-8 pl-8 sm:pl-10 transition-shadow border">
                        <div className="hidden absolute left-0 top-10 sm:top-16 -translate-x-1/2 w-12 h-12 sm:w-12 sm:h-12 bg-orange-500 rounded-xl sm:flex items-center justify-center shadow-lg">
                           <feature.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                           <h3 className="text-md sm:text-2xl font-bold mb-2">
                              {feature.highlightFirst ? (
                                 <>
                                    <span className="text-orange-500">{feature.titleHighlight}</span>{" "}
                                    <span className="text-gray-900">{feature.titleNormal}</span>
                                 </>
                              ) : (
                                 <>
                                    <span className="text-gray-900">{feature.titleNormal}</span>{" "}
                                    <span className="text-orange-500">{feature.titleHighlight}</span>
                                 </>
                              )}
                           </h3>
                           <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                              {feature.description}
                              {feature.footnote && <sup>{feature.footnote}</sup>}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         <section className="flex items-center justify-center bg-gray-100 py-8 sm:py-24">
            <div className="container px-4 sm:px-6 lg:px-8">
               <h2 className="text-lg sm:text-3xl font-bold text-center text-gray-900 mb-5 sm:mb-14">
                  frequently asked questions
               </h2>

               <div className="w-full space-y-2 sm:space-y-4">
                  {faqItems.map((item, index) => (
                     <div
                        key={index}
                        className="bg-white rounded-sm shadow-sm overflow-hidden"
                     >
                        <button
                           onClick={() => toggleFaq(index)}
                           className="w-full flex items-center justify-between p-3 sm:p-6 text-left hover:bg-gray-50 transition-colors"
                        >
                           <span className="text-base text-sm sm:text-lg font-semibold text-gray-900 pr-4">
                              {index + 1}. {item.question}
                           </span>
                           {openFaqIndex === index ? (
                              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                           ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                           )}
                        </button>

                        {openFaqIndex === index && (
                           <>
                              <div className="border-t border-gray-100" />
                              <div className="p-5 sm:p-6 text-sm sm:text-base text-gray-600 leading-relaxed">
                                 {item.answer}
                              </div>
                           </>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </section>

         <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center">
            <div className="container">
               <div className="absolute inset-0 z-0">
                  <Image
                     src="/images/shop-bg2.webp"
                     alt="Ready to start selling"
                     fill
                     className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
               </div>

               <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
                  <h2 className="text-xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                     Ready to start selling?
                  </h2>
                  <p className="text-lg sm:text-xl text-white mb-8 sm:mb-10">
                     Start your Temu selling journey <span className="text-orange-500 font-semibold">now</span>.
                  </p>
                  <Link href="#signup">
                     <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-22 sm:px-16 py-6 sm:py-7 rounded-lg text-sm sm:text-md transition-colors">
                        Sign up
                     </Button>
                  </Link>
               </div>

               <div className="absolute bottom-6 sm:bottom-10 left-4 right-4 sm:left-8 sm:right-8 z-10">
                  <div className="max-w-7xl mx-auto text-xs sm:text-sm text-gray-300 text-left space-y-1">
                     <p><sup>1</sup> Normally, applications are reviewed within one business day.</p>
                     <p><sup>2</sup> According to Temu's internal data, 50% of merchants achieve their first sale within 20 days of listing their products.</p>
                  </div>
               </div>
            </div>
         </section>

         {/* Hero Sign Up Verification Modal */}
         <Dialog open={isHeroVerificationOpen} onOpenChange={setIsHeroVerificationOpen}>
            <DialogContent className="w-full h-[90vh] sm:h-auto sm:max-h-[90vh] max-w-full sm:max-w-md rounded-t-xl sm:rounded-lg p-0 gap-0 overflow-hidden overflow-y-auto fixed bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
               <VisuallyHidden>
                  <DialogTitle>Verify your email</DialogTitle>
               </VisuallyHidden>
               <div className="relative py-4 sm:py-0">
                  <div className="p-6 sm:p-8">
                     <button
                        type="button"
                        onClick={() => setIsHeroVerificationOpen(false)}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-4"
                     >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back</span>
                     </button>

                     <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h2>
                     <p className="text-gray-600 text-sm mb-6">
                        Enter the 6-digit code sent to{" "}
                        <span className="text-orange-500 font-medium">{email}</span>
                     </p>

                     <form onSubmit={handleHeroVerificationSubmit} className="space-y-5">
                        <div className="flex justify-center gap-2">
                           {heroOtpDigits.map((digit, index) => (
                              <input
                                 key={index}
                                 id={`hero-otp-${index}`}
                                 type="text"
                                 inputMode="numeric"
                                 maxLength={1}
                                 value={digit}
                                 onChange={(e) => handleHeroOtpChange(index, e.target.value)}
                                 onKeyDown={(e) => handleHeroOtpKeyDown(index, e)}
                                 className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                              />
                           ))}
                        </div>

                        <div className="text-center">
                           <button
                              type="button"
                              onClick={handleHeroResendCode}
                              disabled={!heroCanResend || resendLoading}
                              className={cn(
                                 "text-sm",
                                 heroCanResend && !resendLoading ? "text-orange-500 hover:underline cursor-pointer" : "text-gray-400"
                              )}
                           >
                              {resendLoading ? "Sending..." : heroCanResend ? "Resend code" : `${heroResendCountdown}s Resend code`}
                           </button>
                        </div>

                        <Button
                           type="submit"
                           disabled={heroOtpDigits.some((d) => !d) || verifyLoading}
                           className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-lg text-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {verifyLoading ? (
                              <>
                                 <Loader className="h-5 w-5 animate-spin mr-2" />
                                 Verifying...
                              </>
                           ) : (
                              "Verify & Continue"
                           )}
                        </Button>
                     </form>
                  </div>
               </div>
            </DialogContent>
         </Dialog>

         {/* Auth Modals for Sign In */}
         <AuthModals activeModal={activeModal} onModalChange={setActiveModal} />
      </div>
   )
}