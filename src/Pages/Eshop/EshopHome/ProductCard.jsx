import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";

const ProductCard = ({ product, user }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddtoCart = (item) => {
    if (user && user.email) {
      const cartItem = {
        itemId: product._id,
        email: user.email,
        name: product.title,
        price: product.price,
        image: product.photo,
        category: item.tags,
      };
      axiosSecure.post('/carts', cartItem)
        .then(res => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${product.title} added to your cart`,
              showConfirmButton: false,
              timer: 1500
            });
            refetch();
          }
        });
    } else {
      Swal.fire({
        title: "You are not logged In",
        text: "LogIn to add to cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition duration-300 flex flex-col">
      {/* Image Part */}
      <div className="relative">
        <img
          src={product.photo}
          alt={product.title}
          className="w-full h-48 object-cover bg-gray-100"
        />
        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddtoCart(product)}
          className="absolute top-2 right-2 bg-gray-200 text-gray-700 hover:bg-primary hover:text-white p-2 rounded-md transition"
          title="Add to Cart"
        >
          <FaShoppingCart className="text-lg" />
        </button>
      </div>

      {/* Content Part */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-gray-400 text-sm mb-1">Top Selling Product</p>

        <h3 
          className="font-semibold text-gray-800 text-[16px] leading-snug line-clamp-2 hover:text-primary cursor-pointer"
          onClick={handleViewDetails}
        >
          {product.title}
        </h3>

        {/* Pricing */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-primary font-bold text-lg">
            $ {product.price}
          </span>
          <span className="text-gray-400 line-through text-sm">
            $ {Math.round(product.price * 1.2)}
          </span>
        </div>

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="mt-auto text-primary text-sm font-semibold hover:underline transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
