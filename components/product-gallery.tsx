"use client"

import { useState } from "react"
import EmptyPage from "./ui/empty"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MessageSquareText, ShieldCheck, Star } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
  title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-0 sm:space-y-4">
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
        <img src={images[selectedImage] || "/placeholder.svg"} alt={title} className="w-full h-full object-contain" />
        <Button
          variant="ghost"
          size="icon"
          className="border absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="border absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="hidden sm:flex gap-2 overflow-x-scroll pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? "border-orange-500" : "border hover:border-muted-foreground"
              }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${title} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="flex gap-2">
          <span className="text-md font-bold">20 Reviews  |</span>
          <div className="flex gap-3 items-center">
            <span className="text-md font-semibold">{4} </span>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(4.5) ? "fill-orange-500 text-orange-500" : "text-gray-400"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="bg-green-500 rounded-l-sm py-2 px-2">
            <ShieldCheck size={16} className="text-white" />
          </div>
          <div className="py-1.5 px-2 bg-gray-50 w-full">
            <span className="text-xs text-green-600 font-bold">All reviews are from verified purchases</span>
          </div>
        </div>
      </div>

      <div className="hidden sm:block text-sm">
        <div className="border-b py-1">
          <p className="text-md">All recommended:</p>
        </div>
        <div>
          <EmptyPage icon={MessageSquareText} title="No recommaned yet!" description="There is no recommended or comment for this product yet." />
        </div>
      </div>
    </div>
  )
}
