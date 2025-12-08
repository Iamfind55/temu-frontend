"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { VIPCard } from "./VIPCard"
import { vipLevels } from "../constant"

export function VIPCarousel() {
   const [currentIndex, setCurrentIndex] = useState(0)
   const [touchStart, setTouchStart] = useState<number | null>(null)
   const [touchEnd, setTouchEnd] = useState<number | null>(null)

   const minSwipeDistance = 50

   const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % vipLevels.length)
   }

   const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + vipLevels.length) % vipLevels.length)
   }

   const onTouchStart = (e: React.TouchEvent) => {
      setTouchEnd(null)
      setTouchStart(e.targetTouches[0].clientX)
   }

   const onTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX)
   }

   const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return
      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > minSwipeDistance
      const isRightSwipe = distance < -minSwipeDistance
      if (isLeftSwipe) nextSlide()
      if (isRightSwipe) prevSlide()
   }

   return (
      <div className="relative">
         <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
         >
            <div
               className="flex transition-transform duration-300 ease-in-out"
               style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
               {vipLevels.map((level) => (
                  <div key={level.id} className="w-full flex-shrink-0 px-1">
                     <VIPCard level={level} />
                  </div>
               ))}
            </div>
         </div>

         <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 z-10"
            aria-label="Previous slide"
         >
            <ChevronLeft className="w-5 h-5" />
         </button>
         <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 z-10"
            aria-label="Next slide"
         >
            <ChevronRight className="w-5 h-5" />
         </button>

         <div className="flex justify-center gap-2 mt-4">
            {vipLevels.map((_, index) => (
               <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-orange-500" : "bg-gray-300"}`}
                  aria-label={`Go to slide ${index + 1}`}
               />
            ))}
         </div>
      </div>
   )
}
