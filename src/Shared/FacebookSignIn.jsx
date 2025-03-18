import React from "react";

import toast from "react-hot-toast";
import { FaFacebookF } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";

const FacebookSignIn = () => {
  const {} = useAuth();
  const handleFacebookSignIn = () => {
    signInWithFacebook()
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
        onClick={handleFacebookSignIn}
        className="bg-[#1877F2] rounded-full p-2 text-xl"
      >
        <FaFacebookF color="white" />
      </button>
    </div>
  );
};

export default FacebookSignIn;
