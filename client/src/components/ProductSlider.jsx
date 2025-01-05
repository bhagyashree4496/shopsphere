import React, { useState } from "react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const ProductSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <img
        src={images[currentIndex]}
        alt="Product"
        className="w-full h-[400px] object-cover"
      />

      {/* Navigation Buttons */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 "
        onClick={handlePrev}
      >
        <FaArrowLeft />
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 "
        onClick={handleNext}
      >
        <FaArrowRight />
      </button>

      {/* Thumbnails */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-16 h-16 object-cover cursor-pointer ${
              currentIndex === index ? "border-2 border-purple-500" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
