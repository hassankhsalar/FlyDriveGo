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
      <div className="flex">
        {/* Sidebar */}
        <div className="w-40 md:w-64 bg-slate-300 h-screen ">
          <DashBoard />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
