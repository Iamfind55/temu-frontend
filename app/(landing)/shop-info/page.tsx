"use client"

import { useTranslation } from "react-i18next"

export default function ShopInfoPage() {
   const { t } = useTranslation('landing')

   return (
      <div className="min-h-screen bg-white">
         {/* Breadcrumb */}
         <div>
            <div className="max-w-5xl mx-auto px-4 py-3">
               <div className="flex items-center gap-2 text-xs text-gray-600">
                  <a href="/" className="hover:text-orange-500">Home</a>
                  <span>›</span>
                  <span className="text-gray-900">{t('shippingInfoTitle')}</span>
               </div>
            </div>
         </div>

         {/* Title */}
         <div className="max-w-5xl mx-auto px-4 pt-8 pb-6">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 text-center">{t('shippingInfoTitle')}</h1>
         </div>

         {/* Content */}
         <div className="max-w-5xl mx-auto px-4 pb-16">
            <div className="text-xs text-gray-700 space-y-8">
               {/* Section 1: Shipping options */}
               <section>
                  <h2 className="text-sm font-bold text-gray-900 mb-3">{t('shippingOptions')}</h2>
                  <p className="leading-relaxed">
                     {t('shippingOptionsDesc')}
                  </p>
               </section>

               {/* Section 2: Shipping address */}
               <section>
                  <h2 className="text-sm font-bold text-gray-900 mb-3">{t('shippingAddress')}</h2>
                  <p className="leading-relaxed">
                     {t('shippingAddressDesc')}
                  </p>
               </section>

               {/* Section 3: Shipping time and cost */}
               <section>
                  <h2 className="text-sm font-bold text-gray-900 mb-3">{t('shippingTimeCost')}</h2>
                  <div className="space-y-3 leading-relaxed">
                     <p>{t('shippingTimeCostDesc1')}</p>
                     <p>{t('shippingTimeCostDesc2')}</p>
                     <p>{t('shippingTimeCostDesc3')}</p>
                     <p>{t('shippingTimeCostDesc4')}</p>
                  </div>
               </section>

               {/* Section 4: Issues regarding delivery */}
               <section>
                  <h2 className="text-sm font-bold text-gray-900 mb-3">{t('deliveryIssues')}</h2>
                  <p className="leading-relaxed">
                     {t('deliveryIssuesDesc')}
                  </p>
               </section>
            </div>
         </div>
      </div>
   )
}
