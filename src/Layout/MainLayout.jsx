import React from "react";
import { Outlet } from "react-router-dom";
<<<<<<< HEAD

const MainLayout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
=======
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
>>>>>>> 87f1360dd5b6d9d4c65a5ac6b7c67f779813e5a7
  );
};

export default MainLayout;
