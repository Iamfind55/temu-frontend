"use client";

import Link from "next/link";
import { useState } from "react";

export function QuickNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-temu-orange hover:bg-temu-orange-dark text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl p-4 w-64 border-2 border-temu-orange">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-temu-orange">Quick Navigation</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <nav className="space-y-2 max-h-96 overflow-y-auto">
            <Link
              href="/"
              className="block px-3 py-2 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors"
            >
              🏠 Homepage
            </Link>
            <Link
              href="/category/dresses"
              className="block px-3 py-2 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors"
            >
              📂 Category Page
            </Link>
            <Link
              href="/search"
              className="block px-3 py-2 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors"
            >
              🔍 Search Results
            </Link>
            <Link
              href="/product/1"
              className="block px-3 py-2 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors"
            >
              📦 Product Detail
            </Link>

            <div className="border-t pt-2 mt-2">
              <div className="text-xs font-bold text-gray-500 px-3 py-1">Shopping</div>
              <Link
                href="/cart"
                className="block px-3 py-2 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors"
              >
                🛒 Shopping Cart
              </Link>
              <Link
                href="/wishlist"
                className="block px-3 py-2 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors"
              >
                ❤️ Wishlist
              </Link>
              <Link
                href="/compare"
                className="block px-3 py-2 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors"
              >
                ⚖️ Compare Products
              </Link>
            </div>

            <div className="border-t pt-2 mt-2">
              <div className="text-xs font-bold text-gray-500 px-3 py-1">Account</div>
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors"
              >
                👤 Dashboard
              </Link>
              <Link
                href="/orders/ORD-2024-001234"
                className="block px-3 py-2 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors"
              >
                📍 Track Order
              </Link>
              <Link
                href="/auth/signin"
                className="block px-3 py-2 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors"
              >
                🔐 Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="block px-3 py-2 rounded-lg hover:bg-orange-50 text-sm font-medium transition-colors"
              >
                ✍️ Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
