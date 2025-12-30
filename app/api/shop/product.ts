import { gql } from "@apollo/client";

export const QUERY_GET_ALL_SHOP_ON_SHELF_PRODUCTS = gql`
  query GetShopProducts(
    $page: Int
    $limit: Int
    $sortedBy: BaseOrderByInput
    $where: ShopProductWhereInput
  ) {
    getShopProducts(
      page: $page
      limit: $limit
      sortedBy: $sortedBy
      where: $where
    ) {
      success
      total
      data {
        id
        sell_count
        quantity
        status
        productData {
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
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_SHOP_APPLY_PRODUCTS = gql`
  mutation CreateManyShopProducts($data: [CreateShopProductInput!]!) {
    createManyShopProducts(data: $data) {
      success
      total
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_SHOP_APPLY_ALL_VIP_PRODUCTS = gql`
  mutation CreateShopProductsWithVIPLevel(
    $data: CreateShopProductsWithVIPLevelInput!
  ) {
    createShopProductsWithVIPLevel(data: $data) {
      success
      total
      error {
        message
        code
        details
      }
    }
  }
`;
