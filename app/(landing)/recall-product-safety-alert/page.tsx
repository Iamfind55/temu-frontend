"use client"

import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"

const recallAlerts = [
   {
      date: "Sep 18, 2025",
      title: "EnHomee Dressers Recalled Due to Risk of Serious Injury or Death from Tip-Over and Entrapment; Violates Mandatory Standard for Clothing Storage Units; Sold by EnHomee Direct",
      link: "#"
   },
   {
      date: "Feb 13, 2025",
      title: "6-in-1 Pounding Games Recalled Due to Ingestion Hazard; Violation of Federal Regulations for Magnets; Sold Exclusively on Temu.com by DMITOY",
      link: "#"
   },
   {
      date: "Feb 6, 2025",
      title: "Sling Carriers Recalled Due to Fall Hazard; Violation of Federal Regulations for Sling Carriers; Sold on Temu.com by Sunkids Factory",
      link: "#"
   },
   {
      date: "Nov 7, 2024",
      title: "Baofali Crib Bumpers Recalled Due to Suffocation Hazard; Violation of Federal Ban on Crib Bumpers; Sold Exclusively on Temu.com by Unique Person Home Goods",
      link: "#"
   },
   {
      date: "Jul 25, 2024",
      title: "Toy Guns Recalled Due to Eye Injury Hazard; Failure to Meet Federal Safety Regulations for Projectile Toys; Sold Exclusively on Temu.com by Youjiu",
      link: "#"
   },
]

const governmentLinks = [
   { title: "US Government Recalls", link: "#" },
   { title: "US Consumer Product Safety Commission (CPSC)", link: "#" },
   { title: "National Highway Traffic Safety Administration (NHTSA)", link: "#" },
   { title: "US Food & Drug Administration (FDA)", link: "#" },
   { title: "US Department of Agriculture (USDA)", link: "#" },
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
                  At Tamu, consumer safety is one of our top priorities. We fully recognize the importance of product safety and compliance, and remain highly vigilant to potential safety risks.
               </p>

               <p className="leading-relaxed">
                  We strive to keep our consumers well-informed of product recalls that have occurred on our platform and to facilitate access to published recall and safety alert information on relevant official websites.
               </p>

               <p className="leading-relaxed">
                  Please use the resources below to stay updated on the latest official recall announcements and safety alerts in the US, including those applicable to products sold via our platform in the past 12 months and the most recent 5 recalls involving our platform.
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

               {/* Recalls and alerts section */}
               <section>
                  <h2 className="text-base font-bold text-gray-900 mb-4">Recalls and alerts</h2>

                  <p className="leading-relaxed mb-6">
                     To view the latest official recall announcements and safety alerts in the US in relation to the products sold via our platform in the past 12 months and the most recent 5 recalls involving our platform, please click on the following links.
                  </p>

                  {/* Recall List */}
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

                  {/* Divider */}
                  <hr className="my-6" />

                  {/* Government Links */}
                  <p className="leading-relaxed mb-4">
                     To view the latest official recall announcements and safety alerts in the US, please click on the following links.
                  </p>

                  <ul className="list-disc list-inside space-y-2">
                     {governmentLinks.map((item, index) => (
                        <li key={index}>
                           <a href={item.link} className="text-blue-600 hover:underline">
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
