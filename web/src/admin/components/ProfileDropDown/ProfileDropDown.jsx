import React, { useState, useRef, useEffect } from "react";
import "./ProfileDropDown.css"; // Add appropriate styles
import { Link } from "react-router-dom";

const ProfileDropdown = ({ handleSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button className="profile-button" onClick={toggleDropdown}>
        <img
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="Profile"
          className="profile-photo"
        />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <p className="dropdown-name">Neil Sims</p>
            <p className="dropdown-email">neil.sims@flowbite.com</p>
          </div>
          <ul className="dropdown-list">
            <li>
              <Link to="/dashboard" className="dropdown-link">Dashboard</Link>
            </li>
            <li>
              <Link to="/settings" className="dropdown-link">Settings</Link>
            </li>
            <li>
              <Link to="/earnings" className="dropdown-link">Earnings</Link>
            </li>
            <li>
              <button className="dropdown-link dropdown-signout" onClick={handleSignOut}>Sign out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
