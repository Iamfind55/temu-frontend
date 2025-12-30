"use client"

import Link from "next/link"
import { MessageCircle, MapPin, ChevronRight, AlertCircle } from "lucide-react"

export default function ContactUsPage() {
   return (
      <div className="min-h-screen bg-white">
         <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
               <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  {/* Left Content */}
                  <div className="text-center md:text-start w-full">
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                        Contact us
                     </h1>
                     <p className="text-lg md:text-xl text-gray-700">
                        Real-time and fast responses
                     </p>
                  </div>

                  <div className="flex-shrink-0">
                     <img
                        src="/images/contact-us-hero.png"
                        alt="Contact Us"
                        className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto"
                        onError={(e) => {

                           e.currentTarget.style.display = 'none'
                        }}
                     />
                  </div>
               </div>
            </div>
            <div className="container mx-auto px-4 py-8 md:py-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-4">
                  <div className="bg-white p-6 md:p-8 lg:p-10 rounded-md">
                     <div className="flex items-start gap-4 md:gap-6">
                        <div className="flex-shrink-0">
                           <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                              <MessageCircle className="w-4 h-4 text-white" />
                           </div>
                        </div>
                        <div className="flex-1">
                           <h2 className="text-md md:text-lg font-semibold text-gray-900 mb-2">
                              Need help?
                           </h2>
                           <p className="text-gray-600 mb-3">
                              You can contact Temu customer service for help.
                           </p>
                           <Link
                              href="https://t.me/Tiktokshop24h_online"
                              className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors"
                           >
                              Contact us
                              <ChevronRight className="w-4 h-4 ml-1" />
                           </Link>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white p-6 md:p-8 lg:p-10 rounded-md">
                     <div className="flex items-start gap-4 md:gap-6">
                        <div className="flex-shrink-0">
                           <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-white" />
                           </div>
                        </div>

                        <div className="flex-1">
                           <h2 className="text-md md:text-lg font-semibold text-gray-900 mb-2">
                              Office address
                           </h2>
                           <p className="text-gray-600 mb-3 text-sm">
                              Suite 355, 31 St. James Avenue, Boston, Massachusetts 02116, USA
                           </p>
                           <div className="flex items-start gap-2 text-orange-500">
                              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <p className="text-sm">
                                 Please note, returns will not be accepted at this address. If you want to return your items,{" "}
                                 <Link
                                    href="/return-refund-policy"
                                    className="hover:underline font-medium inline-flex items-center"
                                 >
                                    please click here
                                    <ChevronRight className="w-4 h-4" />
                                 </Link>
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
