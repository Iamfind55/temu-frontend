import { gql } from "@apollo/client";

export const QUERY_CUSTOMER_INFORMATION = gql`
  query GetCustomerInformation {
    getCustomerInformation {
      success
      data {
        id
        firstName
        lastName
        email
        phone_number
        dob
        username
        image
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

export const MUTATION_UPDATE_CUSTOMER_INFORMATION = gql`
  mutation UpdateCustomerInformation($data: UpdateCustomerInformationInput!) {
    updateCustomerInformation(data: $data) {
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
