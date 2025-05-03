import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaPlane, FaBus, FaCar, FaBox, FaShoppingBag, FaBriefcase, FaPassport, FaChartBar, FaUsers, FaTags, FaClipboardList } from "react-icons/fa";
import { BsBoxArrowInRight } from "react-icons/bs";
import useUserRole from "../../Hooks/useUserRole";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import toast from "react-hot-toast";

const DashBoard = () => {
  const navigate = useNavigate();
  const [userRole, roleLoading] = useUserRole();
  const { user, logOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between p-3 space-y-2 dark:text-gray-800 h-screen -mt-10 fixed">
      <div className="divide-y dark:divide-gray-300 flex flex-col justify-between h-full pt-10">
        <div className="overflow-y-auto pr-2 max-h-[70vh]">
          {/* Dashboard Main Navigation */}
          <div className="mb-6">
            <h3 className="text-xs uppercase text-gray-500 font-semibold px-4 mb-2">Dashboard</h3>
            <ul className="space-y-1 text-base font-poppins">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                >
                  <FaHome className="mr-3 text-gray-500" />
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/profile"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                >
                  <FaUser className="mr-3 text-gray-500" />
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Section - Visible to all users */}
          <div className="mb-6">
            <h3 className="text-xs uppercase text-gray-500 font-semibold px-4 mb-2">My Bookings</h3>
            <ul className="space-y-1 text-base font-poppins">
              <li>
                <Link
                  to="/dashboard/my-flights"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                >
                  <FaPlane className="mr-3 text-gray-500" />
                  Flight Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-buses"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                >
                  <FaBus className="mr-3 text-gray-500" />
                  Bus Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-cars"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                >
                  <FaCar className="mr-3 text-gray-500" />
                  Car Rentals
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-orders"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                >
                  <FaBox className="mr-3 text-gray-500" />
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-tours"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                >
                  <FaBriefcase className="mr-3 text-gray-500" />
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-visa"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                >
                  <FaPassport className="mr-3 text-gray-500" />
                  Visa Applications
                </Link>
              </li>
            </ul>
          </div>

          {/* Seller Section */}
          {userRole === "seller" && (
            <div className="mb-6">
              <h3 className="text-xs uppercase text-gray-500 font-semibold px-4 mb-2">Seller Dashboard</h3>
              <ul className="space-y-1 text-base font-poppins">
                <li>
                  <Link
                    to="/dashboard/seller-dashboard"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    <FaChartBar className="mr-3 text-gray-500" />
                    Seller Overview
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/add-products"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    <FaShoppingBag className="mr-3 text-gray-500" />
                    Add Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-products"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    <FaTags className="mr-3 text-gray-500" />
                    Manage Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/seller-orders"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    <FaClipboardList className="mr-3 text-gray-500" />
                    Orders
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Moderator Section */}
          {userRole === "moderator" && (
            <div className="mb-6">
              <h3 className="text-xs uppercase text-gray-500 font-semibold px-4 mb-2">Moderator Controls</h3>
              <ul className="space-y-1 text-base font-poppins">
                <li>
                  <Link
                    to="/dashboard/makeSeller"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    <FaUsers className="mr-3 text-gray-500" />
                    Manage Sellers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/addTourPackage"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    <FaBriefcase className="mr-3 text-gray-500" />
                    Add Tour Packages
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Admin Section */}
          {userRole === "admin" && (
            <div className="mb-6">
              <h3 className="text-xs uppercase text-gray-500 font-semibold px-4 mb-2">Admin Controls</h3>
              <ul className="space-y-1 text-base font-poppins">
                <li>
                  <Link
                    to="/dashboard/adminDashboard"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    <FaChartBar className="mr-3 text-gray-500" />
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-users"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    <FaUsers className="mr-3 text-gray-500" />
                    Manage Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-bookings"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    <FaClipboardList className="mr-3 text-gray-500" />
                    All Bookings
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* USER PROFILE SECTION */}
        <div>
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li>
              <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50">
                <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {user?.displayName?.charAt(0) || "U"}
                  </span>
                </div>
                <div>
                  <h2 className="text-sm font-bold truncate max-w-[100px]">
                    {user?.displayName || "User"}
                  </h2>
                  <p className="text-xs text-gray-600 truncate max-w-[100px]">
                    {user?.email || "Email"}
                  </p>
                </div>
                <span
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded-full"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <BsBoxArrowInRight size={16} />
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Sidebar Popup for Logout */}
      {isSidebarOpen && (
        <div className="fixed bottom-0 z-20 left-64 w-64 h-auto bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{user?.displayName || "User"}</h2>
            <button
              className="hover:bg-gray-200 p-1 rounded-full"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="text-gray-500 text-lg">✖</span>
            </button>
          </div>

          <div className="space-y-2">
            <button
              className="flex items-center gap-2 w-full p-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
              onClick={() => {
                logOut()
                  .then(() => {
                    toast.success("Logged out successfully");
                    navigate("/");
                  })
                  .catch(() => {
                    toast.error("An error occurred while logging out");
                  });
              }}
            >
              <HiArrowRightOnRectangle className="text-gray-500" />
              <span>Logout</span>
            </button>

            <Link to={"/"} className="block">
              <button className="flex items-center gap-2 w-full p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors">
                <FaHome className="text-gray-500" />
                <span>Back to Home</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
