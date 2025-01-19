import React from "react";
import "./LoadingBanner.css";

const LoadingBanner = ({ message }) => {
// Only show the banner when loading

  return (
    <div className="loading-banner">
      <p>{message || "Loading..."}</p>
    </div>
  );
};

export default LoadingBanner;
