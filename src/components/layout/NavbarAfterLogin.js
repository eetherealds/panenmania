import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import LogoPanen from "../../assets/images/icons/logo panenmania.svg";
import IconAkun from "../../assets/images/icons/akun.svg";
import IconCart from "../../assets/images/icons/cart.svg";
import IconNotif from "../../assets/images/icons/notifikasi.svg";

const NavbarAfterLogin = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Menentukan path berdasarkan status autentikasi
  const homePath = token ? "/home" : "/";
  const catalogPath = token ? "/catalog/login" : "/catalog";
  const aboutPath = token ? "/about/login" : "/about";
  const contactPath = token ? "/contact/login" : "/contact";

  // Menentukan kelas aktif pada menu
  const isActive = (path) =>
    location.pathname === path
      ? "font-semibold text-white"
      : "text-white/80 hover:text-white";

  // Menutup menu mobile saat berpindah halaman
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="w-full bg-[#344E41] fixed top-0 left-0 z-50 font-poppins shadow-md">
        {/* Bagian utama navbar */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 relative">
          {/* Kiri: Logo */}
          <Link
            to={homePath}
            className="flex items-center gap-2 min-w-0"
            aria-label="PanenMania Beranda"
          >
            <img
              src={LogoPanen}
              alt="PanenMania"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain flex-shrink-0"
            />
            <span className="text-white font-semibold text-base sm:text-lg leading-none truncate">
              PanenMania
            </span>
          </Link>

          {/* Tengah: Menu desktop/tablet */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm absolute left-1/2 -translate-x-1/2">
            <Link to={homePath} className={isActive(homePath)}>
              Beranda
            </Link>
            <Link to={catalogPath} className={isActive(catalogPath)}>
              Katalog
            </Link>
            <Link to={aboutPath} className={isActive(aboutPath)}>
              Tentang Kami
            </Link>
            <Link to={contactPath} className={isActive(contactPath)}>
              Kontak
            </Link>
          </div>

          {/* Kanan: Ikon dan toggle menu mobile */}
          <div className="flex justify-end items-center gap-3 sm:gap-4">
            {/* Ikon hanya ditampilkan saat pengguna sudah login */}
            {token && (
              <div className="hidden md:flex gap-4 items-center">
                <Link to="/cart" aria-label="Keranjang">
                  <img
                    src={IconCart}
                    alt="cart"
                    className="w-6 h-6 object-contain"
                  />
                </Link>
                <Link to="/notifications" aria-label="Notifikasi">
                  <img
                    src={IconNotif}
                    alt="notifikasi"
                    className="w-6 h-6 object-contain"
                  />
                </Link>
                <Link to="/profile" aria-label="Profil Akun">
                  <img
                    src={IconAkun}
                    alt="akun"
                    className="w-7 h-7 object-contain"
                  />
                </Link>
              </div>
            )}

            {/* Tombol toggle menu mobile */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/60"
              aria-label="Buka atau tutup menu navigasi"
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu navigasi versi mobile */}
        <div
          className={`md:hidden bg-[#344E41] overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-72" : "max-h-0"
          }`}
        >
          <div className="px-4 pb-4 pt-2 flex flex-col gap-1 text-sm">
            <Link
              to={homePath}
              className={`${isActive(homePath)} block py-2`}
              onClick={() => setMobileOpen(false)}
            >
              Beranda
            </Link>
            <Link
              to={catalogPath}
              className={`${isActive(catalogPath)} block py-2`}
              onClick={() => setMobileOpen(false)}
            >
              Katalog
            </Link>
            <Link
              to={aboutPath}
              className={`${isActive(aboutPath)} block py-2`}
              onClick={() => setMobileOpen(false)}
            >
              Tentang Kami
            </Link>
            <Link
              to={contactPath}
              className={`${isActive(contactPath)} block py-2`}
              onClick={() => setMobileOpen(false)}
            >
              Kontak
            </Link>

            {/* Ikon bagian bawah menu mobile, hanya saat login */}
            {token && (
              <div className="flex gap-4 pt-3 mt-3 border-t border-white/10">
                <Link to="/cart" aria-label="Keranjang">
                  <img
                    src={IconCart}
                    alt="cart"
                    className="w-6 h-6 object-contain"
                  />
                </Link>
                <Link to="/notifications" aria-label="Notifikasi">
                  <img
                    src={IconNotif}
                    alt="notifikasi"
                    className="w-6 h-6 object-contain"
                  />
                </Link>
                <Link to="/profile" aria-label="Profil Akun">
                  <img
                    src={IconAkun}
                    alt="akun"
                    className="w-7 h-7 object-contain"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarAfterLogin;