import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaImage } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import GoggleSignIn from "../../Shared/GoggleSignIn";
import loginImage from "../../assets/Login/login-bg.jpg";
import FacebookSignIn from "../../Shared/FacebookSignIn";
import { ImArrowUpLeft2 } from "react-icons/im";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const uploadImage = async (file) => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Upload failed:", error);
    toast.error("Image upload failed. Please try again.");
    return null;
  }
};

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showSellerPopup, setShowSellerPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    let photoURL = null;
    if (!imageFile) {
      toast.error("Please select an image to upload.");
      return;
    }
    photoURL = await uploadImage(imageFile);
    if (!photoURL) return;

    try {
      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });

      const userInfo = {
        name,
        email,
        photoURL,
        userType: "user",
      };

      await axiosPublic.post("/users", userInfo);

      e.target.reset();
      toast.success("Successfully Registered!");
      setShowSellerPopup(true); // Show popup after successful registration
    } catch (err) {
      setError(err.message);
      toast.error("Registration Failed");
    }
  };

  const handleSellerChoice = (becomeSeller) => {
    setShowSellerPopup(false);
    if (becomeSeller) {
      navigate("/becomeseller");
    } else {
      navigate(location?.state ? location.state : "/");
    }
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
          {/* ... form fields remain the same ... */}
          <div className="relative border-b border-gray-300">
            <input
              type="text"
              name="name"
              required
              className="w-full bg-transparent outline-none placeholder:text-white text-white p-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex gap-2 items-center border-b border-gray-300 p-2">
            <label className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="overflow-hidden border-2 border-gray-300 flex items-center justify-center text-2xl rounded-full bg-gray-200 p-1 text-gray-600">
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Profile"
                    className="w-5 h-5 object-cover p-0"
                  />
                ) : (
                  <span className="text-gray-500">
                    <FaImage />
                  </span>
                )}
              </div>
            </label>
            <p className="text-sm text-white">Upload Your Profile Image</p>
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

        {/* ... rest of the component remains the same ... */}
      </div>

      {/* Seller Popup */}
      {showSellerPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg text-black">
            <h3 className="text-xl font-bold mb-4">Become a Seller?</h3>
            <p className="mb-6">
              Would you like to become a seller on our platform?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleSellerChoice(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => handleSellerChoice(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
