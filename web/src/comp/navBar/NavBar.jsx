import React, { useState } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "../../admin/components/ProfileDropDown/ProfileDropDown";
import { RiMenu3Line } from "react-icons/ri";

const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  cartItemCounter,
  setIsSideNavOpen,
  isSideNavOpen,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("canteenId");
    navigate("/login");
  };

  const toggleNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  console.log("log" + isLoggedIn);
  return (
    <div className="navbar">
      <div className="logo-container">
        <Link to={"/"}>
          <span className="navbar-logo-text">YzŠ»nŠyv</span>
        </Link>
      </div>

      <div className="menu-container">
        <ul>
          <li>
            <Link to="/" className="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/store">Order</Link>
          </li>
          <li>
            <Link to="/feedback">Feedback</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="personal-container">
        <button className="cart-btn">
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
            <span className="cart-badge">{cartItemCounter}</span>
          </Link>
        </button>
        {isLoggedIn && <ProfileDropdown handleSignOut={handleSignOut} />}

        {!isLoggedIn && (
          <div className="auth-box">
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
        <div className="menu-icon">
          <RiMenu3Line size={"25px"} onClick={toggleNav} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
