import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import Chatbot from "../components/Chatbot/Chatbot";
import LoaderWrapper from "../components/Loader/LoaderWrapper";

const MainLayout = () => {
  return (
    <LoaderWrapper>
      <section>
        <Chatbot />
        <div className="h-14 border-2">
          <Navbar />
        </div>
        <div className="min-h-screen">
          <Outlet />
        </div>
        <footer className="w-full">
          <Footer />
        </footer>
      </section>
    </LoaderWrapper>
  );
};

export default MainLayout;
