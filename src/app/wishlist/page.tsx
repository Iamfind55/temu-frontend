"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingCart, Trash2, Share2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const wishlistItems = [
  {
    id: 1,
    title: "Premium Wireless Bluetooth Headphones - Noise Cancelling",
    price: "$29.99",
    originalPrice: "$89.99",
    rating: 4.8,
    reviews: 1234,
    discount: "-67%",
    inStock: true,
    emoji: "🎧",
  },
  {
    id: 2,
    title: "Women's Summer Floral Print Dress",
    price: "$24.99",
    originalPrice: "$59.99",
    rating: 4.5,
    reviews: 856,
    discount: "-58%",
    inStock: true,
    emoji: "👗",
  },
  {
    id: 3,
    title: "Wireless Gaming Mouse RGB LED",
    price: "$19.99",
    originalPrice: "$49.99",
    rating: 4.7,
    reviews: 542,
    discount: "-60%",
    inStock: false,
    emoji: "🖱️",
  },
  {
    id: 4,
    title: "Smart Watch Fitness Tracker",
    price: "$39.99",
    originalPrice: "$129.99",
    rating: 4.6,
    reviews: 2103,
    discount: "-69%",
    inStock: true,
    emoji: "⌚",
  },
  {
    id: 5,
    title: "Professional Camera Lens Kit",
    price: "$89.99",
    originalPrice: "$249.99",
    rating: 4.9,
    reviews: 387,
    discount: "-64%",
    inStock: true,
    emoji: "📷",
  },
  {
    id: 6,
    title: "Portable Bluetooth Speaker Waterproof",
    price: "$34.99",
    originalPrice: "$79.99",
    rating: 4.4,
    reviews: 1567,
    discount: "-56%",
    inStock: true,
    emoji: "🔊",
  },
];

export default function WishlistPage() {
  const [items, setItems] = useState(wishlistItems);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addAllToCart = () => {
    alert("All items added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">My Wishlist</h1>
            <p className="text-gray-600">{items.length} items saved</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg">
              <Share2 className="w-5 h-5 mr-2" />
              Share Wishlist
            </Button>
            <Button size="lg" onClick={addAllToCart}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add All to Cart
            </Button>
          </div>
        </div>

        {items.length === 0 ? (
          <Card className="p-16 text-center">
            <Heart className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-black mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save items you love to easily find them later</p>
            <Link href="/">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {items.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-shadow relative">
                <div className="p-4">
                  {/* Heart Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>

                  {/* Discount Badge */}
                  {item.discount && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {item.discount}
                    </div>
                  )}

                  {/* Product Image */}
                  <Link href={`/product/${item.id}`}>
                    <div className="w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform cursor-pointer">
                      <div className="text-7xl">{item.emoji}</div>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-sm text-gray-700 line-clamp-2 h-10 hover:text-temu-orange transition-colors cursor-pointer">
                        {item.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-gray-600 ml-1">({item.reviews})</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-temu-orange">{item.price}</span>
                      <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                    </div>

                    {!item.inStock && (
                      <div className="text-xs text-red-600 font-medium">Out of Stock</div>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    size="sm"
                    className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={!item.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    {item.inStock ? "Add to Cart" : "Notify Me"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Recommended Products */}
        {items.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-black mb-6">You May Also Like</h2>
            <div className="grid grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="group hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="p-3">
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-2 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <div className="text-5xl">🎁</div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs text-gray-700 line-clamp-2 h-8">
                        Recommended Product {i}
                      </h3>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <svg key={j} className="w-2 h-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-base font-black text-temu-orange">$19.99</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
