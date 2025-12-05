"use client"

import { useState, useMemo } from "react"
import { Search, Eye, Star, Calendar, Package, ChevronLeft, ChevronRight } from "lucide-react"

// Components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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

// Sample product interface for shop dashboard
interface ShopProduct {
   id: string
   title: string
   price: number
   originalPrice: number
   images: string[]
   category: string
   rating: number
   reviewCount: number
   soldCount: string
   status: "on_shelf" | "un_shelf"
   createdAt: string
   badges: string[]
   brand?: string
}

// Generate sample products for demo
const generateProducts = (): ShopProduct[] => {
   const statuses: ("on_shelf" | "un_shelf")[] = ["on_shelf", "un_shelf"]
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

   const products: ShopProduct[] = []
   for (let i = 1; i <= 120; i++) {
      const basePrice = Math.floor(Math.random() * 200) + 10
      products.push({
         id: `prod-${i}`,
         title: sampleTitles[i % sampleTitles.length] + ` - Variant ${i}`,
         price: basePrice,
         originalPrice: basePrice * 1.5,
         images: ["/placeholder.svg"],
         category: categories[i % categories.length],
         rating: 3.5 + Math.random() * 1.5,
         reviewCount: Math.floor(Math.random() * 10000),
         soldCount: `${Math.floor(Math.random() * 100)}k+`,
         status: statuses[i % 3 === 0 ? 1 : 0],
         createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
         badges: i % 5 === 0 ? ["Star store"] : [],
         brand: i % 4 === 0 ? "Brand X" : undefined,
      })
   }
   return products
}

const allProducts = generateProducts()

// Product Card Component (adapted with view icon)
function ShopProductCard({ product, onView }: { product: ShopProduct; onView: (id: string) => void }) {
   return (
      <div className="group cursor-pointer overflow-hidden shadow-md rounded-md hover:shadow-lg transition-all duration-300 relative p-0 bg-white">
         <div className="aspect-square bg-background overflow-hidden relative">
            <img
               src={product.images[0] || "/placeholder.svg"}
               alt={product.title}
               className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
            />

            <div className="absolute top-2 left-2 flex flex-col gap-1">
               {product.status === "un_shelf" && (
                  <Badge className="bg-gray-600 text-white text-xs font-semibold px-2 py-0.5">Unlisted</Badge>
               )}
               {product.category === "Home & Garden" && (
                  <Badge className="bg-green-600 text-white text-xs font-semibold px-2 py-0.5">Local</Badge>
               )}
            </div>

            <button
               onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onView(product.id)
               }}
               className="cursor-pointer absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
            >
               <Eye className="h-4 w-4 text-gray-700" />
            </button>
         </div>

         <div className="p-3 space-y-1.5">
            <h3 className="text-sm line-clamp-2 min-h-[2rem] text-foreground leading-tight">{product.title}</h3>

            <div className="flex items-baseline gap-2">
               <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
               <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
               <span className="text-xs text-muted-foreground">{product.soldCount} sold</span>
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

            {product.badges.includes("Star store") && (
               <Badge className="bg-purple-600 text-white text-xs font-medium px-2 py-0.5 w-fit">P Star store</Badge>
            )}

            {product.brand && (
               <div className="inline-block w-auto text-xs border font-bold text-black py-0.5 px-1 rounded bg-gray-200">
                  Brand: {product.brand}
               </div>
            )}

            <div className="flex items-center justify-between pt-2">
               <Badge className={product.status === "on_shelf" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                  {product.status === "on_shelf" ? "On Shelf" : "Un Shelf"}
               </Badge>
               <span className="text-xs text-muted-foreground">
                  {new Date(product.createdAt).toLocaleDateString()}
               </span>
            </div>
         </div>
      </div>
   )
}

export default function ProductsPage() {
   const [activeTab, setActiveTab] = useState("all")
   const [searchQuery, setSearchQuery] = useState("")
   const [statusFilter, setStatusFilter] = useState("all")
   const [startDate, setStartDate] = useState("")
   const [endDate, setEndDate] = useState("")
   const [currentPage, setCurrentPage] = useState(1)
   const itemsPerPage = 50

   // Filter products based on tab, search, status, and date range
   const filteredProducts = useMemo(() => {
      let filtered = [...allProducts]

      // Filter by tab
      if (activeTab === "on_shelf") {
         filtered = filtered.filter((p) => p.status === "on_shelf")
      } else if (activeTab === "un_shelf") {
         filtered = filtered.filter((p) => p.status === "un_shelf")
      }

      // Filter by search query
      if (searchQuery.trim()) {
         const query = searchQuery.toLowerCase()
         filtered = filtered.filter(
            (p) =>
               p.title.toLowerCase().includes(query) ||
               p.category.toLowerCase().includes(query) ||
               p.id.toLowerCase().includes(query)
         )
      }

      // Filter by status (within tab)
      if (statusFilter !== "all") {
         filtered = filtered.filter((p) => p.status === statusFilter)
      }

      // Filter by date range
      if (startDate) {
         const start = new Date(startDate)
         filtered = filtered.filter((p) => new Date(p.createdAt) >= start)
      }
      if (endDate) {
         const end = new Date(endDate)
         end.setHours(23, 59, 59, 999)
         filtered = filtered.filter((p) => new Date(p.createdAt) <= end)
      }

      return filtered
   }, [activeTab, searchQuery, statusFilter, startDate, endDate])

   // Pagination
   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
   const paginatedProducts = filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   )

   // Reset page when filters change
   const handleTabChange = (value: string) => {
      setActiveTab(value)
      setCurrentPage(1)
   }

   const handleSearchChange = (value: string) => {
      setSearchQuery(value)
      setCurrentPage(1)
   }

   const handleStatusChange = (value: string) => {
      setStatusFilter(value)
      setCurrentPage(1)
   }

   const handleStartDateChange = (value: string) => {
      setStartDate(value)
      setCurrentPage(1)
   }

   const handleEndDateChange = (value: string) => {
      setEndDate(value)
      setCurrentPage(1)
   }

   const handleViewProduct = (id: string) => {
      console.log("View product:", id)
      // Navigate to product detail or open modal
   }

   const handleClearFilters = () => {
      setSearchQuery("")
      setStatusFilter("all")
      setStartDate("")
      setEndDate("")
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

         items.push(totalPages)
      }

      return items
   }

   // Get counts for each tab
   const counts = useMemo(() => ({
      all: allProducts.length,
      on_shelf: allProducts.filter((p) => p.status === "on_shelf").length,
      un_shelf: allProducts.filter((p) => p.status === "un_shelf").length,
   }), [])

   return (
      <div className="flex flex-col h-full">
         <div className="flex-1 p-4 sm:p-6">
            <div className="mx-auto max-w-7xl">
               <div className="mb-4">
                  <h1 className="text-lg font-bold text-gray-900">Products</h1>
                  <p className="text-sm text-gray-600 mt-1">Manage your product listings</p>
               </div>

               <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="mb-6 bg-white border flex gap-8 px-6">
                     <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                        All Products ({counts.all})
                     </TabsTrigger>
                     <TabsTrigger value="on_shelf" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                        On Shelf ({counts.on_shelf})
                     </TabsTrigger>
                     <TabsTrigger value="un_shelf" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                        Un Shelf ({counts.un_shelf})
                     </TabsTrigger>
                  </TabsList>

                  <div className="p-2 bg-white">
                     <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[200px]">
                           <label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
                           <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                 type="text"
                                 placeholder="Search by name, category, or ID..."
                                 value={searchQuery}
                                 onChange={(e) => handleSearchChange(e.target.value)}
                                 className="pl-10"
                              />
                           </div>
                        </div>

                        <div className="w-[160px]">
                           <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                           <Select value={statusFilter} onValueChange={handleStatusChange}>
                              <SelectTrigger className="w-full">
                                 <SelectValue placeholder="All Status" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="all">All Status</SelectItem>
                                 <SelectItem value="on_shelf">On Shelf</SelectItem>
                                 <SelectItem value="un_shelf">Un Shelf</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>

                        <div className="w-[160px]">
                           <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                           <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                              <Input
                                 type="date"
                                 value={startDate}
                                 onChange={(e) => handleStartDateChange(e.target.value)}
                                 className="pl-10"
                              />
                           </div>
                        </div>

                        <div className="w-[160px]">
                           <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                           <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                              <Input
                                 type="date"
                                 value={endDate}
                                 onChange={(e) => handleEndDateChange(e.target.value)}
                                 className="pl-10"
                              />
                           </div>
                        </div>

                        <Button
                           variant="outline"
                           onClick={handleClearFilters}
                           className="text-gray-600 hover:text-gray-900"
                        >
                           Clear
                        </Button>
                     </div>
                  </div>

                  <TabsContent value="all" className="mt-0">
                     <ProductGrid products={paginatedProducts} onView={handleViewProduct} />
                  </TabsContent>
                  <TabsContent value="on_shelf" className="mt-0">
                     <ProductGrid products={paginatedProducts} onView={handleViewProduct} />
                  </TabsContent>
                  <TabsContent value="un_shelf" className="mt-0">
                     <ProductGrid products={paginatedProducts} onView={handleViewProduct} />
                  </TabsContent>
               </Tabs>

               <div className="mt-2 text-sm text-gray-600 text-center">
                  Showing {paginatedProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{" "}
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
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
function ProductGrid({ products, onView }: { products: ShopProduct[]; onView: (id: string) => void }) {
   if (products.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border">
            <Package className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-sm text-gray-600">Try adjusting your filters or search query</p>
         </div>
      )
   }

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
         {products.map((product) => (
            <ShopProductCard key={product.id} product={product} onView={onView} />
         ))}
      </div>
   )
}
