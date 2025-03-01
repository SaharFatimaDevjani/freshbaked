import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/images/logo web.jpg";
import { FaHome , FaInfoCircle, FaBars, FaTimes, FaUtensils, FaPhoneAlt } from "react-icons/fa";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
    const dropdownRef = useRef (null);

    useEffect(
        () => {
            function handleClickOutside(event) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)
                ){
                    setDesktopDropdownOpen(false);
                    setMobileDropdownOpen(false);
                }
        }
        if (desktopDropdownOpen || mobileDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
    };
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [desktopDropdownOpen , mobileDropdownOpen]);

const [hasShadow , setHasShadow] = useState(false);
useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setHasShadow(true);
    }   else{
        setHasShow(false);
    }
};
window.addEventListener("scroll", handleScroll);
return () => {
    window.removeEventListener("scroll", handleScroll);
};
},[])
    return (
        <>
        <div className="bg-[#4B2C35] text-white text-sm py-2 text-center">
            Welcome to our Bakery
        </div>
            <nav className={'fixed top-0 left-0 bg-white shadow-md w-full z-50 transition-all duration-300 ${hasShadow ? "shadow-md" : "shadow-none"}'}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4 px-6">
                 <Link to="/">
                 <img src={logo} alt="Logo" className="w-40 h-14 object-contain"/>
                 </Link>
                 <ul className="hidden md:flex space-x-8 text-gray-800 font-medium flex-grow justify-center">
                    <li>
                     <Link to="/" className="flex items-center gap-2 hover:text-[#FEA116] transition-all duration-300 ease-in-out ">
                    <FaHome/>Home
                    </Link> 
                    </li>
                    <li>
                     <Link to="/about" className="flex items-center gap-2 hover:text-[#FEA116] transition-all duration-300 ease-in-out ">
                     <FaInfoCircle/>About Us
                     </Link> 
                     </li>
                    <li className="relative group">
                        <button className="flex items-center gap-2 hover:text-[#FEA116] transition:all duration-200 ease-in-out" onClick={()=>setDesktopDropdownOpen (!desktopDropdownOpen)}>
                           <FaUtensils/> Menu ▾
                        </button>
                        {desktopDropdownOpen && (
                            <ul className="absolute mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out ${desktopDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`">
                           <li>
                            <Link to="/Menu/cakes" className="block px-4 py-2 hover:bg-gray-100 duration-200" onClick={() => setDesktopDropdownOpen(false)}>Cakes</Link>
                           </li>
                           <li>
                            <Link to="/Menu/pastries" className="block px-4 py-2 hover:bg-gray-100 duration-200" onClick={() => setDesktopDropdownOpen(false)}>pastries & Brownies</Link>
                           </li>
                           <li>
                            <Link to="/Menu/sandwiches" className="block px-4 py-2 hover:bg-gray-100 duration-200" onClick={() => setDesktopDropdownOpen(false)}>sandwiches</Link>
                           </li>
                            </ul>
                        )}
                    </li>
                    <li> 
                        <Link to="/contact" className="flex items-center gap-2 hover:text-[#FEA116] transition-all duration-300 ease-in-out">
                    <FaPhoneAlt/>Contact
                        </Link> 
                    </li>
                 </ul>
                 <button className="md:hidden p-2 rounded focus:outline-none active:text-red-500 transition duration-300" onClick={() =>setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes className="w-6 h-6 text-gray-800"/> : <FaBars className="w-6 h-6 text-gray-800" />}
                 </button>
                 </div>
                 {/* Mobile View */}
                <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white shadow-md rounded-lg p-4 absolute top-[75px] right-0 left-0 mx-4 z-50 transition-all duration-300`}>
                  <ul className="flex flex-col space-y-4 text-center text-gray-800 font-medium">
                   <li> 
                    <Link to="/" className="flex items-center gap-2 justify-center py-2 hover:text-[#FEA116] transition" onClick={() => setIsOpen(false)}>
                   <FaHome/>Home
                   </Link> 
                   </li>
                   <li>
                     <Link to="/about" className="flex items-center gap-2 justify-center py-2 hover:text-[#FEA116] transition" onClick={() => setIsOpen(false)}>
                     <FaInfoCircle/>About
                     </Link>
                    </li>
                   <li className="relative group w-full text-center" ref={dropdownRef}>
                            <button 
                                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)} 
                                className="flex items-center gap-2 justify-center w-full py-2 hover:text-[#FEA116] transition:all duration-300 active:scale-105"
                            >
                              <FaUtensils/>  Menu ▾
                            </button>
                            {mobileDropdownOpen && (
                                <ul className="mt-2 bg-white border border-gray-200 shadow-md rounded-md w-full text-center transition-all duration-300 ease-in-out ${mobileDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'">
                                    <li>
                                        <Link to="/shop/cakes" className="block px-4 py-2 hover:bg-gray-100 w-full" onClick={() => { setMobileDropdownOpen(false); setIsOpen(false); }}>Cakes</Link>
                                    </li>
                                    <li>
                                        <Link to="/shop/pastries" className="block px-4 py-2 hover:bg-gray-100 w-full" onClick={() => { setMobileDropdownOpen(false); setIsOpen(false); }}>Pastries</Link>
                                    </li>
                                    <li>
                                        <Link to="/shop/bread" className="block px-4 py-2 hover:bg-gray-100 w-full" onClick={() => { setMobileDropdownOpen(false); setIsOpen(false); }}>Bread</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                   <li>
                    <Link to="/Contact" className="flex items-center gap-2 justify-center py-2 hover:text-[#FEA116] transition" onClick={() => setIsOpen(false)}>
                    <FaPhoneAlt/>Contact
                    </Link>
                    </li>
                  </ul>
                </div>
            </div>
            </nav>
        </>
    )
}
export default Header;