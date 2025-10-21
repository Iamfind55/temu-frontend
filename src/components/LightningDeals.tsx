"use client";

import { Card } from "@/components/ui/card";

const deals = [
  {
    id: 1,
    title: "Solar Camera Security Wireless Outdoor",
    price: "$19.60",
    originalPrice: "$103.44",
    sold: "2.7K+",
    discount: "-81% limited time",
    rating: 397,
    emoji: "📷",
    badge: "AD",
  },
  {
    id: 2,
    title: "M1 Electric Bike For Adults, 32 Miles Range",
    price: "$342.67",
    originalPrice: "$800.00",
    sold: "30",
    discount: "-57% last 2 days",
    rating: 2,
    emoji: "🚲",
  },
  {
    id: 3,
    title: "Notebook Computer Backpack for Men and Women",
    price: "$10.90",
    originalPrice: "$85.07",
    sold: "1.1K+",
    discount: "-87% last 3 days",
    rating: 102,
    emoji: "🎒",
  },
  {
    id: 4,
    title: "Women's Halloween Cardigan V-Neck Sweater",
    price: "$22.20",
    originalPrice: "",
    sold: "3.9K+",
    discount: "Last 3 days",
    rating: 181,
    emoji: "👕",
  },
  {
    id: 5,
    title: "2pcs Spiral Table Lamps LED Adjustable",
    price: "$8.22",
    originalPrice: "$77.16",
    sold: "11K+",
    discount: "-89% limited time",
    rating: 1636,
    emoji: "💡",
    badge: "AD",
  },
];

export function LightningDeals() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 rounded-xl p-4 mb-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <h2 className="text-white text-2xl font-black">Lightning deals</h2>
            <span className="text-white/90 text-sm font-medium">Limited time offer</span>
          </div>
          <button className="text-white hover:text-white/90 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Cards */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {deals.map((deal) => (
            <Card key={deal.id} className="flex-shrink-0 w-64 hover:shadow-xl transition-shadow cursor-pointer relative">
              {deal.badge && (
                <div className="absolute top-2 right-2 bg-gray-200 text-xs font-bold px-2 py-1 rounded">
                  {deal.badge}
                </div>
              )}
              <div className="p-4">
                <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <div className="text-7xl">{deal.emoji}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-temu-orange">{deal.price}</span>
                    {deal.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">{deal.originalPrice}</span>
                    )}
                    <span className="text-xs text-gray-600">{deal.sold} sold</span>
                  </div>
                  <div className="text-xs font-bold text-red-600">{deal.discount}</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-600 ml-1">{deal.rating}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </section>
  );
}
