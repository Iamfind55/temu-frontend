import { ChevronDown } from "lucide-react"
import { FAQ } from "@/app/interface/vip-level"

interface FAQItemProps {
   faq: FAQ
   isOpen: boolean
   onToggle: () => void
}

export function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
   return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
         <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-2 sm:p-3 text-left hover:bg-gray-50 transition-colors"
         >
            <span className="font-semibold text-gray-900 text-sm sm:text-sm">{faq.question}</span>
            <ChevronDown
               className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
         </button>
         {isOpen && (
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-100">
               <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-4">
                  {faq.answer}
               </p>
            </div>
         )}
      </div>
   )
}
