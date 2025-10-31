import { ProductCard } from "@/components/product-card"
import { getRelatedProducts } from "@/lib/product-data"

interface RelatedProductsProps {
  currentProductId: string
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const relatedProducts = getRelatedProducts(currentProductId, 10)

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-bold mb-6">Explore your interests</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {relatedProducts.map((product, index) => (
            <ProductCard key={product.id + index} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
