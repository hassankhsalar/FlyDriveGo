import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

const MainLayout = () => {
  return (
    <section>
      <div className="h-14 border-2">
        <Navbar></Navbar>
      </div>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <footer className="w-full">
        <Footer></Footer>
      </footer>
    </section>
  );
};

export default MainLayout;
