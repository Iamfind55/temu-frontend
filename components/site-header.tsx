"use client"

import React from "react"
import Link from "next/link"
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, ChevronDown, TruckIcon, DollarSign, Undo2, Truck, Smartphone, ChevronRight, ThumbsUp, Star, Logs, MapPin, Wallet, Shield, FileText, LogOut, CreditCard } from "lucide-react"

import { Separator } from "./ui/separator";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MegaMenu } from "@/components/mega-menu"
import { LanguageSelector } from "@/components/language-selector"

import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context"
import { maskEmail } from "@/utils/function";
import { useAppSelector } from "@/app/redux/store";
import { signOut } from "@/app/redux/slice/customerAuthSlice";

const getMessages = (t: (key: string) => string) => [
  {
    icon: <Truck />,
    title: t('deliveryGuarantee'),
    text: t('deliveryGuaranteeSubtext'),
  },
  {
    icon: <Undo2 />,
    title: t('freeReturns'),
    text: t('freeReturnsSubtext'),
  },
  {
    icon: <DollarSign />,
    title: t('priceAdjustment'),
    text: t('priceAdjustmentSubtext'),
  },
];

export function SiteHeader({ className }: { className?: string }) {
  const { t } = useTranslation('header')
  const router = useRouter()
  const dispatch = useDispatch()
  const customer = useAppSelector((state) => state.customerAuth.customer)
  const { openCart, itemCount } = useCart()
  const [index, setIndex] = React.useState<number>(0);
  const [showMegaMenu, setShowMegaMenu] = React.useState<boolean>(false)
  const [mounted, setMounted] = React.useState<boolean>(false)
  const [hideOnScroll, setHideOnScroll] = React.useState<boolean>(false)
  const lastScrollY = React.useRef<number>(0)

  // Prevent hydration mismatch by only rendering client-specific values after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Hide "Sell on Tamu" section on mobile when scrolling down
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY.current

      // Only toggle state if scroll delta is significant (prevents flickering)
      if (Math.abs(scrollDelta) < 10) return

      // Hide when scrolling down past threshold, show when scrolling up
      if (scrollDelta > 0 && currentScrollY > 100) {
        setHideOnScroll(true)
      } else if (scrollDelta < 0) {
        setHideOnScroll(false)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    dispatch(signOut())
    // Redirect to home page after logout
    router.push("/")
  }

  const messages = getMessages(t);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { icon, title, text } = messages[index];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-[oklch(0.15_0_0)] text-white">
        <div className={`container mx-auto flex items-center justify-between px-0 sm:px-4 text-sm ${hideOnScroll ? "py-0 sm:py-2" : "py-0 sm:py-2"}`}>
          <div className="hidden sm:flex items-center gap-2 space-x-2 text-green-300">
            <TruckIcon />
            <div className="flex items-start justify-center flex-col">
              <span className="text-bold text-lg font-semibold">{t('freeShipping')}</span>
              <span className="text-xs font-bold">{t('freeShippingSubtext')}</span>
            </div>
          </div>
          <div className="hidden items-center gap-8 sm:flex">
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
          <div className="hidden sm:flex items-center gap-2 text-yellow-100">
            <Smartphone />
            <span className="font-bold text-lg">{t('getTheApp')}</span>
          </div>
          <div
            className={cn(
              "w-full sm:w-auto flex items-center justify-between sm:justify-center gap-4 sm:border sm:border-white/50 px-2 py-1 sm:rounded-md bg-cover bg-center bg-no-repeat hover:border-white/80 cursor-pointer transition-all duration-300",
              hideOnScroll ? "sm:flex" : "flex"
            )}
            style={{
              backgroundImage:
                "url('https://commimg.kwcdn.com/upload_commimg/support/4c86e9a0-1dee-4013-b53c-4b224cf595f8.png')",
            }}
          >
            {t('sellOnTamu')}
            <Button
              size="sm"
              className="text-xs font-bold rounded-full bg-orange-400"
              onClick={() => router.push("/shop-landing")}
            >
              <span>{t('joinNow')}</span>
              <ChevronRight />
            </Button>
          </div>

        </div>
      </div>

      <div className={cn("bg-red-950 text-white", className)}>
        <div className="container mx-auto flex items-center gap-4 px-4 py-3">
          <Link href="/" className="hidden sm:flex items-center gap-2">
            <span className="bg-orange-500 text-white font-semibold text-xl px-2 py-3 rounded-xl tracking-wider">
              TAMU
            </span>
          </Link>
          <h1 className="block sm:hidden text-orange-500 font-bold text-xl" onClick={() => router.push("/")}>TAMU</h1>

          <Link href="/best-selling" className="hidden sm:block">
            <Button variant="ghost" className="hover:bg-red-800 cursor-pointer rounded-full font-semibold hover:text-white">
              <ThumbsUp />
              {t('bestSellingItems')}
            </Button>
          </Link>

          <Link href="/5-star-rated" className="hidden sm:block">
            <Button variant="ghost" className="hover:bg-red-800 cursor-pointer rounded-full  font-semibold hover:text-white">
              <Star />
              {t('fiveStarRated')}
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
                {t('categories')}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Logs className="block sm:hidden h-6 sm:h-4 w-6 sm:w-4 hover:text-white cursor-pointer" />
            </div>

            {showMegaMenu && (
              <div className="absolute left-0 sm:left-1/2 top-full z-50 w-screen sm:w-[60vw] sm:-translate-x-1/2 pt-0">
                <MegaMenu onClose={() => setShowMegaMenu(false)} />
              </div>
            )}
          </div>

          <div className="relative flex-1 max-w-2xl">
            <Input
              type="search"
              placeholder={t('searchPlaceholder')}
              className="h-8 sm:h-11 w-full rounded-full border bg-white pr-12 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.15_0_0)] hover:bg-[oklch(0.2_0_0)] h-6 w-6 sm:h-9 sm:w-9"
            >
              <Search className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-0 sm:gap-4 space-x-2">
            {mounted && customer?.id ? (
              <div className="group relative">
                <Link href="/account/orders">
                  <Button variant="ghost" className="hidden sm:flex hover:bg-red-800 cursor-pointer rounded-full font-bold hover:text-white">
                    <User className="mr-0 sm:mr-1 h-8 sm:h-5 w-8 sm:w-5" />
                    <div className="text-left text-xs">
                      <div>{t('hello', { email: maskEmail(customer.email) })}</div>
                      <div className="font-semibold">{t('ordersAndAccount')}</div>
                    </div>
                  </Button>
                  <User className="flex sm:hidden h-5 sm:h-4 w-5 sm:w-4 hover:text-white" />
                </Link>

                <div className="absolute right-0 top-full hidden w-48 rounded-lg bg-white py-2 shadow-lg group-hover:block">
                  <Link href="/account/orders" className="flex items-center gap-2 block px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <FileText size={14} />{t('yourOrders')}
                  </Link>
                  <Link href="/account/profile" className="flex items-center gap-2 block px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <User size={14} /> {t('yourProfile')}
                  </Link>
                  <Link href="/account/credit" className="flex items-center gap-2 block px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <CreditCard size={14} />{t('credits')}
                  </Link>
                  <Link href="/account/addresses" className="flex items-center gap-2 block px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <MapPin size={14} /> {t('addresses')}
                  </Link>
                  <Link href="/account/payment" className="flex items-center gap-2 block px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <Wallet size={14} />{t('payment')}
                  </Link>
                  <Link href="/account/security" className="flex items-center gap-2 block px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <Shield size={14} />{t('security')}
                  </Link>
                  <Separator />
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center gap-2  w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted"
                  >
                    <LogOut size={14} />
                    {t('signOut')}
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <div className="flex items-center justify-center cursor-pointer rounded-full font-bold p-0 gap-2">
                  <User className="mr-0 h-5 w-5" />
                  <div className="hidden sm:block text-left text-xs">
                    <div>{t('signInRegister')}</div>
                    <div className="font-bold">{t('orderAndAccount')}</div>
                  </div>
                </div>
              </Link>
            )}
            <LanguageSelector className={className ? "text-black hover:text-white" : ""} />
            <Button
              variant="ghost"
              size="icon"
              className="relative hidden sm:flex hover:bg-red-700 cursor-pointer rounded-full font-bold hover:text-white"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Button>
            <div className="relative block sm:hidden cursor-pointer" onClick={() => router.push("/cart")}>
              <ShoppingCart className="h-5 w-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
