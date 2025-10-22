"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Check, Clock, Share2, Zap } from "lucide-react"
import type { Product } from "@/lib/product-data"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.id || "")
  const [quantity, setQuantity] = useState(1)
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(product.promotion.endTime).getTime()
      const now = new Date().getTime()
      const distance = end - now

      if (distance < 0) {
        setTimeLeft("Expired")
        return
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      )
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [product.promotion.endTime])

  return (
    <div className="space-y-6">
      {/* Shipping Info */}
      <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg text-sm">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-600" />
          <span className="font-medium">Free shipping</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-600" />
          <span className="font-medium">${product.shipping.credit.toFixed(2)} Credit for delay</span>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-green-600" />
        <span className="font-semibold text-green-600">
          Fastest delivery: {product.shipping.deliveryDays} BUSINESS DAYS
        </span>
      </div>

      {/* Product Title */}
      <h1 className="text-2xl font-semibold leading-tight text-balance">{product.title}</h1>

      {/* Badges and Rating */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-muted-foreground">{product.soldCount} sold</span>
        {product.badges.map((badge) => (
          <Badge key={badge} className="bg-purple-600 text-white hover:bg-purple-700">
            ⭐ {badge}
          </Badge>
        ))}
        <div className="flex items-center gap-1">
          <span className="font-semibold">{product.rating}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {product.category && (
        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
          #2 TOP RATED in {product.category}
        </Badge>
      )}

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          <Badge className="bg-red-600 text-white hover:bg-red-700">{product.discount}% OFF limited time</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-primary font-semibold">🔥 {product.promotion.text}</span>
          <div className="flex items-center gap-1 px-2 py-1 bg-black text-white rounded text-xs font-mono">
            <Clock className="h-3 w-3" />
            <span>{timeLeft}</span>
          </div>
        </div>
      </div>

      {/* Sale Timer */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg flex items-center justify-between">
        <span className="font-semibold">Big sale</span>
        <div className="flex items-center gap-2">
          <span className="text-sm">Ends in</span>
          <span className="font-mono font-bold">{timeLeft}</span>
        </div>
      </div>

      {/* Color Selection */}
      {product.variants.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">Color</h3>
          <div className="grid grid-cols-4 gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant.id)}
                className={`relative p-2 rounded-lg border-2 transition-colors ${
                  selectedVariant === variant.id ? "border-primary" : "border-border hover:border-muted-foreground"
                }`}
              >
                <div className="aspect-square rounded overflow-hidden mb-1">
                  <img
                    src={variant.image || "/placeholder.svg"}
                    alt={variant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-center line-clamp-1">{variant.name}</p>
                {selectedVariant === variant.id && (
                  <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Qty</h3>
          <span className="text-sm text-primary">Add 1 to get 2nd for {product.promotion.discount}% off</span>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="px-4 py-2 border border-border rounded-lg bg-background"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white text-lg h-14">
        -{product.discount}% now! Add to cart!
        <div className="text-xs">Fastest delivery in {product.shipping.deliveryDays} business days</div>
      </Button>

      {/* Share Button */}
      <Button variant="outline" size="lg" className="w-full bg-transparent">
        <Share2 className="h-5 w-5 mr-2" />
        Share
      </Button>
    </div>
  )
}
