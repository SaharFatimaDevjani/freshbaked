import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";

// Map URL parameters to full category names
const categoryMap = {
  biscuits: "Biscuits & Cookies",
  brownies: "Brownies & Cupcakes",
  cakes: "Cakes",
  "sandwiches&donuts": "Sandwiches & Donuts",
  sundae: "Sundae & Valuepacks",
  "sweets&salts": "Sweets & Salts",
};

const MenuCategories = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);

  // Fetch products from Firestore based on the category
  const fetchProducts = async () => {
    try {
      const res = await getDocs(collection(db, 'bakeryItem'));
      const allProducts = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      // Map the URL parameter to the full category name
      const fullCategoryName = categoryMap[category];

      // Filter products based on the full category name
      const filteredProducts = allProducts.filter(product => product.category === fullCategoryName);
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when the component mounts or the category changes
  useEffect(() => {
    fetchProducts();
  }, [category]);

  // Get the full category name for the heading
  const fullCategoryName = categoryMap[category] || category;

  return (
    <>
      <section className="py-12 bg-white px-24" id="categories">
        <h2
          className="text-3xl font-bold text-center text-gray-800 mb-8"
          data-aos="fade-up"
        >
          {fullCategoryName} {/* Display the full category name dynamically */}
        </h2>

        {/* Explore Menu Button */}
        <div className="flex justify-center mb-8">
          <Link
            to="/menu"
            className="px-10 py-3 bg-[#D4A017] text-white rounded-lg shadow-lg font-semibold text-lg hover:bg-[#B8860B] transition duration-300"
          >
            Explore Full Menu
          </Link>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 p-5 rounded-lg shadow-lg transform hover:scale-105 transition"
              data-aos="fade-up"
            >
              <div className="group bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-44 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-700 mt-3">
                {product.title}
              </h3>
              <p className="text-sm text-center text-gray-600 mb-3">
                {product.description}
              </p>
              <p className="text-center text-[#FEA116] font-bold mb-3">
                ${product.price}
              </p>
              <div className="flex justify-center">
                <button className="px-8 py-2 bg-[#D4A017] text-white rounded-lg shadow-lg font-semibold text-base hover:bg-[#B8860B] transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MenuCategories;