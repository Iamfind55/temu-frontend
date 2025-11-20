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
