"use client"

import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"
import { useShopStore } from "@/store/shop-store"

interface ShopDashboardGuardProps {
   children: React.ReactNode
}

export function ShopDashboardGuard({ children }: ShopDashboardGuardProps) {
   const router = useRouter()
   const { shop } = useShopStore()
   const [isChecking, setIsChecking] = useState(true)

   useEffect(() => {
      // Small delay to ensure hydration is complete
      const timer = setTimeout(() => {
         setIsChecking(false)
      }, 100)

      return () => clearTimeout(timer)
   }, [])

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
