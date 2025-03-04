import React from "react";
import Logo from "../logo/Logo";
import "./Welcome.css"
const Welcome = () => {
  return (
    <div className="welcome-container">
      {/* <img src={Logo} alt="A/L Guidance Logo" className="logo" /> */}
      <Logo fontSize="8" />
      <h1 className="welcome-title">Welcome to Cafeteria Managment System</h1>
      <p className="welcome-subtitle">
        Fuel your day with delicious and affordable meals crafted for students.
        Enjoy a variety of fresh options that make every break a satisfying
        experience!
      </p>
    </div>
  );
};

export default Welcome;
