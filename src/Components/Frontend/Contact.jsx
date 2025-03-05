import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope ,FaHome,FaInfoCircle,FaUtensils} from "react-icons/fa";

const Contact = () => {
    return (
        <>
        <section id="Contact" className="py-20 px-6 md:px-12 lg:px-20 bg-gray-100">
            <div className="container mx-auto max-w-6xl">
                {/* Single Big Heading */}
                

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Form Section */}
                    <div data-aos="fade-right" className="bg-white p-8 shadow-xl rounded-2xl">
                        <h3 className="text-2xl font-bold text-[#3E1F28] mb-6">
                            Send Us a Message
                        </h3>
                        <form>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Name
                                </label>
                                <input type="text" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A017]" placeholder="Your name" required/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Email
                                </label>
                                <input type="email" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A017]" placeholder="Your email" required/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Message
                                </label>
                                <textarea className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A017]" rows="5" placeholder="Your message" required/>
                            </div>
                            <button className="w-full bg-[#D4A017] text-white py-4 rounded-lg text-lg font-semibold hover:bg-[#B8860B] transition duration-300 shadow-lg">
                                Send
                            </button>
                        </form>
                    </div>

                    {/* Contact Info and Map Section */}
                    <div data-aos="fade-left">
                        <div className="mb-8">
                            <h3 className="text-5xl font-extrabold text-left text-[#3E1F28] mb-12" data-aos="fade-up">
                                Contact Information
                            </h3>
                            <p className="text-lg text-gray-700 mb-3">
                                Email: <a href="mailto:contact@freshbaked.com" className="text-[#D4A017] hover:underline">contact@freshbaked.com</a>
                            </p>
                            <p className="text-lg text-gray-700">
                                Phone: <a href="tel:+123-456-7890" className="text-[#D4A017] hover:underline">+123-456-7890</a>
                            </p>
                        </div>
                        <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl">
                            <iframe 
                                className="w-full h-full" 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509371!2d144.95373531531578!3d-37.81627997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577bb7bbeb4f108!2sBakery!5e0!3m2!1sen!2sus!4v1632967220591!5m2!1sen!2sus" 
                                allowFullScreen="" 
                                loading="lazy"
                            >
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};
export default Contact;