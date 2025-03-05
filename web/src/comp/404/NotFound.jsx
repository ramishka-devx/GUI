import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Import the CSS file
import Logo from '../logo/Logo';

const NotFound = () => {
  return (
    <div className="not-found-container">
        <Logo fontSize={6} />
      <h2 className="not-found-title">404 - Page Not Found</h2>
      <p className="not-found-message">
        Oops! It seems the meal you're looking for is not on our menu.
      </p>
      <p className="not-found-submessage">
        Don't worry, we have plenty of other delicious options!
      </p>
      <Link to="/" className="not-found-button">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
