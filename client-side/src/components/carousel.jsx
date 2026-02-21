import React, { useState, useEffect } from 'react';
import './carousel.css';

const images = [
  { src: '/images/carousel_1.jpg', caption: 'Delicious Meals at Your Table' },
  { src: '/images/carousel_4.jpg', caption: 'Fresh & Hygienic Cooking' },
  { src: '/images/carousel_3.jpg', caption: 'Affordable & Tasty Food' },
  { src: '/images/carousel-2.jpg', caption: 'Your Favorite Spot in Campus' },
];

function Carousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        <img src={images[index].src} alt="canteen" />
        <div className="caption">{images[index].caption}</div>
      </div>
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      <button className="next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
}

export default Carousel;
