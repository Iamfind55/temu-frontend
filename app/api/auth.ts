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

export const MUTATION_CUSTOMER_OTP_VERIFY = gql`
  mutation CustomerVerifyOtp($data: VerifyOtpCustomerInput!) {
    customerVerifyOtp(data: $data) {
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
          customer_address
          status
          customer_type
          created_by
          created_at
          updated_at
          payment_method {
            id
            bank_name
            code
            bank_account_name
            bank_account_number
            is_enable
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

export const MUTATION_CUSTOMER_RESEND_OTP = gql`
  mutation CustomerResendOTP($data: ResendOtpCustomerInput!) {
    customerResendOTP(data: $data) {
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
          customer_address
          status
          customer_type
          created_by
          created_at
          updated_at
          payment_method {
            id
            bank_name
            code
            bank_account_name
            bank_account_number
            is_enable
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

export const MUTATION_CUSTOMER_RESET_PASSWORD = gql`
  mutation CustomerResetPassword($data: ShopResetPasswordInput!) {
    customerResetPassword(data: $data) {
      success
      error {
        message
        code
        details
      }
      data {
        id
      }
    }
  }
`;

export const MUTATION_CUSTOMER_REGISTER_EMAIL = gql`
  mutation CustomerRegister($data: RegisterCustomerInput!) {
    customerRegister(data: $data) {
      success
      data {
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

export const MUTATION_CUSTOMER_VERIFY_OTP_REGISTER = gql`
  mutation CustomerVerifyOtp($data: VerifyOtpCustomerInput!) {
    customerVerifyOtp(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_CUSTOMER_CREATE_PASSWORD = gql`
  mutation CustomerCreatePassword($data: CreatePasswordCustomerInput!) {
    customerCreatePassword(data: $data) {
      success
      data {
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
