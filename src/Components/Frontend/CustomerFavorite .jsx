import { useEffect, useState, useContext } from "react";
import { db } from "../../Firebase/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";
import { LoadingContext } from '../../Contexts/LoadingContext'; // Import the context

const CustomerFavorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState("fade-up");
  const { setIsLoading } = useContext(LoadingContext); // Access setIsLoading

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const fetchFavorites = async () => {
      setIsLoading(true); // Start loading
      try {
        const res = await getDocs(collection(db, "customerFav"));
        const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
    fetchFavorites();
  }, [setIsLoading]);

  const prevSlide = () => {
    setAnimation("fade-right");
    setCurrentIndex((prev) => (prev === 0 ? favorites.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setAnimation("fade-left");
    setCurrentIndex((prev) => (prev === favorites.length - 1 ? 0 : prev + 1));
  };

  const visibleFavorites = favorites.slice(currentIndex, currentIndex + 4);

  return (
    <>
      <section className="px-12 py-15 bg-[#4B2C35]" id="customer-favorite">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-yellow-600 mb-6" data-aos="fade-up">
            Customer Favorites
          </h2>
          <p className="text-white max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="200">
            Explore our most loved products by our customers
          </p>

          <div className="relative flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up">
              {visibleFavorites.map((item, index) => (
                <div
                  key={item.id}
                  className="backdrop-blur-md bg-[#ffffff0d] border border-[#ffffff20] p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(255,165,0,0.4)] hover:shadow-[0_8px_32px_0_rgba(255,165,0,0.6)] transition-shadow duration-300"
                  data-aos={animation}
                  data-aos-delay={index * 100}
                >
                  <div className="group rounded-md mb-4 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-500 text-center">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-full shadow-lg transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-full shadow-lg transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerFavorite;