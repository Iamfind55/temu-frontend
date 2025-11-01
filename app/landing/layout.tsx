import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function AccountLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <div className="w-full flex flex-col">
         <SiteHeader className="bg-white text-black border-b" />
         <div className="w-full flex items-start justify-center">
            <main className="w-full">{children}</main>
         </div>
         <SiteFooter />
      </div>
   )
}
