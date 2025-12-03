"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { TrendingUp, Zap, DollarSign, Headphones, Eye, EyeOff, CreditCard, MessageCircle, Wallet, ChevronUp, ChevronDown } from "lucide-react"

// Components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ShopLandingPage() {
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

   // Form state
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")

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

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // Handle form submission
      console.log({ email, password, confirmPassword })
   }

   return (
      <div className="min-h-screen">
         <section className="relative min-h-[90vh] flex items-start">
            <div className="absolute inset-0 z-0">
               <Image
                  src="/images/shop-hero-bg.webp"
                  alt="Start selling on Temu"
                  fill
                  className="object-cover"
                  priority
               />
               <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start justify-start">
                  <div className="text-white">
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
                     <div className="bg-white rounded-md p-8 w-full max-w-md shadow-2xl">
                        <div className="text-center mb-6">
                           <h2 className="text-2xl font-bold text-gray-900 mb-3">Sign up</h2>
                           <span className="inline-block bg-orange-500 text-white text-sm font-medium px-4 py-1 rounded-sm">
                              0% Commission Fees
                           </span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                           <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                 Email or phone number
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
                                 Password
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
                           </div>

                           <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                 Confirm password
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
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-md text-md transition-colors"
                           >
                              Continue
                           </Button>

                           <p className="text-center text-sm text-gray-600">
                              By continuing, you agree to our{" "}
                              <Link href="/seller-privacy-policy" className="text-blue-500 underline ">
                                 Seller Privacy Policy
                              </Link>
                              .
                           </p>

                           <p className="text-center text-sm text-gray-700 font-bold">
                              Already have a Temu seller account?{" "}
                              <Link href="/shop-login" className="text-orange-500 font-medium hover:underline">
                                 Sign in
                              </Link>
                           </p>
                        </form>
                     </div>
                  </div>
               </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0">
                     <div className="flex items-center justify-center sm:justify-start gap-4 sm:border-r sm:border-gray-600 sm:pr-8">
                        <span className="text-5xl sm:text-6xl font-bold text-white">1</span>
                        <div className="text-white">
                           <p className="text-lg font-semibold">Minute</p>
                           <p className="text-sm text-gray-300">Create your account</p>
                        </div>
                     </div>

                     <div className="flex items-center justify-center gap-4 sm:border-r sm:border-gray-600 sm:px-8">
                        <span className="text-5xl sm:text-6xl font-bold text-white">10</span>
                        <div className="text-white">
                           <p className="text-lg font-semibold">Minutes</p>
                           <p className="text-sm text-gray-300">Complete your application</p>
                        </div>
                     </div>

                     <div className="flex items-center justify-center sm:justify-end gap-4 sm:pl-8">
                        <span className="text-5xl sm:text-6xl font-bold text-white">1</span>
                        <div className="text-white">
                           <p className="text-lg font-semibold">Day</p>
                           <p className="text-sm text-gray-300">Receive application results<sup>1</sup></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="flex items-center justify-center bg-orange-50 py-16 sm:py-24">
            <div className="container px-4 sm:px-6 lg:px-8">
               <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
                  Why Sell on Temu?
               </h2>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
                  {whySellFeatures.map((feature, index) => (
                     <div key={index} className="relative bg-white rounded-2xl p-6 sm:p-8 pl-8 sm:pl-10 transition-shadow border">
                        <div className="absolute left-0 top-6 sm:top-14 -translate-x-1/2 w-12 h-12 sm:w-12 sm:h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                           <feature.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                           <h3 className="text-xl sm:text-2xl font-bold mb-2">
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

         <section className="flex items-center justify-center bg-gray-100 py-16 sm:py-24">
            <div className="container px-4 sm:px-6 lg:px-8">
               <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10 sm:mb-14">
                  FAQ
               </h2>

               <div className="w-full space-y-4">
                  {faqItems.map((item, index) => (
                     <div
                        key={index}
                        className="bg-white rounded-sm shadow-sm overflow-hidden"
                     >
                        <button
                           onClick={() => toggleFaq(index)}
                           className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
                        >
                           <span className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
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
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
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

      </div>
   )
}