"use client"

import Link from "next/link"

export function ShopFooter() {
   return (
      <footer className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-gray-500 py-6">
         <div className="flex items-center justify-center gap-2">
            <p>© 2025 WhaleCo Inc.</p>
            <Link href="/shop-landing/seller-policy" className="underline">Seller Privacy Policy</Link>
         </div>
         <div className="flex items-center justify-center gap-2">
            Seller registered in the Chinese Mainland or Hong Kong,
            <Link href="#" className="underline">click here</Link>
         </div>
      </footer>
   )
}
