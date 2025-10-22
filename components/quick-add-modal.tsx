"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { Product } from "@/lib/product-data"
import { useState, useEffect } from "react"
import { useCart } from "@/lib/cart-context"

interface QuickAddModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function QuickAddModal({ product, isOpen, onClose }: QuickAddModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [timeLeft, setTimeLeft] = useState("")
  const { addItem } = useCart()

  useEffect(() => {
    if (!product.promotion?.endTime) return

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(product.promotion.endTime).getTime()
      const distance = end - now

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [product.promotion?.endTime])

  const handleAddToCart = () => {
    const selectedColor = product.variants[selectedVariant]?.name || undefined
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      color: selectedColor,
      quantity: quantity,
      inStock: true,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full">
                <span className="text-2xl font-bold text-primary">Jump Starter & Air Inflator</span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.slice(0, 3).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-4">
            {/* Title */}
            <h2 className="text-lg font-medium leading-tight">{product.title}</h2>

            {/* Brand and Sales */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-semibold">Brand: GEENEU</span>
              <span>{product.soldCount} sold | Sold by ==</span>
            </div>

            {/* Best Selling Badge */}
            {product.badges.includes("#2 TOP RATED") && (
              <Badge className="bg-green-600 text-white text-xs font-semibold">
                #1 BEST-SELLING ITEM in Tools & Equipment: Insulation Materials
              </Badge>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold line-through text-muted-foreground">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
              <Badge className="bg-orange-500 text-white text-sm font-semibold px-3 py-1">
                {product.discount}% OFF limited time
              </Badge>
            </div>

            {/* Lightning Deal Banner */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold">Lightning deal</span>
                <span className="text-sm">━━━○━━</span>
              </div>
              <span className="font-semibold">Ends in {timeLeft}</span>
            </div>

            {/* Color Selection */}
            {product.variants.length > 0 && (
              <div className="space-y-3 border border-orange-500 rounded-lg p-4">
                <h3 className="font-semibold">Color</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.slice(0, 2).map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`border-2 rounded-lg p-2 transition-all ${
                        selectedVariant === index ? "border-primary" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={variant.image || "/placeholder.svg"}
                        alt={variant.name}
                        className="w-full aspect-square object-cover rounded mb-2"
                      />
                      <div className="text-sm font-medium text-center">
                        {index === 0 && "🔥"} {variant.name}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold">Qty</span>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-1"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-primary font-medium">
                    Add 1 to get 2nd for {product.promotion?.discount}% off
                  </span>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white text-lg font-bold py-6 rounded-full"
              onClick={handleAddToCart}
            >
              -{product.discount}% now! Add to cart!
              <div className="text-xs font-normal">
                Fastest delivery in {product.shipping.deliveryDays} business days
              </div>
            </Button>

            {/* All Details Link */}
            <button className="text-sm text-primary hover:underline">All details ›</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
