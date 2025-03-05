import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import sundae from "../../Assets/Images/Frontend/sundaw.jpeg";
import cakes from "../../Assets/Images/Frontend/chocolate-cake.jpg";
import savories from "../../Assets/Images/Frontend/sweets and salts.jpg";
import cookies from "../../Assets/Images/Frontend/cookies.jpg";
import cupcakes from "../../Assets/Images/Frontend/cupcakes.jpg";
import donuts from "../../Assets/Images/Frontend/donuts.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeCategory = () => {
  // Define categories with their respective details
  const categories = [
    {
      name: "Biscuits & Cookies",
      image: cookies,
      description: "Delicious and crunchy biscuits and cookies for every occasion.",
      link: "biscuits",
    },
    {
      name: "Brownies & Cupcakes",
      image: cupcakes,
      description: "Rich and decadent brownies and cupcakes to satisfy your sweet tooth.",
      link: "brownies",
    },
    {
      name: "Cakes",
      image: cakes,
      description: "Celebrate with our beautifully crafted cakes for all occasions.",
      link: "cakes",
    },
    {
      name: "Sandwiches & Donuts",
      image: donuts,
      description: "Tasty sandwiches and donuts for a quick and satisfying snack.",
      link: "sandwiches&donuts",
    },
    {
      name: "Sundae & Valuepacks",
      image: sundae,
      description: "Indulge in our creamy sundaes and value-packed deals.",
      link: "sundae",
    },
    {
      name: "Sweets & Salts",
      image: savories,
      description: "A perfect mix of sweet and salty treats for every craving.",
      link: "sweets&salts",
    },
  ];

  // Initialize AOS library
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="px-24 py-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-[#0F172B] mb-8" data-aos="fade-up">
        Explore Our Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-50 p-5 rounded-lg shadow-lg transform hover:scale-105 transition"
            data-aos="fade-up" // Apply fade-up animation
            data-aos-delay={index * 100} // Stagger animations
          >
            <div className="group bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-44 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-700 mt-3">
              {category.name}
            </h3>
            <p className="text-sm text-center text-gray-600 mb-3">
              {category.description}
            </p>
            <div className="flex justify-center">
              <Link
                to={`/menu/${category.link}`}
                className="px-8 py-2 bg-[#D4A017] text-white rounded-lg shadow-lg font-semibold text-base hover:bg-[#B8860B] transition duration-300"
              >
                Explore {category.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;