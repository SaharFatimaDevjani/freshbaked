const Contact = () => {
    return (
        <>
        <section id="contact" className="py-12 px-6 md:px-12 lg:px-20 bg-gray-200">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8" data-aos="fade-up">
                 Contact Us
                </h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
               <div data-aos="fade-right" className="bg-white p-6 shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                    Send Us a Message
                </h3>
                <form>
                    <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Name
                </label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="your name" required/>
                    </div>
                    <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Email
                </label>
                <input type="Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="your email" required/>
                    </div>
                    <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" rows="4" placeholder="your name" required/>
                    </div>
                <button className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-300 ">
                    Send
                </button>
                </form>
               </div>
               <div data-aos="fade-lef">
                   <div className="mb-6">
                      <h3 className="text-xl font-semibold">
                       Get In Touch
                      </h3>
                    <p className="text-gray-600">
                    Email: contact@freshbaked.com
                    </p>
                    <p className="text-gray-600">
                    Phone: +123-456-7890
                    </p>
                   </div>
                   <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
                    <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509371!2d144.95373531531578!3d-37.81627997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577bb7bbeb4f108!2sBakery!5e0!3m2!1sen!2sus!4v1632967220591!5m2!1sen!2sus" allowFullScreen="" loading="lazy">
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