const axios = require('axios');

// GET States and occupations list
async function getStateAndOccupation() {
    const response = await axios.get('https://frontend-take-home.fetchrewards.com/form');

    return response.data;
}

// POST all form data to endpoint
async function postFormDetails(submissionBody) {
    const jsonBody = JSON.parse(submissionBody.formData);

    const response = await axios.post('https://frontend-take-home.fetchrewards.com/form', jsonBody);
    let responseString = response.status;
    responseString = responseString.toString();
    
    return responseString;
}

module.exports = { getStateAndOccupation, postFormDetails };
