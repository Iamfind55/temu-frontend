"use client";

import {
   Bell,
   User,
   Award,
   Apple,
   MapPin,
   Crown,
   LogOut,
   ChevronUp,
   CreditCard,
   ChevronDown,
   ShieldCheck,
   ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useShopStore } from "@/store/shop-store";
import { QUERY_GET_SHOP_NOTIFICATIONS } from "@/app/api/shop/notification";
import { QUERY_SHOP_CREDIT_TRANSACTIONS } from "@/app/api/shop/credit";

const menuItems = [
   {
      id: "orders",
      label: "Your orders",
      icon: ShoppingCart,
      href: "/shop-dashboard/orders",
      subItems: [
         { label: "All orders", href: "/shop-dashboard/orders" },
         { label: "Processing", href: "/shop-dashboard/orders?status=processing" },
         { label: "Packing", href: "/shop-dashboard/orders?status=packing" },
         { label: "Shipping", href: "/shop-dashboard/orders?status=shipping" },
         { label: "Completed", href: "/shop-dashboard/orders?status=completed" },
         { label: "Cancelled", href: "/shop-dashboard/orders?status=cancelled" },
      ],
   },
   {
      id: "products",
      label: "Products",
      icon: Apple,
      href: "/shop-dashboard/product",
      subItems: [
         { label: "All products", href: "/shop-dashboard/product" },
         { label: "Apply new", href: "/shop-dashboard/product/apply-new" },
         { label: "Apply VIP product", href: "/shop-dashboard/product/apply-vip" },
      ],
   },
   {
      id: "credit",
      label: "Credit balance",
      icon: CreditCard,
      href: "/shop-dashboard/credit",
   },
   {
      id: "addresses",
      label: "Addresses",
      icon: MapPin,
      href: "/shop-dashboard/addresses",
   },
   {
      id: "permission",
      label: "Permission",
      icon: ShieldCheck,
      href: "/shop-dashboard/permission",
   },
   {
      id: "notification",
      label: "Notifications",
      icon: Bell,
      href: "/shop-dashboard/notifications",
   },
   {
      id: "vip_access",
      label: "VIP Access",
      icon: Award,
      href: "/shop-dashboard/vip-access",
   },
   {
      id: "payment_method",
      label: "Your payment method",
      icon: CreditCard,
      href: "/shop-dashboard/payment",
   },
   {
      id: "profile",
      label: "Your profile",
      icon: User,
      href: "/shop-dashboard/profile",
   },
];

// VIP level config
const vipConfig: Record<string, { name: string; color: string; bgColor: string }> = {
   "1": { name: "VIP 1", color: "text-amber-600", bgColor: "bg-amber-100" },
   "2": { name: "VIP 2", color: "text-purple-600", bgColor: "bg-purple-100" },
   "3": { name: "VIP 3", color: "text-orange-600", bgColor: "bg-orange-100" },
};

export function ShopDashboardSidebar() {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const status = searchParams.get("status") || "all";
   const { shop, clearShop } = useShopStore();

   // Get VIP level info
   const shopVIP = shop?.shop_vip || "0";
   const vipInfo = vipConfig[shopVIP];

   // Query unread notifications count
   const { data: notificationData } = useQuery(QUERY_GET_SHOP_NOTIFICATIONS, {
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
   });

   // Query pending transactions count
   const { data: transactionData } = useQuery(QUERY_SHOP_CREDIT_TRANSACTIONS, {
      variables: {
         page: 1,
         limit: 1,
         where: {
            status: "PENDING",
         },
      },
      skip: !shop?.id,
      fetchPolicy: "cache-and-network",
   });

   const unreadNotificationCount = notificationData?.shopGetNotifications?.total || 0;
   const pendingTransactionCount = transactionData?.shopGetTransactionHistories?.total || 0;

   // Determine which menu item should be expanded based on current path
   const getInitialExpandedItem = () => {
      const activeItem = menuItems.find(
         (item) => item.subItems && pathname.startsWith(item.href)
      );
      return activeItem?.id || null;
   };

   const [expandedItem, setExpandedItem] = useState<string | null>(getInitialExpandedItem);

   // Handle logout
   const handleLogout = () => {
      // Clear shop store
      clearShop();
      // Remove shop auth token cookie
      Cookies.remove("shop_auth_token");
      // Redirect to shop landing page
      router.push("/shop-landing");
   };

   return (
      <aside className="bg-background">
         {/* VIP Level Badge */}
         {vipInfo && (
            <div className="px-4 pt-4">
               <Link href="/shop-dashboard/vip-access">
                  <div className={cn(
                     "flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors hover:opacity-80",
                     vipInfo.bgColor
                  )}>
                     <Crown className={cn("h-4 w-4", vipInfo.color)} />
                     <span className={cn("text-sm font-semibold", vipInfo.color)}>
                        {vipInfo.name}
                     </span>
                  </div>
               </Link>
            </div>
         )}
         <nav className="space-y-1 p-4">
            {menuItems.map((item) => {
               const Icon = item.icon;
               const isActive =
                  pathname === item.href || pathname.startsWith(item.href);
               const hasSubItems = item.subItems && item.subItems.length > 0;
               const isExpanded = expandedItem === item.id;

               return (
                  <div key={item.id}>
                     {hasSubItems ? (
                        <button
                           onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                           className={cn(
                              "flex w-full items-center justify-between gap-3 px-3 py-2.5 text-sm font-medium transition-colors",
                              isActive
                                 ? "bg-orange-50"
                                 : "text-gray-700 hover:bg-gray-100"
                           )}
                        >
                           <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5" />
                              <span>{item.label}</span>
                           </div>
                           {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                           ) : (
                              <ChevronDown className="h-4 w-4" />
                           )}
                        </button>
                     ) : (
                        <Link
                           href={item.href}
                           className={cn(
                              "flex items-center justify-between gap-3 px-2 py-2.5 text-sm font-medium transition-colors",
                              isActive
                                 ? "bg-orange-50 border-l-4 border-orange-600"
                                 : "text-gray-700 hover:bg-gray-100"
                           )}
                        >
                           <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5" />
                              <span>{item.label}</span>
                           </div>
                           {/* Badge for notifications */}
                           {item.id === "notification" && unreadNotificationCount > 0 && (
                              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                                 {unreadNotificationCount > 99 ? "99+" : unreadNotificationCount}
                              </span>
                           )}
                           {/* Badge for pending transactions */}
                           {item.id === "credit" && pendingTransactionCount > 0 && (
                              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold text-white bg-orange-500 rounded-full">
                                 {pendingTransactionCount > 99 ? "99+" : pendingTransactionCount}
                              </span>
                           )}
                        </Link>
                     )}

                     {hasSubItems && isExpanded && (
                        <div className="ml-4 mt-1 space-y-1">
                           {item.subItems.map((subItem) => {
                              // Check if subItem uses query params (orders) or path (products)
                              const hasQueryParam = subItem.href.includes("?");
                              const subItemPath = subItem.href.split("?")[0];

                              let isSubActive = false;

                              if (hasQueryParam) {
                                 // For items with query params (orders)
                                 const subStatus = new URLSearchParams(subItem.href.split("?")[1]).get("status") || "all";
                                 isSubActive = pathname === subItemPath && subStatus === status;
                              } else {
                                 // For items with direct paths (products)
                                 isSubActive = pathname === subItem.href;
                              }

                              return (
                                 <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className={cn(
                                       "block px-3 py-2 text-sm transition-colors",
                                       isSubActive
                                          ? "bg-orange-50 border-l-2 border-orange-500 text-orange-600 font-medium"
                                          : "text-gray-600 hover:bg-gray-50"
                                    )}
                                 >
                                    {subItem.label}
                                 </Link>
                              );
                           })}
                        </div>
                     )}
                  </div>
               );
            })}
         </nav>

         {/* Logout Button */}
         <div className="px-4 pb-4">
            <button
               onClick={handleLogout}
               className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
               <LogOut className="h-5 w-5" />
               <span>Sign out</span>
            </button>
         </div>
      </aside>
   );
}
