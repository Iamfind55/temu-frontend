import { Ban } from "lucide-react"
import { permissions } from "../constants"

export function PermissionCard({
   permission,
}: {
   permission: (typeof permissions)[0]
}) {
   const Icon = permission.icon

   return (
      <div className="bg-white border border-gray-200 rounded-sm p-4 sm:p-5">
         <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
               <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
               <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{permission.title}</h3>
            </div>
            <Ban className="h-5 w-5 text-red-500" />
         </div>

         {permission.hasDescription && permission.description && (
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
               {permission.description}
            </p>
         )}
      </div>
   )
}