"use client"

import type React from "react"
import { useShopStore } from "@/store/shop-store"

// components:
import { SiteFooter } from "@/components/site-footer"
import { ShopDashboardSidebar } from "@/components/shop-sidebar"
import { ShopHeader } from "@/components/shop-header"
import { ShopBottomNav } from "@/components/shop-bottom-nav"
import { ShopLiveChat } from "@/components/shop-live-chat"
import { ShopDashboardGuard } from "@/components/shop-dashboard-guard"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { shop } = useShopStore()
  const isFrozen = shop?.status === "FROZEN"

  return (
    <div className="w-full flex flex-col mb-4">
      <ShopHeader className="border-b bg-white text-black" />
      <div className="flex items-center justify-center my-2 sm:my-8">
        <div className="px-2 sm:container w-full">
          <div className="w-full flex items-start justify-center">
            {!isFrozen && (
              <div className="w-1/5 hidden sm:block">
                <ShopDashboardSidebar />
              </div>
            )}
            <main className={isFrozen ? "w-full pb-20 sm:pb-0" : "w-full sm:w-4/5 pb-20 sm:pb-0"}>
              <ShopDashboardGuard>{children}</ShopDashboardGuard>
            </main>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <SiteFooter />
      </div>
      {!isFrozen && <ShopBottomNav />}
      <ShopLiveChat />
    </div>
  )
}
