import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import DashBoard from "../Pages/Dashboard/DashBoard";

const DashboardLayout = () => {
  return (
    <div className="h-screen">
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex bg-slate-300 ">
        {/* Sidebar */}
        <div className="w-40 md:w-64 h-screen">
          <DashBoard />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
