"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useQuery } from "@apollo/client/react"
import { ChevronRight, Loader } from "lucide-react"

// Components:
import { ProductInfo } from "@/components/product-info"
import { ProductGallery } from "@/components/product-gallery"
import { RelatedProducts } from "@/components/related-products"

// API & Types:
import { QUERTY_GET_PRODUCT_BY_ID } from "@/app/api/product"
import { IGetProductResponse, IProductDetail } from "@/app/interface/product"
import type { Product } from "@/lib/product-data"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string

  // Fetch product by ID
  const { data, loading, error } = useQuery<IGetProductResponse>(
    QUERTY_GET_PRODUCT_BY_ID,
    {
      variables: {
        getProductId: productId,
      },
      skip: !productId,
    }
  )

  // Map API product to Product format
  const mapApiProductToProduct = (apiProduct: IProductDetail): Product => {
    return {
      id: apiProduct.id,
      title: apiProduct.name,
      description: "",
      price: apiProduct.price,
      originalPrice: apiProduct.market_price ?? 0,
      discount: apiProduct.discount,
      rating: apiProduct.total_star ?? 0,
      reviewCount: apiProduct.total_comment ?? 0,
      soldCount:
        typeof apiProduct.sell_count === "number" && apiProduct.sell_count > 1000
          ? `${(apiProduct.sell_count / 1000).toFixed(0)}k+`
          : (apiProduct.sell_count?.toString() || "0"),
      images:
        apiProduct?.images && apiProduct.images.length > 0
          ? apiProduct.images
          : [apiProduct.origin_image_url],
      variants: [],
      category: "General",
      brand: apiProduct.brandData?.name,
      badges: apiProduct.product_vip ? ["Star store"] : [],
      shipping: {
        isFree: true,
        deliveryDays: 7,
        credit: 0,
      },
      promotion: apiProduct.discount > 0
        ? {
          text: `${apiProduct.discount}% OFF`,
          discount: apiProduct.discount,
          endTime: "",
        }
        : (null as any),
    }
  }

  const product = data?.getProduct?.data ? mapApiProductToProduct(data.getProduct.data) : null

  if (loading) {
    return (
      <div className="min-h-screen">
        <main className="bg-background">
          <div className="container mx-auto px-4 py-20">
            <div className="flex items-center justify-center gap-2">
              <Loader className="h-6 w-6 animate-spin text-orange-400" /> Loading product...
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <main className="bg-background">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <main className="bg-background">
        <div>
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
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
            <ProductGallery
              images={product.images}
              title={product.title}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
            <ProductInfo product={product} />
          </div>
        </div>

        <RelatedProducts currentProductId={product.id} />
      </main>
    </div>
  )
}
