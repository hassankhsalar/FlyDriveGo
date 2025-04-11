import React from "react";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";

const DashboardWelcome = () => {
  const { user } = useAuth();
  const [userRole] = useUserRole();

  return (
    <div className="overflow-hidden">
      <div className="z-10 flex items-center justify-center min-h-screen bg-gray-100">
        <div
          className="relative w-full max-w-[700px] h-[300px] p-6 rounded-xl shadow-lg bg-gradient-to-r from-blue-200 via-pink-100 to-blue-300 
          border border-blue-300/30 backdrop-blur-sm mx-4"
        >
          {/* User Initial Circle */}
          <div
            className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 
            rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md"
          >
            {user?.displayName?.charAt(0) || "S"}
          </div>

          {/* Card Content */}
          <div className="mt-2 ">
            <h2 className="text-3xl font-semibold text-gray-800">
              Welcome back, {user?.displayName || "User"}!
            </h2>
            <p className="text-lg text-gray-500 mt-1">
              {user?.email || "No email available"}
            </p>
            {/* Display User Role */}
            <p className="text-lg text-gray-600 mt-2">
              <span className="font-medium">Your Role:</span>{" "}
              <span className="text-blue-600 capitalize">
                {userRole || "Not assigned"}
              </span>
            </p>
            <p className="text-lg text-gray-600 mt-3">
              Here's a quick overview of your dashboard. You can manage your
              projects, view analytics, or update your profile.
            </p>

            {/* Go to Home Button */}
            <div className="mt-6 flex justify-end">
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS to hide scroll bars */}
      <style jsx global>{`
        html,
        body {
          overflow: hidden;
        }
        /* Hide scrollbar for Chrome, Safari, and Opera */
        ::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for Firefox */
        html,
        body {
          scrollbar-width: none;
        }
        /* Hide scrollbar for Edge */
        html,
        body {
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
};

export default DashboardWelcome;
