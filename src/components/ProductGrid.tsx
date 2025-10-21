"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    title: "Temu Top, C",
    price: "$2.56",
    sold: "16 sold",
    emoji: "📱",
  },
  {
    id: 2,
    title: "Temu Hot, 2pcs * Beaded Lace Short Curtain",
    price: "$17.08",
    originalPrice: "$31.99",
    sold: "3.8K+ sold",
    rating: 107,
    emoji: "🪟",
  },
  {
    id: 3,
    title: "Temu Top, 24pcs Medium Stiletto Press On Nails",
    price: "$1.07",
    originalPrice: "$8.33",
    sold: "11K+ sold",
    rating: 625,
    emoji: "💅",
  },
  {
    id: 4,
    title: "Temu Hot, Floral Print Shirred Dress",
    price: "$12.46",
    originalPrice: "$51.88",
    sold: "24K+ sold",
    rating: 613,
    emoji: "👗",
  },
  {
    id: 5,
    title: "Temu Top, 1 Sheet Full Arm Temporary Tattoo",
    price: "$2.03",
    originalPrice: "$2.93",
    sold: "2.3K+ sold",
    rating: 14,
    emoji: "🎨",
  },
];

export function ProductGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-3xl">⚡</span>
          <h2 className="text-red-800 text-2xl font-black uppercase">Early Black Friday</h2>
          <span className="text-3xl">⚡</span>
        </div>
        <h3 className="text-3xl font-black text-gray-900">EXPLORE YOUR INTERESTS</h3>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-5 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="p-3">
              {/* Product Image */}
              <div className="relative mb-3">
                <div className="w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                  <div className="text-6xl">{product.emoji}</div>
                </div>
                {/* Quick Look Button */}
                <button className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-1.5">
                <h4 className="text-xs text-gray-700 line-clamp-2 h-8">{product.title}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-temu-orange">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                  )}
                </div>
                <div className="text-xs text-gray-600">{product.sold}</div>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button size="sm" className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg" className="min-w-48">
          Load More Products
        </Button>
      </div>
    </section>
  );
}
