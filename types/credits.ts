// Shared Credit/Wallet Types

export interface CloudinaryResponse {
  secure_url?: string;
}

export interface ApiError {
  message: string;
  code: string;
  details: string;
}

export interface Transaction {
  id: string;
  identifier: string;
  amount: number;
  coin_type: string;
  wallet_id: string;
  status: string;
  type?: string;
  created_at: string;
  customer_id: string;
  payment_slip: string;
  account_number: string;
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

// Customer Credit Types
export interface CustomerDepositBalanceResponse {
  customerRechargeBalance: {
    success: boolean;
    data?: { id: string };
    error?: ApiError;
  };
}

export interface CustomerTransactionHistoryResponse {
  customerGetTransactionHistories: {
    success: boolean;
    total: number;
    data: Transaction[];
    error?: ApiError;
  };
}

export interface CustomerWalletBalanceResponse {
  getCustomerWallet: {
    success: boolean;
    data: WalletData;
    error?: ApiError | null;
  };
}

// Shop Credit Types
export interface ShopDepositBalanceResponse {
  shopRechargeBalance: {
    success: boolean;
    data?: { id: string };
    error?: ApiError;
  };
}

export interface ShopWithdrawBalanceResponse {
  shopWithdrawBalance: {
    success: boolean;
    data?: { id: string };
    error?: ApiError;
  };
}

export interface ShopTransactionHistoryResponse {
  shopGetTransactionHistories: {
    success: boolean;
    total: number;
    data: Transaction[];
    error?: ApiError;
  };
}

export interface ShopWalletBalanceResponse {
  getShopWallet: {
    success: boolean;
    data: WalletData;
    error?: ApiError | null;
  };
}
