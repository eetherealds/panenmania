// src/pages/beforeLogin/HomePageBeforeLogin.js
import React from "react";
import NavbarBeforeLogin from "../../components/layout/NavbarBeforeLogin";
import Footer from "../../components/layout/Footer";
import HomeContent from "../../components/home/HomeContent";

const HomePageBeforeLogin = () => {
  return (
    // Tambah pt-16 (mobile) dan pt-20 (desktop) supaya tidak ketabrak navbar fixed
    <div className="bg-[#FFFEF6] min-h-screen font-poppins flex flex-col pt-16 md:pt-20">
      <NavbarBeforeLogin />

      {/* isLoggedIn = false untuk versi before login */}
      <HomeContent isLoggedIn={false} />

      <Footer />
    </div>
  );
};

export default HomePageBeforeLogin;