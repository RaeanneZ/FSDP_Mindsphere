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
    <div className="relative w-full max-w-7xl mx-auto px-4">
      <div className="relative flex items-center justify-center w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg bg-gray-200">
        {images.length > 0 ? (
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-gray-500 text-center">No images available</p>
        )}

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-6 text-3xl sm:text-4xl md:text-5xl text-white hover:text-gray-300"
        >
          &lt;
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-6 text-3xl sm:text-4xl md:text-5xl text-white hover:text-gray-300"
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
