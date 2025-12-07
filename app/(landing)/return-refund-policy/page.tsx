"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: React.ReactNode
}

const faqItems: FAQItem[] = [
  {
    id: "howReturn",
    question: "How do I make a return?",
    answer: (
      <div className="space-y-3">
        <p><strong>I.</strong> Please go to your Temu account on Temu.com or on the app to request a refund. If you do not have a Temu account, please click on "Save your Order" in your Temu order email to make a return.</p>
        <p><strong>II.</strong> Find the relevant order in "Your Orders" and click on the "Return/Refund" button.</p>
        <p><strong>III.</strong> Select the items you would like to return and the reason for the return. Depending on the reason you selected, you may be required to provide further information related to the order. After you provide the required information, click the "Next Step" button to proceed.</p>
        <p><strong>IV.</strong> If there is no need to return your items, then your final step is simply to select your refund method. You may choose to receive your refund as a Temu credit balance or be credited back via your original payment method. Make your selection and click "Submit".</p>
        <p><strong>V.</strong> If you need to return your items, you will have the option to choose your return and refund methods. After you submit the request, we will provide you with a return label so that you can return the items.</p>
        <p><strong>VI.</strong> Drop off the return package at your local carrier or post office, or schedule a package pickup.</p>
        <p><strong>VII.</strong> Once the item has been returned, your refund will be processed based on your selected refund method.</p>
        <p><strong>VIII.</strong> You can check the refund status of your items on your order details page or through Temu's SMS/Email/Push notifications.</p>
      </div>
    ),
  },
  {
    id: "shippingFeeFree",
    question: "Is the return shipping free?",
    answer: (
      <div className="space-y-3">
        <p><strong>Return shipping is free on your first return of one or multiple returnable items for EVERY order within 90 days from the date of purchase.</strong></p>
        <p>For subsequent returns on the same order, a return shipping fee may apply. The fee will be clearly displayed before you submit your return request.</p>
        <p>Some items may have different return policies. Please check the product detail pages for more information.</p>
      </div>
    ),
  },
  {
    id: "findReturnLabel",
    question: "Where can I find the return label after applying?",
    answer: (
      <div className="space-y-3">
        <p>After your return request is approved, you can find your return label by:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Going to "Your Orders" in your Temu account</li>
          <li>Clicking on "Return Details" for the relevant order</li>
          <li>Downloading or printing the return label from there</li>
        </ul>
        <p>You will also receive the return label via email. Make sure to check your spam folder if you don't see it in your inbox.</p>
      </div>
    ),
  },
  {
    id: "returnDaysWindow",
    question: "How long do I have before making a return?",
    answer: (
      <div className="space-y-3">
        <p><strong>Standard Return Window:</strong> Most items can be returned within <span className="text-orange-500 font-semibold">90 days</span> from the date of purchase.</p>
        <p><strong>Items that can't be returned:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Personalized or custom-made items</li>
          <li>Perishable goods</li>
          <li>Intimate or sanitary goods</li>
          <li>Hazardous materials</li>
          <li>Items marked as non-returnable on the product page</li>
        </ul>
        <p><strong>Electronics:</strong> The return window for most electronics is 45, 60, or 90 days from the date of purchase depending on the seller. Please check the product detail page for specific information.</p>
      </div>
    ),
  },
  {
    id: "refunds",
    question: "Refunds",
    answer: (
      <div className="space-y-3">
        <p><strong>I. Advanced Refund:</strong> You may receive an advanced refund, where we will issue the refund after you dropped off your return package. If the items were not returned or the returned items do not pass quality inspection, we may charge your original payment method.</p>
        <p><strong>II. Instant Refund:</strong> You may receive an instant refund, where we will issue the refund before you have returned the items. If the items were not returned or the returned items do not pass quality inspection, we may charge your original payment method.</p>
        <p><strong>III. Standard Refund:</strong> For refunds of returned items, the refund will be processed after we receive and inspect the returned items.</p>
        <p><strong>IV. Reduced Refund:</strong> If the returned item is used or damaged, has missing parts/accessories, or damaged due to improper packaging during return shipping, and this is not due to Temu or the seller, the refund will be reduced to compensate for the lost value of the item.</p>
        <p><strong>V. Missing Items:</strong> Find the corresponding order in the support center, then select "missing item/parts" to apply for a refund, or contact customer service/the seller for help.</p>
        <p><strong>VI. Package Not Received:</strong> Find the corresponding order in the support center, then select "package shows delivered but not received" to apply for a refund, or contact customer service/the seller for help.</p>
        <p><strong>VII. Refund Methods:</strong> You can choose to accept Temu credits instead of a refund to the original payment method. Refunds to Temu credits are faster than your original payment method.</p>
      </div>
    ),
  },
  {
    id: "refundTimeline",
    question: "Refund timeline",
    answer: (
      <div className="space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold">Refund Method</th>
                <th className="text-left py-2 font-semibold">Processing Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4">Temu Credit</td>
                <td className="py-2">Instant - 24 hours</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">Credit/Debit Card</td>
                <td className="py-2">5-14 business days</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">PayPal</td>
                <td className="py-2">3-5 business days</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">Apple Pay / Google Pay</td>
                <td className="py-2">5-14 business days</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Klarna / Afterpay / Affirm</td>
                <td className="py-2">5-14 business days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-500 text-sm">* Processing times may vary depending on your financial institution.</p>
      </div>
    ),
  },
  {
    id: "importantNotice",
    question: "Important Notice",
    answer: (
      <div className="space-y-3">
        <p className="font-semibold text-red-600">Please Read Carefully:</p>
        <p><strong>Return Address:</strong> The address attached to your package is NOT the return address you should use. If you send the return package to any other address, the processing time for your return may be delayed. You should send the return package to the address on the return label provided with your purchase.</p>
        <p><strong>Wrong Items:</strong> Please make sure that you do NOT accidentally include any items in your return package that you do not wish to return. If you have accidentally included a wrong item, please contact customer service immediately.</p>
        <p>For any questions or assistance with returns and refunds, please contact our customer service team through the Temu app or website. We're here to help!</p>
      </div>
    ),
  },
]

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-base font-medium text-gray-900">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-4 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[2000px] pb-4" : "max-h-0"
        }`}
      >
        <div className="text-gray-600 text-sm leading-relaxed">{item.answer}</div>
      </div>
    </div>
  )
}

export default function ReturnRefundPolicyPage() {
  const [openItems, setOpenItems] = useState<string[]>(["howReturn"])

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Return and Refund Policy</h1>
          <p className="text-sm text-gray-500">Last Updated: Aug 27, 2025 PDT</p>
        </div>

        {/* Introduction */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          If you are not satisfied with what you bought on Temu, you may be eligible to return it and get a refund by following the simple procedure set out in this Return and Refund Policy.
        </p>

        {/* Accordion FAQ */}
        <div className="border-t border-gray-200">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openItems.includes(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Need more help? Visit our{" "}
            <a href="/support" className="text-orange-500 hover:underline">
              Support Center
            </a>{" "}
            or contact customer service.
          </p>
        </div>
      </div>
    </div>
  )
}
