import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-[#4B2C35]">
            {/* 404 Content */}
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-[#D4A017] mb-4">404</h1>
                <h2 className="text-4xl font-bold mb-4">Oops! Page Not Found</h2>
                <p className="text-lg mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Back to Home Button */}
                <Link
                    to="/"
                    className="inline-flex items-center bg-[#D4A017] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#B8860B] transition duration-300"
                >
                    <FaHome className="mr-2" />
                    Go Back Home
                </Link>

                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="ml-4 inline-flex items-center bg-[#4B2C35] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#3E1F28] transition duration-300"
                >
                    <FaArrowLeft className="mr-2" />
                    Go Back
                </button>
            </div>

            
        </div>
    );
};

export default NotFound;