import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import LogoPanen from "../../assets/images/icons/logo panenmania.svg";
import RegisterIcon from "../../assets/images/icons/register.svg";

const NavbarBeforeLogin = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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
      {/* Styling khusus ikon register */}
      <style>{`
        .register-btn img.register-icon {
          transition: filter .12s ease, transform .12s ease, opacity .12s ease;
          -webkit-transition: filter .12s ease, transform .12s ease, opacity .12s ease;
          filter: none;
          opacity: 1;
        }

        .register-btn:hover,
        .register-btn:focus {
          background: #ffffff !important;
          color: #344E41 !important;
        }

        .register-btn:hover img.register-icon,
        .register-btn:focus img.register-icon {
          filter: invert(1) brightness(0);
          -webkit-filter: invert(1) brightness(0);
        }
      `}</style>

      <nav className="w-full bg-[#344E41] fixed top-0 left-0 z-50 font-poppins shadow-md">
        {/* Bagian utama navbar */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 relative">
          {/* Kiri: Logo */}
          <Link
            to="/"
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

          {/* Tengah: Menu desktop/tablet, diposisikan tepat di tengah */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm absolute left-1/2 -translate-x-1/2">
            <Link to="/" className={isActive("/")}>
              Beranda
            </Link>
            <Link to="/catalog" className={isActive("/catalog")}>
              Katalog
            </Link>
            <Link to="/about" className={isActive("/about")}>
              Tentang Kami
            </Link>
            <Link to="/contact" className={isActive("/contact")}>
              Kontak
            </Link>
          </div>

          {/* Kanan: Tombol register dan toggle mobile */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {/* Tombol register versi desktop/tablet */}
            <Link
              to="/signup"
              className="register-btn hidden md:inline-flex items-center gap-2 border border-white text-white px-4 h-9 rounded-[10px] text-sm font-medium transition"
              aria-label="Daftar Akun"
            >
              <img
                src={RegisterIcon}
                alt="register"
                className="w-5 h-5 object-contain register-icon"
              />
              <span className="leading-none">Daftar Akun</span>
            </Link>

            {/* Tombol register versi mobile (ikon saja) */}
            <Link
              to="/signup"
              className="md:hidden inline-flex items-center justify-center border border-white/90 rounded-md p-1.5"
              aria-label="Daftar Akun"
            >
              <img
                src={RegisterIcon}
                alt="register"
                className="w-5 h-5 object-contain"
              />
            </Link>

            {/* Tombol toggle menu mobile */}
            <button
              type="button"
              onClick={() => setMobileOpen((s) => !s)}
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
            mobileOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className="px-4 pb-4 pt-2 flex flex-col gap-1 text-sm">
            <Link to="/" className={`${isActive("/")} block py-2`}>
              Beranda
            </Link>
            <Link to="/catalog" className={`${isActive("/catalog")} block py-2`}>
              Katalog
            </Link>
            <Link to="/about" className={`${isActive("/about")} block py-2`}>
              Tentang Kami
            </Link>
            <Link to="/contact" className={`${isActive("/contact")} block py-2`}>
              Kontak
            </Link>

            {/* Tombol register di dalam menu mobile */}
            <Link
              to="/signup"
              className="mt-3 inline-flex items-center gap-2 border border-white text-white px-4 py-2 rounded-[10px] font-medium"
            >
              <img
                src={RegisterIcon}
                alt="register"
                className="w-5 h-5 object-contain"
              />
              <span>Daftar Akun</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarBeforeLogin;