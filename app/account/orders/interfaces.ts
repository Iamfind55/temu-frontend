export interface OrderDetail {
  id: string;
  product_name: string | null;
  product_cover_image: string | null;
  price: number;
  order_no: string;
  discount: number;
  delivery_type: string | null;
  quantity: number;
  product_id: string;
}

export interface Order {
  id: string;
  order_no: string;
  order_status: string;
  total_products: number;
  total_quantity: number;
  total_price: number;
  total_discount: number;
  delivery_type: string;
  status: string;
  created_at: string;
  order_details: OrderDetail[];
}

export interface GetOrdersResponse {
  customerGetOrders: {
    success: boolean;
    total: number;
    data: Order[];
    error?: {
      message: string;
      code: string;
      details: string;
    };
  };
}
