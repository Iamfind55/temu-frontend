"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client/react"
import type { Product } from "@/lib/product-data"
import { ChevronDown, Loader } from "lucide-react"

// Api:
import { QUERY_GET_ALL_MAIN_CATEGORIES } from "@/app/api/category"
import { QUERY_GET_BEST_SELLING_PRODUCTS } from "@/app/api/product"
import { IGetMainCategoriesResponse } from "@/app/interface/category"
import { IGetBestSellingProductsResponse, IBestSellingProduct } from "@/app/interface/product"

// Components:
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TimePeriod = 30 | 14 | 7 | null

export default function BestSellingPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(null)
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const limit = 40

  // Fetch main categories
  const { data: categoriesData } = useQuery<IGetMainCategoriesResponse>(
    QUERY_GET_ALL_MAIN_CATEGORIES,
    {
      variables: {
        limit: 100,
        where: {
          status: "ACTIVE",
          parent_id: null,
        },
      },
    }
  )

  const mainCategories = categoriesData?.getCategories?.data || []

  // Fetch best selling products
  const { data, loading, error, fetchMore, refetch } = useQuery<IGetBestSellingProductsResponse>(
    QUERY_GET_BEST_SELLING_PRODUCTS,
    {
      variables: {
        page: 1,
        limit: limit,
        sortedBy: "created_at_DESC",
        where: {
          within: timePeriod,
          category_id: categoryId,
        },
      },
    }
  )

  // Reset products when filters change
  useEffect(() => {
    setPage(1)
    setAllProducts([])
  }, [timePeriod, categoryId])

  // Refetch when filters change
  useEffect(() => {
    refetch({
      page: 1,
      limit: limit,
      sortedBy: "created_at_DESC",
      where: {
        within: timePeriod,
        category_id: categoryId,
      },
    })
  }, [timePeriod, categoryId, refetch])

  useEffect(() => {
    if (data?.getBestSellingProducts?.success && data.getBestSellingProducts.data) {
      const mappedProducts = data.getBestSellingProducts.data.map(mapApiProductToProduct)
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
          sortedBy: "created_at_DESC",
          where: {
            within: timePeriod,
            category_id: categoryId,
          },
        },
      })

      if (result.data?.getBestSellingProducts?.success && result.data.getBestSellingProducts.data) {
        const newProducts = result.data.getBestSellingProducts.data.map(mapApiProductToProduct)
        setAllProducts((prev) => [...prev, ...newProducts])
        setPage(nextPage)
      }
    } catch (err) {
      console.error("Error loading more products:", err)
    }
  }

  // Map API product to ProductCard product format
  const mapApiProductToProduct = (apiProduct: IBestSellingProduct): Product => {
    return {
      id: apiProduct.id,
      title: apiProduct.name,
      description: apiProduct.description || "",
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
        apiProduct?.images ? apiProduct.images : [apiProduct.origin_image_url],
      variants: [],
      category: "Best Selling",
      brand: undefined,
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

  const totalProducts = data?.getBestSellingProducts?.total || 0
  const hasMore = allProducts.length < totalProducts

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-red-600">
            Error loading products. Please try again later.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-4">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <h1 className="text-sm">Best-Selling Items</h1>
            <div className="flex gap-2">
              <Button
                variant={timePeriod === null ? "default" : "outline"}
                onClick={() => setTimePeriod(null)}
                className="rounded-full text-sm font-normal"
              >
                All Time
              </Button>
              <Button
                variant={timePeriod === 30 ? "default" : "outline"}
                onClick={() => setTimePeriod(30)}
                className="rounded-full text-sm font-normal"
              >
                Within last 30 days
              </Button>
              <Button
                variant={timePeriod === 14 ? "default" : "outline"}
                onClick={() => setTimePeriod(14)}
                className="rounded-full text-sm font-normal"
              >
                Within last 14 days
              </Button>
              <Button
                variant={timePeriod === 7 ? "default" : "outline"}
                onClick={() => setTimePeriod(7)}
                className="rounded-full text-sm font-normal"
              >
                Within last 7 days
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-around gap-2">
            <div className="flex sm:hidden items-center gap-2">
              <Select
                value={timePeriod ? timePeriod.toString() : "all"}
                onValueChange={(value) => setTimePeriod(value === "all" ? null : (value === "30" ? 30 : value === "14" ? 14 : 7))}

              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="14">14 Days</SelectItem>
                  <SelectItem value="7">7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-sm font-medium">Filter by:</span>
              <Select
                value={categoryId || "all"}
                onValueChange={(value) => setCategoryId(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mainCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {loading && allProducts.length === 0 ? (
          <div className="flex items-center justify-center py-20 gap-2">
            <Loader className="h-6 w-6 animate-spin text-orange-400" /> Loading...
          </div>
        ) : allProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No products found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10">
              {allProducts.map((product, index) => (
                <ProductCard key={product.id + index} product={product} bestSellingRank={index + 1} />
              ))}
            </div>

            {hasMore && (
              <div className="flex items-center justify-center pt-6">
                <Button
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="text-sm rounded-full bg-orange-400 hover:bg-orange-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
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
              <div className="text-center text-sm text-muted-foreground pt-6">
                You've reached the end of the products
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
