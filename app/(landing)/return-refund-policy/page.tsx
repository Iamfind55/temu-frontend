"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "how-to-return", label: "How do I make a return?" },
  { id: "return-shipping-free", label: "Is the return shipping free?" },
  { id: "find-return-label", label: "Where can I find the return label after applying?" },
  { id: "return-window", label: "How long do I have before making a return?" },
  { id: "refunds", label: "Refunds" },
  { id: "refund-timeline", label: "Refund timeline" },
  { id: "important-notice", label: "Important Notice" },
]

const refundTimelineData = [
  { method: "Credit balance", icon: "credit", time: "Instant" },
  { method: "Apple Pay", icon: "apple", time: "1-5 business days" },
  { method: "PayPal", icon: "paypal", time: "1-5 business days" },
  { method: "Card", icon: "card", time: "5-14 business days (occasionally up to 30 days)" },
  { method: "PayPal Pay Later", icon: "paypal", time: "3-5 business days" },
  { method: "Klarna", icon: "klarna", time: "5-7 business days" },
  { method: "Afterpay", icon: "afterpay", time: "3-5 business days" },
  { method: "Google Pay", icon: "google", time: "1-5 business days" },
  { method: "Cash App Pay", icon: "cashapp", time: "1-10 business days" },
  { method: "Affirm", icon: "affirm", time: "3-10 business days" },
  { method: "Venmo", icon: "venmo", time: "1-5 business days" },
  { method: "Zip", icon: "zip", time: "1-3 business days" },
  { method: "Klarna Monthly financing", icon: "klarna", time: "5-7 business days" },
  { method: "Your bank account", icon: "bank", time: "1-4 business days" },
]

export default function ReturnRefundPolicyPage() {
  const [activeSection, setActiveSection] = useState("how-to-return")
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
            <span className="text-gray-900">Tamu | Return and Refund Policy</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900 text-center">Tamu | Return and Refund Policy</h1>
        <p className="text-xs text-gray-500 text-center mt-2">Last Updated: Aug 27, 2025 PDT</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex gap-8">
          {/* Sticky Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Contents</h3>
              <nav className="space-y-1">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "block w-full text-left px-3 py-2 text-sm transition-colors border-l-2",
                      activeSection === section.id
                        ? "border-orange-500 text-orange-500 bg-orange-50/50 font-medium"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {index + 1}. {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="text-xs flex-1 min-w-0">
            {/* Introduction */}
            <p className="text-gray-700 mb-8 leading-relaxed">
              If you are not satisfied with what you bought on Tamu, you may be eligible to return it and get a refund by following the simple procedure set out in this Return and Refund Policy.
            </p>

            {/* Section 1: How do I make a return? */}
            <section
              id="how-to-return"
              ref={(el) => { sectionRefs.current["how-to-return"] = el }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">1. How do I make a return?</h2>

              <img src="/images/refund-01.webp" alt="image-01" />
              <p className="text-gray-700 my-4">You can make a return by following these steps:</p>
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-medium">I.</span> Please go to your Tamu account on Temu.com or on the app to request a refund. If you do not have a Tamu account, please click on "Save your Order" in your Tamu order email to make a return.
                </p>
                <p>
                  <span className="font-medium">II.</span> Find the relevant order in "Your Orders" and click on the "Return/Refund" button.
                </p>
                <p>
                  <span className="font-medium">III.</span> Select the items you would like to return and the reason for the return. Depending on the reason you selected, you may be required to provide further information related to the order. After you provide the required information, click the "Next Step" button to proceed.
                </p>
                <p>
                  <span className="font-medium">IV.</span> If there is no need to return your items, then your final step is simply to select your refund method. You may choose to receive your refund as a Tamu credit balance or be credited back via your original payment method. Make your selection and click "Submit".
                </p>
                <p>
                  <span className="font-medium">V.</span> If you need to return your items, you will have the option to choose your return and refund methods. After you submit the request, we will provide you with a return label so that you can return the items. <span className="text-orange-500">Return shipping is free on your first return of one or multiple returnable items for EVERY order within 90 days from the date of purchase</span> with <a href="#" className="text-orange-500 underline">some exceptions</a>. <span className="text-orange-500">Pickup return method may charge for an additional fee.</span>
                </p>
                <p>
                  <span className="font-medium">VI.</span> <span className="text-orange-500">Please place all returned items into one package and use the return label we provided to send it. The original barcode for each item should also be included.</span>
                </p>

                <p className="text-gray-700">If you cannot find it:</p>
                <ul className="list-disc list-inside space-y-2 text-orange-500">
                  <li>Please use transparent bags to individually package items without barcodes before placing them in the return package.</li>
                </ul>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>After the warehouse receives the items and they pass quality inspection, the refund will be issued.</li>
                  <li>If you do not receive the refund afterwards, please contact us for further assistance.</li>
                </ul>

                <p>Please make sure to keep the barcode of each item in your next purchase so that you can receive your refund smoothly.</p>

                <p>
                  <span className="font-medium">VII.</span> <span className="text-orange-500">After placing all the return items in one package, please print and tape the return label we provided onto the outside of the package.</span> Send your package back from the nearest <a href="#" className="text-orange-500 underline">USPS/UPS</a> location and you're done!
                </p>

                <p>
                  <span className="font-medium">VIII.</span> You can check the refund status of your items on your order details page or through Tamu's SMS/Email/Push notifications.
                </p>
              </div>
              <img src="/images/refund-02.webp" alt="image-02" className="mt-6" />
            </section>

            {/* Section 2: Is the return shipping free? */}
            <section
              id="return-shipping-free"
              ref={(el) => { sectionRefs.current["return-shipping-free"] = el }}
              className="mb-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Is the return shipping free?</h2>
              <p className="text-green-600 mb-4">
                Return shipping is free on your first return of one or multiple returnable items for EVERY order within the return window. <span className="text-orange-500">Pickup return method may charge for an additional fee.</span>
              </p>

              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-4">
                <li>If you need to return an oversized or overweight item or return items from a remote area you may have to send the items back by yourself. You need to pay the shipping cost in advance, and then contact us for reimbursement. After the items have been returned and have passed quality inspection, we will reimburse you.</li>
                <li>If you have already returned items from an order and would like to return additional items from that same order, you can still do so as long as the return window has not closed.</li>
              </ul>

              <p className="text-gray-700 mb-4">We recommend that you try to send back your return items in one shipment to avoid paying additional fees.</p>

              <p className="text-gray-700">For the second and subsequent refunds from the same order, you can use the return label we provide. The shipping fee of $7.99 plus tax depending on the shipping address of the order will be deducted from your refund. The tax will be added once you have applied for the refund.</p>
            </section>

            <section
              id="find-return-label"
              ref={(el) => { sectionRefs.current["find-return-label"] = el }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Where can I find the return label after applying?</h2>

              <p className="text-gray-700 mb-4">You can find your return label in two different locations in <strong>"Your Orders"</strong></p>

              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Click on <strong>"All Orders"</strong>→<strong>"Print your return label and start return"</strong>→click on <strong>"Print return label"</strong></li>
                <li>You may also click <strong>"Returns"</strong>→<strong>"Print return label"</strong>→to download and print your return label.</li>
              </ul>
              <img src="/images/refund-03.webp" alt="image-03" />
            </section>

            {/* Section 4: How long do I have before making a return? */}
            <section
              id="return-window"
              ref={(el) => { sectionRefs.current["return-window"] = el }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">4. How long do I have before making a return?</h2>

              <p className="text-orange-500 mb-4">You can return items within 90 days of purchase, with some exceptions:</p>

              <p className="text-gray-700 mb-2">I. Items that can't be returned:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Clothing items that have been worn, washed, or damaged after delivery, or have had their tags or hygiene stickers removed.</li>
                <li>Grocery and food products.</li>
                <li>Some health and personal care items.</li>
                <li>Some free gifts.</li>
                <li>Some customized products.</li>
                <li>Some underwear orders.</li>
              </ul>

              <p className="text-gray-700 mb-4">
                Sellers may indicate that certain items are not eligible for returns, <a href="#" className="text-orange-500 underline">subject to Tamu Return and Refund Policy</a>. Please check product detail pages for more information.
              </p>

              <p className="text-gray-700 mb-4">II. The return window for most electronics is 45, 60, or 90 days from the date of purchase depending on the seller.</p>

              <p className="text-gray-700">
                If an item is eligible for a return and refund, you may return it within the return window. You must <a href="#" className="text-orange-500 underline">send your return package back within 14 days of submitting your return request</a>. You cannot return items after the return window has closed.
              </p>
            </section>

            {/* Section 5: Refunds */}
            <section
              id="refunds"
              ref={(el) => { sectionRefs.current["refunds"] = el }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">5. Refunds</h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  <span className="font-medium">I.</span> You may receive an advance refund, where we will issue the refund after you dropped off your return package. If the items were not returned or the returned items do not pass quality inspection, we may charge your original payment method. The advance refund will be granted based on your shopping history and at our sole discretion.
                </p>
                <p>
                  <span className="font-medium">II.</span> You may receive an instant refund, where we will issue the refund before you have returned the items. If the items were not returned or the returned items do not pass quality inspection, we may charge your original payment method. The instant refund will be granted based on your shopping history and at our sole discretion.
                </p>
                <p>
                  <span className="font-medium">III.</span> For refunds of returned items, <span className="text-orange-500">we will process your refund after the items are received and pass quality inspection.</span>
                </p>
                <p>
                  <span className="font-medium">IV.</span> If the returned item is used or damaged, has missing parts/accessories, or damaged due to improper packaging during return shipping, and this is not due to Tamu or the seller, the refund will be reduced to compensate for the lost value of the item.
                </p>
                <p className="font-medium">iPhone refund instructions:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>The iPhone should be returned in new, unused, and unactivated condition with all original accessories and product packaging.</li>
                  <li>If the iPhone arrived damaged or malfunctioning, and it is confirmed not to be due to the user's actions, a full refund will be issued.</li>
                  <li>If the iPhone shows signs of use, is damaged, or is missing parts or accessories, not due to Tamu's or the seller's error, the refund will be adjusted based on the quality inspection.</li>
                  <li>The returned iPhone must match the original order's serial number. Mismatching serial numbers will result in a denied refund request.</li>
                  <li>Note: Please ensure that all personal information is completely deleted from the device before returning it.</li>
                </ul>
                <p>
                  <span className="font-medium">V.</span> Refunds of missing items: Find the corresponding order in the support center, then select "missing item/parts" to apply for a refund, or contact customer service/the seller for help.
                </p>
                <p>
                  <span className="font-medium">VI.</span> Refunds of a package showing as delivered but not received: Find the corresponding order in the support center, then select "package shows delivered but not received" to apply for a refund, or contact customer service/the seller for help.
                </p>
                <p>
                  <span className="font-medium">VII.</span> <span className="text-orange-500">Depending on your financial institution, refunds can take 5-14 business days (up to 30 days) to be credited to your original payment account.</span> The original shipping fee and import tax are not refundable if your return is not a result of Tamu's or the seller's fault. The insurance costs, if any, are also non-refundable. The sign on delivery fee, if any, is not refundable if the items have been delivered successfully.
                </p>
                <p>
                  <span className="font-medium">VIII.</span> You can choose to accept Tamu credits instead of a refund to the original payment method.
                </p>
                <ul className="list-disc list-inside space-y-2 text-orange-500">
                  <li>Refunds to Tamu credits are faster than your original payment method.</li>
                </ul>
                <ul className="list-disc list-inside space-y-2">
                  <li>Tamu credits have no expiration date.</li>
                  <li>Refunds to Tamu credit typically cannot be reversed once they are processed.</li>
                  <li>Typically, Tamu credits cannot be redeemed for cash and can only be used for purchases on Tamu.</li>
                </ul>
                <p>
                  For more information about Tamu credits, please visit: <a href="#" className="text-orange-500 underline">About credit balance.</a>
                </p>
              </div>
            </section>

            {/* Section 6: Refund timeline */}
            <section
              id="refund-timeline"
              ref={(el) => { sectionRefs.current["refund-timeline"] = el }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">6. Refund timeline</h2>

              <p className="text-gray-700 mb-6">Once the refund is processed, your financial institution will need additional time to have it reflected in your account. Refer to the following table for more details.</p>

              <img src="/images/refund-04.webp" alt="image-04" className="mb-6" />
            </section>

            {/* Section 7: Important Notice */}
            <section
              id="important-notice"
              ref={(el) => { sectionRefs.current["important-notice"] = el }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">7. Important Notice</h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  <span className="font-medium">I.</span> The address attached to your package is NOT the return address you should use. If you send the return package to any other address, the processing time for your return may be delayed. You should send the return package to the address on the return label provided with your purchase.
                </p>
                <p>
                  <span className="font-medium">II.</span> Please make sure that you do NOT accidentally include any items in your return package that you do not wish to return. If you have accidentally included a wrong item, please contact <a href="#" className="text-orange-500 underline">Customer Service</a>. We cannot promise that wrong items will be found and returned and we do not store or provide refunds or compensation for such items.
                </p>
                <p className="font-medium">If you have any questions regarding returns or this policy:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>For local warehouse items: please reach out to the seller by navigating to "Return Details" and selecting "Contact the seller".</li>
                  <li>For all other items: please contact our customer service.</li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
