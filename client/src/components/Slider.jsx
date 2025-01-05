import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Your Next Favorite Item Awaits.",
    description:
      "Discover thousands of products curated just for you. Shop hassle-free and get fast delivery.",
    buttonText: "SHOP NOW",
    image:
      "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGtpdGNoZW4lMjBzZXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    title: "Exclusive Deals, Just a Click Away!",
    description:
      "From trending gadgets to timeless fashion, find everything you need in one place.",
    buttonText: "SHOP NOW",
    image:
      "https://plus.unsplash.com/premium_photo-1661780295073-98db12600af0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-slider shadow-md">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${
            index === currentSlide
              ? "active"
              : index === (currentSlide - 1 + slides.length) % slides.length
              ? "inactive"
              : ""
          }`}
        >
          <div className="text-section">
            {" "}
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <button
              className="button-primary"
              onClick={() => navigate("/shop")}
            >
              <span>{slide.buttonText}</span>
            </button>
          </div>
          <div
            className="image-section"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
