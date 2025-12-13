// src/pages/beforeLogin/AboutBeforeLogin.js
import React from "react";
import NavbarBeforeLogin from "../../components/layout/NavbarBeforeLogin";
import Footer from "../../components/layout/Footer";

// HERO ABOUT
import HeroPetaniAbout from "../../assets/images/banners/petani about.svg";

// Kenapa Kami – path sama seperti HomeContent.js
import Petani2Banner from "../../assets/images/banners/petani 2.svg";
import IconFarmer from "../../assets/images/icons/farmer.svg";
import IconSegar from "../../assets/images/icons/segar.svg";
import IconJujur from "../../assets/images/icons/jujur.svg";
import IconPengiriman from "../../assets/images/icons/pengiriman.svg";

// Tim Kami
import KelinciBanner from "../../assets/images/banners/kelinci.svg";

// Data tim (reusable)
const TEAM_MEMBERS = [
  {
    name: "Dearni Lambardo Saragih",
    role: "Project Manager, Design UI/UX",
  },
  {
    name: "Muhammad Ryan Ardiansyah",
    role: "Design UI/UX",
  },
  {
    name: "Muhammad Reyhan Andrianto",
    role: "Design UI/UX",
  },
  {
    name: "Roland Savitar Herdiansyah",
    role: "Front End Developer",
  },
  {
    name: "M Yasir Rahmatullah",
    role: "Front End Developer",
  },
  {
    name: "Dhana Prasetya Nugraha",
    role: "Back End Developer",
  },
];

// Data “Kenapa Kami” (reusable)
const WHY_ITEMS = [
  {
    icon: IconFarmer,
    title: "Langsung dari Petani",
    desc: "Kami bekerja sama langsung dengan petani lokal. Setiap produk datang segar tanpa melalui rantai distribusi panjang.",
  },
  {
    icon: IconSegar,
    title: "Segar dan Alami",
    desc: "Hasil panen dikirim segera setelah dipetik. Tanpa bahan pengawet atau proses pematangan buatan.",
  },
  {
    icon: IconJujur,
    title: "Harga Jujur",
    desc: "Petani mendapatkan harga yang layak. Pembeli pun menikmati harga hemat tanpa biaya tambahan.",
  },
  {
    icon: IconPengiriman,
    title: "Pengiriman Cepat",
    desc: "Produk dikemas dengan aman dan rapi. Kami pastikan kesegaran tetap terjaga hingga sampai ke tangan Anda.",
  },
];

const AboutBeforeLogin = () => {
  return (
    <div className="bg-[#FFFEF6] font-poppins text-[#344E41] min-h-screen flex flex-col">
      <NavbarBeforeLogin />

      {/* MAIN CONTENT */}
      {/* pt-14 sm:pt-16 menyesuaikan tinggi navbar fixed */}
      <main className="flex-1 pt-14 sm:pt-16">
        {/* ========== HERO ABOUT (MENEMPEL DENGAN NAVBAR) ========== */}
        <section className="w-full py-10 sm:py-12 md:py-16">
          <div className="max-w-[1350px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* LEFT TEXT */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-[22px] sm:text-[24px] md:text-[25px] font-extrabold text-[#344E41] leading-snug">
                “Dari Petani, Oleh Petani, Untuk Negeri”
              </h1>
              <p className="text-[15px] sm:text-[16px] md:text-[18px] font-semibold text-[#344E41]">
                Menggerakkan Kesegaran, Menguatkan Negeri.
              </p>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#3A5A40] leading-relaxed max-w-[540px]">
                Kami percaya bahwa setiap hasil panen punya cerita, dan setiap
                petani punya peran besar bagi masa depan pangan Indonesia.
                Melalui PanenMania, kami menghadirkan cara baru untuk
                mengalirkan produk segar lebih cepat, lebih adil, dan lebih
                transparan. Kami menghubungkan petani langsung dengan pembeli,
                menjaga kualitas sejak lahan hingga meja, dan memastikan nilai
                terbaik kembali kepada mereka yang menanamnya.
              </p>
            </div>

            {/* RIGHT IMAGE – petani + 2 lingkaran sesuai figma */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[430px]">
                {/* Gambar petani */}
                <img
                  src={HeroPetaniAbout}
                  alt="petani panen"
                  className="w-full h-auto object-contain"
                />

                {/* Lingkaran dekoratif */}
                <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1 w-10 h-10">
                  <div className="absolute bottom-0 left-0 w-6 h-6 rounded-full bg-[#344E41]" />
                  <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#344E41]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== KENAPA KAMI (SAMA DENGAN HOMECONTENT) ========== */}
        <section className="w-full bg-[#DDEACD] py-14 sm:py-16 md:py-20 mt-10 sm:mt-16">
          <div className="max-w-[1350px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* LEFT CONTENT */}
            <div>
              <h2 className="text-[#344E41] font-extrabold text-[26px] sm:text-[30px] md:text-[32px] mb-3 sm:mb-4">
                Kenapa Kami?
              </h2>
              <p className="text-[#3A5A40] text-[14px] sm:text-[15px] mb-8 sm:mb-10 leading-relaxed">
                Karena kami percaya, hasil terbaik datang langsung dari tangan
                petani.
              </p>

              <div className="space-y-7 sm:space-y-8 md:space-y-10">
                {WHY_ITEMS.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-[40px] sm:w-[46px] md:w-[48px]"
                    />
                    <div>
                      <h3 className="font-bold text-[#344E41] text-[16px] sm:text-[18px] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#3A5A40] text-[13px] sm:text-[15px] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center">
              <img
                src={Petani2Banner}
                alt="petani"
                className="rounded-2xl shadow-md w-full max-w-[480px] md:max-w-[550px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* ========== TIM KAMI ========== */}
        <section className="w-full py-14 sm:py-16 md:py-20 bg-[#FFFEF6]">
          <div className="max-w-[1350px] mx-auto px-6 lg:px-16 text-center">
            {/* Title button */}
            <button className="bg-[#3A5B40] text-white font-semibold text-[14px] sm:text-[16px] px-7 sm:px-8 py-2 rounded-[10px] mb-3">
              Tim Kami
            </button>
            <p className="text-[#6B6B6B] text-[13px] sm:text-[14px] md:text-[15px] mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto">
              Orang-orang di balik perjalanan kami dalam menghadirkan produk
              segar terbaik bagi negeri.
            </p>

            {/* Grid cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {TEAM_MEMBERS.map((person, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="bg-white rounded-[26px] sm:rounded-[30px] shadow-md overflow-hidden w-full max-w-[320px]">
                    {/* Gambar kelinci */}
                    <div className="w-full h-[180px] sm:h-[200px] overflow-hidden">
                      <img
                        src={KelinciBanner}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Text */}
                    <div className="px-5 py-4 text-left">
                      <p className="font-semibold text-[14px] sm:text-[15px] mb-1 text-[#344E41]">
                        {person.name}
                      </p>
                      <p className="text-[12px] sm:text-[13px] text-[#6B6B6B]">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutBeforeLogin;