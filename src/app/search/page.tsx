"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Suspense } from "react";

const searchResults = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1} matching your search`,
  price: `$${(Math.random() * 50 + 10).toFixed(2)}`,
  originalPrice: `$${(Math.random() * 100 + 50).toFixed(2)}`,
  rating: Math.floor(Math.random() * 5) + 3,
  reviews: Math.floor(Math.random() * 1000) + 100,
  sold: `${Math.floor(Math.random() * 10)}K+`,
  discount: `-${Math.floor(Math.random() * 50 + 30)}%`,
  emoji: ["📱", "💻", "⌚", "🎧", "📷", "🎮", "🖥️", "⌨️"][Math.floor(Math.random() * 8)],
}));

const relatedSearches = [
  "wireless headphones",
  "bluetooth headphones",
  "noise cancelling headphones",
  "gaming headphones",
  "sport headphones",
  "headphones with mic",
];

function SearchContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  defaultValue="headphones"
                  className="w-full pl-4 pr-12 py-3 border-2 border-gray-300 rounded-full text-base focus:outline-none focus:border-temu-orange"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-temu-orange hover:bg-temu-orange-dark text-white p-2 rounded-full transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span className="font-medium">Search results for:</span>
            <span className="font-bold text-gray-900">"headphones"</span>
            <span>—</span>
            <span className="font-bold text-temu-orange">1,234 items</span>
          </div>

          {/* Related Searches */}
          <div>
            <span className="text-sm text-gray-600 mr-3">Related searches:</span>
            <div className="inline-flex flex-wrap gap-2">
              {relatedSearches.map((search, i) => (
                <button
                  key={i}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Sort and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              All Filters
            </Button>

            <div className="h-6 w-px bg-gray-300"></div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-temu-orange text-white rounded-full text-sm font-medium">
                All
              </button>
              <button className="px-3 py-1.5 hover:bg-gray-100 rounded-full text-sm">
                Under $20
              </button>
              <button className="px-3 py-1.5 hover:bg-gray-100 rounded-full text-sm">
                $20-$50
              </button>
              <button className="px-3 py-1.5 hover:bg-gray-100 rounded-full text-sm">
                Over $50
              </button>
              <button className="px-3 py-1.5 hover:bg-gray-100 rounded-full text-sm">
                ⭐ 4+ Stars
              </button>
              <button className="px-3 py-1.5 hover:bg-gray-100 rounded-full text-sm">
                Free Shipping
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort:</span>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange text-sm">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Selling</option>
              <option>Newest</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        {/* Search Results Grid */}
        <div className="grid grid-cols-4 gap-4">
          {searchResults.map((product) => (
            <Card key={product.id} className="hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="p-3">
                <div className="relative mb-3">
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <div className="text-6xl">{product.emoji}</div>
                  </div>
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}
                  </div>
                  <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm text-gray-700 line-clamp-2 h-10">{product.title}</h3>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-3 h-3 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-temu-orange">{product.price}</span>
                    <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                  </div>
                  <div className="text-xs text-gray-600">{product.sold} sold</div>
                </div>

                <Button size="sm" className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" className="min-w-48">
            Load More Results
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50"><Header /><div className="py-12 text-center">Loading...</div></div>}>
      <SearchContent />
    </Suspense>
  );
}
