import { gql } from "@apollo/client";

export const QUERY_COUNTRIES = gql`
  query GetCountries {
    getCountries {
      success
      total
      data {
        id
        country
        cn_country
        isState
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_STATES = gql`
  query GetStates($countryId: ID!) {
    getStates(countryId: $countryId) {
      success
      total
      data {
        id
        state
        cn_state
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_CITIES = gql`
  query GetCities($countryId: ID!, $stateId: ID) {
    getCities(countryId: $countryId, stateId: $stateId) {
      success
      total
      data {
        id
        city
        cn_city
      }
      error {
        message
        code
        details
      }
    }
  }
`;
