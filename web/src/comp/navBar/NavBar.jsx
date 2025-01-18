import React, { useState } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

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
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Kalderama"
            className="navbar-logo-img"
          />
          <span className="navbar-logo-text">Kalderama</span>
        </a>

        {/* Actions */}
        <div className="navbar-actions">
          <button className="cart-btn">
            <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
            <span className="cart-badge">{cartItemCounter}</span>
            </Link>
          </button>

          <button
            type="button"
            className="user-menu-button"
            id="user-menu-button"
            onClick={toggleProfile}
          >
            <span className="sr-only">Open user menu</span>
            <img src="dp.png" alt="user" className="user-menu-img " />
          </button>
          <div className={`user-dropdown ${profileOpen ? "active" : ""}`}>
            <div className="dropdown-header">
              <span className="dropdown-name">Bonnie Green</span>
              <span className="dropdown-email">name@flowbite.com</span>
            </div>
            <ul className="dropdown-menu">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <a href="#">Settings</a>
              </li>
              <li>
                <a href="#">Earnings</a>
              </li>
              <li onClick={handleSignOut}>Sign out</li>
            </ul>
          </div>

          <button
            className="mobile-menu-toggle"
            aria-controls="navbar-user"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
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
          {!isLoggedIn && (
            <div className="auth-box">
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
