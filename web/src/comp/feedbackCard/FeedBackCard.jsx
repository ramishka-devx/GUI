import React from "react";
import "./FeedBackCard.css"; // Import the CSS file

const FeedbackCard = ({ name, title, feedback, rating = 4 }) => {
  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const fullStar = "★";
    const emptyStar = "☆";
    return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
  };

  return (
    <div className="feedback-card">
      <div className="feedback-header">
        <div className="profile-icon">{name.charAt(0)}</div>
        <div>
          <h3 className="feedback-name">{name}</h3>
          <p className="feedback-title">{title}</p>
        </div>
      </div>
      <div className="feedback-stars">{renderStars(rating)}</div>
      <p className="feedback-text">"{feedback}"</p>
    </div>
  );
};

export default FeedbackCard;
