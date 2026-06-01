"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const sections = [
  { id: "what-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Information" },
  { id: "how-we-share", label: "How We Share Your Information" },
  { id: "your-rights", label: "Your Rights and Choices" },
  { id: "children", label: "Children" },
  { id: "data-security", label: "Data Security and Retention" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact-us", label: "Contact Us" },
]

export default function PrivacyPolicyPage() {
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
      <div>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-orange-500">Home</a>
            <span>›</span>
            <span className="text-gray-900">Privacy Policy</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Privacy Policy</h1>
        <p className="text-sm text-gray-500 text-center mt-2">Last Updated: November 14, 2025</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-36">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "block w-full text-left px-3 py-2 text-sm transition-colors border-l-3",
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

          <main className="flex-1 min-w-0">
            <div className="mb-8 text-sm text-gray-700 leading-relaxed space-y-4">
              <p>
                This Privacy Policy describes how Tamu Stores (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares
                information about you when you use our website at temustores.com and related services (the &quot;Service&quot;).
              </p>
              <p>
                By using the Service, you agree to the practices described in this Privacy Policy. If you do not agree, please do not use the Service.
              </p>
            </div>

            <section
              id="what-we-collect"
              ref={(el) => { sectionRefs.current["what-we-collect"] = el }}
              className="mb-10"
            >
              <SectionHeader title="Information We Collect" />
              <div className="text-sm text-gray-700 mt-4 space-y-4">
                <p>We collect information you provide to us directly, information we collect automatically, and information from third parties.</p>

                <h3 className="font-semibold text-gray-900">Information you provide</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Account information:</strong> email address, phone number, name, password, and profile details when you create an account.</li>
                  <li><strong>Order information:</strong> shipping address, billing address, contact details, and items purchased.</li>
                  <li><strong>Payment information:</strong> processed by our third-party payment providers; we do not store full payment card numbers.</li>
                  <li><strong>Customer support:</strong> the content of messages, attachments, and feedback you send us.</li>
                  <li><strong>User content:</strong> product reviews, ratings, photos, and other content you submit.</li>
                </ul>

                <h3 className="font-semibold text-gray-900">Information collected automatically</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Device data:</strong> device model, operating system, browser type, language, and unique identifiers.</li>
                  <li><strong>Usage data:</strong> pages viewed, links clicked, time spent, referring URL, and other interactions with the Service.</li>
                  <li><strong>Approximate location:</strong> derived from your IP address.</li>
                  <li><strong>Cookies and similar technologies:</strong> used to maintain sessions, remember preferences, and measure performance.</li>
                </ul>

                <h3 className="font-semibold text-gray-900">Information from third parties</h3>
                <p>We may receive information from payment processors, fraud-prevention services, logistics providers, and advertising partners.</p>
              </div>
            </section>

            <section
              id="how-we-use"
              ref={(el) => { sectionRefs.current["how-we-use"] = el }}
              className="mb-10"
            >
              <SectionHeader title="How We Use Your Information" />
              <div className="text-sm text-gray-700 mt-4 space-y-3">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Provide, operate, and maintain the Service.</li>
                  <li>Process orders, payments, refunds, and deliveries.</li>
                  <li>Authenticate users and secure accounts.</li>
                  <li>Communicate with you about your account, orders, and support requests.</li>
                  <li>Send marketing communications you have opted into, and let you opt out at any time.</li>
                  <li>Improve and personalize the Service.</li>
                  <li>Detect, prevent, and respond to fraud, abuse, and security incidents.</li>
                  <li>Comply with legal obligations and enforce our terms.</li>
                </ul>
              </div>
            </section>

            <section
              id="how-we-share"
              ref={(el) => { sectionRefs.current["how-we-share"] = el }}
              className="mb-10"
            >
              <SectionHeader title="How We Share Your Information" />
              <div className="text-sm text-gray-700 mt-4 space-y-3">
                <p>We do not sell your personal information. We share information only as needed:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Service providers</strong> who help us operate the Service (hosting, analytics, payment processing, fraud prevention, email/SMS delivery, logistics).</li>
                  <li><strong>Merchants and fulfillment partners</strong> who need order details to ship and support your purchase.</li>
                  <li><strong>Legal and safety:</strong> to comply with applicable law, enforce our terms, and protect users and the public.</li>
                  <li><strong>Business transfers:</strong> in connection with a merger, acquisition, or sale of assets, subject to standard confidentiality protections.</li>
                </ul>
              </div>
            </section>

            <section
              id="your-rights"
              ref={(el) => { sectionRefs.current["your-rights"] = el }}
              className="mb-10"
            >
              <SectionHeader title="Your Rights and Choices" />
              <div className="text-sm text-gray-700 mt-4 space-y-3">
                <p>Depending on where you live, you may have rights to access, correct, delete, or export your personal information, and to object to certain uses.</p>
                <p>You can manage account details and communication preferences from your account settings, or contact us using the details below.</p>
                <p>You can also control cookies through your browser settings. Disabling cookies may affect parts of the Service.</p>
              </div>
            </section>

            <section
              id="children"
              ref={(el) => { sectionRefs.current["children"] = el }}
              className="mb-10"
            >
              <SectionHeader title="Children" />
              <div className="text-sm text-gray-700 mt-4 space-y-3">
                <p>The Service is intended for users 18 and older. We do not knowingly collect personal information from children under 13. If you believe a child has provided information to us, please contact us so we can delete it.</p>
              </div>
            </section>

            <section
              id="data-security"
              ref={(el) => { sectionRefs.current["data-security"] = el }}
              className="mb-10"
            >
              <SectionHeader title="Data Security and Retention" />
              <div className="text-sm text-gray-700 mt-4 space-y-3">
                <p>We use reasonable technical and organizational measures to protect your information. No method of transmission or storage is completely secure.</p>
                <p>We retain personal information as long as needed to provide the Service, comply with legal obligations, resolve disputes, and enforce our agreements.</p>
              </div>
            </section>

            <section
              id="changes"
              ref={(el) => { sectionRefs.current["changes"] = el }}
              className="mb-10"
            >
              <SectionHeader title="Changes to This Policy" />
              <div className="text-sm text-gray-700 mt-4">
                <p>We may update this Privacy Policy from time to time. We will indicate the &quot;Last Updated&quot; date at the top when we do, and material changes will be communicated through the Service.</p>
              </div>
            </section>

            <section
              id="contact-us"
              ref={(el) => { sectionRefs.current["contact-us"] = el }}
              className="mb-10"
            >
              <SectionHeader title="Contact Us" />
              <div className="text-sm text-gray-700 mt-4 space-y-3">
                <p>If you have questions about this Privacy Policy or how we handle your information, contact us:</p>
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
