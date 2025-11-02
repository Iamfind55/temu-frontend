"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/product-data"
import Link from "next/link"
import { useState } from "react"
import { QuickAddModal } from "./quick-add-modal"

interface ProductCardProps {
  product: Product
  bestSellingRank?: number
  showTopRated?: boolean
}

export function ProductCard({ product, bestSellingRank, showTopRated }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  return (
    <>
      <Link href={`/landing/product/${product.id}`}>
        <div className="group cursor-pointer overflow-hidden shadow-md rounded-md hover:shadow-lg transition-all duration-300 relative p-0">
          <div className="aspect-square bg-background overflow-hidden relative">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
            />

            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.category === "Home & Garden" && (
                <Badge className="bg-green-600 text-white text-xs font-semibold px-2 py-0.5">Local</Badge>
              )}
            </div>

            <button
              onClick={handleCartClick}
              className="cursor-pointer absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ShoppingCart className="h-4 w-4 text-gray-700" />
            </button>
          </div>

          <div className="p-3 space-y-1.5">
            <h3 className="text-sm line-clamp-2 min-h-[2rem] text-foreground leading-tight">{product.title}</h3>

            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">{product.soldCount} sold</span>
            </div>

            {product.promotion && (
              <Badge className="bg-orange-500 text-white text-xs font-medium px-2 py-0.5 w-fit">
                🔥 {product.promotion.text} | 05:39:31
              </Badge>
            )}

            {bestSellingRank && (
              <div className="text-xs font-semibold text-green-600">
                #{bestSellingRank} BEST-SELLING ITEM in {product.category}
              </div>
            )}

            {showTopRated && (
              <div className="text-xs font-semibold text-blue-600">#1 TOP RATED in {product.category}</div>
            )}

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">{product.reviewCount.toLocaleString()}</span>
            </div>

            {product.badges.includes("Star store") && (
              <Badge className="bg-purple-600 text-white text-xs font-medium px-2 py-0.5 w-fit">⭐ Star store</Badge>
            )}

            <div className="text-xs text-muted-foreground">Brand: GEENEU</div>

            <div className="text-xs font-medium text-green-600">
              Arrives in {product.shipping.deliveryDays}+ business days
            </div>
          </div>
        </div>
      </Link>

      <QuickAddModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
