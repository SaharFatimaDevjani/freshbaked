import * as React from 'react';
import { useState, useEffect } from 'react';
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";
import MenuHeader from "./MenuHeader";

const categories = [
  "Biscuits & Cookies",
  "Brownies & Cupcakes",
  "Cakes",
  "Sandwiches & Donuts",
  "Sundae & Valuepacks", // Ensure this matches exactly
  "Sweets & Salts",
];

const MainMenuPage = () => {
  const [products, setProducts] = useState([]);

  // Fetch all bakery items from Firestore
  const getProducts = async () => {
    try {
      const res = await getDocs(collection(db, 'bakeryItem'));
      const products = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    getProducts();
  }, []);

  // Categorize products
  const categorizedProducts = categories.map((category) => ({
    category,
    items: products.filter((product) => product.category === category),
  }));

  const scrollToCategory = (category) => {
    const section = document.getElementById(category);
    if (section) {
      console.log("Scrolling to section:", section); // Debugging
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("Section not found:", category); // Debugging
    }
  };

  return (
    <>
      {/* Pass scrollToCategory as a prop to MenuHeader */}
      <MenuHeader scrollToCategory={scrollToCategory} />

      {/* Main Content */}
      <div className="px-24 py-12">
        {categorizedProducts.map((section) => (
          <div key={section.category} id={section.category} className="my-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#0F172B]">
              {section.category}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-5 rounded-lg shadow-lg transform hover:scale-105 transition"
                >
                  <div className="group bg-white shadow-md rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-44 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-700 mt-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-center text-gray-600 mb-1">
                    {item.description}
                  </p>
                  <p className="text-center text-[#FEA116] font-bold mb-3">
                    PKR : {item.price}
                  </p>
                  <div className="flex justify-center">
                    <button className="px-8 py-2 bg-[#D4A017] text-white rounded-lg shadow-lg font-semibold text-base hover:bg-[#B8860B] transition duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 bg-[#FEA116] text-white p-3 rounded-full shadow-lg hover:bg-[#0F172B] transition"
        >
          ↑
        </button>
      </div>
    </>
  );
};

export default MainMenuPage;