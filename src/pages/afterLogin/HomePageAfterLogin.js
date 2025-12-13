// src/pages/afterLogin/HomePageAfterLogin.js
import React from "react";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Footer from "../../components/layout/Footer";
import HomeContent from "../../components/home/HomeContent";

const HomePageAfterLogin = () => {
  return (
    // tambahkan padding-top sesuai tinggi navbar fixed
    <div className="bg-[#FFFEF6] min-h-screen font-poppins flex flex-col pt-16 md:pt-20">
      <NavbarAfterLogin />

      {/* isLoggedIn = true untuk versi after login */}
      <HomeContent isLoggedIn={true} />

      <Footer />
    </div>
  );
};

export default HomePageAfterLogin;