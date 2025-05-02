import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";

const Cards = ({ tour }) => {
    return (
      <div className="w-full shadow-lg h-[350px] hover:scale-[1.02] transition-all duration-300 overflow-hidden rounded-lg relative cursor-pointer group ">
        {/* Icons */}
        <div className="absolute top-0 left-0 opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-[1] transition-all duration-300 flex items-center justify-between w-full p-4">
          <button aria-label="Add to favorites" className="p-2 hover:bg-[#DDF2D1] rounded-full transition-colors">
            <FaRegHeart className="text-lg text-[#333333] hover:text-[#4EDAE4]" />
          </button>
          <div className="flex items-center gap-2 bg-[#DDF2D1] px-3 py-1 rounded-full">
            <MdOutlineTimer className="text-[#4EDAE4] text-lg" />
            <p className="text-sm text-[#333333]">{tour.duration}</p>
          </div>
        </div>
  
        {/* Image with overlay */}
        <div className="relative h-[60%] group-hover:h-full transition-all duration-300">
          <img
            src={tour.image}
            alt={`${tour.title} tour preview`}
            className="w-full h-full object-cover group-hover:opacity-60 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/20 via-transparent to-transparent" />
        </div>
  
        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-4 space-y-2">
          <h4 className="text-md font-bold text-[#333333]">
            {tour.title}
          </h4>
          <p className="text-sm font-semibold text-[#4EDAE4]">
            {tour.price.currency} {(tour.price.per_person).toLocaleString()}
          </p>
          {/* todo show the discount */}
        </div>
      </div>
    );
  };

export default Cards;