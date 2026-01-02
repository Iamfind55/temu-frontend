import Link from "next/link"

export default function PrivacyChoicesPage() {
   return (
      <div className="min-h-screen bg-white">
         {/* Breadcrumb */}
         <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
               <Link href="/" className="hover:text-orange-500">
                  Home
               </Link>
               <span>›</span>
               <span className="text-gray-900 font-medium">Your privacy choices</span>
            </nav>
         </div>

         {/* Title */}
         <div className="max-w-7xl mx-auto px-4 pt-8 pb-12">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
               Your privacy choices
            </h1>
         </div>

         {/* Content */}
         <div className="max-w-7xl mx-auto px-4 pb-16">
            {/* Required cookies section */}
            <div className="border-b border-gray-200 pb-6 mb-6">
               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                     <h2 className="text-base font-bold text-gray-900 mb-2">
                        Required cookies & technologies
                     </h2>
                     <p className="text-sm text-gray-600">
                        For details on how we use your data, see our{" "}
                        <Link href="/privacy-policy" className="text-orange-500 hover:underline">
                           Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link href="/ad-choices" className="text-orange-500 hover:underline">
                           Cookie and Similar Technologies Policy
                        </Link>
                        .
                     </p>
                  </div>
                  <div className="flex-shrink-0">
                     <span className="text-sm text-gray-500">Always on</span>
                  </div>
               </div>
            </div>

            {/* Additional privacy options section */}
            <div>
               <h2 className="text-base font-bold text-gray-900 mb-4">
                  Additional privacy options
               </h2>

               <div className="space-y-4 text-sm text-gray-600">
                  <p>
                     Click{" "}
                     <Link href="/contact-us" className="text-orange-500 hover:underline">
                        here
                     </Link>{" "}
                     to make access, deletion or other specific requests relating to your personal information.
                  </p>

                  <p>
                     Want to delete your account? To start the process tap{" "}
                     <Link href="/contact-us" className="text-orange-500 hover:underline">
                        here
                     </Link>
                     .
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}
