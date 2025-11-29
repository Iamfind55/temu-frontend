import { gql } from "@apollo/client";

export const MUTATION_CREATE_ORDERS = gql`
  mutation CreateOrder($data: CreateOrderInput!) {
    createOrder(data: $data) {
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

export const MUTATION_DELETE_ORDER = gql`
  mutation DeleteOrder($id: String!) {
    deleteOrder(id: $id) {
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

export const QUERY_GET_CUSTOMER_ORDERS = gql`
  query CustomerGetOrders(
    $page: Int
    $limit: Int
    $sortedBy: BaseOrderByInput
    $where: OrderWhereInput
  ) {
    customerGetOrders(
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
        order_status
        total_products
        total_quantity
        total_price
        total_discount
        delivery_type
        status
        created_at
        order_details {
          id
          product_name
          product_cover_image
          price
          order_no
          discount
          delivery_type
          quantity
          product_id
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
