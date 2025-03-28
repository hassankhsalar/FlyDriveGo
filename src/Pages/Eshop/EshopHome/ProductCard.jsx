import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-lg rounded-[8px] border-2">
        <div className="card-body">
          <figure>
            <img
              className="w-full h-[200px] object-cover rounded-[6px]"
              src={product.photo}
              alt={product.title}
            />
          </figure>
          <div className="flex justify-between mt-[15px]">
            <h2 className="text-3xl font-poppins font-bold">{product.title}</h2>
          </div>
         <div>
            <p className="font-poppins font-bold text-[16px]">Price: <span className="font-normal">{ product.price} USD</span></p>
         </div>
          <div className="mt-6">
            <button className="py-1 px-6 bg-CharcoleDark text-slate-300 rounded-3xl font-poppins btn-block text-[18px]">View Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
