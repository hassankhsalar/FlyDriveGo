import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";

const ProductCard = ({ product,user }) => {
  
  const navigate = useNavigate();
  const axiosSecure =  useAxiosSecure();
  const [,refetch]=useCart();


  const handleAddtoCart = item =>{
    if (user && user.email){
      // Add to cart
      const cartItem ={
        itemId: product._id,
        email: user.email,
        name: product.title,
        price:  product.price,
        image: product.photo,
      }
      axiosSecure.post('/carts', cartItem)
      .then(res =>{
        if(res.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${product.title} added to your cart`,
            showConfirmButton: false,
            timer: 1500
          });
          // refecth
          refetch();
        }
      })

    }
    else{
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
  }
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
            <button onClick={()=>handleAddtoCart(product)} className="py-2 px-6 bg-CharcoleDark text-slate-300 rounded-3xl font-poppins btn-block text-[18px]">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
