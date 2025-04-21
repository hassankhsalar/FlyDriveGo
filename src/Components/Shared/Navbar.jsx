import React, { useState } from "react";
import logo from "/FlyDriveGo.png";

// react icons
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { TbLogout2, TbUsersGroup } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import {
  MdLaptopMac,
  MdOutlineArrowRightAlt,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsBuildings, BsCalendar2Date } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai";
import { BiShoppingBag, BiSupport } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isProductHover, setIsProductHover] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMegaMenuCollapse, setIsMegaMenuCollapse] = useState(false);
  const [megaMenuSubItemsOpen, setMegaMenuSubItemsOpen] = useState("");
  const { user, logOut } = useAuth();
  const [cart] = useCart();

  return (
    <nav className="flex items-center justify-between relative font-red-rose pt-2 w-11/12 mx-auto">
      {/* logo */}
      <Link to="/">
        <img src={logo} alt="logo" className="w-40 " />
      </Link>

      {/* nav links */}
      <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
        {/* product megamenu */}
        <li
          className={`${
            isProductHover
              ? "text-[#3B9DF8]"
              : "dark:text-[#4e585f] text-gray-600"
          } flex items-center gap-[5px] cursor-pointer`}
          onMouseEnter={() => setIsProductHover(true)}
          onMouseLeave={() => setIsProductHover(false)}
        >
          <MdLaptopMac className="text-[1.1rem] " />
          Transportation
          <IoIosArrowUp
            className={`${
              isProductHover ? "rotate-0" : "rotate-[-180deg]"
            } transition-all duration-300`}
          />
          {/* mega menu */}
          <div
            className={`${
              isProductHover
                ? "translate-y-0 opacity-100 z-30"
                : "translate-y-[20px] opacity-0 z-[-1]"
            } bg-white rounded-md w-[400px] absolute top-[40px] dark:bg-slate-800 left-0 p-[30px] transition-all duration-300 boxShadow flex flex-wrap gap-[30px]`}
          >
            <div className="grid grid-cols-2 gap-[30px]">
              <div className="flex flex-col gap-[20px]">
                <h3 className="text-[1.2rem] dark:text-[#abc2d3] text-gray-500 font-[500]">
                  More Products
                </h3>

                <div className="flex float-start gap-[10px] group">
                  <img
                    src="https://i.ibb.co/LQBDJGD/icon-logo-container.png"
                    alt="image"
                    className="w-[30px] h-[30px]"
                  />

                  <div>
                    <h1 className="text-[1rem] dark:text-[#abc2d3] text-gray-600 font-[500]">
                      Tour Packages
                    </h1>
                    <p className="text-[0.9rem] dark:text-slate-400 text-gray-400 font-[300]">
                      List of exciting new tour packages!
                    </p>

                    <button className="text-[#FF5E5E] mt-2 flex items-center gap-[4px] text-[0.9rem]">
                      <Link to="/tour-pack">Go</Link>
                      <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                    </button>
                  </div>
                </div>
                <div className="flex float-start gap-[10px] group">
                  <img
                    src="https://i.ibb.co/Y8cRWRj/icon-logo-container-1.png"
                    alt="image"
                    className="w-[30px] h-[30px]"
                  />

                  <div>
                    <h1 className="text-[1rem] dark:text-[#abc2d3] text-gray-600 font-[500]">
                      Transportation
                    </h1>
                    <p className="text-[0.9rem] dark:text-slate-400 text-gray-400 font-[300]">
                      Pick the transport of your choice here!
                    </p>

                    <button className="text-[#FE9239] mt-2 flex items-center gap-[4px] text-[0.9rem]">
                      <Link to="/transportation">Go</Link>
                      <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                    </button>
                  </div>
                </div>
                <div className="flex float-start gap-[10px] group">
                  <img
                    src="https://i.ibb.co/6bGWgp6/icon-logo-container-2.png"
                    alt="image"
                    className="w-[30px] h-[30px]"
                  />

                  <div>
                    <h1 className="text-[1rem] text-gray-600 font-[500] dark:text-[#abc2d3]">
                      Career
                    </h1>
                    <p className="text-[0.9rem] dark:text-slate-400 text-gray-400 font-[300]">
                      Check for openings
                    </p>

                    <button className="text-[#8B5CF6] mt-2 flex items-center gap-[4px] text-[0.9rem]">
                      <Link to="careers">Check here</Link>
                      <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                    </button>
                  </div>
                </div>
              </div>
              
            </div>

          </div>
        </li>

        <li className="flex items-center dark:text-[#4e585f] hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
          <AiOutlineFire className="text-[1.1rem] group-hover:text-[#3B9DF8] dark:text-[#4e585f] text-gray-600" />
          <Link to="/visa-assistance">Visa</Link>
        </li>
        <li className="flex items-center dark:text-[#4e585f] hover:text-[#3B9DF8] group gap-[5px] cursor-pointer">
          <BiShoppingBag className="text-[1.1rem] group-hover:text-[#3B9DF8] dark:text-[#4e585f] text-gray-600" />
          <Link to="eshop">Shop</Link>
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

      {/* user account */}
      <div className="flex items-center gap-[15px]">
        {user ? (
          <></>
        ) : (
          <>
            <Link
              className="flex items-center dark:text-[#4e585f] hover:text-[#3B9DF8] group gap-[5px] cursor-pointer"
              to="/login"
            >
              Login
            </Link>{" "}
            <Link
              className="flex items-center dark:text-[#4e585f] hover:text-[#3B9DF8] group gap-[5px] cursor-pointer bg-primary text-white p-2 rounded-xl"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
        <div
          className="flex items-center gap-[10px] cursor-pointer relative"
          onClick={() => setAccountMenuOpen(!accountMenuOpen)}
        >
          <div className="relative">
            {user ? (
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-[38px] h-[38px] rounded-full object-cover"
              />
            ) : null}

            <div className="p-[2px] bg-white absolute top-[0px] right-0 rounded-full">
              <div className="w-[12px] h-[12px] rounded-full bg-green-400 "></div>
            </div>
          </div>

          <h1 className="text-[1rem] dark:text-[#4e585f] font-[400] text-gray-600 sm:block hidden">
            {user?.displayName}
          </h1>

          <div
            className={`${
              accountMenuOpen
                ? "translate-y-0 opacity-100 z-[1]"
                : "translate-y-[10px] opacity-0 z-[-1]"
            } bg-white w-max rounded-md absolute dark:bg-slate-800 top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
          >
            <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600 hover:bg-gray-50">
              <FiUser />
              View Profile
            </p>
            <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600 hover:bg-gray-50">
              <IoSettingsOutline />
              Settings
            </p>
            <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600 hover:bg-gray-50">
              <FiUser />

              <Link to="/dashboard">Dashboard</Link>
            </p>

            <div className="mt-3 border-t dark:border-slate-700 border-gray-200 pt-[5px]">
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
                className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-red-500 dark:hover:bg-red-500/20 text-red-500 hover:bg-red-50"
              >
                <TbLogout2 />
                Logout
              </p>
            </div>
          </div>

          <IoIosArrowUp
            className={`${
              accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
            } transition-all duration-300 dark:text-[#abc2d3] text-gray-600 sm:block hidden`}
          />
        </div>

        <CiMenuFries
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-[1.8rem] dark:text-[#abc2d3] text-[#424242]c cursor-pointer md:hidden flex"
        />
      </div>

      {/* mobile sidebar */}
      <aside
        className={` ${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "translate-x-full opacity-0 z-[-1]"
        } md:hidden bg-white p-4 text-center fixed dark:bg-slate-700 top-[55px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300`}
      >
        <ul className="items-start gap-[20px] text-[1rem] text-gray-600 flex flex-col">
          <li
            onClick={() => setIsMegaMenuCollapse(!isMegaMenuCollapse)}
            className="hover:text-[#3B9DF8] group dark:text-[#abc2d3] transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]"
          >
            Products
            <IoIosArrowDown
              className={`${
                isMegaMenuCollapse ? "rotate-0" : "rotate-[180deg]"
              } text-gray-600 group-hover:text-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-300`}
            />
          </li>

          {/* product mega menu */}
          <div
            onClick={() => setMegaMenuSubItemsOpen("more_product")}
            className={`${
              isMegaMenuCollapse ? "hidden" : "block"
            } group font-[500] ml-6`}
          >
            <h4 className="text-left flex dark:text-[#abc2d3] items-center gap-[5px]">
              More Products
              <MdOutlineKeyboardArrowRight className="text-[1.2rem]" />
            </h4>

            <ul
              className={`${
                megaMenuSubItemsOpen === "more_product" ? "flex" : "hidden"
              } pl-6 mt-3 font-[400] items-start flex-col gap-[10px] text-gray-600`}
            >
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer dark:text-[#abc2d3] capitalize">
                Demo App
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer dark:text-[#abc2d3] capitalize">
                CRM
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer dark:text-[#abc2d3] capitalize">
                CMS
              </li>
            </ul>
          </div>

          <div
            onClick={() => setMegaMenuSubItemsOpen("ecosystem")}
            className={`${
              isMegaMenuCollapse ? "hidden" : "block"
            } font-[500] ml-6`}
          >
            <h4 className="text-left flex dark:text-[#abc2d3] items-center gap-[5px]">
              Ecosystem
              <MdOutlineKeyboardArrowRight className="text-[1.2rem]" />
            </h4>

            <ul
              className={`${
                megaMenuSubItemsOpen === "ecosystem" ? "flex" : "hidden"
              } pl-6 mt-3 font-[400] items-start flex-col gap-[10px] text-gray-600`}
            >
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer dark:text-[#abc2d3] capitalize">
                Directory
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer dark:text-[#abc2d3] capitalize">
                Bookings
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer dark:text-[#abc2d3] capitalize">
                User feedback
              </li>
              <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer dark:text-[#abc2d3] capitalize">
                Task Manager
              </li>
            </ul>
          </div>

          <li className="hover:text-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-500 cursor-pointer capitalize">
            Features
          </li>
          <li className="hover:text-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-500 cursor-pointer capitalize">
            Support
          </li>
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
