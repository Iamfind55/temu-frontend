"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client/react"
import { ChevronDown, Loader } from "lucide-react"
import { Button } from "./ui/button"
import type { Product } from "@/lib/product-data"
import { QUERY_GET_PRODUCTS } from "@/app/api/product"
import { ProductCard } from "@/components/product-card"
import { IGetProductsResponse, IProduct } from "@/app/interface/product"

export function ProductGrid() {
  const [page, setPage] = useState(1)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const limit = 20

  const { data, loading, error, fetchMore } = useQuery<IGetProductsResponse>(QUERY_GET_PRODUCTS, {
    variables: {
      page: 1,
      limit: limit,
    },
  })

  console.log("Products:", data);
  console.log("Error:", error);

  useEffect(() => {
    if (data?.getProducts?.success && data.getProducts.data) {
      const mappedProducts = data.getProducts.data.map(mapApiProductToProduct)
      setAllProducts(mappedProducts)
    }
  }, [data])

  const handleLoadMore = async () => {
    const nextPage = page + 1

    try {
      const result = await fetchMore({
        variables: {
          page: nextPage,
          limit: limit,
        },
      })

      if (result.data?.getProducts?.success && result.data.getProducts.data) {
        const newProducts = result.data.getProducts.data.map(mapApiProductToProduct)
        setAllProducts((prev) => [...prev, ...newProducts])
        setPage(nextPage)
      }
    } catch (err) {
      console.error("Error loading more products:", err)
    }
  }

  const mapApiProductToProduct = (apiProduct: IProduct): Product => {
    return {
      id: apiProduct.id,
      title: apiProduct.name,
      description: apiProduct.description,
      price: apiProduct.price,
      originalPrice: apiProduct.market_price ?? 0,
      discount: apiProduct.discount,
      rating: apiProduct.total_star,
      reviewCount: apiProduct.total_comment,
      soldCount: apiProduct.sell_count > 1000
        ? `${(apiProduct.sell_count / 1000).toFixed(0)}k+`
        : apiProduct.sell_count.toString(),
      images: apiProduct?.images?.length > 0 ? apiProduct.images : [apiProduct.origin_image_url],
      variants: [],
      category: apiProduct.categoryData?.name || "General",
      brand: apiProduct.brandData?.name,
      badges: apiProduct.product_vip ? ["Star store"] : [],
      shipping: {
        isFree: true,
        deliveryDays: 7,
        credit: 0,
      },
      promotion: apiProduct.discount > 0 ? {
        text: `${apiProduct.discount}% OFF`,
        discount: apiProduct.discount,
        endTime: "",
      } : null as any,
    }
  }

  const totalProducts = data?.getProducts?.total || 0
  const hasMore = allProducts.length < totalProducts

  if (error) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            Error loading products. Please try again later.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 space-y-10">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2 text-balance">
            <span className="text-red-800">EARLY BLACK FRIDAY</span>
          </h2>
          <p className="text-2xl font-bold">EXPLORE YOUR INTERESTS</p>
        </div>

        {loading && allProducts.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="h-8 w-8 animate-spin text-orange-400" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {allProducts.map((product, index) => (
                <ProductCard key={product.id + index} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="text-md font-bold rounded-full bg-orange-400 hover:bg-orange-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className=" h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <span>Load More</span>
                      <ChevronDown />
                    </>
                  )}
                </Button>
              </div>
            )}

            {!hasMore && allProducts.length > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                You've reached the end of the products
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
