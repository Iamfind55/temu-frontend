"use client"

import Link from "next/link"
import {
   Lock,
   Contact,
   Bluetooth,
   Mic,
   MapPin,
   Image,
   Camera,
   MoreHorizontal,
   Ban,
   ChevronRight,
} from "lucide-react"

// Permission card data
const permissions = [
   {
      id: "contacts",
      title: "Contacts",
      icon: Contact,
      hasDescription: false,
   },
   {
      id: "bluetooth",
      title: "Bluetooth",
      icon: Bluetooth,
      hasDescription: false,
   },
   {
      id: "microphone",
      title: "Microphone",
      icon: Mic,
      hasDescription: true,
      description:
         "Temu does not request to access your microphone on the browser. Even though the browser may request access to your microphone permissions in situations like leaving a review with video, etc. Temu will only use the microphone permissions you grant to the Chrome browser to take videos.",
   },
   {
      id: "location",
      title: "Location",
      icon: MapPin,
      hasDescription: true,
      description:
         "In most countries/regions, such as the US, the UK, etc., Temu does not request access to your location on the browser. For users in the Middle East only, the browser might request access to your location permissions. Temu will only use the location permissions you grant to the Chrome browser to make it easier for users to accurately fill in their shipping address.",
   },
   {
      id: "photos",
      title: "Photos",
      icon: Image,
      hasDescription: true,
      description:
         "Temu does not request access to your photos on the browser. Even though the browser may request access to your photos permissions in situations like leaving a review, searching items, etc., Temu will only use the photo permissions you grant to the Chrome browser to upload images.",
   },
   {
      id: "camera",
      title: "Camera",
      icon: Camera,
      hasDescription: true,
      description:
         "Temu does not request permission to access your camera on the browser. Even when we use the camera to leave a review, search items, etc., Temu will only use the camera permissions you grant to the Chrome browser to take photos.",
   },
   {
      id: "others",
      title: "Others",
      icon: MoreHorizontal,
      hasDescription: true,
      description:
         "In addition to the above device features, Temu will not request access to any other device features, such as your calendar, reminders, etc.",
      isLast: true,
   },
]

// Permission Card Component
function PermissionCard({
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

export default function PermissionPage() {
   // Separate permissions with and without descriptions
   const simplePermissions = permissions.filter((p) => !p.hasDescription)
   const detailedPermissions = permissions.filter((p) => p.hasDescription && !p.isLast)
   const otherPermission = permissions.find((p) => p.isLast)

   return (
      <div className="flex flex-col h-full">
         <div className="flex-1 p-4 sm:p-6">
            <div className="mx-auto max-w-4xl">
               <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                     <Lock className="h-4 w-4 sm:h-6 sm:w-6 text-green-700" />
                  </div>
                  <div>
                     <h1 className="text-md sm:text-xl md:text-lg font-bold text-green-700 leading-tight">
                        Temu DOES NOT obtain your permissions on the browser
                     </h1>
                     <div
                        className="text-xs text-gray-500 inline-flex items-center gap-1 sm:text-base mt-1 hover:underline"
                     >
                        To learn about the permissions of Temu App,
                        <Link href="#" className="flex items-center justify-center text-orange-500 hover:underline">
                           click here
                           <ChevronRight className="h-4 w-4" />
                        </Link>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {simplePermissions.map((permission) => (
                     <PermissionCard key={permission.id} permission={permission} />
                  ))}
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {detailedPermissions.map((permission) => (
                     <PermissionCard key={permission.id} permission={permission} />
                  ))}
               </div>

               {otherPermission && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                     <PermissionCard permission={otherPermission} />
                  </div>
               )}

               <div className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  <p>
                     Temu believes in being transparent and requesting a minimal amount of permissions.
                     You can also learn more about how we operate to protect our user's privacy in the{" "}
                     <Link href="#" className="text-gray-900 underline hover:text-orange-500">
                        Privacy policy
                     </Link>
                     , which includes details about how we handle information that does not involve
                     requesting permission or personal privacy.
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}
