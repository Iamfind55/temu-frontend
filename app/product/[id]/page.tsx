import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"

// Components:
import { getProductById } from "@/lib/product-data"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductInfo } from "@/components/product-info"
import { ProductGallery } from "@/components/product-gallery"
import { RelatedProducts } from "@/components/related-products"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="bg-background">
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/" className="hover:text-foreground">
                Smart Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/" className="hover:text-foreground">
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground line-clamp-1">{product.title.slice(0, 50)}...</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <ProductGallery images={product.images} title={product.title} />
            <ProductInfo product={product} />
          </div>
        </div>

        <RelatedProducts currentProductId={product.id} />
      </main>
      <SiteFooter />
    </div>
  )
}
