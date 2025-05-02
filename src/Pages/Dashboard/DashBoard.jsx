import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BsBoxArrowInRight } from "react-icons/bs";
import useUserRole from "../../Hooks/useUserRole";
import logo from "/FlyDriveGo.png";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

const DashBoard = () => {
  const navigate = useNavigate();
  const [userRole] = useUserRole();
  const { user, logOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between p-3 space-y-2 dark:text-gray-800 h-screen -mt-10 fixed">
      {/* <Link to="/">
        <img src={logo} alt="logo" className="w-36 p-4" />
      </Link> */}
      <div className="divide-y dark:divide-gray-300 flex flex-col justify-between h-full pt-10">
        <div>
          <ul className="p-4 space-y-3 text-base font-poppins">
            {userRole === "user" && (
              <>
                <li>
                  <Link to="/dashboard/adminDashboard">Admin Dashboard</Link>
                </li>
                <li>
                  <Link to="/dashboard/addTourPackage">Add Tour Packages</Link>
                </li>
                <li>
                  <Link to="/dashboard/add-products">Add Products</Link>
                </li>
              </>
            )}
            {userRole === "admin" && (
              <li>
                <Link to="/dashboard/adminDashboard">Admin Dashboard</Link>
              </li>
            )}
            {userRole === "moderator" && (
              <>
                <li>
                  <Link to="/dashboard/addTourPackage">Add Tour Packages</Link>
                </li>

                <li>
                  <Link to="/dashboard/makeSeller">Make Seller</Link>
                </li>
              </>
            )}
            {userRole === "seller" && (
              <>
                <li>
                  <Link to="/dashboard/add-products">Add Products</Link>
                </li>
                <li>
                  <Link>Seller</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* HOME & LOGOUT BUTTONS */}
        <div>
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {user?.displayName?.charAt(0) || "S"}
                  </span>
                </div>
                <div>
                  <h2 className="text-sm font-bold">
                    {user?.displayName || "Name"}!
                  </h2>
                  <p className="text-sm text-gray-600">
                    {user?.email || "Email"}
                  </p>
                </div>
                <span
                  className="cursor-pointer"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <BsBoxArrowInRight size={19} />
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed bottom-0 z-20 left-64 w-64 h-34 bg-slate-200 shadow-lg p-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold">{user?.displayName || "Name"}</h2>
            <button
              className=" font-bold text-lg"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✖
            </button>
          </div>

          <button
            className="flex items-center gap-1 mt-4 text-black text-left w-full rounded-md text-xl"
            onClick={() => {
              logOut()
                .then(() => {
                  toast.success("Log Out Successfully");
                })
                .catch(() => {
                  toast.error("An Error occurred While Log Out");
                });
            }}
          >
            <HiArrowRightOnRectangle />
            Logout
          </button>

          <Link to={"/"}>
            <button className="flex items-center gap-1 mt-4 text-black text-left w-full rounded-md text-xl">
              <HiArrowRightOnRectangle />
              Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
