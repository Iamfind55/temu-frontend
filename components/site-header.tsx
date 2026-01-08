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

  // Hide "Sell on Temu" section on mobile when scrolling down
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
            {t('sellOnTemu')}
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
            <svg
              className="iconmain-1nkfa w-15 h-15 text-white"
              aria-label="temu"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1024 1024"
              width="1em"
              height="1em"
              fill="#fb7701"
              stroke="none"
            >
              <path
                d="M683.9 136.5c-0.8 5.6-1.2 11.3-1.2 17.1l0 68.3c0 28.3 22.9 51.2 51.2 51.2l151.1 0c1.6 9.3 2.5 18.9 2.5 28.6l0 420.6c0 91.2-74 165.2-165.2 165.2l-420.6 0c-91.2 0-165.2-74-165.2-165.2l0-420.6c0-91.2 74-165.2 165.2-165.2l382.2 0z m96.2 388.5c-8.8 0-16 7.3-15.9 16.4l0 68.3c0 21.5-11.8 32.5-31.3 32.5-19.5 0-31.3-11.4-31.3-33.5l0-67.3c0-9-7.1-16.3-16-16.4-8.8 0-16 7.3-15.9 16.4l0 68.1c0 39.9 23.8 60.2 62.8 60.2 38.9 0 63.6-20.1 63.6-61.2l0-67.1c0-9-7.1-16.3-16-16.4z m-247 0l-9.9 0c-8.8 0-15.9 7.3-16 16.4l0 112c0 9 7.1 16.3 16 16.3 8.8 0 15.9-7.3 15.9-16.3l0-73.5 26.9 38.8c5.6 8 17.2 8 22.9 0l26.9-38.8 0 73.5c0 9 7.1 16.3 15.9 16.3 8.8 0 15.9-7.3 16-16.3l0-112c0-9-7.1-16.3-16-16.4l-9.9 0c-3.8 0-7.4 1.9-9.6 5.1l-34.8 53.6-34.8-53.6c-2.2-3.2-5.8-5.1-9.5-5.1z m-201 0l-93.3 0c-8.8 0-15.9 7.3-15.9 16.4 0 9 7.1 16.3 15.9 16.3l30.7 0 0 95.5c0 9 7.1 16.3 15.9 16.3 8.8 0 15.9-7.3 16-16.3l0-95.5 30.7 0c8.8 0 15.9-7.3 15.9-16.3 0-9-7.1-16.3-15.9-16.4z m137.8 0l-86.3 0c-8.8 0-15.9 7.3-16 16.4l0 111.8c0 9 7.1 16.3 16 16.3l86.3 0c8.8 0 15.9-7.3 16-16.3 0-9-7.1-16.3-16-16.3l-70.4 0 0-23.3 61.4 0c8.8 0 15.9-7.3 15.9-16.3 0-9-7.1-16.3-15.9-16.4l-61.4 0 0-23.2 70.4 0c8.8 0 15.9-7.3 16-16.3 0-9-7.1-16.3-16-16.4z m-156-170.7l-3.1 0.1c-12.2 0.9-20.6 6.4-25.3 13.8-5.6-8.6-16-14.6-31.8-13.8l-0.3 0.3c-1.5 2.4-9.2 16.1 2.3 31.1 2.3 2.4 7.7 9.4 5.5 18.2l-32 53.1c-2.6 4.3-1.5 9.9 2.6 12.8 8.3 5.9 24.9 14.2 53.6 14.1 28.7 0 45.4-8.2 53.7-14.1l1.3-1.1c3-3.1 3.6-7.9 1.3-11.7l-32-53-0.2-0.7c-1.7-7.8 2.6-14.1 5.1-17l0.6-0.6c11.4-15 3.7-28.7 2.3-31.1l-0.3-0.3-3.3-0.1z m71.6 4.6c-2.9 2.4-7.8 8.5-11.9 13.9l-2.9 3.8c-2.2 3-3.8 5.2-4 5.6-13.9 20.2-13.1 25.1 4.7 36.5 10 6.4 18.1-1.9 21.6-4.3-1.7 10.7-6.7 27.4-14.4 39.2-4.2-3.2-7.2-5.7-9.1-7.5-2.4-2.2-6.1-2.1-8.4 0.2-1.1 1.1-1.7 2.6-1.6 4.2 0 1.6 0.7 3.1 1.9 4.1 18.5 17.3 42.9 27.2 68.8 27.3 26 0 50.5-9.8 69-27.3 2.4-2.2 2.5-5.9 0.2-8.3-2.3-2.4-5.9-2.5-8.3-0.2-1.4 1.3-2.9 2.6-4.4 3.9l-8.1-18.6c-1.3-3.2-2.7-7.2-4.4-12.1 0.8-2 2.4-4 4.9-6.4 1.8-1.8 3.2-3.6 4.2-5.4 5.4-8.7 2.3-13.8 0.7-17.2-3.8-8.1-9.9-5.4-14.2-0.7-5.4 5.8-10.6 8.3-19.1 10.3-7 1.7-12.5 0.8-17-2.1-6.2-4-15.8-18.6-15.8-18.6-11-22.3-25.2-26.1-32.4-20.3z m233.8-2.4c-23.2 22.6-0.9 71.8-43.2 92.7-4.7 2.3-8.5-5.3-14.7-5.2-17.7 0.1-51.3 16.1-52.7 24.1-1.1 6.6 13.3 11.9 55.7 11.9 36.9 0 48.8-57.5 61.7-57.6 12.9 0 6.9 52.2 5.6 57.6l13.5 0c-1.2-5.4-2-21.8-2-45 0-23.1 4.1-28.3 7.3-45.7 2.8-15.2-19.1-28.4-31.2-32.8z m132.5 1.8l-37.8 0c-24.5 0-44.8 19.4-46.5 44.5l-2.8 40.1c-1.3 19 13.4 35.2 32.1 35.2l72.2 0c18.6 0 33.4-16.2 32-35.2l-2.7-40.1c-1.7-25-22-44.4-46.5-44.5z m-321.5 92.3c11.4 0 20.1 5.7 23.4 16.4-7.7 2.1-15.6 3.1-23.5 3.1-11.9 0-16.2-1.1-23.8-3.3 3.1-9.3 13.2-16.2 23.9-16.2z m285.4-59l0 1.1c0 9.7 7.7 17.6 17.2 17.6 9.5 0 17.2-7.9 17.2-17.6l0-1.1c0-4.3 15.2-4.3 15.2 0l0 1.1c0 18.3-14.5 33.2-32.4 33.2-17.9 0-32.4-14.9-32.4-33.2l0-1.1c0-4.3 15.2-4.3 15.2 0z m171.8-340.4c56.6 0 102.4 45.8 102.4 102.4 0 56.6-45.8 102.4-102.4 102.4l-153.6 0c-18.9 0-34.1-15.3-34.2-34.1l0-68.3c0-56.6 45.8-102.4 102.4-102.4l85.4 0z m-59.4 43c-4.2 0-7.4 1.3-9.7 3.9-2.2 2.6-3.4 6.4-3.3 11.4l0 53.1c0 8.4-1.6 14.8-4.9 19-3.2 4.3-7.9 6.4-14 6.4-6.2 0-10.9-2.1-14.1-6.4-3.2-4.3-4.9-10.6-4.9-19l0-53.1c0-5-1.1-8.8-3.3-11.4-2.2-2.6-5.5-3.9-9.8-3.9-4.2 0-7.4 1.3-9.7 3.9-2.3 2.6-3.4 6.4-3.5 11.4l0 52.7c0 8.4 1 15.9 3 22.3 2 6.4 4.9 11.7 8.7 16 3.9 4.3 8.6 7.5 14.2 9.6 5.6 2.1 12.1 3.2 19.4 3.2 9.7 0 17.9-1.9 24.6-5.6 6.7-3.8 11.7-9.5 15.1-17.1 3.4-7.6 5.1-17.1 5-28.4l0-52.7c0-5-1.1-8.8-3.2-11.4-2.2-2.6-5.4-3.9-9.6-3.9z m71.6-0.3c-6.4 0-12.2 0.9-17.4 2.7-5.2 1.8-9.7 4.4-13.4 7.6-3.8 3.3-6.7 7.3-8.7 11.9-2 4.7-3.1 9.8-3.1 15.6 0 8.7 2.2 15.7 6.7 21.2 4.5 5.5 11.3 9.3 20.4 11.5l16.7 4.1c4.5 1.1 7.6 2.4 9.4 3.9 1.8 1.5 2.6 3.6 2.6 6.1 0 2.8-1.3 5.2-3.7 7.1-2.5 1.9-6.9 2.9-13.3 2.9-4 0-8.3-0.5-12.8-1.6-4.6-1.1-8.7-2.6-12.3-4.6-2.8-1.4-5.2-1.8-7.4-1.1-2.2 0.7-4 2.1-5.3 4.1-1.3 2-2.1 4.4-2.4 7-0.3 2.6 0.1 5.1 1.1 7.5 1 2.4 2.9 4.2 5.4 5.6 3 1.6 6.3 3.1 10 4.3 3.7 1.2 7.6 2.1 11.8 2.7 4.1 0.6 8.1 0.9 11.9 0.9 6.6 0 12.5-0.9 17.8-2.6 5.2-1.8 9.7-4.2 13.4-7.5 3.7-3.2 6.6-7.1 8.6-11.7 2-4.6 3-9.8 3-15.5 0-8.4-2.3-15.3-6.9-20.5-4.6-5.3-11.5-9-20.7-11.3l-16.6-4.2c-4.5-1.1-7.5-2.4-9.2-4-1.7-1.6-2.5-3.5-2.5-5.8 0-2.3 0.6-4.3 1.9-6.1 1.3-1.8 3.2-3.1 5.7-4 2.5-0.9 5.5-1.4 9-1.4 3.2 0 6.6 0.4 10 1 3.5 0.7 6.6 1.8 9.4 3.3 3 1.4 5.5 1.8 7.7 1.2 2.1-0.6 3.9-1.8 5.1-3.7 1.3-1.9 2-4 2.2-6.5 0.2-2.5-0.2-4.8-1.1-7.2-1-2.3-2.5-4.1-4.7-5.4-3.7-2.5-8.1-4.4-13.3-5.6-5.1-1.3-10.1-1.9-15-1.9z"
              ></path>
            </svg>
          </Link>
          <h1 className="block sm:hidden text-orange-500 font-bold text-xl" onClick={() => router.push("/")}>TEMU</h1>

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
                <div className="flex items-center justify-center cursor-pointer rounded-full font-bold hover:text-white p-0 gap-2">
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
