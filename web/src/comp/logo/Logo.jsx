import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ fontSize = 2 }) => {
  const logoContainerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10px",
  };

  const logoTextStyle = {
    fontFamily: "Disapamok",  
    fontSize: fontSize + "rem",  // Use the fontSize prop with default value
    fontWeight: "400",
  };

  const linkStyle = {
    textDecoration: "none",  // Remove the underline
    color: "inherit",  // Use the inherited color (or you can set a specific color)
  };

  return (
    <div style={logoContainerStyle}>
      <Link to={"/"} style={linkStyle}>
        <span style={logoTextStyle}>YzŠ»nŠyv</span>
      </Link>
    </div>
  );
};

export default Logo;
