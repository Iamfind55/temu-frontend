"use client";

import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-red-900 via-orange-800 to-red-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        <div className="flex items-center justify-between">
          {/* Left Content */}
          <div className="flex-1 z-10">
            <div className="space-y-4">
              <h1 className="text-white text-5xl font-black leading-tight">
                Early Black Friday Event
              </h1>
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-6xl font-black leading-tight">
                TONS OF GREAT
                <br />
                DEALS
              </h2>
              <Button variant="black" size="xl" className="mt-6 uppercase tracking-wide">
                Shop Now ›
              </Button>
            </div>
          </div>

          {/* Right Product Showcase */}
          <div className="flex gap-4 items-center">
            {/* Product 1 */}
            <div className="bg-white rounded-2xl p-4 shadow-2xl transform hover:scale-105 transition-transform cursor-pointer">
              <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                <div className="text-6xl">📱</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-temu-orange">$250.50</div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white rounded-2xl p-4 shadow-2xl transform hover:scale-105 transition-transform cursor-pointer">
              <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                <div className="text-6xl">⚡</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-temu-orange">$30.27</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-1/4 text-6xl opacity-50 animate-bounce">🎁</div>
        <div className="absolute bottom-10 left-1/4 text-5xl opacity-50 animate-pulse">✨</div>
        <div className="absolute top-1/2 right-10 text-4xl opacity-50">💰</div>
      </div>
    </section>
  );
}
