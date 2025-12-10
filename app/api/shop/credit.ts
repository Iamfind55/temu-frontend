import { gql } from "@apollo/client";

export const MUTATION_DEPOSIT_SHOP_BALANCE = gql`
  mutation ShopRechargeBalance($data: RechargeWalletInput!) {
    shopRechargeBalance(data: $data) {
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

export const MUTATION_WITHDRAW_SHOP_BALANCE = gql`
  mutation ShopWithdrawBalance($data: WithdrawWalletInput!) {
    shopWithdrawBalance(data: $data) {
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

export const QUERY_SHOP_CREDIT_TRANSACTIONS = gql`
  query ShopGetTransactionHistories(
    $limit: Int
    $page: Int
    $sortedBy: BaseOrderByInput
    $where: TransactionHistoryWhereInput
  ) {
    shopGetTransactionHistories(
      limit: $limit
      page: $page
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

export const QUERY_GET_SHOP_CREDIT_BALANCE = gql`
  query GetShopWallet {
    getShopWallet {
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
