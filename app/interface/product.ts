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
  shopProductStatus?: string;
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

export interface IBestSellingProduct {
  id: string;
  name: string;
  price: number;
  show_price?: string;
  price_str?: string;
  market_price?: number;
  images: string[] | null;
  description: string | null;
  cover_image: string | null;
  origin_image_url: string;
  sell_count: number | string;
  quantity: number;
  status: string;
  total_star: number | null;
  total_comment: number | null;
  product_vip: boolean | number;
  productTag: {
    id: string;
    text_rich?: string[] | null;
    local_title?: string | null;
    content: string | null;
    prompt_tag_text?: string | null;
    footer_text?: string | null;
    header_text?: string | null;
  }[];
  discount: number;
}

export interface IGetBestSellingProductsResponse {
  getBestSellingProducts: {
    success: boolean;
    total: number;
    data: IBestSellingProduct[];
    error?: {
      message: string;
      code: string;
      details: string;
    };
  };
}

export interface IProductDetail {
  id: string;
  name: string;
  price: number;
  price_str?: string;
  market_price?: number;
  images: string[] | null;
  cover_image: string | null;
  origin_image_url: string;
  sell_count: number | string;
  quantity: number;
  status: string;
  total_star: number | null;
  total_comment: number | null;
  product_vip: boolean | number;
  brand_id: string | null;
  brandData: {
    id: string;
    name: string;
    image: string;
  } | null;
  discount: number;
}

export interface IGetProductResponse {
  getProduct: {
    success: boolean;
    data: IProductDetail;
    error?: {
      message: string;
      code: string;
      details: string;
    } | null;
  };
}