"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/product-data"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TimePeriod = "30" | "14" | "7"
type SortOption = "recommended" | "price-low" | "price-high" | "rating" | "sold"

export default function BestSellingPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("30")
  const [category, setCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<SortOption>("recommended")

  // Get unique categories from products
  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  // Filter and sort products
  let filteredProducts = [...products]

  if (category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category === category)
  }

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "sold":
        return Number.parseInt(b.soldCount.replace(/\D/g, "")) - Number.parseInt(a.soldCount.replace(/\D/g, ""))
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-4">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-sm">Best-Selling Items</h1>

            <div className="flex gap-2">
              <Button
                variant={timePeriod === "30" ? "default" : "outline"}
                onClick={() => setTimePeriod("30")}
                className="rounded-full text-sm font-normal"
              >
                Within last 30 days
              </Button>
              <Button
                variant={timePeriod === "14" ? "default" : "outline"}
                onClick={() => setTimePeriod("14")}
                className="rounded-full text-sm font-normal"
              >
                Within last 14 days
              </Button>
              <Button
                variant={timePeriod === "7" ? "default" : "outline"}
                onClick={() => setTimePeriod("7")}
                className="rounded-full text-sm font-normal"
              >
                Within last 7 days
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter by:</span>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.slice(1).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="sold">Most Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id + index} product={product} bestSellingRank={index + 1} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
