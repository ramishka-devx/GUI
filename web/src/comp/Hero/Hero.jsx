import React from "react";
import "./Hero.css"; // Import a separate CSS file for styling
import ImageSlider from "../ImgSlider/ImgSlider";
import ImgSlider from "../ImgSlider/ImgSlider";
import Welcome from "../welcome/Welcome";
import { Link } from "react-router-dom";

const images = ["2.webp", "10.jpg", "11.jpg"];

const texts = [
  "Welcome to our site!",
  "Explore Native Foods",
  "Order Your Dinner Now",
];

const HeroSection = () => {
  return (
    <>
      <div className="hero-section ">
        <div className="hero-eye">
          <div className="slider-container">
            <ImgSlider images={images} texts={texts} />
          </div>
          <div className="right-side">
            <div className="hero-img-A">
              <h3>
                Order Before <br />
                2.00 p.m.
              </h3>
            </div>
            <div className="hero-img-B">
              <Link to={"/store"}>
                <button>Order Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
