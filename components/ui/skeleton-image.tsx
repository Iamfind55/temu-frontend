"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  containerClassName?: string
  skeletonClassName?: string
}

export function SkeletonImage({
  src,
  alt,
  className,
  containerClassName,
  skeletonClassName,
  ...props
}: SkeletonImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {!isLoaded && !hasError && (
        <div
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse",
            skeletonClassName
          )}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true)
          setIsLoaded(true)
        }}
        {...props}
      />
    </div>
  )
}

interface SkeletonNextImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  containerClassName?: string
  skeletonClassName?: string
}

export function SkeletonNextImage({
  className,
  containerClassName,
  skeletonClassName,
  alt,
  ...props
}: SkeletonNextImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {!isLoaded && !hasError && (
        <div
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse",
            skeletonClassName
          )}
        />
      )}
      <Image
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true)
          setIsLoaded(true)
        }}
        {...props}
      />
    </div>
  )
}
