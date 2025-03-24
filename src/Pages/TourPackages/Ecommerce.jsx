import React from 'react';
import ecom1 from "../../assest-tourPack/ecom1.jpg";
import { FaShoppingCart } from "react-icons/fa";
import ecom2 from "../../assest-tourPack/ecom2.jpg";
import ecom3 from "../../assest-tourPack/ecom3.jpg";

const Ecommerce = () => {
    return (
        <div className="mt-20 w-11/12 mx-auto">
            {/* Heading Section */}
            <div className="px-4 lg:px-20">
                <p className="text-xs text-gray-500 text-center mt-10">Ecommerce</p>
                <h1 style={{ color: '#4EDAE4' }} className="font-extrabold text-2xl md:text-3xl text-center">
                    Travel Smart – Shop Essential <br /> Tour Gear!
                </h1>
                <p className="text-sm text-gray-600 text-center mb-10 lg:px-20">
                    Find top-quality travel essentials, from backpacks to camping gear, all in one place. Gear up for your next adventure with the best equipment for a smooth and hassle-free journey!
                </p>
            </div>

            {/* Product Grid */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Large Product Card */}
                <div className="w-full lg:w-1/2 border-2 border-slate-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
                    <div className="h-64 md:h-80">
                        <img src={ecom1} alt="Portable Lightweight Tent" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-10/12 mx-auto py-6">
                        <h1 className="font-red-rose font-bold text-2xl md:text-3xl py-2 text-gray-800">
                            Portable Lightweight Tent
                        </h1>
                        <p className="font-poppins font-normal text-sm md:text-base pb-4 text-gray-600">
                            It's a 10x10 size portable tent. It's waterproof and has a cushion underneath for extra comfort. Comes with 19 skeleton sticks, really easy to set up.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 pb-4">
                            <button className="w-full sm:w-auto px-4 py-2 border-2 border-[#4EDAE4] rounded-xl text-[#4EDAE4] hover:bg-[#4EDAE4] hover:text-white transition-all duration-300">
                                View Details
                            </button>
                            <button className="w-full sm:w-auto flex items-center justify-center gap-1 px-4 py-2 border-2 border-[#4EDAE4] rounded-xl text-[#4EDAE4] hover:bg-[#4EDAE4] hover:text-white transition-all duration-300">
                                Add to Cart <FaShoppingCart />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Small Product Cards */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    {/* Sturdy Travel Bag */}
                    <div className="flex flex-col md:flex-row border-2 border-slate-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white gap-2">
                        <div className="w-full md:w-1/2 h-48 md:h-auto">
                            <img src={ecom2} alt="Sturdy Travel Bag" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-10/12 mx-auto py-6">
                            <h1 className="font-red-rose font-bold text-2xl md:text-3xl py-2 text-gray-800">
                                Sturdy Travel Bag
                            </h1>
                            <p className="font-poppins font-normal text-sm md:text-base pb-4 text-gray-600">
                                Lucrative strong travel bag with capacity large enough for essentials!
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4 pb-4">
                                <button className="w-full sm:w-auto px-4 py-2 border-2 border-[#4EDAE4] rounded-xl text-[#4EDAE4] hover:bg-[#4EDAE4] hover:text-white transition-all duration-300">
                                    View Details
                                </button>
                                <button className="w-full sm:w-auto flex items-center justify-center gap-1 px-4 py-2 border-2 border-[#4EDAE4] rounded-xl text-[#4EDAE4] hover:bg-[#4EDAE4] hover:text-white transition-all duration-300">
                                    Add to Cart <FaShoppingCart />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Leather Boots */}
                    <div className="flex flex-col md:flex-row border-2 border-slate-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white gap-2">
                        <div className="w-full md:w-1/2 h-48 md:h-auto">
                            <img src={ecom3} alt="Leather Boots" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-10/12 mx-auto py-6">
                            <h1 className="font-red-rose font-bold text-2xl md:text-3xl py-2 text-gray-800">
                                Leather Boots
                            </h1>
                            <p className="font-poppins font-normal text-sm md:text-base pb-4 text-gray-600">
                                Strong boots that will protect your feet from all the dangerous paths ahead!
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4 pb-4">
                                <button className="w-full sm:w-auto px-4 py-2 border-2 border-[#4EDAE4] rounded-xl text-[#4EDAE4] hover:bg-[#4EDAE4] hover:text-white transition-all duration-300">
                                    View Details
                                </button>
                                <button className="w-full sm:w-auto flex items-center justify-center gap-1 px-4 py-2 border-2 border-[#4EDAE4] rounded-xl text-[#4EDAE4] hover:bg-[#4EDAE4] hover:text-white transition-all duration-300">
                                    Add to Cart <FaShoppingCart />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ecommerce;