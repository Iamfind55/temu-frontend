"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Share2, Truck, Shield, RotateCcw, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const relatedProducts = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  title: `Related Product ${i + 1}`,
  price: `$${(Math.random() * 50 + 10).toFixed(2)}`,
  originalPrice: `$${(Math.random() * 100 + 50).toFixed(2)}`,
  rating: 4,
  reviews: Math.floor(Math.random() * 500) + 100,
  emoji: ["📱", "💻", "⌚", "🎧", "📷"][i],
}));

const reviews = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  author: `Customer ${i + 1}`,
  rating: Math.floor(Math.random() * 2) + 4,
  date: "2 weeks ago",
  comment: "Great product! Exactly as described. Fast shipping and excellent quality. Highly recommended!",
  helpful: Math.floor(Math.random() * 50) + 10,
}));

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");

  const images = ["🎧", "🎧", "🎧", "🎧", "🎧"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-temu-orange transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/category/electronics" className="hover:text-temu-orange transition-colors">Electronics</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Wireless Headphones</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-8">
          {/* Left - Image Gallery */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-6">
              {/* Main Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-4 flex items-center justify-center relative group">
                <div className="text-9xl">{images[selectedImage]}</div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-5 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-3xl border-2 transition-colors ${
                      selectedImage === i ? 'border-temu-orange' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    {img}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle - Product Details */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl p-6 mb-6">
              {/* Title and Price */}
              <h1 className="text-2xl font-black mb-4">
                Premium Wireless Bluetooth Headphones - Noise Cancelling, Over-Ear, 30H Battery Life
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.8 out of 5</span>
                <span className="text-sm text-temu-orange font-medium">(1,234 reviews)</span>
                <span className="text-sm text-gray-600">• 10K+ sold</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b">
                <span className="text-4xl font-black text-temu-orange">$29.99</span>
                <span className="text-xl text-gray-400 line-through">$89.99</span>
                <span className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">-67%</span>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Color: <span className="text-temu-orange">{selectedColor}</span></h3>
                <div className="flex gap-2">
                  {["Black", "White", "Blue", "Red"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                        selectedColor === color
                          ? 'border-temu-orange text-temu-orange'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Size: <span className="text-temu-orange">{selectedSize}</span></h3>
                <div className="flex gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border-2 rounded-lg font-bold transition-colors ${
                        selectedSize === size
                          ? 'border-temu-orange text-temu-orange'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Quantity</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600 ml-2">Available: 999+</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <Button size="lg" className="flex-1 h-14 text-lg">
                  Add to Cart
                </Button>
                <Button variant="secondary" size="lg" className="flex-1 h-14 text-lg">
                  Buy Now
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t">
                <div className="flex items-center gap-3">
                  <Truck className="w-8 h-8 text-temu-green" />
                  <div>
                    <div className="font-bold text-sm">Free Shipping</div>
                    <div className="text-xs text-gray-600">On orders over $20</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-temu-green" />
                  <div>
                    <div className="font-bold text-sm">Secure Payment</div>
                    <div className="text-xs text-gray-600">100% protected</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-8 h-8 text-temu-green" />
                  <div>
                    <div className="font-bold text-sm">90-Day Returns</div>
                    <div className="text-xs text-gray-600">Easy returns</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-xl font-black mb-4">Product Description</h2>
              <div className="prose text-gray-700 space-y-3">
                <p>
                  Experience premium sound quality with our Wireless Bluetooth Headphones.
                  Featuring advanced noise cancellation technology, these over-ear headphones
                  deliver crystal-clear audio for music, calls, and gaming.
                </p>
                <p>
                  <strong>Key Features:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Active Noise Cancellation (ANC) technology</li>
                  <li>30-hour battery life on a single charge</li>
                  <li>Bluetooth 5.0 for stable wireless connection</li>
                  <li>Comfortable over-ear design with memory foam cushions</li>
                  <li>Built-in microphone for hands-free calls</li>
                  <li>Foldable design for easy portability</li>
                </ul>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black">Customer Reviews</h2>
                <Button variant="outline">Write a Review</Button>
              </div>

              {/* Rating Summary */}
              <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b">
                <div>
                  <div className="text-5xl font-black text-temu-orange mb-2">4.8</div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">Based on 1,234 reviews</div>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-sm w-12">{stars} star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${Math.random() * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12">{Math.floor(Math.random() * 500)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-bold">{review.author}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">• {review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    <button className="text-sm text-gray-600 hover:text-temu-orange transition-colors">
                      Helpful ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-black mb-6">You May Also Like</h2>
          <div className="grid grid-cols-5 gap-4">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="p-3">
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <div className="text-6xl">{product.emoji}</div>
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
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
