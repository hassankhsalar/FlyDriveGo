import React, { useContext } from "react";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { TbBrandGithubFilled } from "react-icons/tb";
import { AuthContext } from "../Provider/AuthProvider";
const GitHubSignIn = () => {
  const { signInWithGitHub } = useContext(AuthContext);

  const handleGitHubSignIn = () => {
    signInWithGitHub()
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
        onClick={handleGitHubSignIn}
        className="bg-white rounded-full p-2 text-xl text-black"
      >
        <TbBrandGithubFilled />
      </button>
    </div>
  );
};

export default GitHubSignIn;
