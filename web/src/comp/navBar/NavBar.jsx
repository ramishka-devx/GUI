import React, { useState } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "../../admin/components/ProfileDropDown/ProfileDropDown";

const Navbar = ({ isLoggedIn, setIsLoggedIn, cartItemCounter }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("canteenId");
    navigate("/login");
  };

  console.log("log"+isLoggedIn);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo">

          <span className="navbar-logo-text">YzŠ»nŠyv</span>
        </a>

        {/* profile */}
        <div className="navbar-actions hidden">

        {!isLoggedIn && (
            <div className="auth-box">
              <Link to="/login">
                <button>Login</button>
              </Link>
              {/* <Link to="/register">
                <button>Register</button>
              </Link> */}
            </div>
          )}

          <button className="cart-btn">
            <Link to="/cart">
              <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
              <span className="cart-badge">{cartItemCounter}</span>
            </Link>
          </button>
          {
            isLoggedIn && (<ProfileDropdown handleSignOut={handleSignOut} />)
          }
          
          
        </div>

        {/* Navbar Menu */}
        <div
          className={`navbar-menu ${menuOpen ? "active" : ""}`}
          id="navbar-user"
        >
          <ul>
            <li>
              <a href="#" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="/store">Order</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
