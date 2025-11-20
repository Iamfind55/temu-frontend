import { gql } from "@apollo/client";

export const MUTATION_DEPOSIT_BALANCE = gql`
  mutation CustomerRechargeBalance($data: RechargeWalletInput!) {
    customerRechargeBalance(data: $data) {
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

export const QUERY_CUSTOMER_CREDIT_TRANSACTIONS = gql`
  query CustomerGetTransactionHistories(
    $page: Int
    $limit: Int
    $sortedBy: BaseOrderByInput
    $where: TransactionHistoryWhereInput
  ) {
    customerGetTransactionHistories(
      page: $page
      limit: $limit
      sortedBy: $sortedBy
      where: $where
    ) {
      success
      total
      data {
        id
        identifier
        amount
        coin_type
        wallet_id
        status
        created_at
        customer_id
        payment_slip
        account_number
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_GET_CUSTOMER_CREDIT_BALANCE = gql`
  query GetCustomerWallet {
    getCustomerWallet {
      success
      data {
        id
        name
        total_balance
        total_frozen_balance
        total_recharged
        total_withdraw
        total_withdraw_able_balance
        status
        customer_id
      }
      error {
        message
        code
        details
      }
    }
  }
`;
