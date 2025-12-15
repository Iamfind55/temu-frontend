export interface ShopOrder {
  id: string
  order_no: string
  total_quantity: number
  total_products: number
  total_price: number
  total_discount: number
  order_status: string
  payment_slip: string | null
  created_at: string
}

export interface ShopOrderDetail {
  id: string
  order_no: string
  product_name: string
  product_cover_image: string | null
  quantity: number
  price: number
  discount: number
  profit: number
  order_id: string
  status: string
  payment_status: string
  order_status: string
  delivery_type: string
  product_id: string
  sign_in_status: string
}

export interface ApiError {
  message: string
  code: string
  details: string
}

export interface ShopGetOrdersResponse {
  shopGetOrders: {
    success: boolean
    total: number
    data: ShopOrder[]
    error: ApiError | null
  }
}

export interface ShopGetOrderDetailsResponse {
  shopGetOrderDetails: {
    success: boolean
    total: number
    data: ShopOrderDetail[]
    error: ApiError | null
  }
}

export interface ShopConfirmOrderResponse {
  shopConfirmOrder: {
    success: boolean
    message: string
    error: ApiError | null
  }
}

export interface ShopCancelOrderResponse {
  shopCancelOrder: {
    success: boolean
    message: string
    error: ApiError | null
  }
}
