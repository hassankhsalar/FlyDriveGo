import React from "react";

import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const GoggleSignIn = () => {
  const { signInWithGoggle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = () => {
    signInWithGoggle()
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
        onClick={handleGoogleSignIn}
        className="bg-black rounded-full p-2 text-xl"
      >
        <FcGoogle color="white"></FcGoogle>
      </button>
    </div>
  );
};

export default GoggleSignIn;
