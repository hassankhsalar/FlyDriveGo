import React from "react";

import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../Hooks/useAuth";

const GoggleSignIn = () => {
  const { signInWithGoggle } = useAuth();
  const handleGoogleSignIn = () => {
    signInWithGoggle()
      .then((res) => {
        toast.success("Sign In Successfully");
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
