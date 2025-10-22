import { Input } from "@/components/ui/input"
import { Search, ChevronRight } from "lucide-react"
import Link from "next/link"

const orderTabs = [
  { label: "All orders", value: "all" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Returns", value: "returns" },
]

export default function OrdersPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Your orders</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* Tabs */}
        <div className="mb-6 flex items-center justify-between border-b">
          <div className="flex gap-8">
            {orderTabs.map((tab) => (
              <button
                key={tab.value}
                className={`pb-3 text-sm font-medium transition-colors ${
                  tab.value === "all" ? "border-b-2 border-gray-900 text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-80">
            <Input type="search" placeholder="Item name / Order ID / Tracking No." className="pr-10" />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-6 text-gray-300">
            <svg className="h-32 w-32" viewBox="0 0 120 120" fill="none">
              <rect
                x="20"
                y="40"
                width="80"
                height="60"
                rx="4"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path d="M40 40 L50 25 L70 25 L80 40" stroke="currentColor" strokeWidth="2" />
              <line x1="35" y1="55" x2="55" y2="75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="55" y1="55" x2="35" y2="75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="mb-8 text-lg font-semibold text-gray-900">You don't have any orders</h3>

          {/* Help section */}
          <div className="w-full max-w-3xl space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">Can't find your order?</h4>

            <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-900">Try signing in with another account</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </button>

            <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300">
              <span className="text-sm text-gray-900">Self-service to find order</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>

            <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300">
              <span className="text-sm text-gray-900">Switch countries to view orders in other countries</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
