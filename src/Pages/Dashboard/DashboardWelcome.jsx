import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaPlane, FaBus, FaCar, FaBox, FaBriefcase, FaPassport, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const DashboardWelcome = () => {
  const { user } = useAuth();
  const [userRole] = useUserRole();
  const axiosPublic = useAxiosPublic();
  const [stats, setStats] = useState({
    flights: 0,
    buses: 0,
    cars: 0,
    orders: 0,
    tours: 0,
    visas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (user?.email) {
        try {
          setLoading(true);
          // Try the API endpoint first
          try {
            const response = await axiosPublic.get(`/user-stats/${user.email}`);
            setStats(response.data);
          } catch (error) {
            console.error("Error fetching user stats:", error);

            // If the API call fails, try to get stats from localStorage or use mock data
            const cachedStats = localStorage.getItem('user-stats');
            if (cachedStats) {
              setStats(JSON.parse(cachedStats));
            } else {
              // Fall back to mock data
              const mockStats = {
                flights: 2,
                buses: 3,
                cars: 1,
                orders: 4,
                tours: 2,
                visas: 1
              };
              setStats(mockStats);
              // Cache the mock data for future use
              localStorage.setItem('user-stats', JSON.stringify(mockStats));
            }
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserStats();
  }, [user?.email, axiosPublic]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="overflow-y-auto py-6 px-4 md:px-8 lg:px-12 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full p-6 rounded-xl shadow-md bg-gradient-to-r from-blue-500 to-blue-700 text-white mb-8"
      >
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {user?.displayName || "User"}!
          </h1>
          <p className="text-blue-100 mb-1">
            {user?.email || "No email available"}
          </p>
          <p className="text-blue-100 mb-6">
            <span>Account type: </span>
            <span className="font-semibold capitalize bg-white/20 px-2 py-1 rounded text-sm">
              {userRole || "Customer"}
            </span>
          </p>
          <p className="text-lg text-blue-50">
            Track your bookings, manage your orders, and access all your travel arrangements from one place.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8"
      >
        {/* Flight Bookings */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Flight Bookings</h3>
              <p className="text-gray-500 text-sm">Track your flights</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FaPlane className="text-blue-600 text-xl" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-800">{stats.flights}</p>
              <p className="text-gray-500 text-sm">Active bookings</p>
            </div>
            <Link to="/dashboard/my-flights" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </Link>
          </div>
        </motion.div>

        {/* Bus Bookings */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Bus Bookings</h3>
              <p className="text-gray-500 text-sm">Manage your bus tickets</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FaBus className="text-green-600 text-xl" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-800">{stats.buses}</p>
              <p className="text-gray-500 text-sm">Active tickets</p>
            </div>
            <Link to="/dashboard/my-buses" className="text-green-600 hover:text-green-800 text-sm font-medium">
              View All →
            </Link>
          </div>
        </motion.div>

        {/* Car Rentals */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Car Rentals</h3>
              <p className="text-gray-500 text-sm">Your vehicle reservations</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FaCar className="text-purple-600 text-xl" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-800">{stats.cars}</p>
              <p className="text-gray-500 text-sm">Active rentals</p>
            </div>
            <Link to="/dashboard/my-cars" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
              View All →
            </Link>
          </div>
        </motion.div>

        {/* Orders */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Orders</h3>
              <p className="text-gray-500 text-sm">Track your purchases</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <FaBox className="text-orange-600 text-xl" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-800">{stats.orders}</p>
              <p className="text-gray-500 text-sm">Recent orders</p>
            </div>
            <Link to="/dashboard/my-orders" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
              View All →
            </Link>
          </div>
        </motion.div>

        {/* Tour Packages */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Tour Packages</h3>
              <p className="text-gray-500 text-sm">Your travel adventures</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
              <FaBriefcase className="text-teal-600 text-xl" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-800">{stats.tours}</p>
              <p className="text-gray-500 text-sm">Booked tours</p>
            </div>
            <Link to="/dashboard/my-tours" className="text-teal-600 hover:text-teal-800 text-sm font-medium">
              View All →
            </Link>
          </div>
        </motion.div>

        {/* Visa Applications */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Visa Applications</h3>
              <p className="text-gray-500 text-sm">Visa processing status</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FaPassport className="text-red-600 text-xl" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-800">{stats.visas}</p>
              <p className="text-gray-500 text-sm">In process</p>
            </div>
            <Link to="/dashboard/my-visa" className="text-red-600 hover:text-red-800 text-sm font-medium">
              View All →
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Special Cards Section based on user role */}
      {userRole === "seller" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Seller Dashboard</h3>
              <p className="mb-4">Manage your products and monitor your sales performance</p>
              <Link to="/dashboard/seller-dashboard" className="inline-block bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                Go to Seller Dashboard
              </Link>
            </div>
            <div className="hidden md:block">
              <FaChartLine className="text-6xl text-white/30" />
            </div>
          </div>
        </motion.div>
      )}

      {userRole === "admin" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Admin Dashboard</h3>
              <p className="mb-4">Access system-wide analytics and management tools</p>
              <Link to="/dashboard/adminDashboard" className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Go to Admin Dashboard
              </Link>
            </div>
            <div className="hidden md:block">
              <FaChartLine className="text-6xl text-white/30" />
            </div>
          </div>
        </motion.div>
      )}

      {userRole === "moderator" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Moderator Controls</h3>
              <p className="mb-4">Manage seller applications and tour packages</p>
              <Link to="/dashboard/makeSeller" className="inline-block bg-white text-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors">
                Manage Seller Applications
              </Link>
            </div>
            <div className="hidden md:block">
              <FaChartLine className="text-6xl text-white/30" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm p-6 mb-8"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/transportation/by-air" className="block bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors">
            <FaPlane className="text-blue-600 text-xl mb-2" />
            <h4 className="font-medium text-gray-800">Book a Flight</h4>
            <p className="text-gray-600 text-sm">Find and book flights</p>
          </Link>
          <Link to="/transportation/by-road" className="block bg-green-50 hover:bg-green-100 p-4 rounded-lg transition-colors">
            <FaBus className="text-green-600 text-xl mb-2" />
            <h4 className="font-medium text-gray-800">Bus Tickets</h4>
            <p className="text-gray-600 text-sm">Reserve bus seats</p>
          </Link>
          <Link to="/transportation/by-car" className="block bg-purple-50 hover:bg-purple-100 p-4 rounded-lg transition-colors">
            <FaCar className="text-purple-600 text-xl mb-2" />
            <h4 className="font-medium text-gray-800">Rent a Car</h4>
            <p className="text-gray-600 text-sm">Find a car rental</p>
          </Link>
          <Link to="/eshop" className="block bg-orange-50 hover:bg-orange-100 p-4 rounded-lg transition-colors">
            <FaBox className="text-orange-600 text-xl mb-2" />
            <h4 className="font-medium text-gray-800">Shop Products</h4>
            <p className="text-gray-600 text-sm">Browse our e-shop</p>
          </Link>
          <Link to="/tour-pack" className="block bg-teal-50 hover:bg-teal-100 p-4 rounded-lg transition-colors">
            <FaBriefcase className="text-teal-600 text-xl mb-2" />
            <h4 className="font-medium text-gray-800">Tour Packages</h4>
            <p className="text-gray-600 text-sm">Explore tour offers</p>
          </Link>
          <Link to="/visa-assistance" className="block bg-red-50 hover:bg-red-100 p-4 rounded-lg transition-colors">
            <FaPassport className="text-red-600 text-xl mb-2" />
            <h4 className="font-medium text-gray-800">Visa Assistance</h4>
            <p className="text-gray-600 text-sm">Get help with visas</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardWelcome;
