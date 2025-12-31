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
   Loader,
   AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useMutation, useLazyQuery } from "@apollo/client/react"
import { faqs, vipLevels } from "./constant"
import { Button } from "@/components/ui/button"
import { VIPCard, VIPCarousel, FAQItem } from "./components"
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MUTATION_SHOP_REQUEST_VIP } from "@/app/api/shop/vipRequest"
import { QUERY_GET_SHOP_PROFILE } from "@/app/api/shop/auth"
import { useShopStore } from "@/store/shop-store"
import { useToast } from "@/lib/toast"
import { ShopData } from "@/types/shop"

// Shop profile response type
interface ShopProfileResponse {
   getShopProfile: {
      success: boolean
      data: ShopData | null
      error?: {
         message: string
         code: string
         details: string
      }
   }
}

// VIP descriptions
const vipDescriptions = {
   "1": "Upgrade VIP1: The accumulated amount deposited in the store is 15,000 USDT, the reward is 1,500 USDT, the profit point is increased to 25%, the daily traffic can reach 3,000-5,000 people, the VIP store function can be opened!, and fixed national international stations can be opened",
   "2": "Upgrade the VIP2 store to deposit a cumulative amount of 30,000 USDT and receive a reward of 3,000 USDT. The profit point is increased to 30%. The daily traffic can reach 5,000-8,000 people. The VIP business post function can be activated, and the national international service station can be opened!",
   "3": "Upgrade the VIP3 store to deposit a cumulative amount of 45,000 USDT, and the reward is 4,500USD. The profit point is increased to 35%. The daily flow of people can reach 8,000-11,000 people. The VIP store function can be opened, and the national international service station can be opened!",
}

// Mutation response type
interface VIPRequestResponse {
   shopRequestVIP: {
      success: boolean
      error?: {
         message: string
         code: string
         details: string
      }
   }
}

export default function VIPAccessPage() {
   const { successMessage } = useToast()
   const setShop = useShopStore((state) => state.setShop)
   const [openFaq, setOpenFaq] = useState<string | null>("offer")
   const [isDialogOpen, setIsDialogOpen] = useState(false)
   const [selectedVIP, setSelectedVIP] = useState<"1" | "2" | "3">("1")
   const [isApplying, setIsApplying] = useState(false)
   const [errorMessage, setErrorMessage] = useState<string | null>(null)

   // VIP request mutation
   const [requestVIP] = useMutation<VIPRequestResponse>(MUTATION_SHOP_REQUEST_VIP)

   // Shop profile query (lazy)
   const [fetchShopProfile] = useLazyQuery<ShopProfileResponse>(QUERY_GET_SHOP_PROFILE, {
      fetchPolicy: "network-only",
   })

   const handleFaqToggle = (id: string) => {
      setOpenFaq(openFaq === id ? null : id)
   }

   const handleOpenDialog = () => {
      setIsDialogOpen(true)
      setSelectedVIP("1")
      setErrorMessage(null)
   }

   const handleCloseDialog = () => {
      setIsDialogOpen(false)
      setErrorMessage(null)
   }

   const handleApplyVIP = async () => {
      setIsApplying(true)
      setErrorMessage(null)

      try {
         const result = await requestVIP({
            variables: {
               data: {
                  request_vip: selectedVIP,
               },
            },
         })

         if (result.data?.shopRequestVIP?.success) {
            successMessage({ message: `Successfully applied for VIP${selectedVIP}! Your request is being processed.` })
            setIsDialogOpen(false)

            // Fetch latest shop profile and update store
            const profileResult = await fetchShopProfile()
            console.log("DDDDDDD:::", profileResult);
            if (profileResult.data?.getShopProfile?.success && profileResult.data.getShopProfile.data) {
               setShop(profileResult.data.getShopProfile.data)
            }
         } else {
            const error = result.data?.shopRequestVIP?.error
            setErrorMessage(error?.message || "Failed to apply for VIP. Please try again.")
         }
      } catch (error: any) {
         setErrorMessage(error?.message || "An error occurred while applying for VIP.")
      } finally {
         setIsApplying(false)
      }
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
                        <Button
                           size="lg"
                           onClick={handleOpenDialog}
                           className="bg-white border border-wite text-orange-600 hover:bg-orange-50 font-semibold px-8 py-4 rounded-md"
                        >
                           <Crown className="h-5 w-5" />
                           Apply for VIP
                        </Button>
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

         {/* VIP Application Dialog */}
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-xl">
               <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                     <Crown className="h-5 w-5 text-orange-500" />
                     Apply for VIP Level
                  </DialogTitle>
               </DialogHeader>

               <div className="py-6">
                  <RadioGroup
                     value={selectedVIP}
                     onValueChange={(value) => setSelectedVIP(value as "1" | "2" | "3")}
                     className="space-x-3 flex"
                  >
                     <div className="flex items-center space-x-3">
                        <RadioGroupItem value="1" id="vip1" />
                        <Label htmlFor="vip1" className="font-medium cursor-pointer">
                           VIP 1
                        </Label>
                     </div>
                     <div className="flex items-center space-x-3">
                        <RadioGroupItem value="2" id="vip2" />
                        <Label htmlFor="vip2" className="font-medium cursor-pointer">
                           VIP 2
                        </Label>
                     </div>
                     <div className="flex items-center space-x-3">
                        <RadioGroupItem value="3" id="vip3" />
                        <Label htmlFor="vip3" className="font-medium cursor-pointer">
                           VIP 3
                        </Label>
                     </div>
                  </RadioGroup>

                  <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
                     <p className="text-sm text-gray-700 leading-relaxed">
                        {vipDescriptions[selectedVIP]}
                     </p>
                  </div>

                  {errorMessage && (
                     <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200 flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{errorMessage}</p>
                     </div>
                  )}
               </div>

               <DialogFooter className="gap-3 sm:gap-3">
                  <Button
                     variant="outline"
                     onClick={handleCloseDialog}
                     disabled={isApplying}
                  >
                     Close
                  </Button>
                  <Button
                     onClick={handleApplyVIP}
                     disabled={isApplying}
                     className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                     {isApplying ? (
                        <>
                           <Loader className="h-4 w-4 animate-spin" />
                           Applying...
                        </>
                     ) : (
                        "Apply Now"
                     )}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   )
}
