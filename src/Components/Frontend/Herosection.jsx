import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import hero1 from "../../Assets/Images/Frontend/hero1.jpg";
import hero2 from "../../Assets/Images/Frontend/hero2.jpg";
import hero3 from "../../Assets/Images/Frontend/hero3.jpg";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [hero1, hero2, hero3];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full min-h-[60vh] sm:min-h-[50vh] md:min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
      {/* Image Transition */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Overlay & Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/50 px-6 sm:px-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          Welcome to our Bakery
        </h1>
        <p className="text-lg md:text-xl mt-2 mb-4 drop-shadow">
          Freshly baked goods, every day!
        </p>
        {/* Updated Explore Menu Button */}
        <Link
          to="/menu" // Navigate to /menu
          className="px-6 py-3 bg-[#D4A017] text-white rounded-lg shadow-lg font-semibold text-lg hover:bg-[#B8860B] transition duration-300"
        >
          Explore Menu
        </Link>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 text-white rounded-full hover:bg-opacity-70 transition shadow-lg"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 text-white rounded-full hover:bg-opacity-70 transition shadow-lg"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 flex gap-2 w-full justify-center">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === i ? "bg-yellow-400 scale-150 shadow-md" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;