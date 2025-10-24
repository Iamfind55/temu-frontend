"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  FileText,
  Star,
  User,
  Ticket,
  CreditCard,
  Store,
  Clock,
  MapPin,
  Globe,
  Wallet,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  {
    id: "orders",
    label: "Your orders",
    icon: FileText,
    href: "/account/orders",
    subItems: [
      { label: "All orders", href: "/account/orders" },
      { label: "Processing", href: "/account/orders?status=processing" },
      { label: "Shipped", href: "/account/orders?status=shipped" },
      { label: "Delivered", href: "/account/orders?status=delivered" },
      { label: "Returns", href: "/account/orders?status=returns" },
    ],
  },
  {
    id: "profile",
    label: "Your profile",
    icon: User,
    href: "/account/profile",
  },
  {
    id: "credit",
    label: "Credit balance",
    icon: CreditCard,
    href: "/account/credit",
  },
  {
    id: "addresses",
    label: "Addresses",
    icon: MapPin,
    href: "/account/addresses",
  },
  {
    id: "payment",
    label: "Your payment methods",
    icon: Wallet,
    href: "/account/payment",
  },
  {
    id: "security",
    label: "Account security",
    icon: Shield,
    href: "/account/security",
  },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";

  const [expandedItem, setExpandedItem] = useState<string | null>("orders");

  return (
    <aside className="w-90 bg-background">
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
