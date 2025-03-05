import { useState } from "react";
import about from "../../Assets/Images/Frontend/about.jpg";

const AboutUs = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div id="About">
            <section className="py-30 bg-gray-100">
                <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-12">
                    {/* Image Section (Reduced Size) */}
                    <div className="w-full lg:w-[35%]" data-aos="fade-right">
                        <img 
                            src={about} 
                            alt="about" 
                            className="w-full rounded-2xl shadow-xl"
                        />
                    </div>

                    {/* Text Section (Expanded) */}
                    <div className="w-full lg:w-[65%] text-center lg:text-left" data-aos="fade-left">
                        <h2 className="text-5xl font-extrabold text-[#3E1F28] mb-6 leading-tight">
                            About Our Bakery
                        </h2>
                        <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                            At <span className="text-[#3E1F28] font-bold">Fresh Baked</span>, we believe in the magic of homemade baking. From the first whiff of freshly baked bread to the sweet delight of a warm pastry, every bite is a moment of pure happiness.
                        </p>
                        <p className="text-lg text-gray-800 leading-relaxed">
                            Our bakery is more than just a place to buy treats—it's a space filled with warmth, tradition, and passion. Every day, we craft our baked goods using high-quality, locally sourced ingredients, ensuring that each item is made with love and care.
                        </p>

                        {showMore && (
                            <p className="text-lg text-gray-800 leading-relaxed mt-4">
                                Our story started with a simple dream: to create a place where people could enjoy fresh, handmade treats that feel like a warm hug. Every pastry, cake, and loaf of bread we make is crafted with care, using the best ingredients we can find.  
                                <br /><br />
                                We’re all about keeping things real. No shortcuts, no artificial flavors—just honest, delicious baking. We love supporting our local community, so we use locally sourced ingredients whenever possible.
                                <br /><br />
                                Whether you’re grabbing a morning croissant, picking up a birthday cake, or just stopping by for a coffee and a chat, we’re here to make your day brighter. Thank you for being part of our journey!
                            </p>
                        )}

                        {/* Button (Consistent Styling) */}
                        <button 
                            onClick={() => setShowMore(!showMore)} 
                            className="mt-6 bg-[#D4A017] text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-[#B8860B] transition-all duration-300">
                            {showMore ? "Show Less" : "Read More"}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
