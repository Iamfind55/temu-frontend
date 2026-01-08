"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@apollo/client/react"
import { ChevronDown, Loader, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SkeletonNextImage } from "@/components/ui/skeleton-image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { Product } from "@/lib/product-data"
import { QUERY_GET_PRODUCTS_BY_CATEGORY_ID, QUERY_GET_CATEGORIES_BY_PARENT_ID, QUERY_GET_PARENT_CATEGORIES } from "@/app/api/category"
import { ProductCard } from "@/components/product-card"
import { IGetProductsResponse, IProduct } from "@/app/interface/product"
import { IGetChildCategoriesResponse, IGetCategoryResponse, IParentData } from "@/app/interface/category"

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.id as string

  const [page, setPage] = useState(1)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const limit = 40

  // Fetch current category with parent hierarchy
  const { data: categoryData } = useQuery<IGetCategoryResponse>(
    QUERY_GET_PARENT_CATEGORIES,
    {
      variables: {
        getCategoryId: categoryId,
      },
      skip: !categoryId,
    }
  )

  const currentCategory = categoryData?.getCategory?.data

  // Build breadcrumb array from parent hierarchy
  const buildBreadcrumbs = () => {
    const breadcrumbs: Array<{ id: string; name: string }> = []

    if (!currentCategory) return breadcrumbs

    // Helper function to recursively collect parents
    const collectParents = (parentData: IParentData | null | undefined) => {
      if (parentData) {
        collectParents(parentData.parent_data)
        breadcrumbs.push({ id: parentData.id, name: parentData.name })
      }
    }

    // Collect all parents first
    collectParents(currentCategory.parent_data)

    // Add current category last
    breadcrumbs.push({ id: currentCategory.id, name: currentCategory.name })

    return breadcrumbs
  }

  const breadcrumbs = buildBreadcrumbs()

  // Fetch child categories by parent_id
  const { data: childCategoriesData, loading: childCategoriesLoading } = useQuery<IGetChildCategoriesResponse>(
    QUERY_GET_CATEGORIES_BY_PARENT_ID,
    {
      variables: {
        limit: 100,
        where: {
          parent_id: categoryId,
          status: "ACTIVE"
        }
      },
      skip: !categoryId,
    }
  )

  const childCategories = childCategoriesData?.getCategories?.data || []

  // Fetch products by category_id
  const { data, loading, error, fetchMore } = useQuery<IGetProductsResponse>(
    QUERY_GET_PRODUCTS_BY_CATEGORY_ID,
    {
      variables: {
        limit: limit,
        page: 1,
        where: {
          category_id: categoryId,
        },
        sortedBy: "created_at_DESC",
      },
      skip: !categoryId,
    }
  )

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
          limit: limit,
          page: nextPage,
          where: {
            category_id: categoryId,
          },
          sortedBy: "created_at_DESC",
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

  // Map API product to ProductCard product format
  const mapApiProductToProduct = (apiProduct: IProduct): Product => {
    return {
      id: apiProduct.id,
      title: apiProduct.name,
      description: apiProduct.description || "",
      price: apiProduct.price,
      originalPrice: apiProduct.market_price ?? 0,
      discount: apiProduct.discount,
      rating: apiProduct.total_star,
      reviewCount: apiProduct.total_comment,
      soldCount:
        apiProduct.sell_count > 1000
          ? `${(apiProduct.sell_count / 1000).toFixed(0)}k+`
          : apiProduct.sell_count.toString(),
      images:
        apiProduct?.images?.length > 0 ? apiProduct.images : [apiProduct.origin_image_url],
      variants: [],
      category: apiProduct.categoryData?.name || "General",
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

  const totalProducts = data?.getProducts?.total || 0
  const hasMore = allProducts.length < totalProducts

  if (error) {
    return (
      <>
        <SiteHeader />
        <section className="py-12 bg-background min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center text-red-600">
              Error loading products. Please try again later.
            </div>
          </div>
        </section>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <section className="py-8 bg-background min-h-screen">
        <div className="container mx-auto px-4 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={breadcrumb.id} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-foreground font-medium">{breadcrumb.name}</span>
                ) : (
                  <Link
                    href={`/category/${breadcrumb.id}`}
                    className="text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {breadcrumb.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Child Categories Section */}
          {childCategories.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
              <h2 className="text-lg font-semibold mb-4">Shop by Category</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                {childCategories.map((childCategory) => {
                  const imageUrl = childCategory.image || childCategory.oring_image_url || "/placeholder.svg"

                  return (
                    <Link
                      key={childCategory.id}
                      href={`/category/${childCategory.id}`}
                      className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                    >
                      <div className="relative mb-2 h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200 transition-all group-hover:border-primary">
                        <SkeletonNextImage
                          src={imageUrl}
                          alt={childCategory.name}
                          fill
                          containerClassName="absolute inset-0 rounded-full"
                          skeletonClassName="rounded-full"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-700 group-hover:text-primary line-clamp-2">
                        {childCategory.name}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Category Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">{currentCategory?.name || "Category Products"}</h1>
            <p className="text-muted-foreground">
              {totalProducts} products available
            </p>
          </div>

          {/* Products Grid */}
          {loading && allProducts.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="h-8 w-8 animate-spin text-orange-400" />
            </div>
          ) : allProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this category.</p>
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
    </>
  )
}