"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight, ShoppingBasket } from "lucide-react"

const orderTabs = [
  { label: "All orders", value: "all" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Returns", value: "returns" },
]

export default function OrdersPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentStatus = searchParams.get("status") || "all"

  const handleTabClick = (value: string) => {
    const newUrl =
      value === "all"
        ? "/account/orders"
        : `/account/orders?status=${value}`

    router.push(newUrl)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-2 sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="w-full overflow-scroll flex items-center justify-between sm:justify-start gap-4 sm:gap-8">
            {orderTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabClick(tab.value)}
                className={`pb-2 text-sm font-medium transition-colors ${currentStatus === tab.value
                  ? "font-bold border-b-2 border-gray-900 text-black"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:block relative w-80">
            <Input
              type="search"
              placeholder="Item name / Order ID / Tracking No."
              className="pr-10 pl-6 rounded-full"
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-4 sm:py-16">
          <div className="mb-2 text-gray-300">
            <ShoppingBasket size={56} />
          </div>
          <h3 className="mb-8 text-sm sm:text-lg sm:font-semibold text-gray-900">
            You don't have any {currentStatus === "all" ? "" : currentStatus} orders
          </h3>
          <div className="w-full max-w-3xl space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">
              Can't find your order?
            </h4>

            <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-900">
                  Try signing in with another account
                </span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>

            <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300">
              <span className="text-sm text-gray-900">
                Self-service to find order
              </span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>

            <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300">
              <span className="text-sm text-gray-900">
                Switch countries to view orders in other countries
              </span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
