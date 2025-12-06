"use client"

import React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, ChevronDown, TruckIcon, DollarSign, Undo2, Truck, Smartphone, ChevronRight, ThumbsUp, Star, Logs, MapPin, Wallet, Shield, FileText, LogOut, CreditCard } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MegaMenu } from "@/components/mega-menu"
import { LanguageSelector } from "@/components/language-selector"

import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { signOut } from "@/app/redux/slice/customerAuthSlice";
import { Separator } from "./ui/separator";
import { maskEmail } from "@/utils/function";

const messages = [
  {
    icon: <Truck />,
    title: "Delivery guarantee",
    text: "Refund for any issues",
  },
  {
    icon: <Undo2 />,
    title: "Free returns",
    text: "Up to 90 days*",
  },
  {
    icon: <DollarSign />,
    title: "Price adjustment",
    text: "Within 30 days",
  },
];

export function SiteHeader({ className }: { className?: string }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const customer = useAppSelector((state) => state.customerAuth.customer)
  const { openCart, itemCount } = useCart()
  const [index, setIndex] = React.useState<number>(0);
  const [showMegaMenu, setShowMegaMenu] = React.useState<boolean>(false)

  const handleLogout = () => {
    dispatch(signOut())
    // Redirect to home page after logout
    router.push("/")
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { icon, title, text } = messages[index];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="hidden sm:block bg-[oklch(0.15_0_0)] text-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center gap-2 space-x-2 text-green-300">
            <TruckIcon />
            <div className="flex items-start justify-center flex-col">
              <span className="text-bold text-lg font-semibold">Free shipping</span>
              <span className="text-xs font-bold">30-day no delivery refund</span>
            </div>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <div className="overflow-hidden h-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2 text-yellow-100"
                >
                  {icon}
                  <div className="flex items-start justify-center flex-col">
                    <span className="text-lg font-semibold">{title}</span>
                    <span className="text-xs font-bold">{text}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-2 text-yellow-100">
            <Smartphone />
            <span className="font-bold text-lg">Get the Temu App</span>
          </div>
          <div
            className="flex items-center gap-4 border border-white/50 px-2 py-1 rounded-md bg-cover bg-center bg-no-repeat hover:border-white/80 cursor-pointer"
            style={{
              backgroundImage:
                "url('https://commimg.kwcdn.com/upload_commimg/support/4c86e9a0-1dee-4013-b53c-4b224cf595f8.png')",
            }}
          >
            Sell on Temu
            <Button
              size="sm"
              className="text-xs font-bold rounded-full bg-orange-400"
              onClick={() => router.push("/shop-landing")}
            >
              <span>Join Now</span>
              <ChevronRight />
            </Button>
          </div>

        </div>
      </div>

      <div className={cn("bg-red-950 text-white", className)}>
        <div className="container mx-auto flex items-center gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-400  font-semibold">
              <span className="text-xs">Temu</span>
            </div>
          </Link>

          <Link href="/landing/best-selling" className="hidden sm:block">
            <Button variant="ghost" className="hover:bg-red-800 cursor-pointer rounded-full font-semibold hover:text-white">
              <ThumbsUp />
              Best-Selling Items
            </Button>
          </Link>

          <Link href="/landing/5-star-rated" className="hidden sm:block">
            <Button variant="ghost" className="hover:bg-red-800 cursor-pointer rounded-full  font-semibold hover:text-white">
              <Star />
              5-Star Rated
            </Button>
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <div className="group flex items-center">
              <Button
                variant="ghost"
                className="hidden sm:flex hover:bg-red-800 cursor-pointer rounded-full  font-semibold hover:text-white"
              >
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <button className="flex sm:hidden items-center gap-2 rounded-lg px-3 py-2 hover:bg-red-700 cursor-pointer">
                <Logs className="h-6 sm:h-4 w-6 sm:w-4" />
              </button>
            </div>

            {showMegaMenu && (
              <div className="fixed left-1/2 top-[70px] z-50 w-[60vw] -translate-x-1/2">
                <div className="mx-auto max-w-7xl px-6 py-4 mt-4">
                  <MegaMenu />
                </div>
              </div>
            )}
          </div>

          <div className="relative flex-1 max-w-2xl">
            <Input
              type="search"
              placeholder="Search Temu"
              className="h-11 w-full rounded-full border bg-white pr-12 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.15_0_0)] hover:bg-[oklch(0.2_0_0)]"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-0 sm:gap-4">
            {customer?.id ? (
              <div className="group relative">
                <Link href="/account/orders">
                  <Button variant="ghost" className="hidden sm:flex hover:bg-red-800 cursor-pointer rounded-full font-bold hover:text-white">
                    <User className="mr-0 sm:mr-1 h-8 sm:h-5 w-8 sm:w-5" />
                    <div className="text-left text-xs">
                      <div>Hello, {maskEmail(customer.email)}</div>
                      <div className="font-semibold">Orders & Account</div>
                    </div>
                  </Button>
                  <button className="flex sm:hidden items-center gap-2 rounded-lg px-3 py-2 hover:bg-red-700 cursor-pointer">
                    <User className="h-6 sm:h-4 w-6 sm:w-4" />
                  </button>
                </Link>

                <div className="absolute right-0 top-full hidden w-48 rounded-lg bg-white py-2 shadow-lg group-hover:block">
                  <Link href="/account/orders" className="flex items-center gap-2 block px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <FileText size={14} />Your orders
                  </Link>
                  <Link href="/account/profile" className="flex items-center gap-2 block px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <User size={14} /> Your profile
                  </Link>
                  <Link href="/account/credit" className="flex items-center gap-2 block px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <CreditCard size={14} />Credits
                  </Link>
                  <Link href="/account/addresses" className="flex items-center gap-2 block px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <MapPin size={14} /> Addresses
                  </Link>
                  <Link href="/account/payment" className="flex items-center gap-2 block px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <Wallet size={14} />Payment
                  </Link>
                  <Link href="/account/security" className="flex items-center gap-2 block px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <Shield size={14} />Security
                  </Link>
                  <Separator />
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center gap-2  w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-red-800 cursor-pointer rounded-full font-bold hover:text-white">
                  <User className="mr-0 sm:mr-2 h-8 sm:h-5 w-8 sm:w-5" />
                  <div className="text-left text-xs">
                    <div>Sign in / Register</div>
                    <div className="font-bold">Order & Account</div>
                  </div>
                </Button>
              </Link>
            )}
            <LanguageSelector className={className ? "text-black hover:text-white" : ""} />
            <Button
              variant="ghost"
              size="icon"
              className="relative hidden sm:flex hover:bg-red-700 cursor-pointer rounded-full font-bold hover:text-white"
              onClick={() => router.push("/landing/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Button>
            <button
              onClick={() => router.push("/landing/cart")}
              className="flex sm:hidden items-center gap-2 rounded-lg px-3 py-2 hover:bg-red-700 cursor-pointer"
            >
              <ShoppingCart className="h-6 sm:h-4 w-6 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
