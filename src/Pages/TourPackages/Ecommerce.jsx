import React from 'react';
import ecom1 from "../../assest-tourPack/ecom1.jpg";
import { FaShoppingCart } from "react-icons/fa";
import ecom2 from "../../assest-tourPack/ecom2.jpg";
import ecom3 from "../../assest-tourPack/ecom3.jpg";

const Ecommerce = () => {
    return (
        <div>
        
            <div className="mt-20 w-11/12 mx-auto">
             {/* heading section */}
            <div className='px-20'>
                <p className='text-xs text-text text-center mt-10'>Ecommerce</p>
                <h1 style={{ color: '#4EDAE4' }} className='font-extrabold text-3xl text-center '>Travel Smart – Shop Essential <br /> Tour Gear!</h1>
                <p className='text-sm text-text text-center mb-10 lg:px-20'>Find top-quality travel essentials, from backpacks to camping gear, all in one place. Gear up for your next adventure with the best equipment for a smooth and hassle-free journey!</p>
            </div>
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="w-full lg:w-1/2 border-2 border-slate-300">
                        <div className="h-1/2">
                            <img src={ecom1} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-10/12 mx-auto h-1/2 flex flex-col justify-between py-4">
                            <h1 className="font-red-rose font-bold text-4xl py-3">
                                Portable Lightweight Tent
                            </h1>
                            <p className="font-poppins font-normal text-base pb-4">
                                Its a 10x10 size portable tent. Its waterproof and it has cusion
                                underneath for extra comfort.comes with 19 skeleton sticks, Really
                                Easy to setup.
                            </p>
                            <div className="flex items-center gap-4 pb-4">
                                <button className="px-2 py-1 border-2 rounded-xl text-slate-700 outline-slate-700 hover:scale-105 hover:bg-slate-300 hover:text-white">
                                    View Details
                                </button>
                                <button className="flex items-center gap-1 px-2 py-1 border-2 rounded-xl text-slate-700 outline-slate-700">
                                    Add to Cart <FaShoppingCart />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 h-full">
                        <div className="h-1/2 flex flex-col md:flex-row gap-4 mb-2 border-2 border-slate-300">
                            <img src={ecom2} alt="" className="w-full md:w-[320px] h-full" />
                            <div className="w-10/12 mx-auto flex flex-col justify-between">
                                <h1 className="font-red-rose font-bold text-4xl py-2">
                                    Sturdy Travel Bag
                                </h1>
                                <p className="font-poppins font-normal text-base py-2">
                                    Lucrative strong travel bag with capacity large enough for
                                    essentials!
                                </p>
                                <div className="flex items-center gap-4 pb-4">
                                    <button className="px-2 py-1 border-2 rounded-xl text-slate-700 outline-slate-700">
                                        View Details
                                    </button>
                                    <button className="flex items-center gap-1 px-2 py-1 border-2 rounded-xl text-slate-700 outline-slate-700">
                                        Add to Cart <FaShoppingCart />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="h-1/2 flex flex-col md:flex-row gap-4 mb-2 border-2 border-slate-300">
                            <img src={ecom3} alt="" className="w-full md:w-[320px] h-full" />
                            <div className="w-10/12 mx-auto flex flex-col justify-between">
                                <h1 className="font-red-rose font-bold text-4xl py-2">
                                    Leather Boots
                                </h1>
                                <p className="font-poppins font-normal text-base py-2">
                                    Strong boots that will protect your feet from all the dangerous path ahead!
                                </p>
                                <div className="flex items-center gap-4 pb-4">
                                    <button className="px-2 py-1 border-2 rounded-xl text-slate-700 outline-slate-700">
                                        View Details
                                    </button>
                                    <button className="flex items-center gap-1 px-2 py-1 border-2 rounded-xl text-slate-700 outline-slate-700">
                                        Add to Cart <FaShoppingCart />
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