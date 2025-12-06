import type React from "react"
import { ShopFooter } from "@/components/shop-footer"
import { ShopHeader } from "@/components/shop-header"

export default function AccountLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <div className="w-full flex flex-col">
         <ShopHeader />
         <div className="w-full flex items-start justify-center">
            <main className="w-full">{children}</main>
         </div>
         <ShopFooter />
      </div>
   )
}
