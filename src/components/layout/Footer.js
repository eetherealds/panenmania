// src/components/layout/Footer.js
import React from "react";

// Import ikon footer
import LogoFooter from "../../assets/images/icons/logo footer.svg";
import IconCall from "../../assets/images/icons/call.svg";
import IconGmail from "../../assets/images/icons/gmail.svg";
import IconFacebook from "../../assets/images/icons/facebook.svg";

function Footer() {
  return (
    <footer className="bg-[#344E41] text-white mt-12 sm:mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        {/* Grid utama footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Kiri: logo dan deskripsi singkat */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-[80px] sm:w-[90px] aspect-square rounded-full bg-white flex items-center justify-center">
                <img
                  src={LogoFooter}
                  alt="Logo PanenMania"
                  className="w-[52px] sm:w-[60px] h-auto object-contain mt-1"
                />
              </div>

              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
                  PanenMania
                </h2>
                <p className="text-[11px] sm:text-xs mt-1 font-semibold">
                  “Dari Petani, Oleh Petani, Untuk Negeri.”
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm mt-3 sm:mt-4 leading-relaxed max-w-md">
              Platform digital yang menjembatani petani lokal dan konsumen
              dalam menciptakan ekosistem pertanian yang cerdas dan berdaya
              saing.
            </p>
          </div>

          {/* Tengah: alamat */}
          <div className="sm:pl-2 lg:pl-6">
            <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">
              Alamat
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed">
              Jl. Raya Tani Sejahtera No. 45,
              <br />
              Tangerang, Indonesia
            </p>
          </div>

          {/* Kanan: informasi kontak */}
          <div className="sm:pl-2 lg:pl-6">
            <h3 className="font-bold text-base sm:text-lg mb-3">
              Hubungi Kami
            </h3>

            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              {/* Telepon */}
              <div className="flex items-center gap-3">
                <img
                  src={IconCall}
                  alt="Telepon"
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                />
                <span>081234567890</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <img
                  src={IconGmail}
                  alt="Email"
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                />
                <span>support@panenmania.id</span>
              </div>

              {/* Facebook */}
              <div className="flex items-center gap-3">
                <img
                  src={IconFacebook}
                  alt="Facebook"
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                />
                <span>panenmaniaofc</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;