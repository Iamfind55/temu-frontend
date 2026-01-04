"use client"

import {
   Bell,
   User,
   Award,
   Apple,
   MapPin,
   LogOut,
   Settings,
   CreditCard,
   ShieldCheck,
   ShoppingCart,
   Plus,
} from "lucide-react"
import Link from "next/link"
import Cookies from "js-cookie"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useQuery } from "@apollo/client/react"
import { useRouter, usePathname } from "next/navigation"
import { useShopStore } from "@/store/shop-store"
import { QUERY_GET_SHOP_NOTIFICATIONS } from "@/app/api/shop/notification"
import { QUERY_SHOP_CREDIT_TRANSACTIONS } from "@/app/api/shop/credit"
import { QUERY_SHOP_ORDERS } from "@/app/api/shop/order"

// Type definitions for query responses
interface PaginatedResponse {
   success: boolean
   total: number
}

interface ShopOrdersResponse {
   shopGetOrders: PaginatedResponse
}

interface ShopNotificationsResponse {
   shopGetNotifications: PaginatedResponse
}

interface ShopTransactionsResponse {
   shopGetTransactionHistories: PaginatedResponse
}

import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet"

export function ShopBottomNav() {
   const router = useRouter()
   const pathname = usePathname()
   const { shop, clearShop } = useShopStore()

   const [productSheetOpen, setProductSheetOpen] = useState(false)
   const [settingSheetOpen, setSettingSheetOpen] = useState(false)

   // Query processing orders count
   const { data: ordersData } = useQuery<ShopOrdersResponse>(QUERY_SHOP_ORDERS, {
      variables: {
         page: 1,
         limit: 1,
         where: {
            order_status: "PROCESSING",
         },
      },
      skip: !shop?.id,
      fetchPolicy: "cache-and-network",
   })

   // Query unread notifications count
   const { data: notificationData } = useQuery<ShopNotificationsResponse>(QUERY_GET_SHOP_NOTIFICATIONS, {
      variables: {
         page: 1,
         limit: 1,
         where: {
            shop_id: shop?.id,
            is_read: false,
         },
      },
      skip: !shop?.id,
      fetchPolicy: "cache-and-network",
   })

   // Query pending transactions count
   const { data: transactionData } = useQuery<ShopTransactionsResponse>(QUERY_SHOP_CREDIT_TRANSACTIONS, {
      variables: {
         page: 1,
         limit: 1,
         where: {
            status: "PENDING",
         },
      },
      skip: !shop?.id,
      fetchPolicy: "cache-and-network",
   })

   const processingOrdersCount = ordersData?.shopGetOrders?.total || 0
   const unreadNotificationCount = notificationData?.shopGetNotifications?.total || 0
   const pendingTransactionCount = transactionData?.shopGetTransactionHistories?.total || 0

   // Handle logout
   const handleLogout = () => {
      clearShop()
      Cookies.remove("shop_auth_token")
      // Use window.location to trigger middleware check
      window.location.href = "/shop-landing"
   }

   const navItems = [
      {
         id: "orders",
         label: "Orders",
         icon: ShoppingCart,
         href: "/shop-dashboard/orders",
         onClick: () => router.push("/shop-dashboard/orders"),
         badge: processingOrdersCount,
      },
      {
         id: "products",
         label: "Products",
         icon: Apple,
         href: "/shop-dashboard/product",
         onClick: () => setProductSheetOpen(true),
      },
      {
         id: "credits",
         label: "Credits",
         icon: CreditCard,
         href: "/shop-dashboard/credit",
         onClick: () => router.push("/shop-dashboard/credit"),
         badge: pendingTransactionCount,
      },
      {
         id: "notification",
         label: "Notification",
         icon: Bell,
         href: "/shop-dashboard/notifications",
         onClick: () => router.push("/shop-dashboard/notifications"),
         badge: unreadNotificationCount,
      },
      {
         id: "setting",
         label: "Setting",
         icon: Settings,
         onClick: () => setSettingSheetOpen(true),
      },
   ]

   const productSubItems = [
      { label: "All products", href: "/shop-dashboard/product", icon: Apple },
      { label: "Apply new", href: "/shop-dashboard/product/apply-new", icon: Plus },
      { label: "Apply VIP product", href: "/shop-dashboard/product/apply-vip", icon: Award },
   ]

   const settingSubItems = [
      { label: "Profile", href: "/shop-dashboard/profile", icon: User },
      { label: "Addresses", href: "/shop-dashboard/addresses", icon: MapPin },
      { label: "Payment method", href: "/shop-dashboard/payment", icon: CreditCard },
      { label: "VIP Access", href: "/shop-dashboard/vip-access", icon: Award },
      { label: "Permission", href: "/shop-dashboard/permission", icon: ShieldCheck },
   ]

   return (
      <>
         {/* Bottom Navigation Bar */}
         <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 sm:hidden">
            <div className="flex items-center justify-around h-16">
               {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = item.href && pathname.startsWith(item.href)

                  return (
                     <button
                        key={item.id}
                        onClick={item.onClick}
                        className={cn(
                           "flex flex-col items-center justify-center flex-1 h-full relative",
                           isActive ? "text-orange-600 font-semibold" : "text-gray-600"
                        )}
                     >
                        <div className="relative">
                           <Icon className="h-4 w-4" />
                           {item.badge !== undefined && item.badge > 0 && (
                              <span className="absolute -top-1.5 -right-2.5 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-semibold text-white bg-red-500 rounded-full">
                                 {item.badge > 99 ? "99+" : item.badge}
                              </span>
                           )}
                        </div>
                        <span className="text-xs mt-1">{item.label}</span>
                     </button>
                  )
               })}
            </div>
         </nav>

         {/* Products Sheet */}
         <Sheet open={productSheetOpen} onOpenChange={setProductSheetOpen}>
            <SheetContent side="bottom" className="h-auto rounded-t-xl">
               <SheetHeader className="border-b">
                  <SheetTitle>Products</SheetTitle>
               </SheetHeader>
               <div className="grid gap-2 pb-4">
                  {productSubItems.map((item) => {
                     const Icon = item.icon
                     const isActive = pathname === item.href

                     return (
                        <Link
                           key={item.href}
                           href={item.href}
                           onClick={() => setProductSheetOpen(false)}
                           className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                              isActive
                                 ? "bg-orange-50 text-orange-600"
                                 : "text-gray-700 hover:bg-gray-100"
                           )}
                        >
                           <Icon className="h-5 w-5" />
                           <span className="font-medium">{item.label}</span>
                        </Link>
                     )
                  })}
               </div>
            </SheetContent>
         </Sheet>

         {/* Settings Sheet */}
         <Sheet open={settingSheetOpen} onOpenChange={setSettingSheetOpen}>
            <SheetContent side="bottom" className="h-auto rounded-t-xl">
               <SheetHeader className="border-b">
                  <SheetTitle>Settings</SheetTitle>
               </SheetHeader>
               <div className="grid gap-2 pb-4">
                  {settingSubItems.map((item) => {
                     const Icon = item.icon
                     const isActive = pathname === item.href

                     return (
                        <Link
                           key={item.href}
                           href={item.href}
                           onClick={() => setSettingSheetOpen(false)}
                           className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                              isActive
                                 ? "bg-orange-50 text-orange-600"
                                 : "text-gray-700 hover:bg-gray-100"
                           )}
                        >
                           <Icon className="h-5 w-5" />
                           <span className="font-medium">{item.label}</span>
                        </Link>
                     )
                  })}

                  {/* Logout Button */}
                  <button
                     onClick={() => {
                        setSettingSheetOpen(false)
                        handleLogout()
                     }}
                     className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors mt-2 border-t pt-4"
                  >
                     <LogOut className="h-5 w-5" />
                     <span className="font-medium">Logout</span>
                  </button>
               </div>
            </SheetContent>
         </Sheet>
      </>
   )
}
