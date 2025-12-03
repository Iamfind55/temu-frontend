"use client"

import Link from "next/link"

export function ShopFooter() {
   return (
      <footer className="w-full flex items-center justify-center gap-4 text-xs text-gray-500 py-6">
         <p>© 2025 WhaleCo Inc.</p>
         <Link href="#" className="underline">Seller Privacy Policy</Link>
         <div className="flex items-center justify-center gap-2">
            Seller registered in the Chinese Mainland or Hong Kong,
            <Link href="#" className="underline">click here</Link>
         </div>
      </footer>
   )
}
