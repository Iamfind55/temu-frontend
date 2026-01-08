"use client"

import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@apollo/client/react"
import { ChevronRight, Loader } from "lucide-react"
import { SkeletonNextImage } from "@/components/ui/skeleton-image"
import { QUERY_GET_ALL_CATEGORIES } from "@/app/api/category"
import { IGetCategoriesResponse, ICategory } from "@/app/interface/category"

interface MegaMenuProps {
  onClose?: () => void
}

export function MegaMenu({ onClose }: MegaMenuProps) {
  const { t } = useTranslation("header")
  const { data, loading, error } = useQuery<IGetCategoriesResponse>(QUERY_GET_ALL_CATEGORIES, {
    variables: {
      limit: 100,
      where: {
        status: "ACTIVE"
      }
    }
  })

  const categories = data?.getCategories?.data || []
  const [hoveredCategory, setHoveredCategory] = useState<ICategory | null>(null)

  // Set the first category as hovered when data loads
  if (!hoveredCategory && categories.length > 0) {
    setHoveredCategory(categories[0])
  }

  if (loading) {
    return (
      <div className="absolute left-0 top-full z-50 w-full bg-white rounded-sm">
        <div className="flex items-center justify-center py-12">
          <Loader className="h-6 w-6 animate-spin text-orange-400" />
        </div>
      </div>
    )
  }

  if (error || !categories.length) {
    return null
  }

  return (
    <>
      {/* Mobile Menu - Simple category list */}
      <div className="block sm:hidden absolute left-0 top-full z-50 w-full bg-white shadow-2xl rounded-sm max-h-[70vh] overflow-y-auto">
        <div className="py-2">
          <h3 className="px-4 py-2 text-sm font-semibold text-gray-500 border-b">
            {t("categories")}
          </h3>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 hover:bg-orange-50 hover:text-orange-600 transition-colors border-b border-gray-100"
            >
              <span>{category.name}</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Menu - Full mega menu with hover */}
      {hoveredCategory && (
        <div className="hidden sm:block absolute left-0 top-full z-50 w-full bg-white shadow-2xl rounded-sm">
          <div className="mx-auto flex max-h-[700px]">
            {/* Left sidebar - First level categories */}
            <div className="w-64 flex-shrink-0 border-r bg-gray-50 overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onMouseEnter={() => setHoveredCategory(category)}
                  className={`font-bold flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors cursor-pointer ${hoveredCategory?.id === category.id
                    ? "bg-white font-medium text-foreground"
                    : "text-gray-700 hover:bg-white/50"
                    }`}
                >
                  <span>{category.name}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              ))}
            </div>

            {/* Right content - Subcategories */}
            <div className="flex-1 px-8 py-6 bg-white overflow-y-auto">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-black text-lg font-semibold">
                  {t("allCategory", { category: hoveredCategory.name })} <ChevronRight className="inline h-5 w-5" />
                </h3>
              </div>

              {/* Second level subcategories */}
              {hoveredCategory.subcategories && hoveredCategory.subcategories.length > 0 ? (
                <div className="space-y-8">
                  {hoveredCategory.subcategories.map((subCategory) => (
                    <div key={subCategory.id}>
                      {/* Subcategory title */}
                      <h4 className="text-sm font-semibold text-gray-900 mb-4">
                        {subCategory.name}
                      </h4>

                      {/* Third level subcategories (with images) */}
                      {subCategory.subcategories && subCategory.subcategories.length > 0 && (
                        <div className="grid grid-cols-5 gap-x-6 gap-y-6">
                          {subCategory.subcategories.map((subSubCategory) => {
                            const imageUrl = subSubCategory.image || subSubCategory.oring_image_url || "/placeholder.svg"

                            return (
                              <Link
                                key={subSubCategory.id}
                                href={`/category/${subSubCategory.id}`}
                                className="group flex flex-col items-center text-center transition-transform hover:scale-105"
                              >
                                <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200 transition-all group-hover:border-primary">
                                  <SkeletonNextImage
                                    src={imageUrl}
                                    alt={subSubCategory.name}
                                    fill
                                    containerClassName="absolute inset-0 rounded-full"
                                    skeletonClassName="rounded-full"
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-xs text-gray-700 group-hover:text-primary">
                                  {subSubCategory.name}
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  {t("noSubcategoriesAvailable")}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}