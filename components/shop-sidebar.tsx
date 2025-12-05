"use client";

import {
   Bell,
   User,
   Award,
   Apple,
   MapPin,
   ChevronUp,
   CreditCard,
   ChevronDown,
   ShieldCheck,
   ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

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
      label: "Notification",
      icon: Bell,
      href: "/shop-dashboard/addresses",
   },
   {
      id: "vip_access",
      label: "VIP Access",
      icon: Award,
      href: "/shop-dashboard/vip-access",
   },
   {
      id: "profile",
      label: "Your profile",
      icon: User,
      href: "/shop-dashboard/profile",
   },
];

export function ShopDashboardSidebar() {
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const status = searchParams.get("status") || "all";
   const [expandedItem, setExpandedItem] = useState<string | null>("orders");

   return (
      <aside className="bg-background">
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
                        </Link>
                     )}

                     {hasSubItems && isExpanded && (
                        <div className="ml-4 mt-1 space-y-1">
                           {item.subItems.map((subItem) => {
                              const subStatus =
                                 new URLSearchParams(subItem.href.split("?")[1]).get(
                                    "status"
                                 ) || "all";

                              const isSubActive =
                                 pathname === "/account/orders" && subStatus === status;

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
      </aside>
   );
}
