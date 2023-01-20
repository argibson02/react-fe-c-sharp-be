import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_STATE_AND_OCCUPATION, POST_FORM } from '../utils/queries';
import { validateEmail, checkInputs, validatePassword } from '../utils/helpers';
import './Home.css';

const Home = () => {
  //====== STATE/OCCUPATION QUERY - Start =======//
  const { loading: stateAndOccupation_loading, data: stateAndOccupation_data } = useQuery(GET_STATE_AND_OCCUPATION, {
    // fetchPolicy: "no-cache"\
  }, []);

  const occupationAndStateList = stateAndOccupation_data || [];
  let occupationList = [];
  let etatList = [];
  let etatLoaded = false;

  if (stateAndOccupation_data) {
    // Grabs occupation array.
    occupationList = occupationAndStateList.getStateAndOccupation.stateAndOccupationData.occupations;

    // Iterates through state object and creates an array that can be mapped in the form dropdown.
    (() => {
      let etatObject = occupationAndStateList.getStateAndOccupation.stateAndOccupationData.states;
      etatObject.forEach(element => etatList.push(element.name));
      etatLoaded = true;
    })();
  }
  //^^^^^^^ STATE/OCCUPATION QUERY - End ^^^^^^^//


  //====== FORM VALIDATION AND SUBMISSION - Start =======//
  // Initializing React states for form values.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [etat, setEtat] = useState(''); // Using "État" as a substitute for "State" to avoid potentially messing with React states...
  const [response, setResponse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  // Handles input changes in form fields and stores them in state.
  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'fullName') {
      setFullName(inputValue);
    } else if (inputType === 'email') {
      setEmail(inputValue);
    } else if (inputType === 'password') {
      setPassword(inputValue);
    } else if (inputType === 'occupation') {
      setOccupation(inputValue);
    } else if (inputType === 'etat') {
      setEtat(inputValue);
    }
  };


  // Initializing variable and query that is used in form submission. 
  let submissionBody = {};
  const [postForm, { loading: form_loading, data: form_data }] = useLazyQuery(POST_FORM, {
    variables: { formData: submissionBody }
  });


  // Handles form validation, submission, and clearing.
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');

    if (!checkInputs(fullName)) {
      setErrorMessage(`Name is required.`);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Email is invalid.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Password is invalid.');
      return;
    }

    if (!checkInputs(occupation)) {
      setErrorMessage(`Occupation is required.`);
      return;
    }

    if (!checkInputs(etat)) {
      setErrorMessage(`State is required.`);
      return;
    }

    // POST of form data.
    try {
      // Convert submitted values into an object.
      submissionBody = {
        name: fullName,
        email: email,
        password: password,
        occupation: occupation,
        state: etat
      };

      // Convert to JSON string.
      submissionBody = JSON.stringify(submissionBody);

      // Send string in query to POST.
      postForm({ variables: { formData: submissionBody } });

      // Clears submission.
      submissionBody = {};

    } catch (err) {
      setErrorMessage('Whoops! Something went wrong... Please try again later');
      console.error(err);
    }

    // Clears all state values.
    setFullName('');
    setEmail('');
    setPassword('');
    setOccupation('');
    setEtat('');
    return true;
  };


  // Provides feedback back to user if form was submitted successfully or not.
  useEffect(() => {
    if (form_data) {
      let submittalResponse = form_data.postFormDetails.formData;

      if (submittalResponse === '200') {
        setResponse('200');
        setErrorMessage('');
        setSuccessMessage('Success!');
      } else if (submittalResponse === 'error') {
        setResponse('error');
        setErrorMessage('Whoops! Something went wrong... Please try again later');
      }
    }
  }, [form_data, response]);
  //^^^^^^^ FORM VALIDATION AND SUBMISSION - End ^^^^^^^//



  //====== REACT HTML - Start =======//
  return (
    <div className="vh-100">
      <div className="container">
        <div className="card card-rounded">
          <div className="card-header bg-dark text-center">
            <h1>Automotive Extended Warranty Sign-up</h1>
          </div>
          <div className="desc-text">
            <p>We've been trying to reach you about your car's extended warranty. Please fill out the info below and we will be in contact with you shortly regarding your <u>exclusive</u> offer! <span>🚗</span></p>
          </div>

          <section id="form-body" className="card-body col-12 m-3">
            <h2 className="">Sign-up Form</h2>
            <form className="row g-3">

              {/* Name field */}
              <div className="form-group col-10 mb-1">
                <label htmlFor="full-name" className="form-label" id="full-name-label">Name</label>
                <input
                  value={fullName}
                  name="fullName"
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  id="full-name"
                  // placeholder="Sammy Sample"  // Placeholder messes with screen reading... Tested with NVDA
                  aria-label="full name field"
                  aria-describedby="full-name-label"
                />
              </div>

              {/* Email field */}
              <div className="form-group col-10 mb-1">
                <label htmlFor="email" className="form-label" id="email-label">Email address</label>
                <input
                  value={email}
                  name="email"
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  id="email"
                  // placeholder="not@scam.com"
                  aria-label="email field"
                  aria-describedby="email-label"
                />
              </div>

              {/* Password field */}
              <div className="form-group col-10 mb-1">
                <label htmlFor="password" className="form-label" id="password-label">Password</label>
                <input
                  value={password}
                  name="password"
                  onChange={handleInputChange}
                  type="password"
                  className="form-control"
                  id="password"
                  // placeholder="Abcd123$"
                  aria-label="password field"
                  aria-describedby="password-help-block"
                />
                <div id="password-help-block" className="form-text">
                  Your password must be at least 8 characters long, and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.
                </div>
              </div>

              {/* Occupation field */}
              <div className="form-group col-10 mb-1">
                <label htmlFor="occupation" className="form-label" id="occupation-label">Occupation</label>
                {stateAndOccupation_loading ? (
                  <div>Loading...</div>
                ) : (
                  <select
                    value={occupation}
                    name="occupation"
                    onChange={handleInputChange}
                    className="form-control"
                    id="occupation"
                    aria-label="select an occupation"
                    aria-describedby="occupation-label"
                  >
                    <option hidden value="">Select occupation...</option>
                    {occupationList.map((occupation, index) => {
                      return (
                        <option key={index}>
                          {occupation}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>

              {/* State field */}
              <div className="form-group col-10 mb-1">
                <label htmlFor="etat" className="form-label" id="etat-label">State</label>
                {!etatLoaded ? (
                  <div>Loading...</div>
                ) : (
                  <select
                    value={etat}
                    name="etat"
                    onChange={handleInputChange}
                    className="form-control"
                    id="etat"
                    aria-label="select a state"
                    aria-describedby="etat-label"
                  >
                    <option hidden value="">Select state...</option>
                    {etatList.map((etat, index) => {
                      return (
                        <option key={index}>
                          {etat}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
              {/* Submit button */}
              <div className="ml-3">
                <button type="submit" className="btn btn-success" onClick={handleFormSubmit}>Submit</button>
              </div>
            </form>

            {/* Conditional rendering for feedback bubbles */}
            {errorMessage && (
              <div className="d-flex error-text-container">
                <div className="alert alert-secondary error-text-alert" role="alert">
                  <p className="error-text">{errorMessage}</p>
                </div>
              </div>
            )}
            {successMessage && (
              <div className="d-flex error-text-container">
                <div className="alert alert-success error-text-alert" role="alert">
                  <p className="error-text">{successMessage}</p>
                </div>
              </div>
            )}

            {/* Github link */}
            <div className="git-link">
              <a href="https://github.com/argibson02/fetch-rewards-fe-demo" target="_blank" rel="noopener noreferrer">Link to Git repo</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
//^^^^^^^ REACT HTML - End ^^^^^^^//

export default Home;