import { gql } from "@apollo/client";

export const QUERY_GET_PRODUCTS = gql`
  query GetProducts(
    $page: Int
    $limit: Int
    $sortedBy: BaseOrderByInput
    $where: ProductWhereInput
  ) {
    getProducts(
      page: $page
      limit: $limit
      sortedBy: $sortedBy
      where: $where
    ) {
      success
      total
      data {
        id
        name
        price
        images
        description
        cover_image
        sell_count
        quantity
        status
        total_star
        total_comment
        product_vip
        brand_id
        brandData {
          id
          name
          image
        }
        categoryData {
          id
          name
          image
        }
        product_top
        productTag {
          id
          content
        }
        discount
        price_str
        market_price
        origin_image_url
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_GET_LINGHTNING_PRODUCTS = gql`
  query GetProducts(
    $where: ProductWhereInput
    $limit: Int
    $page: Int
    $sortedBy: BaseOrderByInput
  ) {
    getProducts(
      where: $where
      limit: $limit
      page: $page
      sortedBy: $sortedBy
    ) {
      success
      total
      data {
        id
        name
        images
        cover_image
        origin_image_url
        sell_count
        quantity
        status
        discount
        price_str
        market_price
        total_star
        total_comment
      }
      error {
        message
        code
        details
      }
    }
  }
`;
