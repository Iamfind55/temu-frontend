"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { categories } from "@/lib/category-data"

export function MegaMenu() {
  const [hoveredCategory, setHoveredCategory] = useState(categories[0])

  return (
    <div className="absolute left-0 top-full z-50 w-full bg-white shadow-2xl rounded-md">
      <div className="mx-auto flex">
        <div className="w-64 flex-shrink-0 border-r bg-gray-50">
          {categories.map((category) => (
            <button
              key={category.id}
              onMouseEnter={() => setHoveredCategory(category)}
              className={`font-bold flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors cursor-pointer ${hoveredCategory.id === category.id
                ? "bg-white font-medium text-foreground"
                : "text-gray-700 hover:bg-white/50"
                }`}
            >
              <span>{category.name}</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          ))}
        </div>

        <div className="flex-1 px-8 bg-white">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-black text-lg font-semibold">
              All {hoveredCategory.name} <ChevronRight className="inline h-5 w-5" />
            </h3>
          </div>

          <div className="grid grid-cols-5 gap-x-6 gap-y-6">
            {hoveredCategory.subCategories.map((subCategory) => (
              <Link
                key={subCategory.id}
                href={subCategory.link}
                className="group flex flex-col items-center text-center transition-transform hover:scale-105"
              >
                <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200 transition-all group-hover:border-primary">
                  <Image
                    src={subCategory.image || "/placeholder.svg"}
                    alt={subCategory.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs text-gray-700 group-hover:text-primary">{subCategory.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
