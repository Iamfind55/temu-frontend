import { gql } from "@apollo/client";

export const MUTATION_SHOP_REQUEST_VIP = gql`
  mutation ShopRequestVIP($data: ShopRequestVIPInput!) {
    shopRequestVIP(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;
