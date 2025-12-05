"use client"

import Link from "next/link"
import { useState } from "react"
import {
   Zap,
   Gift,
   Crown,
   Users,
   Store,
   Globe,
   Check,
   Shield,
   Sparkles,
   TrendingUp,
   ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// VIP Level data
const vipLevels = [
   {
      id: "vip1",
      name: "VIP 1",
      color: "bg-white border-b",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      textColor: "text-gray-900",
      iconColor: "text-gray-700",
      headerTextColor: "text-gray-900",
      headerSubTextColor: "text-gray-500",
      headerIconBg: "bg-gray-100",
      isLightHeader: true,
      deposit: "15,000 USDT",
      reward: "1,500 USDT",
      profitPoint: "25%",
      dailyTraffic: "3,000-5,000",
      features: [
         "VIP store function can be opened",
         "Fixed national international stations can be opened",
         "Basic priority listing",
         "Standard customer support",
      ],
   },
   {
      id: "vip2",
      name: "VIP 2",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      iconColor: "text-purple-500",
      deposit: "30,000 USDT",
      reward: "3,000 USDT",
      profitPoint: "30%",
      dailyTraffic: "5,000-8,000",
      features: [
         "VIP business post function activated",
         "National international service station can be opened",
         "Enhanced product visibility",
         "Priority customer support",
      ],
      popular: true,
   },
   {
      id: "vip3",
      name: "VIP 3",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
      iconColor: "text-orange-500",
      deposit: "45,000 USDT",
      reward: "4,500 USDT",
      profitPoint: "35%",
      dailyTraffic: "8,000-11,000",
      features: [
         "Full VIP store function access",
         "National international service station can be opened",
         "Maximum product exposure",
         "Dedicated account manager",
         "Exclusive promotional events",
      ],
   },
]

// FAQ data
const faqs = [
   {
      id: "offer",
      question: "ABOUT THE OFFER",
      answer:
         "VIP membership grants access to a range of exclusive benefits, including increased profit margins and enhanced traffic exposure. Higher VIP levels unlock even greater advantages, helping merchants achieve better visibility and improved sales performance compared to non-VIP members.",
   },
   {
      id: "sales",
      question: "ABOUT SALES",
      answer:
         "As a VIP member, you gain access to priority product placement, increased daily traffic allowances, and higher profit percentages. VIP3 members can achieve up to 35% profit points with daily traffic reaching 8,000-11,000 potential customers.",
   },
   {
      id: "delivery",
      question: "ABOUT DELIVERY",
      answer:
         "VIP members enjoy expedited shipping options and priority order processing. Your products will be featured in faster delivery categories, improving customer satisfaction and increasing repeat purchases.",
   },
   {
      id: "product",
      question: "ABOUT THE PRODUCT",
      answer:
         "VIP membership allows you to list more products, access premium product categories, and receive enhanced product visibility in search results. Higher VIP tiers unlock exclusive category access and promotional opportunities.",
   },
   {
      id: "upgrade",
      question: "HOW TO UPGRADE TO A VIP LEVEL",
      answer:
         "To upgrade your VIP level, navigate to the Apply VIP section and select your desired tier. Meet the cumulative deposit requirement for your chosen level, and your account will be upgraded automatically. Benefits are activated immediately upon successful upgrade.",
   },
]

// VIP Card Component
function VIPCard({ level }: { level: (typeof vipLevels)[0] }) {
   const isLight = level.isLightHeader

   return (
      <div
         className={`cursor-pointer relative bg-white rounded-lg border ${level.borderColor} overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
      >
         <div className={`${isLight ? level.color : `bg-gradient-to-r ${level.color}`} p-6`}>
            <div className="flex items-center gap-3 mb-2">
               <div className={`w-10 h-10 ${isLight ? level.headerIconBg : "bg-white/20"} rounded-full flex items-center justify-center`}>
                  <Crown className={`h-5 w-5 ${isLight ? level.iconColor : "text-white"}`} />
               </div>
               <div>
                  <h3 className={`text-lg font-bold ${isLight ? level.headerTextColor : "text-white"}`}>{level.name}</h3>
                  <p className={`text-sm ${isLight ? level.headerSubTextColor : "text-white/80"}`}>Exclusive Membership</p>
               </div>
            </div>
         </div>

         <div className={`${level.bgColor} p-4 grid grid-cols-2 gap-3`}>
            <div className="text-center">
               <p className="text-xs text-gray-500 mb-1">Deposit Required</p>
               <p className={`font-bold ${level.textColor}`}>{level.deposit}</p>
            </div>
            <div className="text-center">
               <p className="text-xs text-gray-500 mb-1">Reward</p>
               <p className={`font-bold ${level.textColor}`}>{level.reward}</p>
            </div>
            <div className="text-center">
               <p className="text-xs text-gray-500 mb-1">Profit Point</p>
               <p className={`font-bold ${level.textColor}`}>{level.profitPoint}</p>
            </div>
            <div className="text-center">
               <p className="text-xs text-gray-500 mb-1">Daily Traffic</p>
               <p className={`font-bold ${level.textColor}`}>{level.dailyTraffic}</p>
            </div>
         </div>

         <div className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
               <Sparkles className={`h-4 w-4 ${level.iconColor}`} />
               Benefits Include
            </h4>
            <ul className="space-y-3">
               {level.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                     <div className={`flex-shrink-0 w-5 h-5 rounded-full ${level.bgColor} flex items-center justify-center mt-0.5`}>
                        <Check className={`h-3 w-3 ${level.iconColor}`} />
                     </div>
                     <span className="text-sm text-gray-600">{feature}</span>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}

// FAQ Item Component
function FAQItem({
   faq,
   isOpen,
   onToggle,
}: {
   faq: (typeof faqs)[0]
   isOpen: boolean
   onToggle: () => void
}) {
   return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
         <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-2 sm:p-3 text-left hover:bg-gray-50 transition-colors"
         >
            <span className="font-semibold text-gray-900 text-sm sm:text-sm">{faq.question}</span>
            <ChevronDown
               className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                  }`}
            />
         </button>
         {isOpen && (
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-100">
               <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-4">
                  {faq.answer}
               </p>
            </div>
         )}
      </div>
   )
}

export default function VIPAccessPage() {
   const [openFaq, setOpenFaq] = useState<string | null>("offer")

   const handleFaqToggle = (id: string) => {
      setOpenFaq(openFaq === id ? null : id)
   }

   return (
      <div className="flex flex-col h-full">
         <div className="flex-1 p-4 sm:p-6">
            <div className="mx-auto max-w-6xl">
               <div className="text-center mb-8 sm:mb-12">
                  <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                     <Crown className="h-4 w-4" />
                     Exclusive Membership Program
                  </div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                     Unlock Your Store's Full Potential
                  </h1>
                  <p className="text-gray-600 text-xs sm:text-sm max-w-2xl mx-auto">
                     Join our VIP program and gain access to increased profit margins, enhanced traffic exposure,
                     and exclusive features that help your business grow.
                  </p>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 sm:mb-12">
                  <div className="bg-white rounded-md p-4 border border-gray-200 text-center">
                     <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                     </div>
                     <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">35%</p>
                     <p className="text-xs text-gray-500">Max Profit Point</p>
                  </div>
                  <div className="bg-white rounded-md p-4 border border-gray-200 text-center">
                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="h-4 w-4 text-blue-600" />
                     </div>
                     <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">11K+</p>
                     <p className="text-xs text-gray-500">Daily Traffic</p>
                  </div>
                  <div className="bg-white rounded-md p-4 border border-gray-200 text-center">
                     <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Gift className="h-4 w-4 text-purple-600" />
                     </div>
                     <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">$4.5K</p>
                     <p className="text-xs text-gray-500">Max Reward</p>
                  </div>
                  <div className="bg-white rounded-md p-4 border border-gray-200 text-center">
                     <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Globe className="h-4 w-4 text-orange-600" />
                     </div>
                     <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Global</p>
                     <p className="text-xs text-gray-500">Market Access</p>
                  </div>
               </div>

               <div className="mb-8 sm:mb-12">
                  <div className="text-center mb-8">
                     <h2 className="text-md sm:text-lg font-bold text-gray-900 mb-2">VIP Levels</h2>
                     <p className="text-gray-600 text-sm">Choose the plan that best fits your business needs</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                     {vipLevels.map((level) => (
                        <VIPCard key={level.id} level={level} />
                     ))}
                  </div>
               </div>

               <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-md p-4 sm:p-10 mb-8 sm:mb-12 text-white">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                     <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                           <Zap className="h-6 w-6" />
                           <h3 className="text-md sm:text-lg font-bold">Ready to Upgrade?</h3>
                        </div>
                        <p className="text-white/90 text-sm sm:text-sm max-w-lg">
                           Start your VIP journey today and unlock exclusive benefits. Select products to apply
                           for VIP status and watch your business grow.
                        </p>
                     </div>
                     <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/shop-dashboard/apply-vip">
                           <Button
                              size="lg"
                              className="bg-white border border-wite text-orange-600 hover:bg-orange-50 font-semibold px-8 py-4 rounded-md"
                           >
                              <Crown className="h-5 w-5" />
                              Apply for VIP
                           </Button>
                        </Link>
                        <Link href="/shop-dashboard/product/apply-new">
                           <Button
                              size="lg"
                              variant="outline"
                              className="border border-white text-white hover:bg-white/10 hover:text-white font-semibold px-8 py-4 rounded-md bg-transparent"
                           >
                              <Store className="h-5 w-5" />
                              Apply Products
                           </Button>
                        </Link>
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-sm border border-gray-200 p-6 sm:p-10">
                  <div className="text-center mb-8">
                     <h2 className="text-md sm:text-lg font-bold text-gray-900 mb-2">
                        Frequently Asked Questions
                     </h2>
                     <p className="text-gray-600 text-sm">
                        Find answers to common questions about our VIP program
                     </p>
                  </div>

                  <div className="mx-auto space-y-3">
                     {faqs.map((faq) => (
                        <FAQItem
                           key={faq.id}
                           faq={faq}
                           isOpen={openFaq === faq.id}
                           onToggle={() => handleFaqToggle(faq.id)}
                        />
                     ))}
                  </div>

                  {/* Additional Help */}
                  <div className="mt-8 text-center">
                     <p className="text-gray-500 text-sm mb-3">Still have questions?</p>
                     <Link href="/shop-dashboard/support">
                        <Button variant="outline" className="rounded-md px-6">
                           <Shield className="h-4 w-4" />
                           Contact Support
                        </Button>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
