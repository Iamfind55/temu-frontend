"use client"

import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client/react"
import { Star, Package, ChevronLeft, ChevronRight, Crown, Check, Loader } from "lucide-react"

// Components
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationEllipsis,
} from "@/components/ui/pagination"

// API & Types
import { QUERY_GET_PRODUCTS } from "@/app/api/product"
import { MUTATION_SHOP_APPLY_PRODUCTS, MUTATION_SHOP_APPLY_ALL_VIP_PRODUCTS } from "@/app/api/shop/product"
import { IProduct, IGetProductsResponse } from "@/app/interface/product"
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

interface ApplyAllVIPProductsResponse {
   createShopProductsWithVIPLevel: {
      success: boolean
      total: number
      error?: {
         message: string
         code: string
         details: string
      }
   }
}

// VIP Product Card Component with checkbox
function VIPProductCard({
   product,
   isSelected,
   onSelect,
}: {
   product: IProduct
   isSelected: boolean
   onSelect: (id: string, checked: boolean) => void
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

            <div className="text-xs text-muted-foreground">{product.sell_count}+ sold</div>

            {product.brandData && (
               <div className="inline-block w-auto text-xs border font-bold text-black py-0.5 px-1 rounded bg-gray-200">
                  Brand: {product.brandData.name}
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
                     Already on shelf
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
}: {
   products: IProduct[]
   selectedProducts: Set<string>
   onSelect: (id: string, checked: boolean) => void
   loading?: boolean
}) {
   if (loading) {
      return (
         <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg">
            <Loader className="h-8 w-8 text-orange-500 animate-spin mb-4" />
            <p className="text-sm text-gray-600">Loading VIP products...</p>
         </div>
      )
   }

   if (products.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border">
            <Package className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No VIP products found</h3>
            <p className="text-sm text-gray-600">No products available for this VIP level</p>
         </div>
      )
   }

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         {products.map((product) => (
            <VIPProductCard
               key={product.id}
               product={product}
               isSelected={selectedProducts.has(product.id)}
               onSelect={onSelect}
            />
         ))}
      </div>
   )
}

// VIP Level Info
const vipLevels = {
   VIP1: {
      name: "VIP 1",
      value: 1,
      color: "bg-amber-100 text-amber-800 border-amber-300",
      iconColor: "text-amber-500",
      description: "Basic VIP benefits with standard promotion",
      minProducts: 5,
   },
   VIP2: {
      name: "VIP 2",
      value: 2,
      color: "bg-purple-100 text-purple-800 border-purple-300",
      iconColor: "text-purple-500",
      description: "Enhanced visibility and priority listing",
      minProducts: 10,
   },
   VIP3: {
      name: "VIP 3",
      value: 3,
      color: "bg-orange-100 text-orange-800 border-orange-300",
      iconColor: "text-orange-500",
      description: "Premium placement and exclusive features",
      minProducts: 20,
   },
}

export default function ApplyVIPPage() {
   const { shop } = useShopStore()
   const { successMessage, errorMessage } = useToast()
   const [activeTab, setActiveTab] = useState<"VIP1" | "VIP2" | "VIP3">("VIP1")
   const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
   const [currentPage, setCurrentPage] = useState(1)
   const [isApplying, setIsApplying] = useState(false)
   const [isApplyingAll, setIsApplyingAll] = useState(false)
   const itemsPerPage = 20

   const currentVIP = vipLevels[activeTab]

   // Apply products mutation
   const [applyProducts] = useMutation<ApplyProductsResponse>(MUTATION_SHOP_APPLY_PRODUCTS)
   const [applyAllVIPProducts] = useMutation<ApplyAllVIPProductsResponse>(MUTATION_SHOP_APPLY_ALL_VIP_PRODUCTS)

   // Fetch VIP products based on active tab
   const { data, loading } = useQuery<IGetProductsResponse>(QUERY_GET_PRODUCTS, {
      variables: {
         page: currentPage,
         limit: itemsPerPage,
         sortedBy: "created_at_DESC",
         where: {
            product_vip: currentVIP.value,
         },
      },
      fetchPolicy: "cache-and-network",
   })

   const products = data?.getProducts?.data || []
   const totalProducts = data?.getProducts?.total || 0
   const totalPages = Math.ceil(totalProducts / itemsPerPage)

   // Handle tab change
   const handleTabChange = (value: string) => {
      setActiveTab(value as "VIP1" | "VIP2" | "VIP3")
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

   // Handle apply VIP (selected products)
   const handleApplyVIP = async () => {
      if (!shop?.id) {
         errorMessage({ message: "Shop not found. Please try again." })
         return
      }

      if (selectedProducts.size === 0) {
         errorMessage({ message: "Please select at least one product." })
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
            successMessage({ message: `Successfully applied ${selectedProducts.size} product${selectedProducts.size > 1 ? "s" : ""} for ${currentVIP.name}!` })
            setSelectedProducts(new Set())
         } else {
            const error = result.data?.createManyShopProducts?.error
            errorMessage({ message: error?.message || "Failed to apply VIP products. Please try again." })
         }
      } catch (error: any) {
         errorMessage({ message: error?.message || "An error occurred while applying VIP products." })
      } finally {
         setIsApplying(false)
      }
   }

   // Handle apply all VIP products
   const handleApplyAllVIP = async () => {
      if (!shop?.id) {
         errorMessage({ message: "Shop not found. Please try again." })
         return
      }

      setIsApplyingAll(true)

      try {
         const result = await applyAllVIPProducts({
            variables: {
               data: {
                  vip: currentVIP.value,
               },
            },
         })

         if (result.data?.createShopProductsWithVIPLevel?.success) {
            const total = result.data.createShopProductsWithVIPLevel.total
            successMessage({ message: `Successfully applied ${total} ${currentVIP.name} product${total > 1 ? "s" : ""} to your shop!` })
         } else {
            const error = result.data?.createShopProductsWithVIPLevel?.error
            errorMessage({ message: error?.message || "Failed to apply all VIP products. Please try again." })
         }
      } catch (error: any) {
         errorMessage({ message: error?.message || "An error occurred while applying all VIP products." })
      } finally {
         setIsApplyingAll(false)
      }
   }

   return (
      <div className="flex flex-col h-full">
         <div className="flex-1 p-4 sm:p-6">
            <div className="mx-auto max-w-7xl">
               {/* Page Header */}
               <div className="mb-4">
                  <h1 className="text-lg font-bold text-gray-900">Apply VIP Products</h1>
                  <p className="text-sm text-gray-600 mt-1">Select products to apply for VIP status</p>
               </div>

               {/* Tabs */}
               <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="mb-2 bg-white border flex gap-8 px-6">
                     <TabsTrigger
                        value="VIP1"
                        className="data-[state=active]:bg-amber-500 data-[state=active]:text-white flex items-center gap-2"
                     >
                        <Crown className="h-4 w-4" />
                        VIP 1
                     </TabsTrigger>
                     <TabsTrigger
                        value="VIP2"
                        className="data-[state=active]:bg-purple-500 data-[state=active]:text-white flex items-center gap-2"
                     >
                        <Crown className="h-4 w-4" />
                        VIP 2
                     </TabsTrigger>
                     <TabsTrigger
                        value="VIP3"
                        className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center gap-2"
                     >
                        <Crown className="h-4 w-4" />
                        VIP 3
                     </TabsTrigger>
                  </TabsList>

                  <div className="p-4 bg-white flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${currentVIP.color}`}>
                           <Crown className={`h-4 w-4 ${currentVIP.iconColor}`} />
                           <span className="font-semibold text-sm">{currentVIP.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                           <span className="font-medium text-gray-900">{totalProducts}</span> products available
                        </div>
                        <div className="text-sm text-gray-500">
                           (Min. {currentVIP.minProducts} products required)
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
                           Select all ({selectableProducts.length} available)
                        </label>
                     </div>
                  </div>

                  {selectedProducts.size > 0 ? (
                     <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Check className="h-5 w-5 text-orange-500" />
                           <span className="text-sm font-medium text-orange-800">
                              {selectedProducts.size} product{selectedProducts.size > 1 ? "s" : ""} selected
                           </span>
                           {selectedProducts.size < currentVIP.minProducts && (
                              <span className="text-sm text-orange-600">
                                 (Need {currentVIP.minProducts - selectedProducts.size} more)
                              </span>
                           )}
                        </div>
                        <Button
                           onClick={handleApplyVIP}
                           disabled={selectedProducts.size < currentVIP.minProducts || isApplying}
                           className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                        >
                           {isApplying ? (
                              <>
                                 <Loader className="h-4 w-4 animate-spin mr-2" />
                                 Applying...
                              </>
                           ) : (
                              `Apply for ${currentVIP.name}`
                           )}
                        </Button>
                     </div>
                  ) : (
                     <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Crown className={`h-5 w-5 ${currentVIP.iconColor}`} />
                           <span className="text-sm font-medium text-orange-800">
                              Apply all {currentVIP.name} products to your shop
                           </span>
                        </div>
                        <Button
                           onClick={handleApplyAllVIP}
                           disabled={isApplyingAll || selectableProducts.length === 0}
                           className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                        >
                           {isApplyingAll ? (
                              <>
                                 <Loader className="h-4 w-4 animate-spin mr-2" />
                                 Applying All...
                              </>
                           ) : (
                              `Apply All ${currentVIP.name}`
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
                  />
               </Tabs>

               {/* Results Summary */}
               <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                     Showing {products.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{" "}
                     {Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts} products
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
                                 <span className="hidden sm:inline">Previous</span>
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
                                 <span className="hidden sm:inline">Next</span>
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
