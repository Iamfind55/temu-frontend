"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useDispatch } from "react-redux"
import { FileText, CreditCard, MapPin, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "@/app/redux/slice/customerAuthSlice"

const navItems = [
   {
      label: "Orders",
      icon: FileText,
      href: "/account/orders",
   },
   {
      label: "Credit",
      icon: CreditCard,
      href: "/account/credit",
   },
   {
      label: "Address",
      icon: MapPin,
      href: "/account/addresses",
   },
   {
      label: "Profile",
      icon: User,
      href: "/account/profile",
   },
]

export function AccountBottomNav() {
   const router = useRouter()
   const pathname = usePathname()
   const dispatch = useDispatch()

   const handleLogout = () => {
      dispatch(signOut())
      router.push("/")
   }

   return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 sm:hidden">
         <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
               const Icon = item.icon
               const isActive = pathname === item.href || pathname.startsWith(item.href)

               return (
                  <Link
                     key={item.href}
                     href={item.href}
                     className={cn(
                        "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                        isActive
                           ? "text-orange-500"
                           : "text-gray-500 hover:text-gray-700"
                     )}
                  >
                     <Icon className={cn("h-4 w-4", isActive && "fill-orange-100")} />
                     <span className={cn("text-xs", isActive && "font-semibold")}>{item.label}</span>
                  </Link>
               )
            })}
            <button
               onClick={handleLogout}
               className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors text-gray-500 hover:text-red-500"
            >
               <LogOut className="h-4 w-4 text-rose-500" />
               <span className="text-xs text-rose-500">Logout</span>
            </button>
         </div>
      </nav>
   )
}
