import React from "react";
import { Link } from "react-router-dom";
import "../Error/error.css";

const Errorpage = () => {
  return (
    <>
      <div className="error-container">
        <div className="fourOfour ">
          <h1>404</h1>
        </div>
        <div className="overlayError-container">
          <h1>we are sorry, page not found!</h1>
          <p>
            the page you are looking for might have been removed had its name
            changed or is temporarily unavailabel
          </p>
          <Link to="/" className="home-btn">
            back to home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Errorpage;
