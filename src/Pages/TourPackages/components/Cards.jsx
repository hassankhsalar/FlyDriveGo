import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";

const Cards = ({ tour }) => {
    console.log(tour.image);
    return (
      
            <div
                className="w-full shadow-md h-[350px] hover:scale-[1.05] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group">
                
                {/* Icons */}
                <div className="absolute top-0 left-0 opacity-100 z-[-1] group-hover:opacity-100 group-hover:z-[1] ease-out transition-all duration-300 flex items-center justify-between w-full p-[15px]">
                    <FaRegHeart className="text-[1.1rem] text-gray-600"/>
                    <div className="flex items-center gap-[5px]">
                        <MdOutlineTimer className="dark:text-orange-600 text-orange-700 text-[1.1rem]"/>
                        <p className="text-[1rem] text-orange-700">{tour.duration}</p>
                    </div>
                </div>

                {/* Image */}
                <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-[60%] object-cover group-hover:opacity-40 group-hover:h-full transition-all duration-300 ease-out"
                />

                {/* Texts */}
                <div className="absolute bottom-0 left-0 py-[20px]  px-[20px] w-full">
                   
                    <h3 className="text-[1rem] font-bold text-gray-900">
                        {tour.title}
                    </h3>
                    
                </div>
            </div>
       
    );
};

export default Cards;