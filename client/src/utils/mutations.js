import { gql } from '@apollo/client';


// Unused local mongoDB mutations
export const CREATE_STATE = gql`
  mutation createState() {
    states {
      name
      abbreviation
    }
  }
`;

export const CREATE_OCCUPATION = gql`
  mutation createOccupation() {
    occupation {
      name
    }
  }
`;

export const CREATE_FORM = gql`
  mutation createForm($name: String!, $email: String!, $password: String!, $occupation: String!, $state: String!) {
    createForm(name: $name, email: $email, password: $password, occupation: $occupation, state: $state) {
      name
      email
      password
      occupation
      state
    }
  }
`;

