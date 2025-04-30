import React, { useState, useEffect } from "react";
import logo from "/FlyDriveGo.png";

// react icons
import {
  FaShoppingCart,
  FaMapMarkerAlt,
  FaPlane,
  FaBus,
  FaCar,
} from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import { MdLaptopMac } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai";
import { BiShoppingBag, BiSupport } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import { IoSettingsOutline } from "react-icons/io5";

const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logOut } = useAuth();
  const [cart] = useCart();
  const location = useLocation();

  // Helper to check if a path is active
  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className="flex items-center z-20 justify-between relative font-red-rose pt-2 w-11/12 mx-auto">
      <div className="navbar-start">
        {/* logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-40 " />
        </Link>
      </div>

      <div className="navbar-center">
        {/* Desktop Navigation Links */}
        <ul className="items-center gap-[20px] text-[1rem] text-[#424242] xl:flex hidden">
          {/* Transportation Dropdown - Using hover */}
          <li className="group relative">
            <Link
              to="/transportation"
              className={`flex items-center gap-[5px] ${isActive("/transportation") ? "text-[#3B9DF8]" : "dark:text-[#4e585f] text-gray-600"} hover:text-[#3B9DF8]`}
            >
              <MdLaptopMac className="text-[1.1rem]" />
              Transportation
            </Link>

            {/* Transportation Mega Menu - Show on hover */}
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-[35px] left-0 bg-white rounded-md w-[300px] p-[20px] transition-all duration-200 shadow-md z-30">
              <div className="flex flex-col gap-[15px]">
                <h3 className="text-[1.1rem] text-gray-600 font-[500]">
                  Transportation Options
                </h3>

                <Link
                  to="/transportation/by-air"
                  className="flex items-center gap-[10px] hover:bg-gray-50 p-2 rounded-md"
                >
                  <FaPlane className="text-primary w-5 h-5" />
                  <div>
                    <h1 className="text-[1rem] text-gray-700 font-[500]">
                      By Air
                    </h1>
                    <p className="text-[0.9rem] text-gray-400 font-[300]">
                      Domestic & International flights
                    </p>
                  </div>
                </Link>

                <Link
                  to="/transportation/by-road"
                  className="flex items-center gap-[10px] hover:bg-gray-50 p-2 rounded-md"
                >
                  <FaBus className="text-primary w-5 h-5" />
                  <div>
                    <h1 className="text-[1rem] text-gray-700 font-[500]">
                      By Bus
                    </h1>
                    <p className="text-[0.9rem] text-gray-400 font-[300]">
                      Intercity & tour bus services
                    </p>
                  </div>
                </Link>

                <Link
                  to="/transportation/by-car"
                  className="flex items-center gap-[10px] hover:bg-gray-50 p-2 rounded-md"
                >
                  <FaCar className="text-primary w-5 h-5" />
                  <div>
                    <h1 className="text-[1rem] text-gray-700 font-[500]">
                      By Car
                    </h1>
                    <p className="text-[0.9rem] text-gray-400 font-[300]">
                      Rental cars & chauffeur service
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </li>

          {/* Tour Packages Dropdown - Using hover */}
          <li className="group relative">
            <Link
              to="/tour-pack"
              className={`flex items-center gap-[5px] ${isActive("/tour-pack") ? "text-[#3B9DF8]" : "dark:text-[#4e585f] text-gray-600"} hover:text-[#3B9DF8]`}
            >
              <BsCalendar2Date className="text-[1.1rem]" />
              Tour Packages
            </Link>

            {/* Tour Packages Mega Menu - Show on hover */}
            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-[35px] left-0 bg-white rounded-md w-[300px] p-[20px] transition-all duration-200 shadow-md z-30">
              <div className="flex flex-col gap-[15px]">
                <Link
                  to="/tour-pack"
                  className="flex items-center gap-[10px] hover:bg-gray-50 p-2 rounded-md"
                >
                  <img
                    src="https://i.ibb.co/LQBDJGD/icon-logo-container.png"
                    alt="image"
                    className="w-[30px] h-[30px]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h1 className="text-[1rem] text-gray-700 font-[500]">
                      All Tour Packages
                    </h1>
                    <p className="text-[0.9rem] text-gray-400">
                      Browse all available packages
                    </p>
                  </div>
                </Link>

                <Link
                  to="/tour-details/Bali: Paradise Island Escape"
                  className="flex items-center gap-[10px] hover:bg-gray-50 p-2 rounded-md"
                >
                  <FaMapMarkerAlt className="text-orange-500 w-5 h-5" />
                  <div>
                    <h1 className="text-[1rem] text-gray-700 font-[500]">
                      Bali Package
                    </h1>
                    <p className="text-[0.9rem] text-gray-400">
                      Paradise Island Escape
                    </p>
                  </div>
                </Link>

                <Link
                  to="/tour-details/Maldives: Tropical Paradise Getaway"
                  className="flex items-center gap-[10px] hover:bg-gray-50 p-2 rounded-md"
                >
                  <FaMapMarkerAlt className="text-blue-500 w-5 h-5" />
                  <div>
                    <h1 className="text-[1rem] text-gray-700 font-[500]">
                      Maldives Package
                    </h1>
                    <p className="text-[0.9rem] text-gray-400">
                      Tropical Paradise Getaway
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </li>

          {/* Other Main Links */}
          <li
            className={`flex items-center ${isActive("/visa-assistance") ? "text-[#3B9DF8]" : "text-gray-600"} hover:text-[#3B9DF8]`}
          >
            <AiOutlineFire className="text-[1.1rem] mr-1" />
            <Link to="/visa-assistance">Visa</Link>
          </li>

          <li className="flex items-center dark:text-[#4e585f] hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
            <BiShoppingBag className="text-[1.1rem] group-hover:text-[#3B9DF8] dark:text-[#4e585f] text-gray-600" />
            <Link to="/eshop">Shop</Link>
          </li>
          <li className="flex items-center dark:text-[#4e585f] hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
            <BiSupport className="text-[1.1rem] group-hover:text-[#3B9DF8] dark:text-[#4e585f] text-gray-600" />
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/mycart">
              <button className="btn">
                <FaShoppingCart></FaShoppingCart>{" "}
                <div className="badge badge-sm badge-secondary">
                  +{cart.length}
                </div>
              </button>
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {/* Login/Register Buttons */}
        {!user ? (
          <div className="flex items-center gap-3">
            <Link
              className="hover:text-[#3B9DF8] transition-colors"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="bg-primary text-white px-3 py-2 rounded-lg hover:bg-[#3cacff] transition-colors"
              to="/register"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="relative group">
            <div className="flex items-center gap-[10px] cursor-pointer">
              <div className="relative">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/150?img=3"}
                  alt="avatar"
                  className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
                  referrerPolicy="no-referrer"
                />
                <div className="p-[2px] bg-white absolute bottom-0 right-0 rounded-full">
                  <div className="w-[10px] h-[10px] rounded-full bg-green-400"></div>
                </div>
              </div>

              <span className="text-[1rem] text-gray-600 font-[400] sm:block hidden">
                {user?.displayName?.split(" ")[0] || "User"}
              </span>
              <div className=" dark:border-slate-700 border-gray-200">
                <p
                  onClick={() => {
                    logOut()
                      .then(() => {
                        toast.success("Log Out Successfully");
                      })
                      .catch(() => {
                        toast.error("An Error occurred While Log Out");
                      });
                  }}
                  className="flex items-center gap-[5px] rounded-md p-[8px]  py-[3px] text-[1rem] dark:text-red-500 dark:hover:bg-red-500/20 text-red-500 hover:bg-red-50"
                >
                  <TbLogout2 />
                  Logout
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <CiMenuFries
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-[1.8rem] text-[#424242] cursor-pointer flex ml-4"
        />

        {/* Mobile Sidebar Navigation */}
        <aside
          className={`${
            mobileSidebarOpen
              ? "translate-x-0 opacity-100 z-20"
              : "translate-x-full opacity-0 z-[-1]"
          }  bg-white p-6 text-left fixed top-[60px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300 shadow-lg`}
        >
          <ul className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase">
              Navigation
            </h3>

            <li>
              <Link
                to={`/my-profile/${user?.email}`}
                className="flex items-center gap-2 py-2 hover:text-primary"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <BsCalendar2Date className="text-primary" /> Profile
              </Link>
            </li>
            <li>
              <Link
                to='/dashboard'
                className="flex items-center gap-2 py-2 hover:text-primary"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <BsCalendar2Date className="text-primary" /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/transportation"
                className="flex items-center gap-2 py-2 hover:text-primary"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <MdLaptopMac className="text-primary" /> Transportation
              </Link>
              
            </li>

            <li>
              <Link
                to="/tour-pack"
                className="flex items-center gap-2 py-2 hover:text-primary"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <BsCalendar2Date className="text-primary" /> Tour Packages
              </Link>
            </li>

            <li>
              <Link
                to="/visa-assistance"
                className="flex items-center gap-2 py-2 hover:text-primary"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <AiOutlineFire className="text-primary" /> Visa Assistance
              </Link>
            </li>

            <li>
              <Link
                to="/eshop"
                className="flex items-center gap-2 py-2 hover:text-primary"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <BiShoppingBag className="text-primary" /> Shop
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="flex items-center gap-2 py-2 hover:text-primary"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <BiSupport className="text-primary" /> About
              </Link>
            </li>

            <li>
              <Link
                to="/mycart"
                className="flex items-center gap-2 py-2 hover:text-primary"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <FaShoppingCart className="text-primary" /> Cart{" "}
                {cart.length > 0 && `(${cart.length})`}
              </Link>
            </li>
          </ul>

          {!user && (
            <div className="mt-8 flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full text-center py-2 text-primary border border-primary rounded-lg hover:bg-primary/10"
                onClick={() => setMobileSidebarOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-2 text-white bg-primary rounded-lg hover:bg-primary/90"
                onClick={() => setMobileSidebarOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;
