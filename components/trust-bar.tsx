"use client"

import { useTranslation } from "react-i18next"
import { Shield, CreditCard, Truck, Bell, ChevronRight, ShieldCheck } from "lucide-react"

export function TrustBar() {
  const { t } = useTranslation("header")

  return (
    <div className="p-2 sm:p-0">
      <div className="container mx-auto rounded-md border border-green-700">
        <div className="bg-green-700 flex items-center justify-between p-2 text-white rounded-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} />
            <span className="text-sm font-semibold">{t("whyChooseTemu")}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>{t("securePrivacy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>{t("safePayments")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>{t("deliveryGuarantee")}</span>
            </div>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 text-green-700">
          <div className="flex items-center justify-start gap-2">
            <Bell size={18} />
            <p className="text-sm font-bold">{t("beWaryUsps")}</p>
          </div>
          <div className="flex items-center justify-center">
            <span className="font-bold text-sm text-green-700">{t("view")}</span>
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}
