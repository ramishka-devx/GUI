import React, { useState, useRef, useEffect } from "react";
import "./ProfileDropDown.css"; // Add appropriate styles
import { Link } from "react-router-dom";

const ProfileDropdown = ({ handleSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState({});

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch("http://localhost:5369/profile", {
        method: "GET",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
      console.log("User Profile:", data);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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

  console.log(user);
  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button className="profile-button" onClick={toggleDropdown}>
        <img
          src="https://res.cloudinary.com/duiyr5sr0/image/upload/v1741422586/images_zoui8t.png"
          alt="Profile"
          className="profile-photo"
        />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <p className="dropdown-name">
              {user.firstName && user.lastName
                ? `${
                    user.firstName.charAt(0).toUpperCase() +
                    user.firstName.slice(1)
                  } ${
                    user.lastName.charAt(0).toUpperCase() +
                    user.lastName.slice(1)
                  }`
                : "User"}
            </p>
            <p className="dropdown-phone">{user.phone || ""}</p>
          </div>
          <ul className="dropdown-list">
            {user.roll == "admin" && (
              <li>
                <Link to="/admin" className="dropdown-link">
                  Dashboard
                </Link>
              </li>
            )}

            <li>
              <Link to="/cart" className="dropdown-link">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/profile" className="dropdown-link">
                Profile
              </Link>
            </li>
            <li>
              <button
                className="dropdown-link dropdown-signout"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
