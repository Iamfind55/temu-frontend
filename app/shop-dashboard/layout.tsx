import type React from "react"

// components:
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ShopDashboardSidebar } from "@/components/shop-sidebar"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full flex flex-col">
      <SiteHeader className="bg-white text-black border-b" />
      <div className="flex items-center justify-center mt-4">
        <div className="px-2 sm:container w-full">
          <div className="w-full flex items-start justify-center">
            <div className="w-1/5 hidden sm:block">
              <ShopDashboardSidebar />
            </div>
            <main className="w-full sm:w-4/5">{children}</main>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
