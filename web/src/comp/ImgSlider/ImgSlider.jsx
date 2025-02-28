import React, { useState, useEffect } from 'react';
import './ImgSlider.css';

const ImageSlider = () => {
  const images = [
    { id: 1, src: 'https://via.placeholder.com/800x300?text=Slide+1', alt: 'Slide 1' },
    { id: 2, src: 'https://via.placeholder.com/800x300?text=Slide+2', alt: 'Slide 2' },
    { id: 3, src: 'https://via.placeholder.com/800x300?text=Slide+3', alt: 'Slide 3' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle the next and previous slide change
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Handle touch swipe events
  const handleTouchStart = (e) => {
    const touchStart = e.touches[0].clientX;
    e.target.addEventListener('touchmove', (e) => handleTouchMove(e, touchStart));
  };

  const handleTouchMove = (e, touchStart) => {
    const touchEnd = e.touches[0].clientX;
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }
    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
    e.target.removeEventListener('touchmove', (e) => handleTouchMove(e, touchStart));
  };

  return (
    <div className="slider-container">
      <div
        className="slider"
        onTouchStart={handleTouchStart}
      >
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="slider-image"
        />
      </div>
      <div className="controls">
        <button onClick={prevSlide} className="prev-btn">❮</button>
        <button onClick={nextSlide} className="next-btn">❯</button>
      </div>
    </div>
  );
};

export default ImageSlider;
