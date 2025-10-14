// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/user/Header";
import Footer from "../component/user/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-20">
        <Outlet />{" "}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
