import { gql } from "@apollo/client";

export const MUTATION_CUSTOMER_REGISTER = gql`
  mutation CustomerRegister($data: CreateCustomerInput!) {
    customerRegister(data: $data) {
      data {
        token
        data {
          id
          firstName
          lastName
          username
          email
          phone_number
          dob
          image
          status
          created_at
        }
      }
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_CUSTOMER_LOGIN = gql`
  mutation CustomerLogin($where: CustomerWhereLoginInput) {
    customerLogin(where: $where) {
      success
      data {
        token
        data {
          id
          firstName
          lastName
          username
          email
          phone_number
          dob
          image
          status
          created_at
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

export const MUTATION_CUSTOMER_FORGOT_PASSWORD = gql`
  mutation CustomerForgotPassword($email: String!) {
    customerForgotPassword(email: $email) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_CUSTOMER_RESET_PASSWORD = gql`
  mutation CustomerResetPassword($data: ShopResetPasswordInput!) {
    customerResetPassword(data: $data) {
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
