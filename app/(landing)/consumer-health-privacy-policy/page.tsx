"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

const sections = [
   { id: "what-we-collect", label: "What Consumer Health Data Do We Collect" },
   { id: "how-we-use", label: "How and Why We Use Your Consumer Health Data" },
   { id: "how-we-disclose", label: "How and Why We Disclose Your Consumer Health Data" },
   { id: "your-controls", label: "Your Controls and Choices" },
]

export default function ConsumerHealthPrivacyPolicyPage() {
   const [activeSection, setActiveSection] = useState("what-we-collect")
   const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

   useEffect(() => {
      const handleScroll = () => {
         const scrollPosition = window.scrollY + 150

         for (const section of sections) {
            const element = sectionRefs.current[section.id]
            if (element) {
               const { offsetTop, offsetHeight } = element
               if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                  setActiveSection(section.id)
                  break
               }
            }
         }
      }

      window.addEventListener("scroll", handleScroll)
      handleScroll()
      return () => window.removeEventListener("scroll", handleScroll)
   }, [])

   const scrollToSection = (id: string) => {
      const element = sectionRefs.current[id]
      if (element) {
         const offsetTop = element.offsetTop - 100
         window.scrollTo({ top: offsetTop, behavior: "smooth" })
      }
   }

   return (
      <div className="min-h-screen bg-white">
         {/* Header */}
         <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
               Tamu | U.S. | Consumer Health Data Privacy Policy
            </h1>
            <p className="text-gray-500 text-center text-sm">
               Last Updated: November 14, 2025
            </p>
         </div>

         {/* Content with Sidebar */}
         <div className="max-w-7xl mx-auto px-4 pb-16">
            <div className="flex gap-8">
               {/* Sticky Sidebar */}
               <aside className="hidden lg:block w-72 flex-shrink-0">
                  <div className="sticky top-40">
                     <nav className="space-y-1">
                        {sections.map((section) => (
                           <button
                              key={section.id}
                              onClick={() => scrollToSection(section.id)}
                              className={cn(
                                 "block w-full text-left px-3 py-2 text-sm transition-colors border-l-2",
                                 activeSection === section.id
                                    ? "border-orange-500 text-orange-500 font-medium"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                              )}
                           >
                              {section.label}
                           </button>
                        ))}
                     </nav>
                  </div>
               </aside>

               {/* Main Content */}
               <main className="flex-1 min-w-0">
                  {/* Introduction */}
                  <p className="text-sm text-gray-700 mb-8 leading-relaxed">
                     This Consumer Health Data Privacy Policy provides information regarding how Whaleco Inc. (&quot;Tamu,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) processes &quot;consumer health data&quot; as defined by applicable consumer health privacy laws. In the event of a conflict between Tamu&apos;s{" "}
                     <Link href="/privacy-policy" className="text-orange-500 hover:underline">
                        Privacy Policy
                     </Link>{" "}
                     and this Consumer Health Data Privacy Policy, this Consumer Health Data Privacy Policy will control with respect to the processing of consumer health data.
                  </p>

                  {/* Section 1: What Consumer Health Data Do We Collect */}
                  <section
                     id="what-we-collect"
                     ref={(el) => { sectionRefs.current["what-we-collect"] = el }}
                     className="mb-10"
                  >
                     <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                        <ChevronRight className="w-4 h-4 text-gray-700" />
                        <h2 className="text-lg font-bold text-gray-900">
                           What Consumer Health Data Do We Collect
                        </h2>
                     </div>

                     <p className="text-sm text-gray-700 leading-relaxed">
                        We collect consumer health data in connection with certain of our services. The type(s) of consumer health data we may collect depends on your interactions with us. For example, we may collect information you provide about your health, health care services, tests, reports, medications, or invoices when you submit a customer service request or complaint related to your health, including photographs and customer support calls that may be recorded related to your health conditions, which may be considered biometric data under certain laws although we do not extract any identifier template(s) from this data.
                     </p>
                  </section>

                  {/* Section 2: How and Why We Use Your Consumer Health Data */}
                  <section
                     id="how-we-use"
                     ref={(el) => { sectionRefs.current["how-we-use"] = el }}
                     className="mb-10"
                  >
                     <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                        <ChevronRight className="w-4 h-4 text-gray-700" />
                        <h2 className="text-lg font-bold text-gray-900">
                           How and Why We Use Your Consumer Health Data
                        </h2>
                     </div>

                     <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                        <p>
                           We may use consumer health data as necessary to provide you with the services that you have requested or authorized. This may include order processing and fulfillment, communicating with you regarding orders, products, and services, providing you with customer support services, optimizing features, fixing errors, and improving our services and our business.
                        </p>

                        <p>
                           We may also use your consumer health data for compliance purposes and to prevent, detect, investigate, and respond to fraud, violations of our{" "}
                           <Link href="/terms-of-use" className="text-orange-500 hover:underline">
                              Terms of Use
                           </Link>{" "}
                           and policies, or other misconduct.
                        </p>

                        <p>
                           We may deidentify consumer health data so that it cannot reasonably be reidentified by us or by another person. If we deidentify information that was originally based on consumer health data, we maintain and use that information in deidentified form and will not attempt to reidentify the data, except as otherwise permitted under applicable law and for the purposes described in this policy.
                        </p>
                     </div>
                  </section>

                  {/* Section 3: How and Why We Disclose Your Consumer Health Data */}
                  <section
                     id="how-we-disclose"
                     ref={(el) => { sectionRefs.current["how-we-disclose"] = el }}
                     className="mb-10"
                  >
                     <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                        <ChevronRight className="w-4 h-4 text-gray-700" />
                        <h2 className="text-lg font-bold text-gray-900">
                           How and Why We Disclose Your Consumer Health Data
                        </h2>
                     </div>

                     <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                        <p>
                           We may disclose the consumer health data described in this Consumer Health Data Privacy Policy as necessary to provide you with a service you request, to comply with our legal obligations, or for certain security-related purposes, as described above. We may also disclose consumer health data with:
                        </p>

                        <div>
                           <h3 className="font-bold text-gray-900 mb-2">Service providers</h3>
                           <p>
                              Third parties that provide services on our behalf or help us operate our services or our business (such as customer support). These third-party service providers have access to only the consumer health data needed to perform their functions and services but shall not use such data for other purposes. Some of these service providers may be Tamu affiliates.
                           </p>
                        </div>

                        <div>
                           <h3 className="font-bold text-gray-900 mb-2">Professional advisors, authorities, and regulators</h3>
                           <p>
                              We may disclose your consumer health data to our professional advisors (e.g., lawyers, auditors, bankers, and insurers), in response to legal processes (e.g., responding to subpoenas or requests from U.S. government or law enforcement authorities), and with other parties in order to enforce our agreements or policies, protect the rights, property and safety of Tamu, users and others, and to detect, prevent and address actual or suspected fraud, violations of Tamu&apos;s{" "}
                              <Link href="/terms-of-use" className="text-orange-500 hover:underline">
                                 Terms of Use
                              </Link>
                              , other illegal activities, security issues, or when it is required by law.
                           </p>
                        </div>

                        <div>
                           <h3 className="font-bold text-gray-900 mb-2">Business transferees</h3>
                           <p>
                              We may disclose your consumer health data to acquirers and other relevant participants in the rare event of business transactions such as a merger, acquisition, or reorganization. If Tamu intends to transfer information about you, Tamu will inform you by email or by putting up a notice on the Tamu app and on tamu.com.
                           </p>
                        </div>

                        <div>
                           <h3 className="font-bold text-gray-900 mb-2">Third parties designated by you</h3>
                           <p>
                              We may disclose your consumer health data to third parties where you have instructed us. For example, to process your request, you may be asked to direct us to share information related to your reported injury with our merchandise partners. Please be assured that we will not share any personal information beyond what you have authorized. We may disclose the consumer health data required for the products or services you request to third parties designated by you.
                           </p>
                        </div>
                     </div>
                  </section>

                  {/* Section 4: Your Controls and Choices */}
                  <section
                     id="your-controls"
                     ref={(el) => { sectionRefs.current["your-controls"] = el }}
                     className="mb-10"
                  >
                     <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                        <ChevronRight className="w-4 h-4 text-gray-700" />
                        <h2 className="text-lg font-bold text-gray-900">
                           Your Controls and Choices
                        </h2>
                     </div>

                     <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                        <p>
                           Under applicable laws, you may have certain rights regarding your consumer health data, including the right to access or delete your consumer health data. You may exercise these rights by submitting a request via our privacy choices{" "}
                           <Link href="/privacy-choices" className="text-orange-500 hover:underline">
                              web form
                           </Link>{" "}
                           or by contacting us using the information provided below. We will use information you provide in your request to verify your identity, and we may request additional information if necessary to complete the verification process.
                        </p>

                        <p>
                           If your request to exercise a right under applicable law is denied, you may appeal that decision by contacting us as described below. If you have questions or would like to communicate with us about this Consumer Health Data Privacy Policy, please email us at privacy@tamu.com or contact us by mail at the following address:
                        </p>

                        <div className="mt-4">
                           <p>Whaleco Inc.</p>
                           <p>Suite 355</p>
                           <p>31 St. James Avenue</p>
                           <p>Boston, Massachusetts 02116, USA</p>
                        </div>
                     </div>
                  </section>
               </main>
            </div>
         </div>
      </div>
   )
}
