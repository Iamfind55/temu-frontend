"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const products = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Women's Summer Dress Casual Floral Print ${i + 1}`,
  price: `$${(Math.random() * 50 + 10).toFixed(2)}`,
  originalPrice: `$${(Math.random() * 100 + 50).toFixed(2)}`,
  rating: Math.floor(Math.random() * 5) + 3,
  reviews: Math.floor(Math.random() * 1000) + 100,
  sold: `${Math.floor(Math.random() * 10)}K+`,
  discount: `-${Math.floor(Math.random() * 50 + 30)}%`,
  emoji: ["👗", "👚", "👕", "🎽", "🧥"][Math.floor(Math.random() * 5)],
}));

export default function CategoryPage() {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedRating, setSelectedRating] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-temu-orange transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/category" className="hover:text-temu-orange transition-colors">Women's Fashion</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Dresses</span>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-black mb-2">Women's Dresses</h1>
          <p className="text-white/90">Discover the latest trends in women's fashion</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button className="text-temu-orange text-sm hover:underline">Clear all</button>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-bold mb-4">Price Range</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-temu-orange focus:ring-temu-orange" />
                    <span className="text-sm">Under $20</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-temu-orange focus:ring-temu-orange" />
                    <span className="text-sm">$20 - $50</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-temu-orange focus:ring-temu-orange" />
                    <span className="text-sm">$50 - $100</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-temu-orange focus:ring-temu-orange" />
                    <span className="text-sm">Over $100</span>
                  </label>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-bold mb-4">Customer Rating</h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-temu-orange focus:ring-temu-orange" />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rating }).map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm ml-1">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-bold mb-4">Color</h3>
                <div className="grid grid-cols-5 gap-2">
                  {["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF00FF", "#FFA500", "#800080", "#FFC0CB"].map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-temu-orange transition-colors"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <h3 className="font-bold mb-4">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:border-temu-orange hover:text-temu-orange transition-colors text-sm"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-span-3">
            {/* Sort Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Showing</span>
                <span className="font-bold">1,234</span>
                <span className="text-gray-600">results</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Best Selling</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-3 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="p-3">
                    <div className="relative mb-3">
                      <div className="w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <div className="text-7xl">{product.emoji}</div>
                      </div>
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}
                      </div>
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
                        <span className="text-xl font-black text-temu-orange">{product.price}</span>
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
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

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline" size="sm">Previous</Button>
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  size="sm"
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
