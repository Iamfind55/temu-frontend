"use client";

import { Button } from "@/components/ui/button";

export function PromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Top Row - 3 Banners */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Local Warehouse */}
        <div className="bg-gradient-to-br from-temu-green via-green-500 to-green-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold mb-3">
              🏪 LOCAL WAREHOUSE
            </div>
            <h3 className="text-3xl font-black mb-2">Fast Delivery</h3>
            <div className="text-5xl font-black mb-4">FROM $1.99</div>
            <Button variant="black" size="lg" className="uppercase">
              Shop Now ▸
            </Button>
          </div>
          <div className="absolute bottom-4 right-4 text-8xl opacity-20">🚚</div>
        </div>

        {/* Price Drop */}
        <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold mb-3">
              🏷️ SAVE UP TO $50
            </div>
            <h3 className="text-5xl font-black mb-4 leading-tight">
              PRICE DROP
            </h3>
            <Button variant="black" size="lg" className="uppercase">
              Shop Now ▸
            </Button>
          </div>
          <div className="absolute top-8 right-8 text-6xl opacity-20">✨</div>
          <div className="absolute bottom-4 right-4 text-6xl opacity-20">⭐</div>
        </div>

        {/* Popular Products */}
        <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-2 leading-tight">
              TEMU POPULAR<br/>PRODUCTS
            </h3>
            <Button variant="black" size="lg" className="mt-4 uppercase">
              Shop Now &gt;
            </Button>
          </div>
          <div className="absolute top-4 right-4 text-6xl">⭐</div>
          <div className="absolute bottom-8 right-8 text-5xl opacity-20">🔥</div>
        </div>
      </div>

      {/* Bottom Row - 2 Banners */}
      <div className="grid grid-cols-2 gap-4">
        {/* Hot Deals */}
        <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-red-600 text-3xl font-black mb-2 uppercase">SCORE</div>
            <div className="text-red-600 text-6xl font-black mb-4 leading-tight">
              HOT DEALS
            </div>
            <Button variant="default" size="xl" className="bg-red-600 hover:bg-red-700 uppercase">
              Click to Get &gt;
            </Button>
          </div>
        </div>

        {/* Crazy Discounts */}
        <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-white text-6xl font-black mb-4 leading-tight italic">
              CRAZY<br/>DISCOUNTS
            </div>
            <Button variant="default" size="xl" className="bg-white text-temu-orange hover:bg-gray-100 uppercase font-black">
              Shop Now &gt;
            </Button>
          </div>
          <div className="absolute bottom-4 right-4 text-8xl">🛒</div>
        </div>
      </div>

      {/* Shop Now Pay Later */}
      <div className="bg-black rounded-2xl p-6 mt-4 text-center">
        <div className="flex items-center justify-center gap-4">
          <h3 className="text-white text-2xl font-black italic">Shop now, pay later with</h3>
          <div className="flex items-center gap-3">
            <div className="bg-green-600 text-white px-3 py-1 rounded font-bold text-sm">Pay in 4</div>
            <div className="bg-pink-100 text-pink-600 px-3 py-1 rounded font-bold text-sm">Klarna</div>
            <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-sm">Affirm</div>
          </div>
        </div>
      </div>
    </section>
  );
}
