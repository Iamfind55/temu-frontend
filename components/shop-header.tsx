"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { User } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useShopStore } from "@/store/shop-store"
import { LanguageSelector } from "./language-selector"
import { AuthModals, AuthModalType } from "./auth-modals"

export function ShopHeader({ className }: { className?: string }) {
   const [activeModal, setActiveModal] = useState<AuthModalType>(null)
   const [mounted, setMounted] = useState(false)
   const { shop, isAuthenticated } = useShopStore()

   // Prevent hydration mismatch
   useEffect(() => {
      setMounted(true)
   }, [])

   return (
      <>
         <header className="sticky top-0 z-50 w-full">
            <div className={cn("bg-black text-white", className)}>
               <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-1 sm:py-3">
                  <Link href="/" className="flex items-center gap-2">
                     <span className="bg-orange-500 text-white font-semibold text-xl px-2 py-3 rounded-xl tracking-wider">
                        TAMU
                     </span>
                  </Link>

                  <div className="flex items-center justify-start gap-4">
                     <LanguageSelector />
                     {mounted && isAuthenticated && shop?.status === "ACTIVE" ? (
                        <Link href="/shop-dashboard">
                           <Button
                              variant="ghost"
                              className="bg-orange-500 flex cursor-pointer rounded-sm font-bold text-white hover:text-white hover:bg-orange-600"
                           >
                              <User className="h-4 w-4" />
                              {shop?.store_name || "My Account"}
                           </Button>
                        </Link>
                     ) : (
                        <>
                           <Button
                              variant="ghost"
                              className="bg-black hover:bg-black sm:flex hover:border hover:border-orange-500 cursor-pointer rounded-sm font-bold text-white hover:text-white"
                              onClick={() => setActiveModal("signin")}
                           >
                              Sign in
                           </Button>
                           <Button
                              variant="ghost"
                              className="bg-orange-500 flex cursor-pointer rounded-sm font-bold text-white"
                              onClick={() => setActiveModal("signup")}
                           >
                              Sign up
                           </Button>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </header>

         <AuthModals activeModal={activeModal} onModalChange={setActiveModal} />
      </>
   )
}
