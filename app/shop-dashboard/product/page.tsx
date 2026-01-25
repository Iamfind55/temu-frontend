"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client/react"
import { useTranslation } from "react-i18next"
import { Search, Eye, Star, Package, ChevronLeft, ChevronRight, Loader } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Components
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationEllipsis,
} from "@/components/ui/pagination"

// API & Types
import { useShopStore } from "@/store/shop-store"
import { QUERY_GET_ALL_SHOP_ON_SHELF_PRODUCTS } from "@/app/api/shop/product"
import { ShopProduct, ShopGetProductsResponse } from "@/types/shopProduct"
import { TFunction } from "i18next"

function ShopProductCard({ product, onView, t }: { product: ShopProduct; onView: (id: string) => void; t: TFunction }) {
   const { productData } = product
   return (
      <div className="group cursor-pointer overflow-hidden shadow-md rounded-md hover:shadow-lg transition-all duration-300 relative p-0 bg-white">
         <div className="aspect-square bg-background overflow-hidden relative">
            <img
               src={productData.cover_image || productData.origin_image_url || "/placeholder.svg"}
               alt={productData.name}
               className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
            />

            <button
               onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onView(productData.id)
               }}
               className="cursor-pointer absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
            >
               <Eye className="h-4 w-4 text-gray-700" />
            </button>
         </div>

         <div className="p-3 space-y-1.5">
            <h3 className="text-sm line-clamp-2 min-h-[2rem] text-foreground leading-tight">{productData.name}</h3>

            <div className="flex items-baseline gap-2">
               <span className="text-xl font-bold text-primary">${formatCurrency(productData.price)}</span>
               <span className="text-xs text-muted-foreground">{product.sell_count}+ {t('sold')}</span>
            </div>

            <div className="flex items-center gap-1">
               {[...Array(5)].map((_, i) => (
                  <Star
                     key={i}
                     className={`h-3 w-3 ${i < Math.floor(productData.total_star) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                  />
               ))}
               <span className="text-xs text-muted-foreground ml-1">({productData.total_comment.toLocaleString()})</span>
            </div>

            {productData.brandData && (
               <div className="inline-block w-auto text-xs border font-bold text-black py-0.5 px-1 rounded bg-gray-200">
                  {t('brand')}: {productData.brandData.name}
               </div>
            )}

            {productData.categoryData && (
               <div className="inline-block ml-1 w-auto text-xs border font-medium text-gray-600 py-0.5 px-1 rounded bg-gray-100">
                  {productData.categoryData.name}
               </div>
            )}

            <div className="flex items-center justify-between pt-2">
               <Badge className="bg-green-100 text-green-800">
                  {t('alreadyOnShelf')}
               </Badge>
            </div>
         </div>
      </div>
   )
}

function ProductGrid({
   products,
   onView,
   loading,
   t,
}: {
   products: ShopProduct[]
   onView: (id: string) => void
   loading?: boolean
   t: TFunction
}) {
   if (loading) {
      return (
         <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg">
            <Loader className="h-5 w-5 text-orange-500 animate-spin mb-4" />
            <p className="text-sm text-gray-600">{t('loadingProducts')}</p>
         </div>
      )
   }

   if (products.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg">
            <Package className="h-10 w-10 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('noProductsFound')}</h3>
            <p className="text-sm text-gray-600">{t('tryAdjustingSearch')}</p>
         </div>
      )
   }

   return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
         {products.map((product) => (
            <ShopProductCard key={product.id} product={product} onView={onView} t={t} />
         ))}
      </div>
   )
}

export default function ProductsPage() {
   const { t } = useTranslation('shop-dashboard')
   const { shop } = useShopStore()
   const [currentPage, setCurrentPage] = useState(1)
   const [searchQuery, setSearchQuery] = useState("")
   const [debouncedSearch, setDebouncedSearch] = useState("")
   const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null)
   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
   const itemsPerPage = 20

   // Debounce search input
   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedSearch(searchQuery)
         setCurrentPage(1)
      }, 500)
      return () => clearTimeout(timer)
   }, [searchQuery])

   // Build where clause
   const buildWhereClause = () => {
      const where: Record<string, string> = {}
      if (shop?.id) {
         where.shop_id = shop.id
      }
      if (debouncedSearch.trim()) {
         where.keyword = debouncedSearch.trim()
      }
      return Object.keys(where).length > 0 ? where : null
   }

   // Fetch products
   const { data, loading } = useQuery<ShopGetProductsResponse>(QUERY_GET_ALL_SHOP_ON_SHELF_PRODUCTS, {
      variables: {
         page: currentPage,
         limit: itemsPerPage,
         where: buildWhereClause(),
         sortedBy: "created_at_DESC",
      },
      fetchPolicy: "cache-and-network",
   })

   const products = data?.getShopProducts?.data || []
   const totalProducts = data?.getShopProducts?.total || 0
   const totalPages = Math.ceil(totalProducts / itemsPerPage)

   const handleViewProduct = (id: string) => {
      const product = products.find(p => p.productData.id === id)
      if (product) {
         setSelectedProduct(product)
         setIsDetailModalOpen(true)
      }
   }

   const handleClearFilters = () => {
      setSearchQuery("")
      setDebouncedSearch("")
      setCurrentPage(1)
   }

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

   return (
      <div className="flex flex-col h-full">
         <div className="flex-1 p-2 sm:p-6">
            <div className="mx-auto max-w-7xl space-y-4">
               <div className="flex items-center justify-between">
                  <div className="mb-4">
                     <h1 className="text-sm sm:text-lg font-bold text-gray-900">{t('allOnShelfProducts')}</h1>
                     <p className="text-xs text-gray-600 mt-1">{t('manageYourProducts')}</p>
                  </div>

                  <div className="px-0 sm:px-2 bg-white mb-4">
                     <div className="flex flex-wrap gap-2 items-end">
                        <div className="flex-1 min-w-[150px]">
                           <label className="block text-xs font-medium text-gray-700 mb-1">{t('search')}</label>
                           <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                 type="text"
                                 placeholder={t('searchByName')}
                                 value={searchQuery}
                                 onChange={(e) => setSearchQuery(e.target.value)}
                                 className="text-sm pl-10"
                              />
                           </div>
                        </div>

                        <Button
                           variant="outline"
                           onClick={handleClearFilters}
                           className="hidden sm:block text-gray-600 hover:text-gray-900"
                        >
                           {t('clear')}
                        </Button>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <ProductGrid products={products} onView={handleViewProduct} loading={loading} t={t} />

                  <div className="flex flex-col sm:flex-row items-center justify-between">
                     <div className="mt-4 text-sm text-gray-600 text-center">
                        {t('showingProducts', { start: products.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0, end: Math.min(currentPage * itemsPerPage, totalProducts), total: totalProducts })}
                     </div>
                     {totalPages > 1 && (
                        <div className="mt-3 sm:mt-6 flex justify-center">
                           <Pagination>
                              <PaginationContent>
                                 <PaginationItem>
                                    <button
                                       onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                       disabled={currentPage === 1}
                                       className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                       <ChevronLeft className="h-4 w-4" />
                                       <span className="hidden sm:inline">{t('previous')}</span>
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
                                       <span className="hidden sm:inline">{t('next')}</span>
                                       <ChevronRight className="h-4 w-4" />
                                    </button>
                                 </PaginationItem>
                              </PaginationContent>
                           </Pagination>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>

         <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
            <DialogContent className="sm:!max-w-[700px] max-h-[90vh] overflow-y-auto">
               <DialogHeader>
                  <DialogTitle className="text-lg font-bold flex items-center gap-2">
                     <Package className="h-5 w-5 text-orange-500" />
                     {t('productDetails')}
                  </DialogTitle>
               </DialogHeader>

               {selectedProduct && (
                  <div className="space-y-6 py-2">
                     <div className="flex gap-6">
                        <div className="w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                           <img
                              src={selectedProduct.productData.cover_image || selectedProduct.productData.origin_image_url || "/placeholder.svg"}
                              alt={selectedProduct.productData.name}
                              className="w-full h-full object-cover"
                           />
                        </div>
                        <div className="flex-1 space-y-3">
                           <h3 className="text-lg font-semibold text-gray-900">
                              {selectedProduct.productData.name}
                           </h3>
                           <div className="flex items-baseline gap-3">
                              <span className="text-2xl font-bold text-orange-600">
                                 ${formatCurrency(selectedProduct.productData.price)}
                              </span>
                           </div>
                           <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                 <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(selectedProduct.productData.total_star) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                                 />
                              ))}
                              <span className="text-sm text-gray-500 ml-2">
                                 ({selectedProduct.productData.total_comment} {t('reviews')})
                              </span>
                           </div>
                           <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{selectedProduct.sell_count} {t('sold')}</span>
                              <span>Qty: {selectedProduct.quantity}</span>
                              <Badge className="bg-green-100 text-green-800">{selectedProduct.status}</Badge>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        {selectedProduct.productData.brandData && (
                           <div className="rounded-lg border p-3">
                              <span className="text-xs text-gray-500">{t('brand')}</span>
                              <div className="flex items-center gap-2 mt-1">
                                 {selectedProduct.productData.brandData.image && (
                                    <img
                                       src={selectedProduct.productData.brandData.image}
                                       alt={selectedProduct.productData.brandData.name}
                                       className="w-6 h-6 rounded"
                                    />
                                 )}
                                 <p className="text-sm font-medium">{selectedProduct.productData.brandData.name}</p>
                              </div>
                           </div>
                        )}
                        {selectedProduct.productData.categoryData && (
                           <div className="rounded-lg border p-3">
                              <span className="text-xs text-gray-500">{t('category')}</span>
                              <div className="flex items-center gap-2 mt-1">
                                 {selectedProduct.productData.categoryData.image && (
                                    <img
                                       src={selectedProduct.productData.categoryData.image}
                                       alt={selectedProduct.productData.categoryData.name}
                                       className="w-6 h-6 rounded"
                                    />
                                 )}
                                 <p className="text-sm font-medium">{selectedProduct.productData.categoryData.name}</p>
                              </div>
                           </div>
                        )}
                     </div>

                     {selectedProduct.productData.productTag && selectedProduct.productData.productTag.length > 0 && (
                        <div className="space-y-2">
                           <span className="text-xs text-gray-500">{t('productTags')}</span>
                           <div className="flex flex-wrap gap-2">
                              {selectedProduct.productData.productTag.map((tag) => (
                                 <Badge key={tag.id} variant="outline" className="text-sm">
                                    {tag.content || "No content"}
                                 </Badge>
                              ))}
                           </div>
                        </div>
                     )}

                     {selectedProduct.productData.description && (
                        <div className="space-y-2">
                           <span className="text-xs text-gray-500">{t('description')}</span>
                           <p className="text-sm text-gray-700">{selectedProduct.productData.description}</p>
                        </div>
                     )}

                     <div className="flex justify-end pt-2">
                        <Button
                           variant="outline"
                           onClick={() => setIsDetailModalOpen(false)}
                        >
                           {t('close')}
                        </Button>
                     </div>
                  </div>
               )}
            </DialogContent>
         </Dialog>
      </div>
   )
}
