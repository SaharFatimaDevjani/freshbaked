import { useEffect, useState } from 'react';
import hero1 from '../../../Components/assets/images/hero1.jpg';
import hero2 from '../../../Components/assets/images/hero 2.jpeg';
import hero3 from '../../../Components/assets/images/hero 3.jpg';
import {AnimatePresence, motion} from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const images = [hero1 , hero2 , hero3];

const HeroSection =()=>{
    const [index , setIndex ] = useState(0);

    useEffect(()=>{
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return()=>clearInterval(interval);
}, []);
const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
};
const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
}
    return (
                <>
                <div className="relative w-full min-h-[60vh] sm:min-h-[50vh] md:min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
                 <AnimatePresence>
                 <motion.div key={index} className="absolute inset-0 w-full h-full bg-cover bg-center" style={{backgroundImage: `url(${images[index]})`}} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: 1 }}/>
                 </AnimatePresence>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30 px-4 sm:px-6 text-center ">
                      <h1 className="text-4xl md:text-6xl font-bold mb-2">Welcome to our Bakery</h1>
                      <p className="text-lg md:text-xl mb-4">Freshly baked goods, every day!</p>
                      <button className="px-6 py-2 bg-yellow-400 text-black rounded-lg shadow-md hover:bg-yellow-500 transition duration-300">
                        Explore Menu
                      </button>
                  </div>

                <button onClick={prevSlide} className="absolute left-2 sm:left-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 p-2 text-white rounded-full hover:bg-opacity-60 transition">
                     <FaChevronLeft size={20} className="sm:size-24" />
                </button>
                <button onClick={nextSlide} className="absolute right-2 sm:right-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 p-2 text-white rounded-full hover:bg-opacity-60 transition">
                <FaChevronRight size={20} className="sm:size-24" />
                </button>
            <div className="absolute bottom-4 flex gap-2 w-full justify-center">
                {images.map ((_, i)=>(
                     <div
                     key={i}
                     className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                       index === i ? "bg-yellow-400" : "bg-gray-400"
                     }`}
                   ></div>
                ))}
            </div>
                </div>
                </>
    )
}
export default HeroSection;