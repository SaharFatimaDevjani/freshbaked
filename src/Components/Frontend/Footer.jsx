import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope ,FaHome,FaInfoCircle,FaUtensils} from "react-icons/fa";

const Footer = () => {
    return (
        <>
        <footer className="bg-[#4B2C35] text-white py-12">
            <div className="container mx-auto max-w-screen-lg px-4 md:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-[#D4A017]">
                            Fresh Baked
                        </h2>
                        <p className="text-sm text-gray-300">
                            Freshly baked goods made with love and the finest ingredients. Taste the sweetness in every bite! We are dedicated to bringing you the best baked treats, crafted with care and tradition.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-[#D4A017]">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-300 hover:text-[#D4A017] transition duration-300 flex items-center gap-2"><FaHome /> Home</Link></li>
                            <li><Link to="/about" className="text-gray-300 hover:text-[#D4A017] transition duration-300 flex items-center gap-2"><FaInfoCircle /> About Us</Link></li>
                            <li><Link to="/menu" className="text-gray-300 hover:text-[#D4A017] transition duration-300 flex items-center gap-2"><FaUtensils /> Menu</Link></li>
                            <li><Link to="/contact" className="text-gray-300 hover:text-[#D4A017] transition duration-300 flex items-center gap-2"><FaPhoneAlt /> Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Us Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-[#D4A017]">Contact Us</h3>
                        <p className="text-sm text-gray-300 flex items-center gap-2"><FaMapMarkerAlt /> 123 Bakery Street, XYZ, 12345</p>
                        <p className="text-sm text-gray-300 flex items-center gap-2"><FaPhoneAlt /> <a href="tel:123-456-7890" className="hover:text-[#D4A017] transition duration-300">123-456-7890</a></p>
                        <p className="text-sm text-gray-300 flex items-center gap-2"><FaEnvelope /> <a href="mailto:info@freshbaked.com" className="hover:text-[#D4A017] transition duration-300">info@freshbaked.com</a></p>
                    </div>

                    {/* Follow Us Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-[#D4A017]">Follow Us</h3>
                        <div className="flex items-center gap-4">
                            <Link to="#" className="text-gray-300 hover:text-[#D4A017] transition duration-300 text-2xl">
                                <FaFacebookF />
                            </Link>
                            <Link to="#" className="text-gray-300 hover:text-[#D4A017] transition duration-300 text-2xl">
                                <FaInstagram />
                            </Link>
                            <Link to="#" className="text-gray-300 hover:text-[#D4A017] transition duration-300 text-2xl">
                                <FaTwitter />
                            </Link>
                        </div>
                        <p className="text-sm text-gray-300">
                            Stay connected with us on social media for the latest updates, promotions, and delicious treats!
                        </p>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 text-center text-sm text-gray-300 border-t border-gray-700 pt-4">
                    &copy; 2025 Fresh Baked. All rights reserved.
                </div>
            </div>
        </footer>
        </>
    )
}
export default Footer;