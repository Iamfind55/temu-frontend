"use client"

export default function IntellectualPropertyPolicyPage() {
   return (
      <div className="min-h-screen bg-white">
         {/* Breadcrumb */}
         <div>
            <div className="max-w-5xl mx-auto px-4 py-3">
               <div className="flex items-center gap-2 text-xs text-gray-600">
                  <a href="/" className="hover:text-orange-500">Home</a>
                  <span>›</span>
                  <span className="text-gray-900">Temu | Intellectual Property Policy</span>
               </div>
            </div>
         </div>

         {/* Title */}
         <div className="max-w-5xl mx-auto px-4 pt-8 pb-4">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 text-center">Temu | Intellectual Property Policy</h1>
            <p className="text-xs text-gray-500 text-center mt-2">Last updated: March 2nd, 2025</p>
         </div>

         {/* Content */}
         <div className="max-w-5xl mx-auto px-4 pb-16">
            <div className="text-xs text-gray-700 space-y-6">
               {/* Introduction */}
               <p className="leading-relaxed">
                  We are committed to protecting everyone's intellectual property and have a comprehensive policy to that end. This Intellectual Property Policy explains how we address allegations of infringement, how authorized parties can submit reports of infringement regarding content on our website and mobile applications, and how responsible parties can respond when their listings are affected by a report. We will remove material cited for alleged intellectual property infringement when provided with a report that complies with our policies. The intellectual property hereof means copyright, trademark, patent and other intellectual properties prescribed by laws.
               </p>

               {/* Section 1 */}
               <section className="pt-4">
                  <h2 className="text-base font-bold text-gray-900 mb-4">1. Report Infringement</h2>

                  <div className="space-y-4">
                     <p>
                        (1) To submit a notice of IP infringement, you must be the rights owner who owns the IP being reported or an agent with permission from the rights owner to submit notices on his or her behalf.
                     </p>

                     <p>
                        (2) We will investigate the listings or contents upon receiving your report. Please note that any report made to us must be made in good faith and sworn under penalty of perjury.
                     </p>

                     <p>
                        (3) It is a requirement that the notice submitter be logged into our <a href="#" className="text-orange-500 underline">online intellectual property infringement report portal</a> ("IP Portal"). You should include the following information in your report:
                     </p>

                     <ul className="list-disc list-inside space-y-2 ">
                        <li>Specific identification of the IP you believe is infringed including the registration number, written description of copyrighted work, link to copyrighted work, first date of use/publication, etc.</li>
                        <li>Nature of infringement (whether infringement occurs on the product, physical product packaging, image on the product detail page, or text on the product detail page).</li>
                        <li>List of infringing products (URLs for the product detail page of the specified product).</li>
                        <li>List of infringing parties.</li>
                        <li>Supporting documentation or any other information that will help in processing your complaint (such as order IDs for any test buys on the products you are reporting).</li>
                        <li>Your contact details (name, address, phone number, and email address).</li>
                        <li>Other information required under relevant laws.</li>
                     </ul>

                     <p>
                        (4) We may request additional information before processing a report, such as verification or other documentation regarding the claimed right and ownership.
                     </p>
                  </div>
               </section>

               {/* Section 2 */}
               <section className="pt-4">
                  <h2 className="text-base font-bold text-gray-900 mb-4">2. Report Copyright Infringement Using Copyright Infringement Notice under DMCA</h2>

                  <div className="space-y-4">
                     <p>
                        (1) If you are an owner of copyright or authorized to act on behalf of the owner of a copyright that is allegedly infringed, you may submit a notice of infringement through <a href="#" className="text-orange-500 underline">IP Portal</a>, which must include the following:
                     </p>

                     <ul className="list-disc list-inside space-y-2 ">
                        <li>The physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                        <li>Identification of each copyrighted work claimed to have been infringed. A notice may cover multiple copyrighted works.</li>
                        <li>Identification of each infringing material that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate each of such material.</li>
                        <li>Information reasonably sufficient to contact you including your address, telephone number, and email address.</li>
                        <li>A statement to the effect that you have a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                        <li>A representation by you that (i) the information in the notice is accurate and (ii) under penalty of perjury, you are the copyright owner or authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                     </ul>

                     <p>
                        (2) If you misrepresent that material is infringing, you may be liable for damages. Therefore, if you are not sure whether the material is infringing, please seek legal advice before submitting a notice to us.
                     </p>

                     <p>
                        (3) If your notice of infringement is accepted, we will remove the content you reported and take appropriate action against the responsible parties. We do not share details of actions which are not already public in nature.
                     </p>

                     <p>
                        (4) Repeat infringer policy: we are committed to the protection of intellectual property rights and we terminate repeat infringers in appropriate circumstances.
                     </p>

                     <p>
                        (5) We encourage you to use the Temu IP Portal for submission of DMCA notices of infringement, which allows us to process notices with greater efficiency and provides a streamlined experience for authorized parties. If you are unable to use the Temu IP Portal, you can submit the same information described in Section 2(1) above to our DMCA Designated Agent <a href="#" className="text-orange-500 underline">here</a>.
                     </p>
                  </div>
               </section>

               {/* Section 3 */}
               <section className="pt-4">
                  <h2 className="text-base font-bold text-gray-900 mb-4">3. Counter-Notice to Copyright Infringement Claim under DMCA</h2>

                  <div className="space-y-4">
                     <p>
                        (1) If the content provider believes that the material that was removed (or to which access was disabled) is not infringing, or with proper authorization, the content provider, may send us a counter-notice containing the following information:
                     </p>

                     <ul className="list-disc list-inside space-y-2 ">
                        <li>A physical or electronic signature of the content provider.</li>
                        <li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or disabled.</li>
                        <li>A statement under penalty of perjury that the content provider has a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material.</li>
                        <li>Content provider's name, address, telephone number and email address, and a statement that such person or entity consents to the jurisdiction of the Federal District Court for the judicial district in which the content provider's address is located, or, if the content provider's address is located outside the United States, for any judicial district in which Whaleco Inc. may be found, and that such person or entity will accept service of process from the person who provided notification of the alleged infringement.</li>
                     </ul>

                     <p>
                        (2) If a counter-notice is received by us, we will take appropriate measures in compliance with DMCA.
                     </p>
                  </div>
               </section>

               {/* Section 4 */}
               <section className="pt-4">
                  <h2 className="text-base font-bold text-gray-900 mb-4">4. Withdrawal of Report</h2>

                  <p>
                     The intellectual property owner or authorized agent who reported infringement may withdraw its report through <a href="#" className="text-orange-500 underline">IP Portal</a>. The withdrawal request must clearly identify the report submitted by including the information of the complaining party, the intellectual property right previously claimed to have been infringed, and the material complained against which is to be withdrawn.
                  </p>
               </section>

               {/* Section 5 */}
               <section className="pt-4">
                  <h2 className="text-base font-bold text-gray-900 mb-4">5. False Notice</h2>

                  <div className="space-y-4">
                     <p>
                        (1) We may reject reports of infringement that contain information we believe is false, fraudulent, incomplete, or otherwise submitted in bad faith. We also reserve the right to take action against abusers of this policy and applicable law.
                     </p>

                     <p>
                        (2) The continuous submission of inaccurate or fake notices could lead to the removal of your submission privileges.
                     </p>
                  </div>
               </section>
            </div>
         </div>
      </div>
   )
}
