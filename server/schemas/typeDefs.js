const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar JSON

  # # # GET and POST typedef for Fetch Rewards API  # # #
  type getStateAndOccupation {
    stateAndOccupationData: JSON
  }

  type postFormDetails {
    formData: String
  }

  # # # Unused MongoDB server queries # # #
  type Occupation {
    _id: ID!
    name: String!
  }

  type State {
    _id: ID!
    name: String!
    abbreviation: String!
  }

  type Form {
    name: String!
    email: String!
    password: String!
    occupation: String!
    state: String!
  }

  type Query {
    state: State
    occupation: Occupation
    form: Form
    getStateAndOccupation: getStateAndOccupation
    postFormDetails(formData: String): postFormDetails
  }

  type Mutation {
    createState: State
    createOccupation: Occupation
    createForm: Form
  }
`;

module.exports = typeDefs;
