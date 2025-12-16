export interface CloudinaryResponse {
  secure_url?: string;
}

export interface DepositBalanceResponse {
  customerRechargeBalance: {
    success: boolean;
    data?: {
      id: string;
    };
    error?: {
      message: string;
      code: string;
      details: string;
    };
  };
}

export interface Transaction {
  id: string;
  identifier: string;
  amount: number;
  coin_type: string;
  wallet_id: string;
  status: string;
  type: string;
  created_at: string;
  customer_id: string;
  payment_slip: string;
  account_number: string;
}

export interface TransactionHistoryResponse {
  customerGetTransactionHistories: {
    success: boolean;
    total: number;
    data: Transaction[];
    error?: {
      message: string;
      code: string;
      details: string;
    };
  };
}

export interface WalletData {
  id: string;
  name: string;
  total_balance: number;
  total_frozen_balance: number;
  total_recharged: number;
  total_withdraw: number;
  total_withdraw_able_balance: number;
  status: string;
  customer_id: string;
}

export interface WalletBalanceResponse {
  getCustomerWallet: {
    success: boolean;
    data: WalletData;
    error?: {
      message: string;
      code: string;
      details: string;
    } | null;
  };
}
