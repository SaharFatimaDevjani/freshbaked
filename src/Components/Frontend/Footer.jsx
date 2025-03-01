import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
    return (
        <>
        <footer className="bg-[#4B2C35] text-white py-4 md:py-6">
            <div className="container mx-auto max-w-screen-md px-4 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold">
                            Fresh Baked
                        </h2>
                    <p className="text-sm">
                    Freshly baked goods made with love and the finest ingredients. Taste the sweetness in every bite!
                    </p>
                    </div>
                < div className="space-y-2">
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/about" className="hover:underline">About</Link></li>
                        <li><Link to="/menu" className="hover:underline">menu</Link></li>
                        <li><Link to="/contact" className="hover:underline">contact</Link></li>
                    </ul>
                    </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Contact Us</h3>
                    <p className="text-sm">123 Bakery Street, XYZ ,12345</p>
                    <p className="text-sm">Phone: 123-456-7890</p>
                    <p className="text-sm">Email: info@freshbaked.com</p>

                    <h3 className="text-lg font-semibold mt-3">Follow Us</h3>
                <div className="flex items-center gap-3 justify-start">
                 <Link to="#"className="text-white hover:text-gray-300 text-xl">
                 <i className="fab fa-facebook-f"></i>
                 </Link>
                 <Link to="#"className="text-white hover:text-gray-300 text-xl">
                 <i className="fab fa-instagram"></i>
                 </Link>
                 <Link to="#"className="text-white hover:text-gray-300 text-xl">
                 <i className="fab fa-twitter"></i>
                 </Link>
                 </div>
                </div>
            </div>
               <div className="mt-4 text-center text-Xs border-t border-white pt-2">
                &copy; 2025 Fresh Baked. All rights reserved.
               </div>
        </div>
        </footer>
        </>
    )
}
export default Footer;