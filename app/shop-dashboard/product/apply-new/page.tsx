"use client"

import { useState, useMemo } from "react"
import { useQuery, useMutation } from "@apollo/client/react"
import { useTranslation } from "react-i18next"
import { Star, Package, ChevronLeft, ChevronRight, Check, Loader } from "lucide-react"

// Components
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationEllipsis,
} from "@/components/ui/pagination"

// API & Types
import { QUERY_GET_PRODUCTS } from "@/app/api/product"
import { QUERY_GET_ALL_CATEGORIES } from "@/app/api/category"
import { MUTATION_SHOP_APPLY_PRODUCTS } from "@/app/api/shop/product"
import { IProduct, IGetProductsResponse } from "@/app/interface/product"
import { IGetCategoriesResponse } from "@/app/interface/category"
import { useShopStore } from "@/store/shop-store"
import { useToast } from "@/lib/toast"

// Mutation response type
interface ApplyProductsResponse {
   createManyShopProducts: {
      success: boolean
      total: number
      error?: {
         message: string
         code: string
         details: string
      }
   }
}

// Product Card Component
function ApplyProductCard({
   product,
   isSelected,
   onSelect,
   t,
}: {
   product: IProduct
   isSelected: boolean
   onSelect: (id: string, checked: boolean) => void
   t: (key: string) => string
}) {
   const isOnShelf = product.shopProductStatus === "ON_SHELF"

   return (
      <div
         className={`group overflow-hidden shadow-md rounded-md transition-all duration-300 relative p-0 ${isOnShelf ? "opacity-70 cursor-not-allowed border border-orange-200 bg-orange-50" : "bg-white cursor-pointer hover:shadow-lg"} ${isSelected && !isOnShelf ? "ring-2 ring-orange-500" : ""}`}
         onClick={() => !isOnShelf && onSelect(product.id, !isSelected)}
      >
         <div className="aspect-square bg-background overflow-hidden relative">
            <img
               src={product.cover_image || product.origin_image_url || "/placeholder.svg"}
               alt={product.name}
               className={`h-full w-full object-cover transition-transform duration-300 rounded-md ${!isOnShelf ? "group-hover:scale-105" : ""}`}
            />

            {/* Checkbox - only show for non-applied products */}
            {!isOnShelf && (
               <div
                  className="absolute top-2 right-2 z-10"
                  onClick={(e) => e.stopPropagation()}
               >
                  <Checkbox
                     checked={isSelected}
                     onCheckedChange={(checked) => onSelect(product.id, checked as boolean)}
                     className="h-5 w-5 border-2 border-gray-300 bg-white data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
               </div>
            )}
         </div>

         <div className="p-3 space-y-1.5">
            <h3 className="text-sm line-clamp-2 min-h-[2rem] text-foreground leading-tight">{product.name}</h3>

            <div className="flex items-baseline gap-2">
               <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
               {product.market_price && product.market_price > product.price && (
                  <span className="text-xs text-muted-foreground line-through">${product.market_price.toFixed(2)}</span>
               )}
            </div>

            <div className="flex items-center gap-1">
               {[...Array(5)].map((_, i) => (
                  <Star
                     key={i}
                     className={`h-3 w-3 ${i < Math.floor(product.total_star) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                  />
               ))}
               <span className="text-xs text-muted-foreground ml-1">({product.total_comment.toLocaleString()})</span>
            </div>

            <div className="text-xs text-muted-foreground">{product.sell_count}+ {t("sold")}</div>

            {product.brandData && (
               <div className="inline-block w-auto text-xs border font-bold text-black py-0.5 px-1 rounded bg-gray-200">
                  {t("brand")}: {product.brandData.name}
               </div>
            )}

            {product.categoryData && (
               <div className="inline-block ml-1 w-auto text-xs border font-medium text-gray-600 py-0.5 px-1 rounded bg-gray-100">
                  {product.categoryData.name}
               </div>
            )}

            <div className="flex items-center justify-between pt-2">
               {isOnShelf ? (
                  <Badge className="bg-green-100 text-green-800">
                     {t("alreadyOnShelf")}
                  </Badge>
               ) : (
                  product.discount > 0 && (
                     <Badge className="bg-red-100 text-red-800 border border-red-300 text-xs">
                        -{product.discount}%
                     </Badge>
                  )
               )}
            </div>
         </div>
      </div>
   )
}

// Product Grid Component
function ProductGrid({
   products,
   selectedProducts,
   onSelect,
   loading,
   t,
}: {
   products: IProduct[]
   selectedProducts: Set<string>
   onSelect: (id: string, checked: boolean) => void
   loading?: boolean
   t: (key: string) => string
}) {
   if (loading) {
      return (
         <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg">
            <Loader className="h-8 w-8 text-orange-500 animate-spin mb-4" />
            <p className="text-sm text-gray-600">{t("loadingProducts")}</p>
         </div>
      )
   }

   if (products.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border">
            <Package className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("noProductsFound")}</h3>
            <p className="text-sm text-gray-600">{t("tryAdjustingFilters")}</p>
         </div>
      )
   }

   return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
         {products.map((product) => (
            <ApplyProductCard
               key={product.id}
               product={product}
               isSelected={selectedProducts.has(product.id)}
               onSelect={onSelect}
               t={t}
            />
         ))}
      </div>
   )
}

export default function ApplyNewPage() {
   const { t } = useTranslation("shop-dashboard")
   const { shop } = useShopStore()
   const { successMessage, errorMessage } = useToast()
   const [selectedCategory, setSelectedCategory] = useState<string>("all")
   const [selectedSub1, setSelectedSub1] = useState<string>("all")
   const [selectedSub2, setSelectedSub2] = useState<string>("all")
   const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
   const [currentPage, setCurrentPage] = useState(1)
   const [isApplying, setIsApplying] = useState(false)
   const itemsPerPage = 20

   // Apply products mutation
   const [applyProducts] = useMutation<ApplyProductsResponse>(MUTATION_SHOP_APPLY_PRODUCTS)

   // Fetch categories
   const { data: categoriesData } = useQuery<IGetCategoriesResponse>(QUERY_GET_ALL_CATEGORIES, {
      variables: {
         limit: 100,
         where: { parent_id: null },
      },
      fetchPolicy: "cache-and-network",
   })

   const categories = categoriesData?.getCategories?.data || []

   // Get sub1 options based on selected category
   const sub1Options = useMemo(() => {
      if (selectedCategory === "all") return []
      const category = categories.find((c) => c.id === selectedCategory)
      return category?.subcategories || []
   }, [selectedCategory, categories])

   // Get sub2 options based on selected sub1
   const sub2Options = useMemo(() => {
      if (selectedSub1 === "all") return []
      const category = categories.find((c) => c.id === selectedCategory)
      const sub1 = category?.subcategories.find((s) => s.id === selectedSub1)
      return sub1?.subcategories || []
   }, [selectedCategory, selectedSub1, categories])

   // Build where clause for products query
   const buildWhereClause = () => {
      const where: Record<string, string> = {}

      // Determine which category_id to use (most specific one)
      if (selectedSub2 !== "all") {
         where.category_id = selectedSub2
      } else if (selectedSub1 !== "all") {
         where.category_id = selectedSub1
      } else if (selectedCategory !== "all") {
         where.category_id = selectedCategory
      }

      return Object.keys(where).length > 0 ? where : null
   }

   // Fetch products
   const { data, loading, refetch } = useQuery<IGetProductsResponse>(QUERY_GET_PRODUCTS, {
      variables: {
         page: currentPage,
         limit: itemsPerPage,
         sortedBy: "created_at_DESC",
         where: buildWhereClause(),
      },
      fetchPolicy: "cache-and-network",
   })

   const products = data?.getProducts?.data || []
   const totalProducts = data?.getProducts?.total || 0
   const totalPages = Math.ceil(totalProducts / itemsPerPage)

   // console.log("products::", products);

   // Handle category change
   const handleCategoryChange = (value: string) => {
      setSelectedCategory(value)
      setSelectedSub1("all")
      setSelectedSub2("all")
      setCurrentPage(1)
      setSelectedProducts(new Set())
   }

   // Handle sub1 change
   const handleSub1Change = (value: string) => {
      setSelectedSub1(value)
      setSelectedSub2("all")
      setCurrentPage(1)
      setSelectedProducts(new Set())
   }

   // Handle sub2 change
   const handleSub2Change = (value: string) => {
      setSelectedSub2(value)
      setCurrentPage(1)
      setSelectedProducts(new Set())
   }

   // Handle product selection
   const handleProductSelect = (id: string, checked: boolean) => {
      setSelectedProducts((prev) => {
         const newSet = new Set(prev)
         if (checked) {
            newSet.add(id)
         } else {
            newSet.delete(id)
         }
         return newSet
      })
   }

   // Get selectable products (not already on shelf)
   const selectableProducts = products.filter((p) => p.shopProductStatus !== "ON_SHELF")

   // Handle select all
   const handleSelectAll = (checked: boolean) => {
      if (checked) {
         const selectableIds = selectableProducts.map((p) => p.id)
         setSelectedProducts(new Set(selectableIds))
      } else {
         setSelectedProducts(new Set())
      }
   }

   // Check if all selectable products are selected
   const isAllSelected = selectableProducts.length > 0 && selectableProducts.every((p) => selectedProducts.has(p.id))

   // Generate pagination items
   const getPaginationItems = () => {
      const items: (number | "ellipsis")[] = []
      const maxVisible = 5

      if (totalPages <= maxVisible + 2) {
         for (let i = 1; i <= totalPages; i++) {
            items.push(i)
         }
      } else {
         items.push(1)

         if (currentPage > 3) {
            items.push("ellipsis")
         }

         const start = Math.max(2, currentPage - 1)
         const end = Math.min(totalPages - 1, currentPage + 1)

         for (let i = start; i <= end; i++) {
            items.push(i)
         }

         if (currentPage < totalPages - 2) {
            items.push("ellipsis")
         }

         if (totalPages > 1) {
            items.push(totalPages)
         }
      }

      return items
   }

   // Handle apply
   const handleApply = async () => {
      if (!shop?.id) {
         errorMessage({ message: t("shopNotFound") })
         return
      }

      if (selectedProducts.size === 0) {
         errorMessage({ message: t("pleaseSelectProduct") })
         return
      }

      setIsApplying(true)

      try {
         // Build the data array with shop_id, product_id, and quantity
         const data = Array.from(selectedProducts).map((productId) => {
            const product = products.find((p) => p.id === productId)
            return {
               shop_id: shop.id,
               product_id: productId,
               quantity: product?.quantity || 1,
            }
         })

         const result = await applyProducts({
            variables: { data },
         })

         if (result.data?.createManyShopProducts?.success) {
            successMessage({ message: t("successfullyAppliedProducts", { count: selectedProducts.size }) })
            setSelectedProducts(new Set())
            refetch()
         } else {
            const error = result.data?.createManyShopProducts?.error
            errorMessage({ message: error?.message || t("failedToApplyProducts") })
         }
      } catch (error: any) {
         errorMessage({ message: error?.message || t("errorApplyingProducts") })
      } finally {
         setIsApplying(false)
      }
   }

   return (
      <div className="flex flex-col h-full">
         <div className="flex-1 p-2 sm:p-6">
            <div className="mx-auto max-w-7xl">
               <div className="mb-4">
                  <h1 className="text-md sm:text-lg font-bold text-gray-900">{t("applyNewProducts")}</h1>
                  <p className="text-sm text-gray-600 mt-0 sm:mt-1">{t("selectProductsForListing")}</p>
               </div>

               {/* Category Filters */}
               <div className="mb-4 p-0 sm:p-4 bg-white rounded-lg">
                  <div className="flex flex-wrap gap-4 items-end">
                     <div className="w-[180px]">
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t("category")}</label>
                        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                           <SelectTrigger className="w-full">
                              <SelectValue placeholder={t("allCategories")} />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="all">{t("allCategories")}</SelectItem>
                              {categories.map((cat) => (
                                 <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="w-[180px]">
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t("subCategory1")}</label>
                        <Select
                           value={selectedSub1}
                           onValueChange={handleSub1Change}
                           disabled={selectedCategory === "all"}
                        >
                           <SelectTrigger className="w-full">
                              <SelectValue placeholder={t("allSubCategories")} />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="all">{t("allSubCategories")}</SelectItem>
                              {sub1Options.map((sub) => (
                                 <SelectItem key={sub.id} value={sub.id}>
                                    {sub.name}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="w-[180px]">
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t("subCategory2")}</label>
                        <Select
                           value={selectedSub2}
                           onValueChange={handleSub2Change}
                           disabled={selectedSub1 === "all"}
                        >
                           <SelectTrigger className="w-full">
                              <SelectValue placeholder={t("allSubCategories")} />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="all">{t("allSubCategories")}</SelectItem>
                              {sub2Options.map((sub) => (
                                 <SelectItem key={sub.id} value={sub.id}>
                                    {sub.name}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
               </div>

               <div className="py-2 px-0 sm:px-4 bg-white flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                     <h2 className="font-semibold text-gray-900">{t("products")}</h2>
                     <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-600">
                           <span className="font-medium text-gray-900">{totalProducts}</span> {t("total")}
                        </span>
                     </div>
                  </div>

                  <div className="flex items-center gap-2">
                     <Checkbox
                        id="select-all"
                        checked={isAllSelected}
                        onCheckedChange={handleSelectAll}
                        disabled={selectableProducts.length === 0}
                        className="h-5 w-5 border-2 border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                     />
                     <label
                        htmlFor="select-all"
                        className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                     >
                        {t("selectAll")} ({selectableProducts.length} {t("available")})
                     </label>
                  </div>
               </div>

               {/* Selected Count & Apply Button */}
               {selectedProducts.size > 0 && (
                  <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-orange-500" />
                        <span className="text-sm font-medium text-orange-800">
                           {t("productsSelected", { count: selectedProducts.size })}
                        </span>
                     </div>
                     <Button
                        onClick={handleApply}
                        disabled={isApplying}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                     >
                        {isApplying ? (
                           <>
                              <Loader className="h-4 w-4 animate-spin " />
                              {t("applying")}
                           </>
                        ) : (
                           t("applySelectedProducts")
                        )}
                     </Button>
                  </div>
               )}

               {/* Products Grid */}
               <ProductGrid
                  products={products}
                  selectedProducts={selectedProducts}
                  onSelect={handleProductSelect}
                  loading={loading}
                  t={t}
               />

               {/* Results Summary */}
               <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
                  <div className="text-sm text-gray-600 mb-3 sm:mb-0">
                     {t("showingProducts", { start: products.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0, end: Math.min(currentPage * itemsPerPage, totalProducts), total: totalProducts })}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                     <Pagination>
                        <PaginationContent>
                           <PaginationItem>
                              <button
                                 onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                 disabled={currentPage === 1}
                                 className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                 <ChevronLeft className="h-4 w-4" />
                                 <span className="hidden sm:inline">{t("previous")}</span>
                              </button>
                           </PaginationItem>

                           {getPaginationItems().map((item, index) => (
                              <PaginationItem key={index}>
                                 {item === "ellipsis" ? (
                                    <PaginationEllipsis />
                                 ) : (
                                    <PaginationLink
                                       href="#"
                                       onClick={(e) => {
                                          e.preventDefault()
                                          setCurrentPage(item)
                                       }}
                                       isActive={currentPage === item}
                                       className={currentPage === item ? "bg-orange-500 text-white hover:bg-orange-600" : ""}
                                    >
                                       {item}
                                    </PaginationLink>
                                 )}
                              </PaginationItem>
                           ))}

                           <PaginationItem>
                              <button
                                 onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                 disabled={currentPage === totalPages}
                                 className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                 <span className="hidden sm:inline">{t("next")}</span>
                                 <ChevronRight className="h-4 w-4" />
                              </button>
                           </PaginationItem>
                        </PaginationContent>
                     </Pagination>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}
