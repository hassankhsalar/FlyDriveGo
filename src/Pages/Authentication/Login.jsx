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

const Login = () => {
  const { user, userLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(user);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    userLogin(email, password)
      .then(() => {
        e.target.reset();
        toast.success("Successfully Logged In");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Incorrect Email or Password");
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
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative border-b border-gray-300">
            <input
              type="email"
              name="email"
              required
              className="w-full bg-transparent outline-none placeholder:text-white text-white p-2"
              placeholder="Enter your email"
            />
            <label className="absolute left-0 top-2 text-gray-200 transition-all"></label>
          </div>
          <div className="relative border-b border-gray-300 ">
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
          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-white" /> Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-blue-300 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-white text-black font-bold py-2 px-4 rounded-full 
             hover:bg-gray-300 transition duration-300 ease-in-out"
          >
            Log In
          </button>
        </form>

        <p className="my-3">Or, Sign Up Using</p>
        <div className="flex gap-2 mx-auto items-center justify-center">
          <GoggleSignIn />
          <GitHubSignIn />
          <FacebookSignIn />
        </div>

        <p className="mt-4">
          Don't have an account ?
          <Link to="/register" className="text-blue-300 hover:underline pl-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
