export interface IProduct {
  id: string;
  name: string;
  price: number;
  price_str?: string;
  market_price?: number;
  images: string[];
  description: string;
  cover_image: string;
  origin_image_url: string;
  sell_count: number;
  quantity: number;
  status: string;
  total_star: number;
  total_comment: number;
  product_vip: boolean;
  brand_id: string;
  brandData: {
    id: string;
    name: string;
    image: string;
  };
  categoryData: {
    id: string;
    name: string;
    image: string;
  };
  product_top: boolean;
  productTag: {
    id: string;
    content: string;
  }[];
  discount: number;
}

export interface IGetProductsResponse {
  getProducts: {
    success: boolean;
    total: number;
    data: IProduct[];
    error?: {
      message: string;
      code: string;
      details: string;
    };
  };
}

export interface ILightningProduct {
  id: string;
  name: string;
  images: string[];
  cover_image: string;
  origin_image_url: string;
  sell_count: number;
  quantity: number;
  status: string;
  discount: number;
  price_str?: string;
  market_price?: number;
  total_star: number;
  total_comment: number;
}

export interface IGetLightningProductsResponse {
  getProducts: {
    success: boolean;
    total: number;
    data: ILightningProduct[];
    error?: {
      message: string;
      code: string;
      details: string;
    };
  };
}
