"use client"

import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export function SiteFooter() {
  const { t } = useTranslation('footer')

  return (
    <footer className="bg-[oklch(0.15_0_0)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">{t('companyInfo')}</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="hover:text-white hover:underline">
                <a href="/about-us" className="hover:text-white">
                  {t('aboutTamu')}
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="/affiliate-influencer" className="hover:text-white">
                  {t('affiliateProgram')}
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="/contact-us" className="hover:text-white">
                  {t('contactUs')}
                </a>
              </li>
              <li className="hover:text-white">
                <p className="hover:text-white">
                  {t('careers')}
                </p>
              </li>
              <li className="hover:text-white">
                <p className="hover:text-white">
                  {t('press')}
                </p>
              </li>
              <li className="hover:text-white">
                <p className="hover:text-white">
                  {t('treePlantingProgram')}
                </p>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="font-semibold mb-4">{t('customerService')}</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="hover:text-white hover:underline">
                <a href="/return-refund-policy" className="hover:text-white">
                  {t('returnRefundPolicy')}
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="/intellectual-property-policy" className="hover:text-white">
                  {t('intellectualPropertyPolicy')}
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="/shop-info" className="hover:text-white">
                  {t('shippingInfo')}
                </a>
              </li>
              <li className="hover:text-white hover:underline">
                <a href="/recall-product-safety-alert" className="hover:text-white">
                  {t('recallsAlerts')}
                </a>
              </li>
              <li className="hover:text-white">
                <p className="hover:text-white">
                  {t('reportSuspicious')}
                </p>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold mb-4">{t('help')}</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="hover:text-white">
                <p className="hover:text-white">
                  {t('supportCenter')}
                </p>
              </li>
              <li className="hover:text-white">
                <p className="hover:text-white">
                  {t('purchaseProtection')}
                </p>
              </li>
              <li className="hover:text-white">
                <p className="hover:text-white">
                  {t('howToOrder')}
                </p>
              </li>
              <li className="hover:text-white">
                <p className="hover:text-white">
                  {t('howToTrack')}
                </p>
              </li>
            </ul>
          </div>

          {/* App download */}
          <div className="space-y-8">
            <div
              className="flex items-center gap-4 border-2 border-white/50 px-8 py-2 rounded-md bg-cover bg-center bg-no-repeat hover:border-white/80 cursor-pointer"
              style={{
                backgroundImage:
                  "url('https://commimg.kwcdn.com/upload_commimg/support/4c86e9a0-1dee-4013-b53c-4b224cf595f8.png')",
              }}
            >
              <div>
                <h3 className="font-semibold mb-2">{t('startSelling')}</h3>
                <Button
                  size="sm"
                  className="text-xs font-bold rounded-full bg-orange-400"
                >
                  <span>{t('startSellingAccount')}</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">{t('downloadApp')}</h3>

              <ul className="space-y-2 text-sm text-white/80 mb-4">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('priceDropAlerts')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('trackOrders')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('fasterCheckout')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('lowStockAlerts')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('exclusiveOffers')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('couponsAlerts')}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8">
          {/* Payment methods */}
          <div className="mt-8 border-t border-white/20 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center text-sm text-white/60 gap-2 sm:gap-4">
              <div className="flex items-center justify-center gap-4">
                <p>© {t('copyright')}</p>
                <a href="/terms-of-use" className="hover:text-white underline">
                  {t('termsOfUse')}
                </a>
                <a href="/privacy-policy" className="hover:text-white underline">
                  {t('privacyPolicy')}
                </a>
              </div>
              <div className="flex items-center justify-center gap-4">
                <a href="/consumer-health-privacy-policy" className="hover:text-white underline">
                  {t('healthPrivacyPolicy')}
                </a>
                <a href="/privacy-choices" className="hover:text-white underline">
                  {t('yourPrivacyChoices')}
                </a>
              </div>
              <a href="/ad-choices" className="hover:text-white underline">
                {t('adChoices')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
