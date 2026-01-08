"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"
import { permissions } from "./constants"
import { Lock, ChevronRight } from "lucide-react"
import { PermissionCard } from "./components/permissionCard"

export default function PermissionPage() {
   const { t } = useTranslation('shop-dashboard')
   const simplePermissions = permissions.filter((p) => !p.hasDescription)
   const detailedPermissions = permissions.filter((p) => p.hasDescription && !p.isLast)
   const otherPermission = permissions.find((p) => p.isLast)

   return (
      <div className="flex flex-col h-full">
         <div className="flex-1 p-2 sm:p-6">
            <div className="mx-auto max-w-4xl">
               <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                     <Lock className="h-4 w-4 sm:h-6 sm:w-6 text-green-700" />
                  </div>
                  <div>
                     <h1 className="text-sm sm:xl font-bold text-green-700 leading-tight">
                        {t('permissionTitle')}
                     </h1>
                     <div
                        className="text-xs text-gray-500 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:text-base mt-1 hover:underline"
                     >
                        <p>{t('permissionLearnMore')}</p>
                        <Link href="#" className="flex items-center justify-center text-orange-500 hover:underline">
                           {t('clickHere')}
                           <ChevronRight className="h-4 w-4" />
                        </Link>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {simplePermissions.map((permission) => (
                     <PermissionCard key={permission.id} permission={permission} t={t} />
                  ))}
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {detailedPermissions.map((permission) => (
                     <PermissionCard key={permission.id} permission={permission} t={t} />
                  ))}
               </div>

               {otherPermission && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                     <PermissionCard permission={otherPermission} t={t} />
                  </div>
               )}

               <div className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-8">
                  <p>
                     {t('permissionTransparency')}{" "}
                     <Link href="#" className="text-gray-900 underline hover:text-orange-500">
                        {t('privacyPolicy')}
                     </Link>
                     {t('permissionDetails')}
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}
