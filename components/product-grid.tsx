import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/product-data"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"

export function ProductGrid() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 space-y-10">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2 text-balance">
            <span className="text-red-800">EARLY BLACK FRIDAY</span>
          </h2>
          <p className="text-2xl font-bold">EXPLORE YOUR INTERESTS</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {products.map((product, index) => (
            <ProductCard key={product.id + index} product={product} />
          ))}
        </div>

        <div className="flex items-center justify-center">
          <Button
            size="lg"
            className="text-md font-bold rounded-full bg-orange-400 hover:bg-orange-500 cursor-pointer"
          >
            <span>Load More</span>
            <ChevronDown />
          </Button>
        </div>
      </div>
    </section>
  )
}
