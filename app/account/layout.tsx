import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AccountSidebar } from "@/components/account-sidebar"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

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
          <div className="hidden sm:block px-6 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900">Your orders</span>
            </div>
          </div>
          <h1 className="block sm:hidden text-center text-xl font-bold mb-4">Your order</h1>
          <div className="w-full flex items-start justify-center">
            <div className="hidden sm:block">
              <AccountSidebar />
            </div>
            <main className="w-full">{children}</main>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
