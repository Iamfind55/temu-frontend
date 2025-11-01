"use client"

import { useState } from "react"
import { products } from "@/lib/product-data"
import { ProductCard } from "@/components/product-card"

export default function FiveStarRatedPage() {
  const [category, setCategory] = useState<string>("all")
  let filteredProducts = products.filter((p) => p.rating >= 4.5)

  if (category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category === category)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 mt-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id + index} product={product} showTopRated />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No 5-star rated products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
