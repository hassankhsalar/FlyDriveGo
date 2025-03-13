import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";

const MainLayout = () => {
  return (
    <section>
        <div className="h-14 border-2">
            <Navbar></Navbar>
        </div>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
    </section>
  );
};

export default MainLayout;
