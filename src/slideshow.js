import React, { useState } from 'react';
import './style.css';
import pic1 from './images/luxbed.jpg';
import pic2 from './images/2n beds.jpg';
import pic3 from './images/2beds.jpg';
import pic4 from './images/Dbed.jpg';

const images = [
    pic1,
  pic2,
  pic3,
  pic4
];

const Slideshow = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1 + images.length) % images.length);
  };
    const secondIndex = (index + 1) % images.length;   // - Use % to wrap around (loop to end if at start)
    const thirdIndex = (index + 2) % images.length;
  return (
    <div className="slideshow-container">
      <img src={images[index]} alt="slide" className="slide" />
     <img src={images[secondIndex]} alt="slide" className="slide" />
     <img src={images[thirdIndex]} alt="slide" className="slide" />
      <div className="buttons">
        <button onClick={prevSlide}>⟵ </button>
        <button onClick={nextSlide}> ⟶</button>
      </div>
    </div>
  );
};

export default Slideshow;
