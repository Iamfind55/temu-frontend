"use client"

import { Separator } from "./ui/separator"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/product-data"
import { Star, Check, Clock, Zap, Plus, RotateCcw, ChevronRight, Factory, Truck, ShieldCheck } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [timeLeft, setTimeLeft] = useState("")
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.id || "")

  useEffect(() => {
    if (!product?.promotion?.endTime) return

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
  }, [product?.promotion?.endTime])

  const handleAddToCart = () => {
    const variant = product.variants.find((v) => v.id === selectedVariant)
    const selectedColor = variant?.name || undefined

    addItem({
      id: selectedVariant ? `${product.id}-${selectedVariant}` : product.id,
      name: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0] || "/placeholder.svg",
      color: selectedColor,
      quantity: quantity,
      inStock: true,
    })
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-4 space-y-2">
        <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg text-xs">
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

        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-green-600" />
          <span className="font-semibold text-green-600">
            Fastest delivery: {product.shipping.deliveryDays} BUSINESS DAYS
          </span>
        </div>

        <h1 className="text-lg leading-tight text-balance">{product.title}</h1>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="text-sm text-muted-foreground">{product.soldCount} sold</span>
          <div className="flex items-center gap-3">
            <span className="font-semibold">{product.rating}</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-orange-500 text-orange-500" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {product.category && (
          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
            #TOP RATED in {product.category}
          </Badge>
        )}

        <div className="space-y-3">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.originalPrice > 0 && (
              <span className="text-md text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          {product.promotion && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-primary font-semibold">🔥 {product.promotion.text}</span>
              {timeLeft && (
                <div className="flex items-center gap-1 px-2 py-1 bg-black text-white rounded text-xs font-mono">
                  <Clock className="h-3 w-3" />
                  <span>{timeLeft}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {product.variants.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Color</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id)}
                  className={`p-2 rounded-lg border-2 transition-colors ${selectedVariant === variant.id ? "border-primary" : "border-border hover:border-muted-foreground"
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

        <div className="space-y-4 my-4">
          <div className="flex items-center justify-start gap-2">
            <h3 className="text-sm font-semibold">Quantity</h3>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="text-sm p-2 border border-border rounded-lg bg-background"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 40, 50, 60, 70, 80, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mt-4">
          <Button
            size="lg"
            className="w-full sm:w-1/2 bg-orange-500 hover:bg-orange-600 text-white text-sm"
            onClick={handleAddToCart}
          >
            <Plus />
            Add to cart
          </Button>
        </div>

        <div className="space-y-4 pt-4">
          <div className="space-y-3">
            <button className="cursor-pointer flex items-center gap-2 text-green-700 font-semibold hover:underline transition-colors group">
              <Truck className="h-5 w-5" />
              <span className="text-md">Free shipping for this item</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="space-y-2 pl-0 sm:pl-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Delivery:</span>
                <span className="font-semibold text-foreground">Nov 7-20</span>
                <button className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-background transition-colors">
                  <span className="text-xs">?</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm flex-wrap">
                <span className="text-muted-foreground">Courier company:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">📮 USPS</span>
                  <span className="font-semibold">📦 UPS</span>
                  <span className="font-semibold">🚚 DHL eCommerce</span>
                  <span className="font-semibold">🚛 OnTrac ...</span>
                </div>
              </div>

              <button className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border border-current">
                  <span className="text-xs">i</span>
                </div>
                <span>Temu has certain minimum order value. Learn more.</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <button className="cursor-pointer flex items-center gap-2 text-green-700 font-semibold hover:underline transition-colors group">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-md">Why choose Temu?</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justfy-start gap-2 overflow-x-scroll">
              <div className="bg-muted/50 p-2 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">Security & Privacy</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Safe payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Secure privacy</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-2 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">Delivery guarantee</h4>
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
            <RotateCcw className="h-5 w-5" />
            <span className="text-sm sm:text-md">Free returns · Price adjustment</span>
            <ChevronRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="cursor-pointer flex items-center gap-2 text-green-700 font-semibold transition-colors group w-full hover:underline">
            <div className="flex items-center justify-center w-6 h-6 bg-green-700 text-white rounded font-bold">
              <span className="text-[7px]">Plant</span>
            </div>
            <span className="text-sm sm:text-md">Temu's Tree Planting Program (22M+ trees)</span>
            <ChevronRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
          </button>

          <Separator />
          <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 font-bold">
            <span>Sourced from</span>
            <Factory className="h-4 w-4" />
            <span>, procured by Temu</span>
          </div>
        </div>
      </div>
    </div>
  )
}
