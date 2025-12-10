import { gql } from "@apollo/client";

export const QUERY_SHOP_ADDRESSES = gql`
  query GetShopAddresses(
    $page: Int
    $limit: Int
    $sortedBy: BaseOrderByInput
    $where: ShopAddressWhereInput
  ) {
    getShopAddresses(
      page: $page
      limit: $limit
      sortedBy: $sortedBy
      where: $where
    ) {
      success
      total
      data {
        id
        country {
          country
        }
        state {
          state
        }
        city {
          city
        }
        address
        postal_code
        email
        phone_number
        is_used
        status
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_CREATE_SHOP_ADDRESS = gql`
  mutation CreateShopAddress($data: CreateShopAddressInput!) {
    createShopAddress(data: $data) {
      success
      data {
        id
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_UPDATE_SHOP_ADDRESS = gql`
  mutation UpdateShopAddress($data: UpdateShopAddressInput!) {
    updateShopAddress(data: $data) {
      success
      data {
        id
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_DELETE_SHOP_ADDRESS = gql`
  mutation DeleteShopAddress($deleteShopAddressId: ID!) {
    deleteShopAddress(id: $deleteShopAddressId) {
      success
      data {
        id
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_SET_SHOP_ADDRESS_USED = gql`
  mutation SetShopAddressDefaultToUse($setShopAddressDefaultToUseId: ID!) {
    setShopAddressDefaultToUse(id: $setShopAddressDefaultToUseId) {
      success
      data {
        id
      }
      error {
        message
        code
        details
      }
    }
  }
`;
