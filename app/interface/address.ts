export interface country {
  id: string;
  country: string;
  cn_country: string;
  isState: boolean;
}

export interface GetCountryResponse {
  getCountries: {
    success: boolean;
    total: number;
    data: country[];
    error?: ErrorDetails;
  };
}

export interface state {
  id: string;
  state: string;
  cn_state: string;
}

export interface GetStateResponse {
  getStates: {
    success: boolean;
    total: number;
    data: state[];
    error?: ErrorDetails;
  };
}

export interface city {
  id: string;
  city: string;
  cn_city: string;
}

export interface GetCityResponse {
  getCities: {
    success: boolean;
    total: number;
    data: city[];
    error?: ErrorDetails;
  };
}

export interface CustomerAddress {
  id: string;
  country: {
    country: string;
  };
  state?: {
    state?: string;
  };
  city: {
    city: string;
  };
  address: string;
  postal_code: string;
  email: string;
  phone_number: string;
  is_used: boolean;
  status?: string;
}

export interface GetCustomerAddressesResponse {
  getCustomerAddresses: {
    success: boolean;
    total: number;
    data: CustomerAddress[];
    error?: ErrorDetails;
  };
}
