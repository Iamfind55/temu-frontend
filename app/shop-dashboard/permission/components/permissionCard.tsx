import { Ban } from "lucide-react"
import { TFunction } from "i18next"
import { permissions } from "../constants"

export function PermissionCard({
   permission,
   t,
}: {
   permission: (typeof permissions)[0]
   t: TFunction
}) {
   const Icon = permission.icon

   return (
      <div className="bg-white border border-gray-200 rounded-sm p-4 sm:p-5">
         <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
               <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
               <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{t(permission.titleKey)}</h3>
            </div>
            <Ban className="h-5 w-5 text-red-500" />
         </div>

         {permission.hasDescription && permission.descriptionKey && (
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
               {t(permission.descriptionKey)}
            </p>
         )}
      </div>
   )
}