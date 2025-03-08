import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { Link, useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          navigate("/login");
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
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogOutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");    
  }
  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={user.dp || ""} // Replace with actual profile image
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <h2 className="profile-name">
            {user.firstName && user.lastName
              ? `${
                  user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1)
                } ${
                  user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)
                }`
              : "User"}
          </h2>
          <p>
            <strong>Phone Number:</strong> {user.phone || "Not Available"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Admission No:</strong> {user.regNo}
          </p>
        </div>
        <div className="profile-buttons">
          {/* <Link to={"/profile/edit"}><button className="edit-btn">Edit Profile</button></Link> */}
          <button className="logout-btn" onClick={handleLogOutClick}>Log out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
