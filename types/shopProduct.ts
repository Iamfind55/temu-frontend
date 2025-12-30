import { ApiError } from "./shopOrder"

export interface ProductBrand {
  id: string
  name: string
  image: string | null
}

export interface ProductCategory {
  id: string
  name: string
  image: string | null
}

export interface ProductTag {
  id: string
  content: string
}

export interface ProductData {
  id: string
  name: string
  price: number
  images: string[]
  description: string
  cover_image: string | null
  sell_count: number
  quantity: number
  status: string
  total_star: number
  total_comment: number
  product_vip: boolean
  brand_id: string | null
  brandData: ProductBrand | null
  categoryData: ProductCategory | null
  product_top: boolean
  productTag: ProductTag[]
  discount: number
  price_str: string
  market_price: number
  origin_image_url: string | null
}

export interface ShopProduct {
  id: string
  sell_count: number
  quantity: number
  status: string
  productData: ProductData
}

export interface ShopGetProductsResponse {
  getShopProducts: {
    success: boolean
    total: number
    data: ShopProduct[]
    error: ApiError | null
  }
}

export interface ShopProductWhereInput {
  status?: string
  search?: string
}

export type BaseOrderByInput = string
