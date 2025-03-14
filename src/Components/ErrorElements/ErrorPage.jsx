import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-SmokeWhite text-CharcoleDark font-red-rose">
      <h1 className="text-4xl font-bold mb-4">Oops! Page not found.</h1>
      <p className="text-lg mb-8">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md font-poppins hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
