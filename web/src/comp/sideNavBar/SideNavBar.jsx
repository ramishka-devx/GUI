import React, { useState } from "react";
import "./SideNavBar.css"; // Import the CSS file
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../navBar/UserMenu";
import AdminMenu from "../navBar/AdminMenu";

const SideNav = ({isSideNavOpen,setIsSideNavOpen, isLoggedIn}) => {
    const location = useLocation();

    const toggleNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    const isAdminRoute = location.pathname.startsWith("/admin");

return (
    <>
        <div className={`side-nav ${isSideNavOpen ? "open" : ""}`}>
            <ul>
               {
                  !isAdminRoute ? <UserMenu/> :<AdminMenu/>
               }
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
