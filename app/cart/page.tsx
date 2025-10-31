"use client"

import Link from "next/link"
import { useState } from "react"
import { Trash2, Lock, Info, ChevronRight, ShieldCheck, LockKeyhole, Check, Truck, BaggageClaim, ShoppingCart } from "lucide-react"

// components:
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/product-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ProductCard } from "@/components/product-card"

export default function CartPage() {
   const { items, removeItem, updateQuantity, subtotal } = useCart()
   const [selectedItems, setSelectedItems] = useState<string[]>(items.map((item) => item.id))

   const toggleSelectAll = () => {
      if (selectedItems.length === items.length) {
         setSelectedItems([])
      } else {
         setSelectedItems(items.map((item) => item.id))
      }
   }

   const toggleSelectItem = (id: string) => {
      setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
   }

   const selectedSubtotal = items
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0)

   const selectedOriginalTotal = items
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0)

   const discount = selectedOriginalTotal - selectedSubtotal

   const recommendedProducts = products.filter((p) => !items.some((item) => item.id === p.id)).slice(0, 8)

   return (
      <div className="min-h-screen bg-background">
         <div className="border-b bg-white">
            <div className="container mx-auto flex items-center gap-2 px-4 py-4">
               <Link href="/" className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-400 font-bold text-white">
                     <span className="text-xs">Temu</span>
                  </div>
               </Link>
               <div className="flex items-center gap-2 text-sm text-green-600 font-bold">
                  <Lock className="h-4 w-4" />
                  <span>All data will be encrypted</span>
               </div>
            </div>
         </div>

         <div className="hidden sm:block container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Link href="/" className="hover:text-foreground">
                  Home
               </Link>
               <ChevronRight className="h-4 w-4" />
               <span className="text-foreground">Cart</span>
            </div>
         </div>

         <div className="container mx-auto px-4 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-2">
                  <div className="p-2 bg-green-50 border-green-200 rounded-md">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                           </svg>
                           <span className="font-medium text-green-800">
                              Free shipping on all items in your cart
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="p-2 bg-green-50 border-green-200 rounded-md">
                     <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                           <path d="M20 7h-9M14 3v4M6 21V10a2 2 0 012-2h2" strokeWidth="2" strokeLinecap="round" />
                           <path d="M6 13H4a2 2 0 00-2 2v4a2 2 0 002 2h2" strokeWidth="2" />
                        </svg>
                        <span className="text-sm text-green-800">
                           No import charges for all local warehouse items and no extra charges upon delivery
                        </span>
                     </div>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                     <div className="flex items-center gap-3">
                        <Checkbox
                           checked={selectedItems.length === items.length && items.length > 0}
                           onCheckedChange={toggleSelectAll}
                        />
                        <span className="font-medium">Select all ({items.length})</span>
                     </div>
                  </div>

                  <hr />

                  {items.length === 0 ? (
                     <div className="flex items-center justify-center flex-col my-8 sm:my-16">
                        <div className="flex items-center gap-2">
                           <ShoppingCart size={36} className="text-gray-300" />
                           <div className="text-start">
                              <h4 className="text-black font-bold">Your shopping cart is empty</h4>
                              <p className="text-sm text-gray-500">Add your favorite items in it.</p>
                           </div>
                        </div>
                        <Link href="/">
                           <Button className="mt-4 bg-orange-500 hover:bg-orange-600 px-8 rounded-full">See trending items</Button>
                        </Link>
                     </div>
                  ) : (
                     <div className="space-y-4 mt-4">
                        <div className="flex items-center gap-2 text-md font-medium text-green-700 font-bold">
                           <Check size={22} className="text-green-700" />
                           Free shipping from ShopHub
                        </div>

                        {items.map((item) => (
                           <div key={item.id} className="p-4">
                              <div className="flex gap-4">
                                 <Checkbox
                                    checked={selectedItems.includes(item.id)}
                                    onCheckedChange={() => toggleSelectItem(item.id)}
                                 />
                                 <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="h-24 w-24 object-cover rounded"
                                 />
                                 <div className="flex-1 border-b pb-4">
                                    <div className="flex items-start justify-between">
                                       <div className="flex-1">
                                          {item.name.includes("Princess") && (
                                             <Badge className="bg-orange-500 text-white text-xs mb-2">🔥 LIGHTNING DEAL</Badge>
                                          )}
                                          <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                                          <div className="text-xs text-muted-foreground mt-1">
                                             {item.color && <span>{item.color}</span>}
                                          </div>
                                       </div>
                                       <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => removeItem(item.id)}
                                          className="text-muted-foreground hover:text-destructive"
                                       >
                                          <Trash2 className="h-4 w-4" />
                                       </Button>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                       <div>
                                          {item.name.includes("Princess") && (
                                             <Badge className="bg-gray-800 text-white text-xs mb-2">ALMOST SOLD OUT</Badge>
                                          )}
                                          {item.name.includes("Hello Kitty") && (
                                             <Badge className="bg-gray-800 text-white text-xs mb-2">ALMOST SOLD OUT</Badge>
                                          )}
                                          <div className="flex items-baseline gap-2">
                                             {item.originalPrice && (
                                                <span className="text-xs text-muted-foreground line-through">
                                                   ${item.originalPrice.toFixed(2)}
                                                </span>
                                             )}
                                             <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                                             {item.originalPrice && (
                                                <span className="text-xs text-green-600 font-medium">
                                                   -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                                </span>
                                             )}
                                          </div>
                                          {item.name.includes("Hello Kitty") && (
                                             <div className="text-xs text-muted-foreground mt-1">
                                                Add $4.03+ for $0.98 off on eligible items →
                                             </div>
                                          )}
                                       </div>

                                       <select
                                          value={item.quantity}
                                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                                          className="border rounded px-3 py-1.5 text-sm"
                                       >
                                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                             <option key={num} value={num}>
                                                Qty {num}
                                             </option>
                                          ))}
                                       </select>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}

                  <div className="mt-8">
                     <h2 className="text-lg font-bold mb-4">Items you may want to add</h2>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {recommendedProducts.map((product, index) => (
                           <ProductCard key={product.id + index} product={product} />
                        ))}
                     </div>
                  </div>
               </div>

               <div className="hidden sm:block lg:col-span-1">
                  <div className="sticky top-4">
                     <div className="space-y-4">
                        <h2 className="text-lg font-bold">Order Summary</h2>
                        <div className="space-y-2 text-sm">
                           <div className="flex justify-between">
                              <span>Item(s) total:</span>
                              <span className="line-through ">${selectedOriginalTotal.toFixed(2)}</span>
                           </div>
                           <div className="flex justify-between">
                              <span>Item(s) discount:</span>
                              <span className="text-destructive font-medium">-${discount.toFixed(2)}</span>
                           </div>
                           <hr />
                           <div className="flex justify-between">
                              <span className="text-md font-bold text-green-600">Shipping:</span>
                              <span className="text-xl text-green-600 font-bold">FREE</span>
                           </div>
                           <div className="pt-2 flex justify-between text-base">
                              <span className="font-bold text-sm">Estimated total</span>
                              <span className="text-xl font-bold text-green-600">${selectedSubtotal.toFixed(2)}</span>
                           </div>
                        </div>

                        <div className="border border-green-500 rounded-md p-2 text-sm">
                           <div className="flex items-start gap-2">
                              <div className="text-green-600 font-bold">
                                 <span className="font-bold">Your order is covered by our Price Match Guarantee.</span> Proceed
                                 to checkout now!
                              </div>
                           </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                           Please refer to your final actual payment amount. Taxes and delivery fees are calculated on the next
                           page.
                        </div>

                        <hr />

                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 text-sm" size="sm">
                           Checkout ({selectedItems.length})
                        </Button>

                        <div className="text-xs text-muted-foreground flex items-start gap-2">
                           <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                           <span>Item availability and pricing are not guaranteed until payment is final.</span>
                        </div>

                        <div className="rounded-lg space-y-4">
                           <div className="flex items-start gap-2 text-sm">
                              <LockKeyhole size={24} className="fill-green-800 text-white" />
                              <span className="text-sm text-foreground">
                                 You will not be charged until you review this order on the next page
                              </span>
                           </div>

                           <div className="flex flex-col items-start">
                              <div className="flex items-center justify-start font-medium text-foreground gap-2">
                                 <ShieldCheck size={22} className="fill-green-800 text-white" />
                                 <span>Safe Payment Options</span>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                 ShopHub is committed to protecting your payment information. We follow PCI DSS standards, use
                                 strong encryption, and perform regular reviews of its system to protect your privacy.
                              </div>
                           </div>

                           <div className="flex flex-col items-start">
                              <div className="flex items-center justify-start font-medium text-foreground gap-2">
                                 <BaggageClaim size={22} className="fill-green-800 text-white" />
                                 <span>Temu Purchase Protection</span>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                 Shop confidently on Temu knowing that if something goes wrong, we've always got your back.
                                 See program terms
                              </div>
                           </div>

                           <div className="space-y-3">
                              <div className="flex items-center justfy-start gap-2">
                                 <div className="rounded-lg space-y-2">
                                    <div className="flex items-center justify-start font-medium text-foreground gap-2">
                                       <Truck size={22} className="fill-green-800 text-white" />
                                       <span>Delivery guarantee</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 space-y-1 text-sm text-muted-foreground">
                                       <div>
                                          <div className="flex items-center gap-2">
                                             <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                             <span>$5.00 Credit for delay</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                             <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                             <span>15-day no update refund</span>
                                          </div>
                                       </div>
                                       <div>
                                          <div className="flex items-center gap-2">
                                             <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                             <span>Return if item damaged</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                             <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                             <span>30-day no delivery refund</span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <button className="cursor-pointer flex items-center gap-2 text-green-700 font-semibold transition-colors group w-full hover:underline">
                              <div className="flex items-center justify-center w-6 h-6 bg-green-700 text-white rounded font-bold">
                                 <span className="text-[7px]">Plant</span>
                              </div>
                              <span className="text-black">Temu's Tree Planting Program</span>
                              <ChevronRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

      </div>
   )
}
