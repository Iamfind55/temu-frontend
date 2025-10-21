"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Plus, ShoppingCart, Check, Minus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const comparisonProducts = [
  {
    id: 1,
    title: "Premium Wireless Headphones Pro",
    price: "$29.99",
    originalPrice: "$89.99",
    rating: 4.8,
    reviews: 1234,
    emoji: "🎧",
    specs: {
      battery: "30 hours",
      bluetooth: "5.0",
      noiseCancellation: "Active ANC",
      weight: "250g",
      warranty: "2 years",
      waterproof: "IPX4",
    },
  },
  {
    id: 2,
    title: "Wireless Headphones Standard",
    price: "$19.99",
    originalPrice: "$49.99",
    rating: 4.5,
    reviews: 856,
    emoji: "🎧",
    specs: {
      battery: "20 hours",
      bluetooth: "5.0",
      noiseCancellation: "Passive",
      weight: "220g",
      warranty: "1 year",
      waterproof: "No",
    },
  },
  {
    id: 3,
    title: "Premium Headphones Max",
    price: "$49.99",
    originalPrice: "$149.99",
    rating: 4.9,
    reviews: 2341,
    emoji: "🎧",
    specs: {
      battery: "40 hours",
      bluetooth: "5.2",
      noiseCancellation: "Advanced ANC",
      weight: "280g",
      warranty: "3 years",
      waterproof: "IPX7",
    },
  },
];

export default function ComparePage() {
  const [products, setProducts] = useState(comparisonProducts);

  const removeProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const specRows = [
    { label: "Battery Life", key: "battery" },
    { label: "Bluetooth Version", key: "bluetooth" },
    { label: "Noise Cancellation", key: "noiseCancellation" },
    { label: "Weight", key: "weight" },
    { label: "Warranty", key: "warranty" },
    { label: "Waterproof", key: "waterproof" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">Compare Products</h1>
            <p className="text-gray-600">Compare up to 4 products side by side</p>
          </div>
          <Link href="/">
            <Button variant="outline" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Add More Products
            </Button>
          </Link>
        </div>

        {products.length === 0 ? (
          <Card className="p-16 text-center">
            <div className="text-6xl mb-4">⚖️</div>
            <h2 className="text-2xl font-black mb-2">No products to compare</h2>
            <p className="text-gray-600 mb-6">Add products to start comparing</p>
            <Link href="/">
              <Button size="lg">Browse Products</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Product Cards */}
            <div className="grid grid-cols-4 gap-4">
              {products.map((product, index) => (
                <Card key={product.id} className="relative">
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                  </button>

                  <div className="p-6">
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-4 flex items-center justify-center">
                      <div className="text-8xl">{product.emoji}</div>
                    </div>

                    <h3 className="font-bold text-lg mb-2 line-clamp-2 h-14">{product.title}</h3>

                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-black text-temu-orange">{product.price}</span>
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                    </div>

                    <Button size="sm" className="w-full">
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}

              {/* Add Product Slot */}
              {products.length < 4 && (
                <Link href="/">
                  <Card className="h-full border-dashed border-2 flex items-center justify-center cursor-pointer hover:border-temu-orange hover:bg-orange-50 transition-colors">
                    <div className="text-center p-6">
                      <Plus className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <p className="font-medium text-gray-600">Add Product</p>
                      <p className="text-sm text-gray-500">Compare up to 4 items</p>
                    </div>
                  </Card>
                </Link>
              )}
            </div>

            {/* Comparison Table */}
            <Card className="overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-xl font-black">Specifications Comparison</h2>
              </div>

              <table className="w-full">
                <tbody>
                  {specRows.map((spec, rowIndex) => (
                    <tr key={spec.key} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 font-bold text-gray-700 w-1/5 border-r">
                        {spec.label}
                      </td>
                      {products.map((product) => {
                        const value = product.specs[spec.key as keyof typeof product.specs];
                        const bestValue = getBestValue(products, spec.key);
                        const isBest = value === bestValue && products.length > 1;

                        return (
                          <td
                            key={product.id}
                            className={`px-6 py-4 text-center border-r last:border-r-0 ${
                              isBest ? "bg-green-50 font-bold text-temu-green" : ""
                            }`}
                          >
                            {isBest && <Check className="w-4 h-4 inline mr-1" />}
                            {value}
                          </td>
                        );
                      })}
                      {products.length < 4 && (
                        <td className="px-6 py-4 text-center text-gray-400">-</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Pros and Cons */}
            <div className="grid grid-cols-4 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="p-6">
                  <h3 className="font-bold mb-4">Highlights</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-temu-green flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">High quality sound</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-temu-green flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Comfortable fit</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-temu-green flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Great battery life</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Minus className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">Slightly heavy</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <Button size="lg" variant="outline">
                <Plus className="w-5 h-5 mr-2" />
                Compare More Products
              </Button>
              <Button size="lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add All to Cart
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function getBestValue(products: typeof comparisonProducts, key: string): string {
  const values = products.map(p => p.specs[key as keyof typeof p.specs]);

  // For battery, find the longest
  if (key === "battery") {
    const hours = values.map(v => parseInt(v.toString()));
    const max = Math.max(...hours);
    return `${max} hours`;
  }

  // For bluetooth, find the highest version
  if (key === "bluetooth") {
    const versions = values.map(v => parseFloat(v.toString()));
    const max = Math.max(...versions);
    return max.toString();
  }

  // For warranty, find the longest
  if (key === "warranty") {
    const years = values.map(v => parseInt(v.toString()));
    const max = Math.max(...years);
    return `${max} years`;
  }

  return values[0].toString();
}
