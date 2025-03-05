import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LoadingContext } from '../../Contexts/LoadingContext'; // Import the context

const categoryMap = {
  biscuits: "Biscuits & Cookies",
  brownies: "Brownies & Cupcakes",
  cakes: "Cakes",
  "sandwiches&donuts": "Sandwiches & Donuts",
  sundae: "Sundae & Valuepacks",
  "sweets&salts": "Sweets & Salts",
};

const MenuCategories = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryExists, setCategoryExists] = useState(true);
  const navigate = useNavigate();
  const { setIsLoading } = useContext(LoadingContext); // Access setIsLoading

  const fetchProducts = async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await getDocs(collection(db, 'bakeryItem'));
      const allProducts = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      const fullCategoryName = categoryMap[category];
      if (!fullCategoryName) {
        setCategoryExists(false);
        return;
      }

      const filteredProducts = allProducts.filter(product => product.category === fullCategoryName);
      setProducts(filteredProducts);
      setCategoryExists(true);
    } catch (error) {
      console.error("Error fetching products:", error);
      setCategoryExists(false);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, setIsLoading]);

  useEffect(() => {
    if (!categoryExists) {
      navigate("/not-found");
    }
  }, [categoryExists, navigate]);

  const fullCategoryName = categoryMap[category] || category;

  return (
    <>
      {categoryExists && (
        <section className="py-12 bg-white px-24" id="categories">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8" data-aos="fade-up">
            {fullCategoryName}
          </h2>
          <div className="flex justify-center mb-8">
            <Link
              to="/menu"
              className="px-10 py-3 bg-[#D4A017] text-white rounded-lg shadow-lg font-semibold text-lg hover:bg-[#B8860B] transition duration-300"
            >
              Explore Full Menu
            </Link>
          </div>
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
                  PKR : {product.price}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default MenuCategories;