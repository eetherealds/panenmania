import React from "react";
import { Link } from "react-router-dom";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Footer from "../../components/layout/Footer";

const CheckoutSuccess = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col font-poppins text-[#344E41]">
      {/* Navbar */}
      <NavbarAfterLogin />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center pt-24 px-6 text-center">
        
        {/* Icon Success */}
        <div className="w-52 h-52 bg-gray-300 rounded-full flex items-center justify-center mb-10">
          <span className="text-6xl text-white font-bold">✓</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Terima Kasih Telah Berbelanja di PaMan!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 text-sm sm:text-base mb-10">
          Pesanan Kamu Sedang di Proses
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
          <Link
            to="/"
            className="flex-1 bg-[#D9D9D9] text-[#344E41] font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Kembali ke Beranda
          </Link>

          <Link
            to="/orders-status"
            className="flex-1 bg-[#D9D9D9] text-[#344E41] font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Status Pesanan
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;