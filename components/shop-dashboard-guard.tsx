"use client"

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

      // If shop status is PENDING or APPROVED, redirect to application page
      if (shop && (shop.status === "PENDING" || shop.status === "APPROVED")) {
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

   // If shop status is PENDING or APPROVED, show loading (will redirect)
   if (shop && (shop.status === "PENDING" || shop.status === "APPROVED")) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <Loader className="h-8 w-8 animate-spin text-orange-500" />
         </div>
      )
   }

   return <>{children}</>
}
