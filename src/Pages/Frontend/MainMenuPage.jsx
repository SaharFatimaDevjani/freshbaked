import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";
import MenuHeader from "../../Components/Frontend/MenuHeader";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LoadingContext } from '../../Contexts/LoadingContext'; // Import the context

const categories = [
  "Biscuits & Cookies",
  "Brownies & Cupcakes",
  "Cakes",
  "Sandwiches & Donuts",
  "Sundae & Valuepacks",
  "Sweets & Salts",
];

const MainMenuPage = () => {
  const [products, setProducts] = useState([]);
  const { setIsLoading } = useContext(LoadingContext); // Access setIsLoading

  // Fetch all bakery items from Firestore
  const getProducts = async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await getDocs(collection(db, 'bakeryItem'));
      const products = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    getProducts();
    AOS.init({ duration: 1000 });
  }, [setIsLoading]);

  // Categorize products
  const categorizedProducts = categories.map((category) => ({
    category,
    items: products.filter((product) => product.category === category),
  }));

  const scrollToCategory = (category) => {
    const section = document.getElementById(category);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <MenuHeader scrollToCategory={scrollToCategory} />
      <div className="px-24 py-12">
        {categorizedProducts.map((section) => (
          <div key={section.category} id={section.category} className="my-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#0F172B]" data-aos="fade-up">
              {section.category}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-5 rounded-lg shadow-lg transform hover:scale-105 transition"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
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