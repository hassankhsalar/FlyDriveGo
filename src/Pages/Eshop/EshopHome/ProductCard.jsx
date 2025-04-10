import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div>
      <div className="card h-full bg-base-100 shadow-lg rounded-[8px] border-2 flex flex-col justify-between">
        <div className="card-body flex flex-col justify-between flex-grow">
          <figure>
            <img
              className="w-full h-[200px] object-cover rounded-[6px]"
              src={product.photo}
              alt={product.title}
            />
          </figure>
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-2xl font-poppins font-bold line-clamp-2">
              {product.title}
            </h2>
            <p className="font-poppins font-bold text-[16px]">
              Price: <span className="font-normal">{product.price} USD</span>
            </p>
          </div>
          <div className="mt-auto">
            <button className="py-2 px-6 bg-CharcoleDark text-slate-300 rounded-3xl font-poppins btn-block text-[18px]">
              View Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
