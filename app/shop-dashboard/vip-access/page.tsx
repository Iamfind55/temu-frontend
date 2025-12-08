"use client"

import {
   Zap,
   Gift,
   Crown,
   Users,
   Store,
   Globe,
   Shield,
   TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { faqs, vipLevels } from "./constant"
import { Button } from "@/components/ui/button"
import { VIPCard, VIPCarousel, FAQItem } from "./components"

export default function VIPAccessPage() {
   const [openFaq, setOpenFaq] = useState<string | null>("offer")

   const handleFaqToggle = (id: string) => {
      setOpenFaq(openFaq === id ? null : id)
   }

   return (
      <div className="flex flex-col h-full">
         <div className="flex-1 p-2 sm:p-6">
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

                  <div className="hidden md:grid md:grid-cols-3 gap-3">
                     {vipLevels.map((level) => (
                        <VIPCard key={level.id} level={level} />
                     ))}
                  </div>

                  <div className="md:hidden">
                     <VIPCarousel />
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

               <div className="bg-white rounded-sm sm:border sm:border-gray-200 p-2 sm:p-10">
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
