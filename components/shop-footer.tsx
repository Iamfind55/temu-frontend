"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"

export function ShopFooter() {
   const { t } = useTranslation("shop-dashboard")

   return (
      <footer className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-gray-500 py-6">
         <div className="flex items-center justify-center gap-2">
            <p>© 2025 WhaleCo Inc.</p>
            <Link href="/shop-landing/seller-policy" className="underline">{t("sellerPrivacyPolicy")}</Link>
         </div>
         <div className="flex items-center justify-center gap-2">
            {t("sellerRegisteredInfo")}
            <Link href="#" className="underline">{t("clickHereLink")}</Link>
         </div>
      </footer>
   )
}
