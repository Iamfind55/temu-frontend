"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "./language-selector"
import { AuthModals, AuthModalType } from "./auth-modals"

export function ShopHeader({ className }: { className?: string }) {
   const [activeModal, setActiveModal] = useState<AuthModalType>(null)

   return (
      <>
         <header className="sticky top-0 z-50 w-full">
            <div className={cn("bg-black text-white", className)}>
               <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
                  <Link href="/" className="w-40 h-auto flex items-center p-0">
                     <img src="/logo/temu-shop.webp" />
                  </Link>

                  <div className="flex items-center justify-start gap-4">
                     <LanguageSelector className={className ? "text-black hover:text-white" : ""} />
                     <Button
                        variant="ghost"
                        className="hidden bg-black hover:bg-black sm:flex hover:border hover:border-orange-500 cursor-pointer rounded-sm font-bold hover:text-white"
                        onClick={() => setActiveModal("signin")}
                     >
                        Sign in
                     </Button>
                     <Button
                        variant="ghost"
                        className="bg-orange-500 hidden sm:flex cursor-pointer rounded-sm font-bold text-white"
                        onClick={() => setActiveModal("signup")}
                     >
                        Sign up
                     </Button>
                  </div>
               </div>
            </div>
         </header>

         <AuthModals activeModal={activeModal} onModalChange={setActiveModal} />
      </>
   )
}
