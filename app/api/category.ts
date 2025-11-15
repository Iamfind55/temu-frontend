import { gql } from "@apollo/client";

export const QUERY_GET_ALL_CATEGORIES = gql`
  query GetCategories($limit: Int, $where: CategoryWhereInput) {
    getCategories(limit: $limit, where: $where) {
      success
      total
      data {
        id
        name
        subcategories {
          id
          name
          subcategories {
            id
            name
            image
            oring_image_url
          }
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

export const QUERY_GET_CATEGORIES_BY_PARENT_ID = gql`
  query GetCategories($limit: Int, $where: CategoryWhereInput) {
    getCategories(limit: $limit, where: $where) {
      success
      total
      data {
        id
        name
        image
        oring_image_url
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_GET_PARENT_CATEGORIES = gql`
  query GetCategory($getCategoryId: ID!) {
    getCategory(id: $getCategoryId) {
      success
      data {
        id
        name
        parent_data {
          id
          name
          parent_data {
            id
            name
          }
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

export const QUERY_GET_PRODUCTS_BY_CATEGORY_ID = gql`
  query GetProducts(
    $limit: Int
    $page: Int
    $where: ProductWhereInput
    $sortedBy: BaseOrderByInput
  ) {
    getProducts(
      limit: $limit
      page: $page
      where: $where
      sortedBy: $sortedBy
    ) {
      success
      total
      data {
        id
        name
        description
        price
        images
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
        productTag {
          id
          text_rich
          local_title
          content
          prompt_tag_text
          footer_text
          header_text
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
