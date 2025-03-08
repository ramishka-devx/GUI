import React, { useState } from "react";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "../../admin/components/ProfileDropDown/ProfileDropDown";
import { RiMenu3Line } from "react-icons/ri";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";

const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  cartItemCounter,
  setIsSideNavOpen,
  isSideNavOpen,
  user
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

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
        {
          !isAdminRoute ? <UserMenu/> :<AdminMenu/>
        }
     
      </div>

      <div className="personal-container">
        <button className="cart-btn">
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
            <span className="cart-badge">{cartItemCounter}</span>
          </Link>
        </button>
        {isLoggedIn && <ProfileDropdown handleSignOut={handleSignOut} user = {user} />}

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
