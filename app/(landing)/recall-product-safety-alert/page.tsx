"use client"

import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"

const recallAlerts: { date: string; title: string; link: string }[] = []

const governmentLinks = [
   { title: "US Consumer Product Safety Commission (CPSC)", link: "https://www.cpsc.gov/Recalls" },
   { title: "National Highway Traffic Safety Administration (NHTSA)", link: "https://www.nhtsa.gov/recalls" },
   { title: "US Food & Drug Administration (FDA)", link: "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts" },
   { title: "US Department of Agriculture (USDA)", link: "https://www.fsis.usda.gov/recalls" },
]

export default function RecallProductSafetyAlertPage() {
   return (
      <div className="min-h-screen bg-white">
         {/* Breadcrumb */}
         <div>
            <div className="max-w-5xl mx-auto px-4 py-3">
               <div className="flex items-center gap-2 text-xs text-gray-600">
                  <a href="/" className="hover:text-orange-500">Home</a>
                  <span>›</span>
                  <span className="text-gray-900">Recalls and Product Safety Alerts</span>
               </div>
            </div>
         </div>

         {/* Title */}
         <div className="max-w-5xl mx-auto px-4 pt-8 pb-6">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 text-center">Recalls and Product Safety Alerts</h1>
         </div>

         {/* Content */}
         <div className="max-w-5xl mx-auto px-4 pb-16">
            <div className="text-xs text-gray-700 space-y-4">
               {/* Introduction */}
               <p className="leading-relaxed">
                  Consumer safety is important to us. We monitor product safety information and aim to keep shoppers informed of recalls and safety alerts that affect items sold on our platform.
               </p>

               <p className="leading-relaxed">
                  Please use the resources below to access the latest official recall announcements and safety alerts.
               </p>

               {/* Notice Box */}
               <div className="flex items-center justify-between border rounded-lg p-4 my-6">
                  <div className="flex items-center gap-3">
                     <Info className="h-5 w-5 text-gray-600 flex-shrink-0" />
                     <span className="text-gray-700">To view customized recall notices applicable to your purchase history, please log in to your account.</span>
                  </div>
                  <Button variant="outline" className="flex-shrink-0 rounded-full text-xs">
                     Your recalls and product safety alerts
                  </Button>
               </div>

               {/* Divider */}
               <hr className="my-6" />

               <section>
                  <h2 className="text-base font-bold text-gray-900 mb-4">Recalls and alerts</h2>

                  {recallAlerts.length === 0 ? (
                     <p className="leading-relaxed mb-6 text-gray-600">
                        There are no current recalls or safety alerts to display.
                     </p>
                  ) : (
                     <div className="space-y-4 mb-8">
                        {recallAlerts.map((alert, index) => (
                           <div key={index}>
                              <p className="text-gray-500 mb-1">{alert.date}</p>
                              <a href={alert.link} className="text-blue-600 hover:underline leading-relaxed">
                                 {alert.title}
                              </a>
                           </div>
                        ))}
                     </div>
                  )}

                  <hr className="my-6" />

                  <p className="leading-relaxed mb-4">
                     For the latest official recall announcements and safety alerts in the US, see the following resources:
                  </p>

                  <ul className="list-disc list-inside space-y-2">
                     {governmentLinks.map((item, index) => (
                        <li key={index}>
                           <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {item.title}
                           </a>
                        </li>
                     ))}
                  </ul>
               </section>
            </div>
         </div>
      </div>
   )
}
