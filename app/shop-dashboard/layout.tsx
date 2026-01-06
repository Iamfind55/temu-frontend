import type React from "react"

// components:
// import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ShopDashboardSidebar } from "@/components/shop-sidebar"
import { ShopHeader } from "@/components/shop-header"
import { ShopFooter } from "@/components/shop-footer"
import { ShopBottomNav } from "@/components/shop-bottom-nav"
import { ShopLiveChat } from "@/components/shop-live-chat"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full flex flex-col mb-4">
      <ShopHeader className="border-b bg-white text-black" />
      <div className="flex items-center justify-center my-2 sm:my-8">
        <div className="px-2 sm:container w-full">
          <div className="w-full flex items-start justify-center">
            <div className="w-1/5 hidden sm:block">
              <ShopDashboardSidebar />
            </div>
            <main className="w-full sm:w-4/5 pb-20 sm:pb-0">{children}</main>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <SiteFooter />
      </div>
      <ShopBottomNav />
      <ShopLiveChat />
    </div>
  )
}
