import { gql } from "@apollo/client";

export const MUTATION_SHOP_REGISTER = gql`
  mutation ShopRegister($data: CreateShopInput!) {
    shopRegister(data: $data) {
      success
      data {
        data {
          id
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

export const MUTATION_SHOP_UPDATE_INFORMATION = gql`
  mutation UpdateShopInformation($data: UpdateShopInformationInput!) {
    updateShopInformation(data: $data) {
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

export const MUTATION_VERIFY_SHOP_EMAIL = gql`
  mutation ShopVerifyOTP($data: ShopVerifyOTPInput!) {
    shopVerifyOTP(data: $data) {
      success
      data {
        data {
          id
        }
        token
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_RESEND_VERIFY_SHOP_EMAIL = gql`
  mutation ShopResendOTP($data: ResendOtpInput!) {
    shopResendOTP(data: $data) {
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

export const MUTATION_SHOP_LOGIN = gql`
  mutation ShopLogin($where: ShopWhereLoginInput) {
    shopLogin(where: $where) {
      success
      data {
        token
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
          isOtpEnable
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

export const MUTATION_SHOP_FORGOT_PASSWORD = gql`
  mutation ShopForgotPassword($email: String!) {
    shopForgotPassword(email: $email) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_SHOP_RESET_PASSWORD = gql`
  mutation ShopResetPassword($data: ShopResetPasswordInput!) {
    shopResetPassword(data: $data) {
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

export const QUERY_GET_SHOP_PROFILE = gql`
  query GetShopInformation {
    getShopInformation {
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
