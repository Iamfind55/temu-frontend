import type React from "react"

// components:
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AccountSidebar } from "@/components/account-sidebar"
import { AccountBottomNav } from "@/components/account-bottom-nav"

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
            <div className="hidden sm:block">
              <AccountSidebar />
            </div>
            <main className="w-full pb-20 sm:pb-0">{children}</main>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <SiteFooter />
      </div>
      <AccountBottomNav />
    </div>
  )
}
