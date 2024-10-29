import React, { useState } from "react";
import PropTypes from "prop-types";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {" "}
      {/* Slightly narrower than full-width */}
      <div className="relative flex items-center justify-center w-full h-[600px] overflow-hidden rounded-lg bg-gray-200">
        {" "}
        {/* Tall carousel */}
        {images.length > 0 ? (
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-gray-500">No images available</p>
        )}
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-6 text-5xl text-white bg-gray-800 bg-opacity-60 hover:bg-opacity-80 p-4 rounded-full"
        >
          &lt;
        </button>
        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-6 text-5xl text-white bg-gray-800 bg-opacity-60 hover:bg-opacity-80 p-4 rounded-full"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

ImageCarousel.defaultProps = {
  images: [],
};

export default ImageCarousel;
