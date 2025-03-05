import { CakeSliceIcon, Cookie, Sandwich, IceCream, Candy, Utensils } from "lucide-react";

const MenuHeader = ({ scrollToCategory }) => {
  const categories = [
    { name: "Biscuits & Cookies", icon: <Cookie className="w-6 h-6 text-[#D4A017]" /> },
    { name: "Brownies & Cupcakes", icon: <Utensils className="w-6 h-6 text-[#D4A017]" /> },
    { name: "Cakes", icon: <CakeSliceIcon className="w-6 h-6 text-[#D4A017]" /> },
    { name: "Sandwiches & Donuts", icon: <Sandwich className="w-6 h-6 text-[#D4A017]" /> },
    { name: "Sundae & Valuepacks", icon: <IceCream className="w-6 h-6 text-[#D4A017]" /> },
    { name: "Sweets & Salts", icon: <Candy className="w-6 h-6 text-[#D4A017]" /> },
  ];

  return (
    <header className="bg-[#4B2C35] py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-center gap-6">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => scrollToCategory(category.name)}
            className="flex items-center gap-2 px-4 py-2 text-white font-medium rounded-full hover:bg-white hover:text-[#4B2C35] transition-all duration-300 ease-in-out"
          >
            <span className="text-xl">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </header>
  );
};

export default MenuHeader;