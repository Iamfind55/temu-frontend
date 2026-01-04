"use client"

import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export function CartDrawer() {
  const router = useRouter()
  const { items, isOpen, closeCart, updateQuantity, removeItem, itemCount, subtotal } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={closeCart} />

      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl animate-in slide-in-from-right">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Shopping Cart ({itemCount})</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium">Your cart is empty</p>
                <p className="mt-2 text-sm text-muted-foreground">Add items to get started</p>
                <Button className="mt-6" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex gap-4 rounded-lg border p-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                          {item.color && <p className="mt-1 text-xs text-muted-foreground">Color: {item.color}</p>}
                          {!item.inStock && <p className="mt-1 text-xs text-destructive">Out of stock</p>}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(`${item.id}-${item.color}`)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 bg-transparent"
                            onClick={() => updateQuantity(`${item.id}-${item.color}`, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 bg-transparent"
                            onClick={() => updateQuantity(`${item.id}-${item.color}`, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          {item.originalPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              ${item.originalPrice.toFixed(2)}
                            </p>
                          )}
                          <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t px-6 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium">Subtotal ({itemCount} items)</span>
                <span className="text-lg font-bold text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <Button
                onClick={() => router.push("/cart")}
                className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-md font-semibold"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
