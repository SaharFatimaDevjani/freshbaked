import { useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import aboutimg from "../../../Components/assets/images/about.jpg";

const AboutUs = () => {
    const [showMore , setShowMore] = useState(false);
    return (
        <>
        <section id="About" className="bg-gray-100 py-16">
            <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-10">
                <div className="w-full lg:w-1/2" data-aos="fade-right">
                <img src={aboutimg} alt="about" className="w-full rounded-lg shadow-lg"/>
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left" data-aos="fade-left">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">About Our Bakery</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    At <span className="text-[#053264] font-bold">Fresh Baked</span>,
                    your go-to spot for all things sweet, savory, and made with love.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                We’re a small, passionate team of bakers who believe that good food has the power to bring people together.   
</p>
{showMore && (
    <p className="text-lg text-gray-600 leading-relaxed mt-4">
        Our story started with a simple dream: to create a place where people could enjoy fresh, handmade treats that feel like a warm hug. Every pastry, cake, and loaf of bread we make is crafted with care, using the best ingredients we can find.  

We’re all about keeping things real. That means no shortcuts, no artificial flavors—just honest, delicious baking. We love supporting our local community, so you’ll often find us using locally sourced ingredients to create our goodies.  

When you step into our bakery, we want you to feel at home. Whether you’re grabbing a morning croissant, picking up a birthday cake, or just stopping by for a coffee and a chat, we’re here to make your day a little brighter.  

Thank you for being part of our journey. We’re so grateful to share our passion with you and can’t wait to see you in the bakery!  
    </p>
)}
<button onClick={() => setShowMore(!showMore)} className="mt-6 bg-[#d2ac47] text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-[#d88b0c] transition-all duration-300">
    {showMore ? "Show Less" : "Read More"}
</button>
                </div>

            </div>
        </section>
        </>
    );
};
export default AboutUs;