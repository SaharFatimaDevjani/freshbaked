import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import {db} from "../../Firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animation, setAnimation] = useState("fade-up");

    
    
    useEffect(() => {
        const fetchTestimonials = async () => {
            try{
                const res = await getDocs(collection(db, "testimonials"));
                const data = res.docs.map ((doc) => ({ id: doc.id,...doc.data() }));
                setTestimonials(data);
            } catch (error) { 
                console.log("error fetching testimonials...",error);
            }
    };
    fetchTestimonials();
    AOS.init ({duration : 1000});
    }, []);
    // useEffect(() => {
    //     AOS.refresh();
    //   }, [currentIndex]);
      
    const prevSlide = () => {
        setAnimation("fade-right");
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };
    
    const nextSlide = () => {
        setAnimation("fade-left");
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };
    return (
        <div id="Testimonials">
        <section className="px-12 py-15 bg-[#4B2C35]" id="Testimonials">
            <div className="container mx-auto text-center px-4">
                <h2 className="text-3xl font-bold text-yellow-600 mb-6" data-aos="fade-up">
                    What Our Customer Say
                </h2>
                <p className=" text-white max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="200">
                    See what our customers have to say about our baked items
                </p>
                <div className="relative flex items-center justify-center">
    {testimonials.length > 0 && (
        <div key={currentIndex} className="backdrop-blur-md bg-[#ffffff0d] border border-[#ffffff20] p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(255,165,0,0.4)] w-full md:w-2/3" data-aos={animation}>
            <p className="text-white/90">"{testimonials[currentIndex].feedback}"</p>
            <div className="mt-4 flex items-center space-x-4 justify-center">
                <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full border-2 border-yellow-600"
                />
                <div>
                    <h4 className="text-yellow-500 font-bold">{testimonials[currentIndex].name}</h4>
                    <p className="text-gray-300 text-sm">{testimonials[currentIndex].occupation}</p>
                </div>
            </div>
        </div>
    )}

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
        </div>
    )
}
export default Testimonials;