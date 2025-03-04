import React, { useState, useEffect } from "react";
import "./ImgSlider.css"; // Ensure CSS file is updated

const ImgSlider = ({ images = [], texts = [], interval = 10000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    if (images.length === 0) return;
    
    const autoSlide = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(autoSlide);
  }, [currentIndex, images.length]);

  const nextSlide = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsSliding(false);
    }, 500); // Matches transition duration
  };

  const prevSlide = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsSliding(false);
    }, 500);
  };

  if (images.length === 0) {
    return <div className="carousel-container">No images available</div>;
  }

  return (
    <div className="carousel-container">
      <button className="carousel-arrow left" onClick={prevSlide}>&#10094;</button>
      <div className="carousel-wrapper">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="carousel-slide"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="carousel-text">{texts[index] || ""}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-arrow right" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default ImgSlider;
