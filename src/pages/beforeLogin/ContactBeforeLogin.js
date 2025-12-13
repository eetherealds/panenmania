// src/pages/beforeLogin/ContactBeforeLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarBeforeLogin from "../../components/layout/NavbarBeforeLogin";
import Footer from "../../components/layout/Footer";
import Popup from "../../components/common/Popup";

// IMAGE
import PetaniKontakBanner from "../../assets/images/banners/petani kontak.svg";

const ContactBeforeLogin = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // submit form: tampilkan popup akses terkunci
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  // kelas input reusable
  const inputClass =
    "w-full bg-white py-3 px-4 rounded-[10px] mt-1 outline-none shadow-[0_8px_20px_rgba(0,0,0,0.05)] text-sm sm:text-base";

  return (
    <div className="bg-[#F6F7F0] min-h-screen flex flex-col font-poppins text-[#344E41]">
      <NavbarBeforeLogin />

      {/* SECTION UTAMA */}
      <section className="flex-1 w-full px-5 sm:px-8 lg:px-24 pt-20 sm:pt-24 pb-12 lg:pb-16">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-10">
          Hubungi Kami!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* FORM KONTAK */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div>
              <label className="text-sm mb-1 block">Nama Lengkap</label>
              <input type="text" className={inputClass} required />
            </div>

            <div>
              <label className="text-sm mb-1 block">Email</label>
              <input type="email" className={inputClass} required />
            </div>

            <div>
              <label className="text-sm mb-1 block">Pesan</label>
              <textarea
                rows="5"
                className={`${inputClass} resize-none`}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#344E41] text-white font-semibold py-3 rounded-[10px] hover:bg-[#2b3f35] transition text-sm sm:text-base"
            >
              Kirim Pesan
            </button>
          </form>

          {/* GAMBAR SAMPING */}
          <div className="flex justify-center md:justify-end">
            <img
              src={PetaniKontakBanner}
              alt="Ilustrasi petani PanenMania"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* POPUP AKSES TERKUNCI (BELUM LOGIN / DAFTAR) */}
      {showPopup && (
        <Popup
          variant="locked"
          onClose={() => setShowPopup(false)}
          onCancel={() => setShowPopup(false)}
          onConfirm={() => {
            setShowPopup(false);
            navigate("/signup");
          }}
        />
      )}
    </div>
  );
};

export default ContactBeforeLogin;