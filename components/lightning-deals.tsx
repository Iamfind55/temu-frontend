"use client"

import { useRef } from "react"
import { useQuery } from "@apollo/client/react"
import { ChevronLeft, ChevronRight, Zap, Loader, Star } from "lucide-react"

// components:
import { Button } from "@/components/ui/button"
import { SkeletonNextImage } from "@/components/ui/skeleton-image"
import { QUERY_GET_LINGHTNING_PRODUCTS } from "@/app/api/product"
import { IGetLightningProductsResponse } from "@/app/interface/product"

export function LightningDeals() {
   const scrollContainerRef = useRef<HTMLDivElement>(null)

   const { data, loading, error } = useQuery<IGetLightningProductsResponse>(
      QUERY_GET_LINGHTNING_PRODUCTS,
      {
         variables: {
            where: {
               status: "ACTIVE",
               offer: true,
            },
            limit: 10,
            page: 1,
            sortedBy: "created_at_DESC",
         },
      }
   )

   const lightningDeals = data?.getProducts?.data || []

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


   if (loading) {
      return (
         <div className="container mx-auto py-12">
            <div className="flex items-center justify-center">
               <Loader className="h-8 w-8 animate-spin text-orange-400" />
            </div>
         </div>
      )
   }

   if (error || !lightningDeals.length) {
      return null
   }

   return (
      <div className="w-full overflow-hidden">
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
         <div className="container mx-auto px-4 relative">
            <Button
               variant="ghost"
               size="icon"
               onClick={() => scroll("left")}
               className="hidden sm:flex absolute z-10 -left-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-50 border border-gray-200"
            >
               <ChevronLeft className="h-12 w-12" />
            </Button>

            <div
               ref={scrollContainerRef}
               className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
               style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
               {lightningDeals.map((product, index) => {
                  const productImage = product.images?.[0] || product.origin_image_url || "/placeholder.svg"
                  const price = product.price_str
                  const originalPrice = product.market_price || 0

                  return (
                     <div key={product.id + index} className="flex-shrink-0 w-[280px] bg-white overflow-hidden group">
                        <div className="relative aspect-square bg-gray-100">
                           <SkeletonNextImage
                              src={productImage}
                              alt={product.name}
                              fill
                              containerClassName="absolute inset-0"
                              className="object-cover"
                           />
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                        </div>

                        <div className="p-3">
                           <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-lg font-bold text-[#e8824a]">{price}</span>
                              {originalPrice > 0 && (
                                 <span className="text-sm text-gray-400 line-through">{originalPrice}</span>
                              )}
                              {product.sell_count && (
                                 <span className="text-sm text-gray-600">{product.sell_count} sold</span>
                              )}
                           </div>

                           {product.discount > 0 && (
                              <div className="text-sm font-semibold mb-2">-{product.discount}% limited time</div>
                           )}
                           <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                 <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.floor(product.total_star) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                       }`}
                                 />
                              ))}
                              <span className="text-xs text-muted-foreground ml-1">({product.total_comment.toLocaleString()})</span>
                           </div>
                        </div>
                     </div>
                  )
               })}
            </div>

            {/* Navigation button */}
            <Button
               variant="ghost"
               size="icon"
               onClick={() => scroll("right")}
               className="hidden sm:flex absolute z-10 -right-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-50 border border-gray-200"
            >
               <ChevronRight className="h-12 w-12" />
            </Button>
         </div>
      </div>
   )
}
