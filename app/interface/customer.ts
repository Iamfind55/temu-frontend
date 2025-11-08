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
