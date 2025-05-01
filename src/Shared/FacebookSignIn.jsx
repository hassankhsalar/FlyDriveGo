import React from "react";

import toast from "react-hot-toast";
import { FaFacebookF } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const FacebookSignIn = () => {
  const { signInWithFacebook } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const handleFacebookSignIn = () => {
    signInWithFacebook()
      .then((res) => {
        const userInfo = {
          email: res.user.email,
          name: res.user.displayName,
          photoURL: res.user.photoURL,
          userType: "user",
        };
        axiosPublic.post("/users", userInfo).then(() => {
          // Navigate to the previous location or home if none exists
          const from = location.state?.from || "/";
          navigate(from);
          toast.success("Sign In Successfully");
        });
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
  };

  return (
    <div className="flex items-center justify-center pb-1">
      <button
        onClick={handleFacebookSignIn}
        className="bg-[#1877F2] rounded-full p-2 text-xl"
      >
        <FaFacebookF color="white" />
      </button>
    </div>
  );
};

export default FacebookSignIn;
