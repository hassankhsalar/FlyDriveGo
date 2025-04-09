import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import DashBoard from "../Pages/Dashboard/DashBoard";

const DashboardLayout = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex">
        <div className="w-40 md:w-64 pt-6 mt-6 bg-slate-300 min-h-screen">
          <DashBoard></DashBoard>
        </div>
        <div className="w-full">
          <Outlet></Outlet>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default DashboardLayout;