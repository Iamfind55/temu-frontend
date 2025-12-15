import { gql } from "@apollo/client";

export const QUERY_SHOP_ORDERS = gql`
  query ShopGetOrders(
    $page: Int
    $limit: Int
    $sortedBy: BaseOrderByInput
    $where: OrderWhereInput
  ) {
    shopGetOrders(
      page: $page
      limit: $limit
      sortedBy: $sortedBy
      where: $where
    ) {
      success
      total
      data {
        id
        order_no
        total_quantity
        total_products
        total_price
        total_discount
        order_status
        payment_slip
        created_at
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_SHOP_ORDER_DETAILS = gql`
  query ShopGetOrderDetails(
    $where: OrderDetailWhereInput!
    $page: Int
    $limit: Int
    $sortedBy: BaseOrderByInput
  ) {
    shopGetOrderDetails(
      where: $where
      page: $page
      limit: $limit
      sortedBy: $sortedBy
    ) {
      success
      total
      data {
        id
        order_no
        product_name
        product_cover_image
        quantity
        price
        discount
        profit
        order_id
        status
        payment_status
        order_status
        delivery_type
        product_id
        sign_in_status
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_SHOP_CONFIRM_ORDER = gql`
  mutation ShopConfirmOrder($shopConfirmOrderId: ID!) {
    shopConfirmOrder(id: $shopConfirmOrderId) {
      success
      message
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_SHOP_CANCEL_ORDER = gql`
  mutation ShopCancelOrder($shopCancelOrderId: ID!) {
    shopCancelOrder(id: $shopCancelOrderId) {
      success
      message
      error {
        message
        code
        details
      }
    }
  }
`;
