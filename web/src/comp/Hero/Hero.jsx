import React from "react";
import "./Hero.css"; // Import a separate CSS file for styling

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <h1 className="hero-title">zomato</h1>
        <p className="hero-subtitle">
          Find the best restaurants, cafés, and bars in India
        </p>
        <div className="hero-links">
          <a href="#add-restaurant" className="hero-link">
            Add restaurant
          </a>
          <a href="#login" className="hero-link">
            Log in
          </a>
          <a href="#signup" className="hero-link">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
