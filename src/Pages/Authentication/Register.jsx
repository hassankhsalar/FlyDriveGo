import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import GoggleSignIn from "../../Shared/GoggleSignIn";
import loginImage from "../../assets/Login/login-bg.jpg";
import GitHubSignIn from "../../Shared/GitHubSignIn";
import FacebookSignIn from "../../Shared/FacebookSignIn";
import { ImArrowUpLeft2 } from "react-icons/im";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    const axiosPublic = useAxiosPublic();
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photoURL = form.get("photo");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile({ displayName: name, photoURL });
        e.target.reset();

        const userInfo = {
          name,
          email,
          userType: "user",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log("user added successfully");
          navigate(location?.state ? location.state : "/");
        });
        toast.success("Successfully Registered!");
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Registration Failed");
      });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative font-poppins"
      style={{
        backgroundImage: `url(${loginImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-lg p-8 w-96 text-white text-center shadow-lg">
        <Link to={"/"}>
          <h3 className="text-white text-2xl font-bold">
            <ImArrowUpLeft2 />
          </h3>
        </Link>
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="relative border-b border-gray-300">
            <input
              type="text"
              name="name"
              required
              className="w-full bg-transparent outline-none placeholder:text-white text-white p-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="relative border-b border-gray-300">
            <input
              type="text"
              name="photo"
              required
              className="w-full bg-transparent outline-none placeholder:text-white text-white p-2"
              placeholder="Enter image URL"
            />
          </div>
          <div className="relative border-b border-gray-300">
            <input
              type="email"
              name="email"
              required
              className="w-full bg-transparent outline-none placeholder:text-white text-white p-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative border-b border-gray-300">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className="w-full bg-transparent outline-none placeholder:text-white text-white p-2"
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-0 top-2 text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-white text-black font-bold py-2 px-4 rounded-full 
             hover:bg-gray-300 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>

        <p className="my-3">Or, Sign Up Using</p>
        <div className="flex gap-2 mx-auto items-center justify-center">
          <GoggleSignIn />
          <GitHubSignIn />
          <FacebookSignIn />
        </div>

        <p className="mt-4">
          Already have an account ?
          <Link to="/login" className="text-blue-300 hover:underline pl-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
