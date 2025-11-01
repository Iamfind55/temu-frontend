"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { products } from "@/lib/product-data"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

const PRODUCTS_PER_PAGE = 40

interface CategoryPageClientProps {
   categorySlug: string
   subcategorySlug: string
   categoryName: string
   subcategoryName: string
}

export function CategoryPageClient({
   categorySlug,
   subcategorySlug,
   categoryName,
   subcategoryName,
}: CategoryPageClientProps) {
   const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE)

   const allProducts = [...products, ...products, ...products, ...products, ...products]
   const visibleProducts = allProducts.slice(0, visibleCount)
   const hasMore = visibleCount < allProducts.length

   const handleLoadMore = () => {
      setVisibleCount((prev) => Math.min(prev + PRODUCTS_PER_PAGE, allProducts.length))
   }

   return (
      <div className="min-h-screen bg-background">
         <div className="container mx-auto px-4 py-6">
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
               <Link href="/" className="hover:text-foreground">
                  Home
               </Link>
               <ChevronRight className="h-4 w-4" />
               <Link href={`/category/${categorySlug}`} className="hover:text-foreground">
                  {categoryName}
               </Link>
               <ChevronRight className="h-4 w-4" />
               <span className="text-foreground">{subcategoryName}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
               {visibleProducts.map((product, index) => (
                  <ProductCard key={`${product.id}-${index}`} product={product} />
               ))}
            </div>

            {hasMore && (
               <div className="mt-4 flex justify-center">
                  <Button onClick={handleLoadMore} size="lg" className="min-w-[200px] bg-orange-500 hover:bg-orange-600 text-white">
                     See More
                  </Button>
               </div>
            )}
         </div>
      </div>
   )
}
