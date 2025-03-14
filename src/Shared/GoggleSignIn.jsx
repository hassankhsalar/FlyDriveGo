import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const GoggleSignIn = () => {
  const { signInWithGoggle } = useContext(AuthContext);
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
    <div>
      <div className="flex items-center justify-center pb-1">
        <button
          onClick={handleGoogleSignIn}
          className="flex text-center items-center btn text-xl  rounded-lg w-full bg-white border-2 border-[#023E8A] text-[#023E8A]"
        >
          <FcGoogle></FcGoogle>
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default GoggleSignIn;
