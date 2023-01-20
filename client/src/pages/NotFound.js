import React from 'react';
import { useLocation } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  let location = useLocation();
  return (
    <div className="vh-100">
      <div className="container custom-center">
        <div className="card card-rounded">
          <div className="card-header bg-dark text-center">
            <h1>
              Page "<code>{location.pathname}</code>" was not found.
            </h1>
          </div>
          <div className="btn-container">
            <a href="/" className="project-link btn btn-success m-3" rel="noreferrer">Back to Form Page</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
