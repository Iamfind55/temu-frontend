export interface ICustomerLoginCredentials {
  username: string;
  password: string;
}

export interface ICustomerData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone_number: string;
  dob: string;
  image: string;
  status: string;
  created_at: string;
}

export interface ICustomerLoginResponse {
  customerLogin: {
    success: boolean;
    data?: {
      token: string;
      data: ICustomerData;
    };
    error?: {
      message: string;
      code: string;
      details: string;
    };
  };
}

export interface IForgotPasswordResponse {
  customerForgotPassword: {
    success: boolean;
    error?: {
      message: string;
      code: string;
      details: string;
    };
  };
}

export interface IResetPasswordInput {
  email: string;
  code: string;
  newPassword: string;
}

export interface IResetPasswordResponse {
  customerResetPassword: {
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

export interface IVerifyOtpInput {
  otp: string;
  email: string;
}

export interface IVerifyOtpResponse {
  customerVerifyOtp: {
    success: boolean;
    data?: {
      token: string;
      data: ICustomerData & {
        customer_address?: string;
        customer_type?: string;
        created_by?: string;
        updated_at?: string;
        payment_method?: {
          id: string;
          bank_name: string;
          code: string;
          bank_account_name: string;
          bank_account_number: string;
          is_enable: boolean;
        };
      };
    };
    error?: {
      message: string;
      code: string;
      details: string;
    };
  };
}

export interface IResendOtpInput {
  email: string;
}

export interface IResendOtpResponse {
  customerResendOTP: {
    success: boolean;
    data?: {
      token: string;
      data: ICustomerData & {
        customer_address?: string;
        customer_type?: string;
        created_by?: string;
        updated_at?: string;
        payment_method?: {
          id: string;
          bank_name: string;
          code: string;
          bank_account_name: string;
          bank_account_number: string;
          is_enable: boolean;
        };
      };
    };
    error?: {
      message: string;
      code: string;
      details: string;
    };
  };
}
