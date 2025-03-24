import React from 'react';
import ecom1 from "../../assest-tourPack/ecom1.jpg";
import { FaShoppingCart } from "react-icons/fa";
import ecom2 from "../../assest-tourPack/ecom2.jpg";
import ecom3 from "../../assest-tourPack/ecom3.jpg";
import { motion } from "framer-motion";

const Ecommerce = () => {
    return (
        <div className="mt-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading Section */}
            <div className="text-center mb-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block mb-4"
                >
                    <span className="bg-[#4EDAE4]/10 text-[#4EDAE4] px-4 py-2 rounded-full text-sm font-semibold">
                        Travel Essentials
                    </span>
                </motion.div>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Travel Smart – Shop Essential <br className="hidden lg:block" /> Tour Gear!
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Premium travel essentials curated for adventurers. From lightweight tents to durable footwear, equip yourself for unforgettable journeys.
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Large Product Card */}
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="group relative border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all"
                >
                    <div className="aspect-square bg-gray-100">
                        <img 
                            src={ecom1} 
                            alt="Portable Lightweight Tent" 
                            className="w-full h-full object-cover object-center" 
                        />
                    </div>
                    <div className="p-6 lg:p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Portable Lightweight Tent
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Weather-resistant 10x10 tent with quick-setup frame. Includes waterproof flooring and ventilation system.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 py-3 px-6 bg-[#4EDAE4] text-white rounded-lg font-medium hover:bg-[#3cb8c6] transition-colors">
                                View Details
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 px-6 border-2 border-[#4EDAE4] text-[#4EDAE4] rounded-lg font-medium hover:bg-[#4EDAE4]/10 transition-colors">
                                <FaShoppingCart className="text-lg" /> Add to Cart
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Small Product Cards */}
                <div className="grid gap-8">
                    {/* Sturdy Travel Bag */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="group relative flex flex-col md:flex-row border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all"
                    >
                        <div className="md:w-1/2 aspect-square bg-gray-100">
                            <img 
                                src={ecom2} 
                                alt="Sturdy Travel Bag" 
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        <div className="p-6 lg:p-8 md:w-1/2">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Adventure Backpack
                            </h2>
                            <p className="text-gray-600 mb-6">
                                45L capacity with ergonomic design. Water-resistant material with multiple compartments.
                            </p>
                            <div className="flex flex-col gap-4">
                                <button className="w-full py-3 px-6 bg-[#4EDAE4] text-white rounded-lg font-medium hover:bg-[#3cb8c6] transition-colors">
                                    View Details
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 py-3 px-6 border-2 border-[#4EDAE4] text-[#4EDAE4] rounded-lg font-medium hover:bg-[#4EDAE4]/10 transition-colors">
                                    <FaShoppingCart className="text-lg" /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Leather Boots */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="group relative flex flex-col md:flex-row border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all"
                    >
                        <div className="md:w-1/2 aspect-square bg-gray-100">
                            <img 
                                src={ecom3} 
                                alt="Leather Boots" 
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        <div className="p-6 lg:p-8 md:w-1/2">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Trekking Boots
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Waterproof leather boots with reinforced toe caps and anti-slip soles.
                            </p>
                            <div className="flex flex-col gap-4">
                                <button className="w-full py-3 px-6 bg-[#4EDAE4] text-white rounded-lg font-medium hover:bg-[#3cb8c6] transition-colors">
                                    View Details
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 py-3 px-6 border-2 border-[#4EDAE4] text-[#4EDAE4] rounded-lg font-medium hover:bg-[#4EDAE4]/10 transition-colors">
                                    <FaShoppingCart className="text-lg" /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Ecommerce;