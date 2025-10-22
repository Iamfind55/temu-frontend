"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/product-data"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TimePeriod = "30" | "14" | "7"
type SortOption = "recommended" | "price-low" | "price-high" | "rating" | "reviews"

export default function FiveStarRatedPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("30")
  const [category, setCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<SortOption>("recommended")

  // Get unique categories from products
  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  // Filter products with 4.5+ rating
  let filteredProducts = products.filter((p) => p.rating >= 4.5)

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
      case "reviews":
        return b.reviewCount - a.reviewCount
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header with filters */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">5-Star Rated</h1>

            {/* Time period filters */}
            <div className="flex gap-2">
              <Button
                variant={timePeriod === "30" ? "default" : "outline"}
                onClick={() => setTimePeriod("30")}
                className="rounded-full"
              >
                Within last 30 days
              </Button>
              <Button
                variant={timePeriod === "14" ? "default" : "outline"}
                onClick={() => setTimePeriod("14")}
                className="rounded-full"
              >
                Within last 14 days
              </Button>
              <Button
                variant={timePeriod === "7" ? "default" : "outline"}
                onClick={() => setTimePeriod("7")}
                className="rounded-full"
              >
                Within last 7 days
              </Button>
            </div>
          </div>

          {/* Category and sort filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter by category</span>
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
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} showTopRated />
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
