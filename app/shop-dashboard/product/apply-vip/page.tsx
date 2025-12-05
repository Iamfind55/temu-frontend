"use client"

import { useState } from "react"
import { Star, Package, ChevronLeft, ChevronRight, Crown, Check } from "lucide-react"

// Components
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationEllipsis,
} from "@/components/ui/pagination"

// VIP Product interface
interface VIPProduct {
   id: string
   title: string
   price: number
   originalPrice: number
   images: string[]
   category: string
   rating: number
   reviewCount: number
   soldCount: string
   badges: string[]
   brand?: string
}

// Generate sample products for demo
const generateProducts = (): VIPProduct[] => {
   const categories = ["Electronics", "Home & Garden", "Fashion", "Sports", "Books", "Toys"]
   const sampleTitles = [
      "Sports Smart Watch, 1.83'' Full Touch Screen Display",
      "USB Socket and 3-Color Adjustable Light",
      "Portable Mini Projector - Compatible with Phone",
      "Wireless Bluetooth Earbuds with Charging Case",
      "Smart Watch Fitness Tracker",
      "40-inch Smartphone Selfie Stick Tripod",
      "Customizable Metal Sign, Personalized",
      "30-Day Chair Yoga Guide for Seniors",
   ]

   const products: VIPProduct[] = []
   for (let i = 1; i <= 48; i++) {
      const basePrice = Math.floor(Math.random() * 200) + 10
      products.push({
         id: `vip-prod-${i}`,
         title: sampleTitles[i % sampleTitles.length] + ` - Item ${i}`,
         price: basePrice,
         originalPrice: basePrice * 1.5,
         images: ["/placeholder.svg"],
         category: categories[i % categories.length],
         rating: 3.5 + Math.random() * 1.5,
         reviewCount: Math.floor(Math.random() * 10000),
         soldCount: `${Math.floor(Math.random() * 100)}k+`,
         badges: i % 5 === 0 ? ["Star store"] : [],
         brand: i % 4 === 0 ? "Brand X" : undefined,
      })
   }
   return products
}

const allProducts = generateProducts()

// VIP Product Card Component with checkbox
function VIPProductCard({
   product,
   isSelected,
   onSelect,
}: {
   product: VIPProduct
   isSelected: boolean
   onSelect: (id: string, checked: boolean) => void
}) {
   return (
      <div
         className={`group cursor-pointer overflow-hidden shadow-md rounded-md hover:shadow-lg transition-all duration-300 relative p-0 bg-white ${isSelected ? "ring-2 ring-orange-500" : ""
            }`}
         onClick={() => onSelect(product.id, !isSelected)}
      >
         <div className="aspect-square bg-background overflow-hidden relative">
            <img
               src={product.images[0] || "/placeholder.svg"}
               alt={product.title}
               className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
            />

            <div className="absolute top-2 left-2 flex flex-col gap-1">
               {product.category === "Home & Garden" && (
                  <Badge className="bg-green-600 text-white text-xs font-semibold px-2 py-0.5">Local</Badge>
               )}
            </div>

            {/* Checkbox */}
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
         </div>

         <div className="p-3 space-y-1.5">
            <h3 className="text-sm line-clamp-2 min-h-[2rem] text-foreground leading-tight">{product.title}</h3>

            <div className="flex items-baseline gap-2">
               <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
               <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-1">
               {[...Array(5)].map((_, i) => (
                  <Star
                     key={i}
                     className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                  />
               ))}
               <span className="text-xs text-muted-foreground ml-1">({product.reviewCount.toLocaleString()})</span>
            </div>

            <div className="text-xs text-muted-foreground">{product.soldCount} sold</div>

            {product.badges.includes("Star store") && (
               <Badge className="bg-purple-600 text-white text-xs font-medium px-2 py-0.5 w-fit">Star store</Badge>
            )}

            {product.brand && (
               <div className="inline-block w-auto text-xs border font-bold text-black py-0.5 px-1 rounded bg-gray-200">
                  Brand: {product.brand}
               </div>
            )}
         </div>
      </div>
   )
}

// VIP Level Info
const vipLevels = {
   VIP1: {
      name: "VIP 1",
      color: "bg-amber-100 text-amber-800 border-amber-300",
      iconColor: "text-amber-500",
      description: "Basic VIP benefits with standard promotion",
      minProducts: 5,
   },
   VIP2: {
      name: "VIP 2",
      color: "bg-purple-100 text-purple-800 border-purple-300",
      iconColor: "text-purple-500",
      description: "Enhanced visibility and priority listing",
      minProducts: 10,
   },
   VIP3: {
      name: "VIP 3",
      color: "bg-orange-100 text-orange-800 border-orange-300",
      iconColor: "text-orange-500",
      description: "Premium placement and exclusive features",
      minProducts: 20,
   },
}

export default function ApplyVIPPage() {
   const [activeTab, setActiveTab] = useState<"VIP1" | "VIP2" | "VIP3">("VIP1")
   const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
   const [currentPage, setCurrentPage] = useState(1)
   const itemsPerPage = 12

   // Pagination
   const totalPages = Math.ceil(allProducts.length / itemsPerPage)
   const paginatedProducts = allProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   )

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

   // Handle select all
   const handleSelectAll = (checked: boolean) => {
      if (checked) {
         const allIds = paginatedProducts.map((p) => p.id)
         setSelectedProducts(new Set(allIds))
      } else {
         setSelectedProducts(new Set())
      }
   }

   // Check if all current page products are selected
   const isAllSelected = paginatedProducts.length > 0 &&
      paginatedProducts.every((p) => selectedProducts.has(p.id))

   // Check if some products are selected
   const isSomeSelected = paginatedProducts.some((p) => selectedProducts.has(p.id))

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

         items.push(totalPages)
      }

      return items
   }

   const currentVIP = vipLevels[activeTab]

   // Handle apply VIP
   const handleApplyVIP = () => {
      console.log("Applying VIP:", {
         level: activeTab,
         selectedProducts: Array.from(selectedProducts),
      })
   }

   return (
      <div className="flex flex-col h-full">
         <div className="flex-1 p-4 sm:p-6">
            <div className="mx-auto max-w-7xl">
               {/* Page Header */}
               <div className="mb-4">
                  <h1 className="text-lg font-bold text-gray-900">Apply VIP</h1>
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
                           <span className="font-medium text-gray-900">{allProducts.length}</span> products available
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
                           className="h-5 w-5 border-2 border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <label
                           htmlFor="select-all"
                           className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                        >
                           Select all
                        </label>
                     </div>
                  </div>

                  {selectedProducts.size > 0 && (
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
                           disabled={selectedProducts.size < currentVIP.minProducts}
                           className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                        >
                           Apply for {currentVIP.name}
                        </Button>
                     </div>
                  )}

                  <TabsContent value="VIP1" className="mt-0">
                     <ProductGrid
                        products={paginatedProducts}
                        selectedProducts={selectedProducts}
                        onSelect={handleProductSelect}
                     />
                  </TabsContent>
                  <TabsContent value="VIP2" className="mt-0">
                     <ProductGrid
                        products={paginatedProducts}
                        selectedProducts={selectedProducts}
                        onSelect={handleProductSelect}
                     />
                  </TabsContent>
                  <TabsContent value="VIP3" className="mt-0">
                     <ProductGrid
                        products={paginatedProducts}
                        selectedProducts={selectedProducts}
                        onSelect={handleProductSelect}
                     />
                  </TabsContent>
               </Tabs>

               <div className="mt-2 text-sm text-gray-600 text-center">
                  Showing {paginatedProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{" "}
                  {Math.min(currentPage * itemsPerPage, allProducts.length)} of {allProducts.length} products
               </div>

               {totalPages > 1 && (
                  <div className="mt-6 flex justify-center">
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
                  </div>
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
}: {
   products: VIPProduct[]
   selectedProducts: Set<string>
   onSelect: (id: string, checked: boolean) => void
}) {
   if (products.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border">
            <Package className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-sm text-gray-600">Add products to your store first</p>
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
