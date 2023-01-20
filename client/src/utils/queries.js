import { gql } from '@apollo/client';

// Queries to Fetch Rewards API
export const GET_STATE_AND_OCCUPATION = gql`
  query getStateAndOccupation {
    getStateAndOccupation {
        stateAndOccupationData
      }
  }
`;

export const POST_FORM = gql`
  query postFormDetails($formData: String) {
    postFormDetails(formData: $formData) {
      formData
    }
  }
`;


// Unused local mongoDB queries
export const QUERY_STATE = gql`
  query states {
    states {
      name
      abbreviation
    }
  }
`;

export const QUERY_OCCUPATION = gql`
  query occupation {
    occupation {
      name
    }
  }
`;

export const QUERY_FORM = gql`
  query form {
    form {
      name
      email
      password
      occupation
      state
    }
  }
`;