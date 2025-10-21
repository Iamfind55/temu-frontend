"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingBag, Tag, Truck, Shield } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const cartItems = [
  {
    id: 1,
    title: "Premium Wireless Bluetooth Headphones",
    price: 29.99,
    originalPrice: 89.99,
    quantity: 1,
    color: "Black",
    size: "Standard",
    emoji: "🎧",
    inStock: true,
  },
  {
    id: 2,
    title: "Women's Summer Floral Dress",
    price: 24.99,
    originalPrice: 59.99,
    quantity: 2,
    color: "Blue",
    size: "M",
    emoji: "👗",
    inStock: true,
  },
  {
    id: 3,
    title: "Wireless Mouse - Ergonomic Design",
    price: 12.99,
    originalPrice: 34.99,
    quantity: 1,
    color: "White",
    size: "N/A",
    emoji: "🖱️",
    inStock: false,
  },
];

export default function CartPage() {
  const [items, setItems] = useState(cartItems);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? subtotal * 0.1 : 0;
  const shipping = subtotal > 20 ? 0 : 4.99;
  const total = subtotal - discount + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black mb-8">Shopping Cart ({items.length} items)</h1>

        <div className="grid grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-6xl">{item.emoji}</div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>Color: <span className="font-medium text-gray-900">{item.color}</span></span>
                          <span>Size: <span className="font-medium text-gray-900">{item.size}</span></span>
                        </div>
                        {!item.inStock && (
                          <div className="mt-2 text-red-600 text-sm font-medium">
                            Out of Stock
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-temu-orange">${item.price}</span>
                        <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                          disabled={!item.inStock}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                          disabled={!item.inStock}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {items.length === 0 && (
              <Card className="p-12 text-center">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some items to get started!</p>
                <Link href="/">
                  <Button size="lg">Continue Shopping</Button>
                </Link>
              </Card>
            )}

            {/* Recommended Products */}
            {items.length > 0 && (
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">You May Also Like</h3>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-2 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <div className="text-4xl">📦</div>
                      </div>
                      <div className="text-sm font-medium text-gray-700 line-clamp-2 mb-1">
                        Recommended Product {i}
                      </div>
                      <div className="text-lg font-black text-temu-orange">$19.99</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="col-span-1">
            <Card className="p-6 sticky top-6">
              <h2 className="text-xl font-black mb-6">Order Summary</h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-temu-orange text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAppliedCoupon(true)}
                    disabled={appliedCoupon}
                  >
                    Apply
                  </Button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 text-sm text-temu-green font-medium">
                    ✓ Coupon applied! 10% off
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount (10%)</span>
                    <span className="font-medium text-temu-green">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? <span className="text-temu-green">FREE</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <div className="text-xs text-gray-600">
                    Add ${(20 - subtotal).toFixed(2)} more for FREE shipping
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-temu-orange">${total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <Button size="lg" className="w-full mb-4">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Truck className="w-5 h-5 text-temu-green flex-shrink-0" />
                  <span>Free shipping on orders over $20</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Shield className="w-5 h-5 text-temu-green flex-shrink-0" />
                  <span>100% secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-temu-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  <span>Easy 90-day returns</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
