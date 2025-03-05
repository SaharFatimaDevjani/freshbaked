import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/Frontend/logo.png";
import { FaHome, FaInfoCircle, FaBars, FaTimes, FaUtensils, FaPhoneAlt, FaSearch, FaShoppingCart, FaCommentDots } from "react-icons/fa";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasShadow, setHasShadow] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setHasShadow(true);
                setIsSticky(true);
            } else {
                setHasShadow(false);
                setIsSticky(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleHomeClick = () => {
        navigate("/"); // Navigate to the home page
        scrollToTop(); // Scroll to the top after navigation
    };

    const smoothScroll = (sectionId) => {
        navigate(`/#${sectionId}`);
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = 80;
            const offsetTop = section.offsetTop - navbarHeight;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
        setIsOpen(false); // Close the mobile menu after clicking an item
    };

    const handleMouseEnterMenu = () => {
        setIsMenuOpen(true);
    };

    const handleMouseLeaveMenu = () => {
        setTimeout(() => {
            if (!isMenuOpen) {
                setIsMenuOpen(false);
            }
        }, 300);
    };

    const handleMouseEnterDropdown = () => {
        setIsMenuOpen(true);
    };

    const handleMouseLeaveDropdown = () => {
        setTimeout(() => {
            setIsMenuOpen(false);
        }, 300);
    };

    return (
        <>
            <style>{`html { scroll-behavior: smooth; }`}</style>

            <div className="bg-[#4B2C35] text-white font-bold text-md py-2 text-center">
                Welcome to our Bakery
            </div>

            <nav className={`transition-all duration-300 ${isSticky ? "fixed top-0 left-0 w-full z-50 bg-white shadow-md" : "relative"} ${hasShadow ? "shadow-md" : "shadow-none"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-1 px-6">
                        <button onClick={handleHomeClick} className="focus:outline-none">
                            <img src={logo} alt="Logo" className="w-40 h-14 object-contain" />
                        </button>

                        <ul className="hidden md:flex py-4 space-x-8 text-[#8B5A2B] font-medium flex-grow justify-center">
                            <li>
                                <button onClick={handleHomeClick} className="flex items-center gap-2 hover:text-[#D4A017] transition-all duration-300">
                                    <FaHome /> Home
                                </button>
                            </li>
                            <li>
                                <button onClick={() => smoothScroll("About")} className="flex items-center gap-2 hover:text-[#D4A017] transition-all duration-300">
                                    <FaInfoCircle /> About Us
                                </button>
                            </li>
                            <li
                                className="relative"
                                onMouseEnter={handleMouseEnterMenu}
                                onMouseLeave={handleMouseLeaveMenu}
                            >
                                <button className="flex items-center gap-2 hover:text-[#D4A017] transition-all duration-200">
                                    <FaUtensils /> Menu ▾
                                </button>
                                <ul
                                    className={`absolute mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md left-1/2 transform -translate-x-1/2 z-50 ${isMenuOpen ? "block" : "hidden"}`}
                                    onMouseEnter={handleMouseEnterDropdown}
                                    onMouseLeave={handleMouseLeaveDropdown}
                                >
                                    <li><a href="http://localhost:5173/menu/biscuits" className="block px-4 py-2 hover:bg-[#4B2C35] hover:text-white duration-200 w-full text-left">Biscuits & Cookies</a></li>
                                    <li><a href="http://localhost:5173/menu/brownies" className="block px-4 py-2 hover:bg-[#4B2C35] hover:text-white duration-200 w-full text-left">Brownies & Cupcakes</a></li>
                                    <li><a href="http://localhost:5173/menu/cakes" className="block px-4 py-2 hover:bg-[#4B2C35] hover:text-white duration-200 w-full text-left">Cakes</a></li>
                                    <li><a href="http://localhost:5173/menu/sandwiches&donuts" className="block px-4 py-2 hover:bg-[#4B2C35] hover:text-white duration-200 w-full text-left">Sandwiches & Donuts</a></li>
                                    <li><a href="http://localhost:5173/menu/sundae" className="block px-4 py-2 hover:bg-[#4B2C35] hover:text-white duration-200 w-full text-left">Sundae & Valuepacks</a></li>
                                    <li><a href="http://localhost:5173/menu/sweets&salts" className="block px-4 py-2 hover:bg-[#4B2C35] hover:text-white duration-200 w-full text-left">Sweets & Salts</a></li>
                                </ul>
                            </li>
                            <li>
                                <button onClick={() => smoothScroll("Contact")} className="flex items-center gap-2 hover:text-[#D4A017] transition-all duration-300">
                                    <FaPhoneAlt /> Contact
                                </button>
                            </li>
                            <li>
                                <button onClick={() => smoothScroll("Testimonials")} className="flex items-center gap-2 hover:text-[#D4A017] transition-all duration-300">
                                    <FaCommentDots /> Testimonials
                                </button>
                            </li>
                        </ul>

                        <div className="flex items-center gap-4">
                            <form onSubmit={(e) => e.preventDefault()} className="hidden md:flex items-center bg-gray-100 rounded-lg p-2">
                                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none text-[#8B5A2B] placeholder-[#8B5A2B]" />
                                <button type="submit" className="text-[#8B5A2B] hover:text-[#D4A017] transition duration-300">
                                    <FaSearch />
                                </button>
                            </form>
                            <button onClick={() => smoothScroll("Cart")} className="text-[#8B5A2B] hover:text-[#D4A017] transition duration-300">
                                <FaShoppingCart className="text-2xl" />
                            </button>
                        </div>

                        <button className="md:hidden p-2 rounded focus:outline-none transition duration-300 text-[#8B5A2B]" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>

                    <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white shadow-md rounded-lg p-4 absolute top-[75px] right-0 left-0 mx-4 z-50 transition-all duration-300`}>
                        <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-gray-100 rounded-lg p-2 mb-4">
                            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none text-[#8B5A2B] placeholder-[#8B5A2B] flex-grow" />
                            <button type="submit" className="text-[#8B5A2B] hover:text-[#D4A017] transition duration-300">
                                <FaSearch />
                            </button>
                        </form>
                        <ul className="flex flex-col space-y-4 text-center text-[#8B5A2B] font-medium">
                            <li><button onClick={handleHomeClick} className="flex items-center gap-2 justify-center py-2 hover:text-[#D4A017] transition w-full"> <FaHome /> Home </button></li>
                            <li><button onClick={() => smoothScroll("About")} className="flex items-center gap-2 justify-center py-2 hover:text-[#D4A017] transition w-full"> <FaInfoCircle /> About </button></li>
                            <li><button onClick={() => smoothScroll("Menu")} className="flex items-center gap-2 justify-center py-2 hover:text-[#D4A017] transition w-full"> <FaUtensils /> Menu </button></li>
                            <li><button onClick={() => smoothScroll("Contact")} className="flex items-center gap-2 justify-center py-2 hover:text-[#D4A017] transition w-full"> <FaPhoneAlt /> Contact </button></li>
                            <li><button onClick={() => smoothScroll("Testimonials")} className="flex items-center gap-2 justify-center py-2 hover:text-[#D4A017] transition w-full"> <FaCommentDots /> Testimonials </button></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;