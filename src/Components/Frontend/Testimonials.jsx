import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import db from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
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
    return (
        <>
        <section className="p-12 bg-gray-100" id="testimonials">
            <div className="container mx-auto text-center px-4">
                <h2 className="text-3xl font-bold text-yellow-600 mb-6" data-aos="fade-up">
                    What Our Customer Say
                </h2>
                <p className=" text-gray-600 max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="200">
                    See what our customers have to say about our baked items
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial,index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay={index*100}>
                         <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
                         <div className="mt-4 flex items-center space-x-4">
                            <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-yellow-600" />
                              <div>
                                <h4 className="text-yellow-600 font-bold">{testimonial.name}</h4>
                                <p className="text-gray-500 text-sm">{testimonial.occupation}</p>
                              </div>
                         </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
        </>
    )
}
export default Testimonials;