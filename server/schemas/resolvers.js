const GraphQLJSON = require('graphql-type-json');
const { State, Occupation, Form } = require('../models');
const { getStateAndOccupation, postFormDetails } = require('../3rd-party-api-calls/fetch-reward-api');

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    // GET API call to grab states and occupations.
    getStateAndOccupation: async (parent, args) => {
      try {
        const result = await getStateAndOccupation();

        return { stateAndOccupationData: result };
      } catch (e) {
        console.error(e);
      }
    },

    // POST API call to submit form data.
    postFormDetails: async (parent, args) => {
      try {
        const result = await postFormDetails(args);

        // Sends back '200' that will used in the useEffect in Home.js to render feedback.
        return { formData: result };
      } catch (e) {
        console.error(e);
        // Sends back 'error' that will used in the useEffect in Home.js to render feedback.
        return { formData: 'error' };
      }
    },


    // Basic finds for models. Not currently used, but could be expanded to on MongoDB server.
    state: async () => {
      return State.find({});
    },

    occupation: async () => {
      return Occupation.find({});
    },

    form: async () => {
      return Form.find({});
    },

  },
  Mutation: {
    // Basic creates for models. Not currently used, but ready to be stored on MongoDB server.
    createState: async (parent, args) => {
      const result = await getStateAndOccupation();
      // console.log(result);
      const statesList = result.states;
      const state = await State.insertMany({ statesList });
      // console.log(state);
      return state;
    },

    createOccupation: async (parent, args) => {
      const result = await getStateAndOccupation();
      // console.log(result);
      const occupationsList = result.occupations;
      const occupation = await Occupation.insertMany({ occupationsList });
      // console.log(occupation);
      return occupation;
    },

    createForm: async (parent, { name, email, password, occupation, state }) => {
      const form = await Form.create({ name, email, password, occupation, state });
      // console.log(form);
      return form;
    },
  },
};

module.exports = resolvers;