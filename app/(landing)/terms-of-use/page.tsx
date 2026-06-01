"use client"

import { ChevronDown } from "lucide-react"

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white">
      <div>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-orange-500">Home</a>
            <span>›</span>
            <span className="text-gray-900">Terms of Use</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Terms of Use</h1>
        <p className="text-sm text-gray-500 text-center mt-2">Last Updated: November 14, 2025</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <main className="max-w-4xl mx-auto">
          <div className="mb-8 text-sm text-gray-700 leading-relaxed space-y-4">
            <p>
              These Terms of Use (&quot;Terms&quot;) govern your access to and use of the website at temustores.com,
              our mobile applications, and related services (collectively, the &quot;Service&quot;) operated by Tamu Stores
              (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
            </p>
            <p>
              By creating an account or using the Service, you agree to be bound by these Terms and our{" "}
              <a href="/privacy-policy" className="text-orange-500 hover:underline">Privacy Policy</a>.
              If you do not agree, do not use the Service.
            </p>
          </div>

          <section className="mb-10">
            <SectionHeader title="1. Eligibility and Account" />
            <div className="text-sm text-gray-700 mt-4 space-y-3">
              <p>You must be at least 18 years old, or the age of majority where you live, to use the Service.</p>
              <p>You are responsible for the accuracy of the information you provide and for safeguarding your account credentials. You are responsible for all activity that occurs under your account.</p>
              <p>We may suspend or terminate your account if you breach these Terms or use the Service in a way that harms us, other users, or third parties.</p>
            </div>
          </section>

          <section className="mb-10">
            <SectionHeader title="2. Orders, Pricing, and Payment" />
            <div className="text-sm text-gray-700 mt-4 space-y-3">
              <p>Product descriptions, images, and prices are provided in good faith. We may correct errors and refuse or cancel orders that result from pricing, stock, or description mistakes.</p>
              <p>Payment is processed through our third-party payment providers. By submitting payment information, you authorize us and our providers to charge the applicable amounts.</p>
              <p>Taxes, shipping fees, and other charges may apply and will be shown before checkout.</p>
            </div>
          </section>

          <section className="mb-10">
            <SectionHeader title="3. Shipping, Returns, and Refunds" />
            <div className="text-sm text-gray-700 mt-4 space-y-3">
              <p>Estimated delivery times are provided as guidance and are not guaranteed.</p>
              <p>Returns and refunds are governed by our <a href="/return-refund-policy" className="text-orange-500 hover:underline">Return &amp; Refund Policy</a>.</p>
            </div>
          </section>

          <section className="mb-10">
            <SectionHeader title="4. Acceptable Use" />
            <div className="text-sm text-gray-700 mt-4 space-y-3">
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Use the Service for any unlawful purpose or in violation of these Terms.</li>
                <li>Submit false, misleading, or fraudulent information, including in reviews or returns.</li>
                <li>Interfere with, disrupt, or attempt to gain unauthorized access to the Service or related systems.</li>
                <li>Use automated means (scrapers, bots) to access the Service without our written permission.</li>
                <li>Infringe the intellectual property, privacy, or other rights of others.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <SectionHeader title="5. User Content" />
            <div className="text-sm text-gray-700 mt-4 space-y-3">
              <p>If you submit reviews, photos, or other content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content in connection with the Service.</p>
              <p>You are responsible for the content you submit. We may remove content that violates these Terms or applicable law.</p>
            </div>
          </section>

          <section className="mb-10">
            <SectionHeader title="6. Intellectual Property" />
            <div className="text-sm text-gray-700 mt-4 space-y-3">
              <p>The Service and its content (excluding user content) are owned by us or our licensors and are protected by intellectual property laws. We grant you a limited, non-transferable license to use the Service for its intended purpose.</p>
              <p>For copyright concerns, see our <a href="/intellectual-property-policy" className="text-orange-500 hover:underline">Intellectual Property Policy</a>.</p>
            </div>
          </section>

          <section className="mb-10">
            <SectionHeader title="7. Disclaimers" />
            <div className="text-sm text-gray-700 mt-4 space-y-3">
              <p>The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, whether express or implied, to the fullest extent permitted by law.</p>
              <p>We do not warrant that the Service will be uninterrupted, error-free, or free of harmful components.</p>
            </div>
          </section>

          <section className="mb-10">
            <SectionHeader title="8. Limitation of Liability" />
            <div className="text-sm text-gray-700 mt-4 space-y-3">
              <p>To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising out of or in connection with your use of the Service.</p>
            </div>
          </section>

          <section className="mb-10">
            <SectionHeader title="9. Termination" />
            <div className="text-sm text-gray-700 mt-4 space-y-3">
              <p>You may stop using the Service at any time. We may suspend or terminate access to the Service at our discretion, with or without notice, including for violations of these Terms.</p>
            </div>
          </section>

          <section className="mb-10">
            <SectionHeader title="10. Changes to These Terms" />
            <div className="text-sm text-gray-700 mt-4 space-y-3">
              <p>We may update these Terms from time to time. We will indicate the &quot;Last Updated&quot; date at the top when we do. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.</p>
            </div>
          </section>

          <section className="mb-10">
            <SectionHeader title="11. Contact" />
            <div className="text-sm text-gray-700 mt-4 space-y-3">
              <p>If you have questions about these Terms, contact us:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Email: <a href="mailto:support@temustores.com" className="text-orange-500 hover:underline">support@temustores.com</a></li>
                <li>Business name: <strong>[FILL IN YOUR REGISTERED BUSINESS NAME]</strong></li>
                <li>Business address: <strong>[FILL IN YOUR REGISTERED BUSINESS ADDRESS]</strong></li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
      <ChevronDown className="w-4 h-4 text-gray-900" />
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
    </div>
  )
}
