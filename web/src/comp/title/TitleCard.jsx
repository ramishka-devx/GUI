import React from "react";
import "./TitleCard.css"

const TitleCard = ({ title, subtitle }) => {
  return (
    <div className="section-title-container">
      <h1 className="section-title">{title}</h1>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default TitleCard;
