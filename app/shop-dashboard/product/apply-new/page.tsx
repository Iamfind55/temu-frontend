"use client"

import { useState, useMemo } from "react"
import { Star, Package, ChevronLeft, ChevronRight, Check, ShieldCheck } from "lucide-react"

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

// Category structure with sub-categories
const categories = [
   {
      id: "electronics",
      name: "Electronics",
      sub1: [
         {
            id: "phones",
            name: "Phones & Tablets",
            sub2: [
               { id: "smartphones", name: "Smartphones" },
               { id: "tablets", name: "Tablets" },
               { id: "accessories", name: "Phone Accessories" },
            ],
         },
         {
            id: "computers",
            name: "Computers",
            sub2: [
               { id: "laptops", name: "Laptops" },
               { id: "desktops", name: "Desktops" },
               { id: "monitors", name: "Monitors" },
            ],
         },
         {
            id: "audio",
            name: "Audio",
            sub2: [
               { id: "headphones", name: "Headphones" },
               { id: "speakers", name: "Speakers" },
               { id: "earbuds", name: "Earbuds" },
            ],
         },
      ],
   },
   {
      id: "fashion",
      name: "Fashion",
      sub1: [
         {
            id: "mens",
            name: "Men's Clothing",
            sub2: [
               { id: "shirts", name: "Shirts" },
               { id: "pants", name: "Pants" },
               { id: "jackets", name: "Jackets" },
            ],
         },
         {
            id: "womens",
            name: "Women's Clothing",
            sub2: [
               { id: "dresses", name: "Dresses" },
               { id: "tops", name: "Tops" },
               { id: "skirts", name: "Skirts" },
            ],
         },
      ],
   },
   {
      id: "home",
      name: "Home & Garden",
      sub1: [
         {
            id: "furniture",
            name: "Furniture",
            sub2: [
               { id: "sofas", name: "Sofas" },
               { id: "tables", name: "Tables" },
               { id: "chairs", name: "Chairs" },
            ],
         },
         {
            id: "kitchen",
            name: "Kitchen",
            sub2: [
               { id: "cookware", name: "Cookware" },
               { id: "appliances", name: "Appliances" },
               { id: "utensils", name: "Utensils" },
            ],
         },
      ],
   },
]

// Product interface
interface ApplyProduct {
   id: string
   title: string
   price: number
   originalPrice: number
   images: string[]
   categoryId: string
   sub1Id: string
   sub2Id: string
   rating: number
   reviewCount: number
   soldCount: string
   badges: string[]
   brand?: string
   applyStatus: "none" | "pending" | "approved" | "rejected"
}

// Generate sample products
const generateProducts = (): ApplyProduct[] => {
   const statuses: ApplyProduct["applyStatus"][] = ["none", "none", "none", "pending", "approved", "rejected"]
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

   const products: ApplyProduct[] = []
   let productIndex = 0

   categories.forEach((cat) => {
      cat.sub1.forEach((sub1) => {
         sub1.sub2.forEach((sub2) => {
            for (let i = 0; i < 4; i++) {
               productIndex++
               const basePrice = Math.floor(Math.random() * 200) + 10
               products.push({
                  id: `apply-prod-${productIndex}`,
                  title: sampleTitles[productIndex % sampleTitles.length] + ` - Item ${productIndex}`,
                  price: basePrice,
                  originalPrice: basePrice * 1.5,
                  images: ["/placeholder.svg"],
                  categoryId: cat.id,
                  sub1Id: sub1.id,
                  sub2Id: sub2.id,
                  rating: 3.5 + Math.random() * 1.5,
                  reviewCount: Math.floor(Math.random() * 10000),
                  soldCount: `${Math.floor(Math.random() * 100)}k+`,
                  badges: productIndex % 5 === 0 ? ["Star store"] : [],
                  brand: productIndex % 4 === 0 ? "Brand X" : undefined,
                  applyStatus: statuses[productIndex % statuses.length],
               })
            }
         })
      })
   })

   return products
}

const allProducts = generateProducts()

// Status badge styles
const getStatusBadge = (status: ApplyProduct["applyStatus"]) => {
   switch (status) {
      case "pending":
         return { text: "Pending", className: "bg-yellow-100 text-yellow-800 border-yellow-300" }
      case "approved":
         return { text: "Approved", className: "bg-green-100 text-green-800 border-green-300" }
      case "rejected":
         return { text: "Rejected", className: "bg-red-100 text-red-800 border-red-300" }
      default:
         return null
   }
}

// Product Card Component
function ApplyProductCard({
   product,
   isSelected,
   onSelect,
}: {
   product: ApplyProduct
   isSelected: boolean
   onSelect: (id: string, checked: boolean) => void
}) {
   const isDisabled = product.applyStatus !== "none"
   const statusBadge = getStatusBadge(product.applyStatus)

   return (
      <div
         className={`group overflow-hidden shadow-md rounded-md transition-all duration-300 relative p-0 bg-white ${isDisabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:shadow-lg"
            } ${isSelected && !isDisabled ? "ring-2 ring-orange-500" : ""}`}
         onClick={() => !isDisabled && onSelect(product.id, !isSelected)}
      >
         <div className="aspect-square bg-background overflow-hidden relative">
            <img
               src={product.images[0] || "/placeholder.svg"}
               alt={product.title}
               className={`h-full w-full object-cover transition-transform duration-300 rounded-md ${!isDisabled ? "group-hover:scale-105" : ""
                  }`}
            />

            {/* Status Badge Overlay for applied products */}
            {isDisabled && statusBadge && (
               <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className={`px-3 py-1.5 rounded-full border ${statusBadge.className} flex items-center gap-1.5`}>
                     <ShieldCheck className="h-4 w-4" />
                     <span className="font-semibold text-sm">{statusBadge.text}</span>
                  </div>
               </div>
            )}

            {/* Checkbox - only show for non-applied products */}
            {!isDisabled && (
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

            {/* Status badge at bottom for applied products */}
            {statusBadge && (
               <div className="pt-2">
                  <Badge className={`${statusBadge.className} border text-xs`}>
                     {statusBadge.text}
                  </Badge>
               </div>
            )}
         </div>
      </div>
   )
}

export default function ApplyNewPage() {
   const [selectedCategory, setSelectedCategory] = useState<string>("all")
   const [selectedSub1, setSelectedSub1] = useState<string>("all")
   const [selectedSub2, setSelectedSub2] = useState<string>("all")
   const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
   const [currentPage, setCurrentPage] = useState(1)
   const itemsPerPage = 12

   // Get sub1 options based on selected category
   const sub1Options = useMemo(() => {
      if (selectedCategory === "all") return []
      const category = categories.find((c) => c.id === selectedCategory)
      return category?.sub1 || []
   }, [selectedCategory])

   // Get sub2 options based on selected sub1
   const sub2Options = useMemo(() => {
      if (selectedSub1 === "all") return []
      const category = categories.find((c) => c.id === selectedCategory)
      const sub1 = category?.sub1.find((s) => s.id === selectedSub1)
      return sub1?.sub2 || []
   }, [selectedCategory, selectedSub1])

   // Filter products based on category selection
   const filteredProducts = useMemo(() => {
      let filtered = [...allProducts]

      if (selectedCategory !== "all") {
         filtered = filtered.filter((p) => p.categoryId === selectedCategory)
      }
      if (selectedSub1 !== "all") {
         filtered = filtered.filter((p) => p.sub1Id === selectedSub1)
      }
      if (selectedSub2 !== "all") {
         filtered = filtered.filter((p) => p.sub2Id === selectedSub2)
      }

      return filtered
   }, [selectedCategory, selectedSub1, selectedSub2])

   // Pagination
   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
   const paginatedProducts = filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   )

   // Get selectable products (not already applied)
   const selectableProducts = paginatedProducts.filter((p) => p.applyStatus === "none")

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

   // Handle select all (only selectable products)
   const handleSelectAll = (checked: boolean) => {
      if (checked) {
         const selectableIds = selectableProducts.map((p) => p.id)
         setSelectedProducts(new Set(selectableIds))
      } else {
         setSelectedProducts(new Set())
      }
   }

   // Check if all selectable products are selected
   const isAllSelected = selectableProducts.length > 0 &&
      selectableProducts.every((p) => selectedProducts.has(p.id))

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

   // Handle apply
   const handleApply = () => {
      console.log("Applying products:", Array.from(selectedProducts))
   }

   // Count stats
   const availableCount = filteredProducts.filter((p) => p.applyStatus === "none").length
   const appliedCount = filteredProducts.filter((p) => p.applyStatus !== "none").length

   return (
      <div className="flex flex-col h-full">
         <div className="flex-1 p-4 sm:p-6">
            <div className="mx-auto max-w-7xl">
               <div>
                  <h1 className="text-lg font-bold text-gray-900">Apply New Products</h1>
                  <p className="text-sm text-gray-600 mt-1">Select products to apply for listing</p>
               </div>

               <div className="mb-4 p-4 bg-white">
                  <div className="flex flex-wrap gap-4 items-end">
                     <div className="w-[200px]">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                           <SelectTrigger className="w-full">
                              <SelectValue placeholder="All Categories" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              {categories.map((cat) => (
                                 <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="w-[200px]">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Sub Category 1</label>
                        <Select
                           value={selectedSub1}
                           onValueChange={handleSub1Change}
                           disabled={selectedCategory === "all"}
                        >
                           <SelectTrigger className="w-full">
                              <SelectValue placeholder="All Sub Categories" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="all">All Sub Categories</SelectItem>
                              {sub1Options.map((sub) => (
                                 <SelectItem key={sub.id} value={sub.id}>
                                    {sub.name}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="w-[200px]">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Sub Category 2</label>
                        <Select
                           value={selectedSub2}
                           onValueChange={handleSub2Change}
                           disabled={selectedSub1 === "all"}
                        >
                           <SelectTrigger className="w-full">
                              <SelectValue placeholder="All Sub Categories" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="all">All Sub Categories</SelectItem>
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

               <div className="py-2 px-4 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <h2 className="font-semibold text-gray-900">Products</h2>
                     <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-600">
                           <span className="font-medium text-gray-900">{filteredProducts.length}</span> total
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-green-600">
                           <span className="font-medium">{availableCount}</span> available
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-orange-600">
                           <span className="font-medium">{appliedCount}</span> applied
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
                        Select all
                     </label>
                  </div>
               </div>

               {/* Selected Count & Apply Button */}
               {selectedProducts.size > 0 && (
                  <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-orange-500" />
                        <span className="text-sm font-medium text-orange-800">
                           {selectedProducts.size} product{selectedProducts.size > 1 ? "s" : ""} selected
                        </span>
                     </div>
                     <Button
                        onClick={handleApply}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                     >
                        Apply Selected Products
                     </Button>
                  </div>
               )}

               {/* Products Grid */}
               <ProductGrid
                  products={paginatedProducts}
                  selectedProducts={selectedProducts}
                  onSelect={handleProductSelect}
               />

               {/* Results Summary */}
               <div className="mt-2 text-sm text-gray-600 text-center">
                  Showing {paginatedProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{" "}
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
               </div>

               {/* Pagination */}
               {totalPages > 1 && (
                  <div className="mt-6 flex justify-center">
                     <Pagination>
                        <PaginationContent>
                           {/* Previous Button */}
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

                           {/* Page Numbers */}
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

                           {/* Next Button */}
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
   products: ApplyProduct[]
   selectedProducts: Set<string>
   onSelect: (id: string, checked: boolean) => void
}) {
   if (products.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border">
            <Package className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-sm text-gray-600">Try adjusting your category filters</p>
         </div>
      )
   }

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         {products.map((product) => (
            <ApplyProductCard
               key={product.id}
               product={product}
               isSelected={selectedProducts.has(product.id)}
               onSelect={onSelect}
            />
         ))}
      </div>
   )
}
