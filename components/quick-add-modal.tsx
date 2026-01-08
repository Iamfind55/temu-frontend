"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/product-data"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface QuickAddModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function QuickAddModal({ product, isOpen, onClose }: QuickAddModalProps) {
  const { t } = useTranslation("cart")
  const router = useRouter()
  const { addItem } = useCart()
  const { updateQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [timeLeft, setTimeLeft] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(0)

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
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="!w-[95vw] sm:!w-[80vw] lg:!w-[70vw] !max-w-[1400px] overflow-y-auto p-0"
      >
        <DialogTitle>
          <p className="hidden">title</p>
        </DialogTitle>
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {product.images.slice(0, 3).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? "border-primary" : "border-transparent"
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

          <div className="space-y-4">
            <h2 className="text-lg font-medium leading-tight">{product.title}</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{product.soldCount} {t("sold")}</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-lg font-bold line-through text-muted-foreground">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
            </div>

            {product.variants.length > 0 && (
              <div className="space-y-3 rounded-lg py-2">
                <h3 className="font-semibold">{t("color")}</h3>
                <div className="grid grid-cols-5 gap-3">
                  {product.variants.slice(0, 2).map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`cursor-pointer border rounded-lg p-2 transition-all ${selectedVariant === index ? "border-primary" : "border-gray-200"
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
              </div>
            )}

            <div className="flex items-start justify-start gap-3">
              <p>{t("qty")}</p>
              <select
                value={100}
                onChange={(e) => updateQuantity(product.id, Number.parseInt(e.target.value))}
                className="border rounded px-3 py-1.5 text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

            </div>
            <Button
              size="sm"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-6 rounded-full"
              onClick={handleAddToCart}
            >
              {t("addToCartExclaim")}
            </Button>
            <button
              onClick={() => router.push(`/product/${product.id}`)}
              className="text-sm text-primary hover:underline cursor-pointer"
            >
              {t("allDetails")} ›
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
