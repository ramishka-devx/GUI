import React from "react";
import "./Hero.css"; // Import a separate CSS file for styling
import ImageSlider from "../ImgSlider/ImgSlider";

const HeroSection = () => {
  return (
    <div className="hero-section">
        <ImageSlider />
    </div>
  );
};

export default HeroSection;
