"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Zap } from "lucide-react"
import Image from "next/image"
import { Star } from "lucide-react"

const lightningDeals = [
   {
      id: 1,
      image: "/black-smartwatch.jpg",
      title: "Elegant Dining Chair with Cushioned Seat",
      price: 216.47,
      originalPrice: 320.0,
      discount: 32,
      sold: 0,
      rating: 0,
      reviews: 0,
   },
   {
      id: 2,
      image: "/smart-watch-fitness.png",
      title: "4-Wheel Electric Mobility Scooter",
      price: 729.68,
      originalPrice: 0,
      discount: 0,
      sold: 7,
      rating: 0,
      reviews: 0,
      hasTimer: true,
   },
   {
      id: 3,
      image: "/white-smartwatch.jpg",
      title: "Professional Hair Clipper Trimmer Set",
      price: 25.79,
      originalPrice: 33.17,
      discount: 22,
      sold: 1100,
      rating: 5,
      reviews: 2,
   },
   {
      id: 4,
      image: "/smart-watch-fitness.png",
      title: "Multi-Pocket Leather Crossbody Bag",
      price: 12.1,
      originalPrice: 53.98,
      discount: 77,
      sold: 2900,
      rating: 5,
      reviews: 50,
   },
   {
      id: 5,
      image: "/black-smartwatch.jpg",
      title: "Refrigerator Egg Storage Organizer",
      price: 7.32,
      originalPrice: 12.44,
      discount: 41,
      sold: 9200,
      rating: 4,
      reviews: 45,
   },
   {
      id: 6,
      image: "/wireless-earbuds.png",
      title: "Bluetooth Wireless Earbuds",
      price: 15.99,
      originalPrice: 49.99,
      discount: 68,
      sold: 5400,
      rating: 5,
      reviews: 128,
   },
]

export function LightningDeals() {
   const scrollContainerRef = useRef<HTMLDivElement>(null)

   const scroll = (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
         const scrollAmount = 320
         const newScrollLeft =
            scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
         scrollContainerRef.current.scrollTo({
            left: newScrollLeft,
            behavior: "smooth",
         })
      }
   }

   const formatSold = (sold: number) => {
      if (sold >= 1000) {
         return `${(sold / 1000).toFixed(1)}K+ sold`
      }
      return sold > 0 ? `${sold} sold` : ""
   }

   return (
      <div className="container mx-auto">
         <div className="bg-orange-500 py-4 mb-6 relative overflow-hidden">
            <div className="container mx-auto px-4">
               <div className="flex items-center justify-center gap-8">
                  <div className="flex items-center gap-2 text-white">
                     <Zap className="h-4 w-4 fill-white" />
                     <span className="text-xl font-bold italic">Lightning deals</span>
                  </div>
                  <div className="flex items-center gap-2 text-white hover:underline">
                     <span className="text-sm font-medium">Limited time offer</span>
                     <ChevronRight className="h-4 w-4" />
                  </div>
               </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-2 left-8 text-white/30 text-2xl">✨</div>
            <div className="absolute top-1 right-32 text-white/30 text-xl">✨</div>
            <div className="absolute bottom-2 right-8 text-white/30 text-3xl">🎈</div>
            <div className="absolute top-1 right-4 text-yellow-300/50 text-xl">+</div>
         </div>

         {/* Product carousel */}
         <div className="container mx-auto relative">
            <Button
               variant="ghost"
               size="icon"
               onClick={() => scroll("left")}
               className="absolute z-50 -left-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-50 border border-gray-200"
            >
               <ChevronLeft className="h-12 w-12" />
            </Button>

            <div
               ref={scrollContainerRef}
               className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
               style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
               {lightningDeals.map((product, index) => (
                  <div key={product.id + index} className="flex-shrink-0 w-[280px] bg-white overflow-hidden group">
                     <div className="relative aspect-square bg-gray-100">
                        <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                     </div>

                     <div className="p-3">
                        <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-2xl font-bold text-[#e8824a]">${product.price.toFixed(2)}</span>
                           {product.originalPrice > 0 && (
                              <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                           )}
                           {product.sold > 0 && <span className="text-sm text-gray-600">{formatSold(product.sold)}</span>}
                        </div>

                        {product.hasTimer ? (
                           <div className="flex items-center gap-2 mb-2">
                              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                 <div className="h-full w-3/4 bg-black rounded-full" />
                              </div>
                              <div className="flex items-center gap-1">
                                 <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                 </div>
                              </div>
                           </div>
                        ) : product.discount > 0 ? (
                           <div className="text-sm font-semibold mb-2">-{product.discount}% limited time</div>
                        ) : null}

                        {product.rating > 0 && (
                           <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                 <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                       }`}
                                 />
                              ))}
                              {product.reviews > 0 && <span className="text-xs text-gray-600 ml-1">{product.reviews}</span>}
                           </div>
                        )}
                     </div>
                  </div>
               ))}
            </div>

            {/* Navigation button */}
            <Button
               variant="ghost"
               size="icon"
               onClick={() => scroll("right")}
               className="absolute -right-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-50 border border-gray-200"
            >
               <ChevronRight className="h-12 w-12" />
            </Button>
         </div>
      </div>
   )
}
