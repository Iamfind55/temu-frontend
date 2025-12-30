import { gql } from "@apollo/client";

export const MUTATION_SHOP_UPDATE_INFORMATION1 = gql`
  mutation UpdateShopInformation($data: UpdateShopInformationInput!) {
    updateShopInformation(data: $data) {
      success
      data {
        id
        fullname
        dob
        email
        phone_number
        store_name
        status
        shop_vip
        remark
        profit
        id_card_info {
          id_card_image_front
          id_card_image_back
        }
        image {
          logo
          cover
        }
        totalFollower
        totalProduct
        username
        payment_method {
          id
          code
          bank_name
          bank_account_number
          bank_account_name
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

