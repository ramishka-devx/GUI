import React, { useState } from "react";
import "./SideNavBar.css"; // Import the CSS file
import { Link } from "react-router-dom";

const SideNav = ({isSideNavOpen,setIsSideNavOpen, isLoggedIn}) => {

    const toggleNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
      };
return (
    <>
        <div className={`side-nav ${isSideNavOpen ? "open" : ""}`}>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>

           {
            !isLoggedIn && (
                <div className="auth-box2">
                <Link to="/login"><button className="logBtn">Login</button></Link>
                <Link to="/register"><button className="regBtn">Register</button></Link>
            </div>
            )
           } 
        </div>

        {/* Overlay when sidebar is open */}
        {isSideNavOpen && <div className="overlay" onClick={toggleNav}></div>}
    </>
);
};

export default SideNav;
