import React from "react";
import { FaShoppingCart, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import ecom1 from "../../assets/Home-ecommerce/ecom1.jpg";
import ecom2 from "../../assets/Home-ecommerce/ecom2.jpg";
import ecom3 from "../../assets/Home-ecommerce/ecom3.jpg";

const Ecommerce = () => {
  return (
    <div className="mt-16 sm:mt-20 w-[92%] sm:w-11/12 mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4 pb-12 max-w-[768px] mx-auto text-center">
        <p className="font-poppins text-base font-medium text-primary">
          Travel Essentials
        </p>
        <h1 className="font-red-rose text-4xl md:text-5xl font-bold text-primary">
          Gear Up for Your Adventure!
        </h1>
        <p className="text-base font-poppins text-gray-600">
          Premium travel gear designed for comfort and durability on your journeys.
          Lightweight, practical, and adventure-ready equipment for every traveler.
        </p>
      </div>

      {/* Product Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Featured Product (Left Side) */}
        <div className="w-full lg:w-1/2 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
          <div className="h-[250px] sm:h-[300px] relative">
            <img 
              src={ecom1} 
              alt="Portable Lightweight Tent" 
              className="w-full h-full object-cover" 
            />
            {/* Badge */}
            <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
              Best Seller
            </span>
            {/* Wishlist Button */}
            <button className="absolute top-3 right-3 p-2 bg-white rounded-full">
              <FaRegHeart className="text-gray-600 hover:text-primary" />
            </button>
          </div>
          <div className="w-11/12 sm:w-10/12 mx-auto py-4 sm:py-6 flex flex-col justify-between flex-grow">
            <div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
                <span className="text-gray-500 text-sm ml-1">(124 reviews)</span>
              </div>
              <h1 className="font-red-rose font-bold text-xl sm:text-2xl md:text-3xl text-gray-800 mb-2 sm:mb-3">
                Portable Lightweight Tent
              </h1>
              <p className="font-poppins text-gray-600 text-sm sm:text-base mb-3 sm:mb-5">
                Waterproof 10x10 portable tent with cushioned base for extra comfort. 
                Includes 19 skeleton sticks for easy setup in minutes. Designed for all weather 
                conditions with advanced ventilation system and UV protection.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <div>
                  <span className="font-bold text-lg sm:text-xl text-primary">$129.99</span>
                  <span className="text-gray-400 line-through text-xs sm:text-sm ml-2">$159.99</span>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  19% OFF
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                  View Details
                </button>
                <button className="flex-1 py-1.5 sm:py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition flex items-center justify-center gap-2">
                  Add to Cart <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Products (Right Side) */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 h-full">{/* Change gap from 4 to 6 */}
          {/* Product 1 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row h-[calc(50%-0.5rem)] min-h-[180px]">
            <div className="md:w-[45%] h-full">
              <img 
                src={ecom2} 
                alt="Sturdy Travel Bag" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="md:w-[55%] p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-red-rose font-bold text-xl text-gray-800">
                    Sturdy Travel Bag
                  </h2>
                  <button className="p-1">
                    <FaRegHeart className="text-gray-400 hover:text-primary" />
                  </button>
                </div>
                <p className="font-poppins text-gray-600 text-sm mb-2">
                  Premium quality travel bag with large capacity for all your essentials. 
                  Water-resistant material with reinforced stitching for ultimate durability in all conditions.
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-bold text-primary">$79.99</span>
                    <span className="text-gray-400 line-through text-sm ml-2">$99.99</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    20% OFF
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xs" />
                  ))}
                  <span className="text-gray-500 text-xs ml-1">(89 reviews)</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    Details
                  </button>
                  <button className="flex-1 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition flex items-center justify-center gap-1">
                    Add <FaShoppingCart className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row h-[calc(50%-0.5rem)]">
            <div className="md:w-[45%] h-full">
              <img 
                src={ecom3} 
                alt="Leather Hiking Boots" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="md:w-[55%] p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-red-rose font-bold text-xl text-gray-800">
                    Leather Hiking Boots
                  </h2>
                  <button className="p-1">
                    <FaRegHeart className="text-gray-400 hover:text-primary" />
                  </button>
                </div>
                <p className="font-poppins text-gray-600 text-sm mb-2">
                  Premium durable leather boots designed to protect your feet on challenging terrain. 
                  Anti-slip soles with advanced grip technology and waterproof construction for all weather.
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-bold text-primary">$149.99</span>
                    <span className="text-gray-400 line-through text-sm ml-2">$189.99</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    21% OFF
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xs" />
                  ))}
                  <span className="text-gray-500 text-xs ml-1">(156 reviews)</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    Details
                  </button>
                  <button className="flex-1 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition flex items-center justify-center gap-1">
                    Add <FaShoppingCart className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;