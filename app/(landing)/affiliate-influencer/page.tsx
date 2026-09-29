"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   type CarouselApi,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight, CheckCircle, Coins } from "lucide-react"
import { cn } from "@/lib/utils"

// Influencer program features
const influencerFeatures = [
   { icon: "clock", label: "Social Media Influencer" },
   { icon: "users", label: "Creator Ambassador" },
   { icon: "lightbulb", label: "Content Creator" },
   { icon: "user", label: "Blogger & Product Reviewer" },
   { icon: "building", label: "Talent Agency & Media Company" },
]

// Affiliate program features
const affiliateFeatures = [
   { icon: "tag", label: "Coupon, Deal and Price Comparison" },
   { icon: "wallet", label: "Cashback and Loyalty" },
   { icon: "creditcard", label: "Payment Platforms" },
   { icon: "shopping", label: "Shopping Guide and Review Platforms" },
   { icon: "trending", label: "Platforms Leveraging Temu Offer for Growth" },
]

// Stats data
const statsData = [
   { label: "Global Reach", value: "80+", description: "Live in 80+ Markets" },
   { label: "Top Choice for", value: "56M+", description: "affiliates & Influencer" },
   { label: "Product Catalog", value: "100M+", description: "Items Available" },
]

// Testimonials data
const testimonials = [
   {
      name: "katharina__walter",
      followers: "25K follows",
      platform: "instagram",
      commission: "Earn 1000+USD commission",
      avatar: "/images/influencer-profile-01.webp",
      quote: `My name is Katharina, I'm 39 years old and I'm so happy to be part of the temu team.
Temu is a good platform for making money. My efforts have been rewarded. My content has been seen by more people and can be rewarded. I hope that this platform can be known by more people. Welcome more people to join Temu influencer program. My redemption codes are used frequently and are very popular in the community!
On this website, you can find everything you need, from fashion to home! We shop a lot ourselves and I'm happy to share with you!`,
   },
   {
      name: "balkan_hauls",
      followers: "6.6K follows",
      platform: "tiktok",
      commission: "Earn 1000+USD commission",
      avatar: "/images/influencer-profile-02.webp",
      quote: `I am incredibly grateful for the success I've experienced in affiliate marketing. Starting from scratch, I've been able to build an impressive following and generate millions of views on my videos. I owe a huge thanks to Temu and their amazing team for their continuous support throughout this journey. The Temu website itself has been an absolute game-changer, making it easy and seamless to promote their products. This incredible opportunity has truly exceeded my expectations, and I'm excited to continue growing, reaching more viewers, driving sales, and enjoying the process every step of the way.`,
   },
   {
      name: "itx_kizz",
      followers: "357.6K follows",
      platform: "tiktok",
      commission: "Earn 1000+USD commission",
      avatar: "/images/influencer-profile-03.webp",
      quote: `I'm genuinely proud to be part of the TEMU Influencer and Affiliate Program.

Through my social accounts, I have already earned over $10,000, and this is just the beginning.
One of the best things about working with TEMU is their amazing marketing team—they always support me, guide me, and help resolve any influencer page issues I face.
Their cooperation has made my journey smooth and professional.`,
   },
   {
      name: "mohomx",
      followers: "383.5K follows",
      platform: "tiktok",
      commission: "Earn 1000+USD commission",
      avatar: "/images/influencer-profile-04.webp",
      quote: `I'm Mohammed Al-Humaiqani, a social media content creator with over 500,000 followers. One day, I decided to join Timo's influencer program because I could earn money from my phone while at home.
I advise all content creators to join Temu's influencer program to earn commissions, rewards, and generous profits. I consider Temu's influencer program one of the best free profit-making programs.
- During my participation in Temu's influencer program, I earned profits of 81,400 Saudi riyals.`,
   },
   {
      name: "George Tavadze",
      followers: "41K follows",
      platform: "youtube",
      commission: "Earn 1000+USD commission",
      avatar: "/images/influencer-profile-05.webp",
      quote: `I joined the TEMU influencer program since 2024 from Georgia. I really appreciate this program because I earned over $13,000.
In addition, the TEMU influencer program helped me boost my video views and increase my number of followers very quickly.
I highly recommend this program to anyone who wants to grow on social media and make extra income at the same time. TEMU made it possible for me to reach a wider audience and improve my content engagement.
Thank you, TEMU, for this amazing opportunity!`,
   },
]

// Platform icon component
function PlatformIcon({ platform, className }: { platform: string; className?: string }) {
   const iconMap: Record<string, { bg: string; icon: string }> = {
      instagram: { bg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400", icon: "IG" },
      tiktok: { bg: "bg-black", icon: "TT" },
      youtube: { bg: "bg-red-600", icon: "YT" },
   }

   const config = iconMap[platform] || iconMap.instagram

   return (
      <div className={cn("absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-[8px] font-bold", config.bg, className)}>
         {config.icon}
      </div>
   )
}

// Feature icon component
function FeatureIcon({ type }: { type: string }) {
   const iconClass = "w-5 h-5 text-gray-500"

   switch (type) {
      case "clock":
         return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <circle cx="12" cy="12" r="10" strokeWidth="2" />
               <path strokeWidth="2" strokeLinecap="round" d="M12 6v6l4 2" />
            </svg>
         )
      case "users":
         return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
         )
      case "lightbulb":
         return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
         )
      case "user":
         return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
         )
      case "building":
         return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
         )
      case "tag":
         return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
         )
      case "wallet":
         return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
         )
      case "creditcard":
         return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
         )
      case "shopping":
         return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
         )
      case "trending":
         return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
         )
      default:
         return null
   }
}

export default function AffiliateInfluencerPage() {
   const [api, setApi] = useState<CarouselApi>()
   const [current, setCurrent] = useState(0)

   useEffect(() => {
      if (!api) return

      setCurrent(api.selectedScrollSnap())

      api.on("select", () => {
         setCurrent(api.selectedScrollSnap())
      })
   }, [api])

   const scrollPrev = useCallback(() => {
      api?.scrollPrev()
   }, [api])

   const scrollNext = useCallback(() => {
      api?.scrollNext()
   }, [api])

   const scrollTo = useCallback((index: number) => {
      api?.scrollTo(index)
   }, [api])

   return (
      <div className="min-h-screen bg-white">
         {/* Hero Section */}
         <section className="bg-gradient-to-b from-orange-50 to-white pt-12 pb-2 sm:pb-10 px-4">
            <div className="max-w-6xl mx-auto text-center">
               <p className="text-orange-500 font-semibold italic text-lg mb-2">
                  TEMU Affiliate & Influencer Program
               </p>
               <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">
                  Boost Your Earnings with TEMU
               </h1>

               {/* Badge pills */}
               <div className="hidden sm:inline-flex items-center bg-green-600 text-bold text-white rounded-full px-4 py-2 gap-3 text-sm">
                  <span className="flex items-center gap-1.5">
                     <CheckCircle className="w-4 h-4 text-white" />
                     Data Security
                  </span>
                  <span className="text-white">|</span>
                  <span className="flex items-center gap-1.5">
                     <Coins className="w-4 h-4 white" />
                     Maximize your earnings
                     <ChevronRight className="w-4 h-4" />
                  </span>
               </div>
            </div>
         </section>

         {/* Program Cards Section */}
         <section className="px-4 py-6 -mt-8">
            <div className="max-w-6xl mx-auto">
               <div className="grid md:grid-cols-2 gap-6">
                  {/* Influencer Program Card */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
                     <h3 className="text-xl md:text-2xl font-bold text-green-600 mb-3">
                        Temu Influencer Program
                     </h3>
                     <p className="text-gray-600 text-sm md:text-base mb-6">
                        Get free products and create captivating Temu content across social media &
                        content platforms. Turn your creativity and influence into opportunities to earn.
                     </p>

                     <div className="border-t border-gray-100 pt-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                           <div className="space-y-3">
                              {influencerFeatures.map((feature) => (
                                 <div key={feature.label} className="flex items-center gap-3 text-gray-700 text-sm">
                                    <FeatureIcon type={feature.icon} />
                                    <span>{feature.label}</span>
                                 </div>
                              ))}

                              <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 h-auto text-base font-semibold">
                                 Join to Earn
                              </Button>
                           </div>

                           {/* Influencer Image */}
                           <div className="hidden md:block relative w-48 h-48 flex-shrink-0">
                              <img src="/images/influencer-01.webp" alt="influencer-01.webp" />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Affiliate Program Card */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
                     <h3 className="text-xl md:text-2xl font-bold text-orange-500 mb-3">
                        Temu Affiliate Program
                     </h3>
                     <p className="text-gray-600 text-sm md:text-base mb-6">
                        Welcome platforms with traffic or reach—whether established affiliate
                        publishers or exploring partnerships. Let&apos;s grow together!
                     </p>

                     <div className="border-t border-gray-100 pt-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                           <div className="space-y-3">
                              {affiliateFeatures.map((feature) => (
                                 <div key={feature.label} className="flex items-center gap-3 text-gray-700 text-sm">
                                    <FeatureIcon type={feature.icon} />
                                    <span>{feature.label}</span>
                                 </div>
                              ))}

                              <Button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-3 h-auto text-base font-semibold">
                                 Join to Earn
                              </Button>
                           </div>

                           {/* Affiliate Image */}
                           <div className="hidden md:block relative w-48 h-48 flex-shrink-0">
                              <img src="/images/influencer-02.webp" alt="influencer-02.webp" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Stats Section */}
         <section className="px-4 py-16 bg-white">
            <div className="max-w-4xl mx-auto">
               <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
                  Our Scale and Reach
               </h2>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {statsData.map((stat) => (
                     <div key={stat.label}>
                        <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
                        <p className="text-4xl md:text-5xl font-bold text-green-600 mb-2">{stat.value}</p>
                        <p className="text-gray-600 text-sm">{stat.description}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Testimonials Section */}
         <section className="px-4 py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto">
               <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
                  What they say
               </h2>

               <div className="relative">
                  {/* Carousel */}
                  <Carousel
                     setApi={setApi}
                     opts={{
                        align: "center",
                        loop: true,
                     }}
                     className="w-full"
                  >
                     <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                           <CarouselItem key={index} className="md:basis-full lg:basis-4/5">
                              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mx-2">
                                 <div className="flex items-center gap-4 mb-4">
                                    <div className="relative">
                                       <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
                                          <img src={testimonial.avatar} alt={testimonial.name} />
                                       </div>
                                       {/* <PlatformIcon platform={testimonial.platform} /> */}
                                    </div>
                                    <div>
                                       <div className="flex items-center gap-2">
                                          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                          <span className="text-gray-400">|</span>
                                          <span className="text-gray-500 text-sm">{testimonial.followers}</span>
                                       </div>
                                       <p className="text-orange-500 text-sm font-medium">{testimonial.commission}</p>
                                    </div>
                                 </div>

                                 <div className="relative">
                                    <span className="absolute -top-2 -left-2 text-4xl text-orange-200 font-serif">&ldquo;</span>
                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed pl-4 whitespace-pre-line">
                                       {testimonial.quote}
                                    </p>
                                    <span className="absolute -bottom-4 right-0 text-4xl text-orange-200 font-serif">&rdquo;</span>
                                 </div>
                              </div>
                           </CarouselItem>
                        ))}
                     </CarouselContent>
                  </Carousel>

                  <button
                     onClick={scrollPrev}
                     className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                     aria-label="Previous testimonial"
                  >
                     <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                     onClick={scrollNext}
                     className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                     aria-label="Next testimonial"
                  >
                     <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>

                  <div className="flex justify-center gap-2 mt-8">
                     {testimonials.map((_, index) => (
                        <button
                           key={index}
                           onClick={() => scrollTo(index)}
                           className={cn(
                              "w-3 h-3 rounded-full transition-colors",
                              index === current ? "bg-orange-500" : "bg-orange-200 hover:bg-orange-300"
                           )}
                           aria-label={`Go to testimonial ${index + 1}`}
                        />
                     ))}
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}
