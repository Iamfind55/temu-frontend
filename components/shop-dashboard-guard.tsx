"use client"

import Cookies from "js-cookie"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useLazyQuery } from "@apollo/client/react"
import { Loader } from "lucide-react"
import { useShopStore } from "@/store/shop-store"
import { QUERY_GET_SHOP_PROFILE } from "@/app/api/shop/auth"
import { ShopData } from "@/types/shop"

// Shop profile response type
interface ShopProfileResponse {
   getShopInformation: {
      success: boolean
      data: ShopData | null
      error?: {
         message: string
         code: string
         details: string
      }
   }
}

interface ShopDashboardGuardProps {
   children: React.ReactNode
}

export function ShopDashboardGuard({ children }: ShopDashboardGuardProps) {
   const router = useRouter()
   const { shop, setShop } = useShopStore()
   const [isChecking, setIsChecking] = useState(true)
   const hasFetchedRef = useRef(false)

   // Lazy query to fetch fresh shop profile
   const [fetchShopProfile] = useLazyQuery<ShopProfileResponse>(QUERY_GET_SHOP_PROFILE, {
      fetchPolicy: "network-only",
   })

   useEffect(() => {
      // Small delay to ensure hydration is complete
      const timer = setTimeout(() => {
         setIsChecking(false)
      }, 100)

      return () => clearTimeout(timer)
   }, [])

   // Fetch fresh shop profile when dashboard loads
   useEffect(() => {
      const token = Cookies.get("shop_auth_token")

      // Only fetch if we have a token and haven't fetched yet
      if (!isChecking && token && !hasFetchedRef.current) {
         hasFetchedRef.current = true

         fetchShopProfile().then((result) => {
            if (result.data?.getShopInformation?.success && result.data.getShopInformation.data) {
               // Update store with fresh data
               setShop(result.data.getShopInformation.data)
            }
         }).catch((error) => {
            console.error("Failed to fetch shop profile:", error)
         })
      }
   }, [isChecking, fetchShopProfile, setShop])

   useEffect(() => {
      if (isChecking) return

      const token = Cookies.get("shop_auth_token")

      // If no shop data or no token, redirect to application page
      if (!shop || !token) {
         router.replace("/shop-landing/application")
         return
      }

      // If shop status is PENDING or APPROVED, redirect to application page
      if (shop.status === "PENDING" || shop.status === "APPROVED") {
         router.replace("/shop-landing/application")
      }
   }, [shop, isChecking, router])

   // Show loading while checking
   if (isChecking) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <Loader className="h-8 w-8 animate-spin text-orange-500" />
         </div>
      )
   }

   const token = Cookies.get("shop_auth_token")

   // If no shop data, no token, or status is PENDING/APPROVED, show loading (will redirect)
   if (!shop || !token || shop.status === "PENDING" || shop.status === "APPROVED") {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <Loader className="h-8 w-8 animate-spin text-orange-500" />
         </div>
      )
   }

   return <>{children}</>
}
