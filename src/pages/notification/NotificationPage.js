// src/pages/afterLogin/NotificationPage.js
import React from "react";
import { Link } from "react-router-dom";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";

const NotificationPage = () => {
  const notifications = [
    {
      id: 1,
      title: "Konfirmasi Pesanan Berhasil",
      desc: "Terima kasih telah melakukan pemesanan. Pesanan Anda sedang diproses dan akan segera kami siapkan. Silakan cek detail pesanan di halaman riwayat transaksi Anda.",
      date: "15-10-2025 | 07:25",
    },
    {
      id: 2,
      title: "Konfirmasi Pesanan Berhasil",
      desc: "Terima kasih telah melakukan pemesanan. Pesanan Anda sedang diproses dan akan segera kami siapkan. Silakan cek detail pesanan di halaman riwayat transaksi Anda.",
      date: "15-10-2025 | 07:25",
    },
    {
      id: 3,
      title: "Konfirmasi Pesanan Berhasil",
      desc: "Terima kasih telah melakukan pemesanan. Pesanan Anda sedang diproses dan akan segera kami siapkan. Silakan cek detail pesanan di halaman riwayat transaksi Anda.",
      date: "15-10-2025 | 07:25",
    },
    {
      id: 4,
      title: "Konfirmasi Pesanan Berhasil",
      desc: "Terima kasih telah melakukan pemesanan. Pesanan Anda sedang diproses dan akan segera kami siapkan. Silakan cek detail pesanan di halaman riwayat transaksi Anda.",
      date: "15-10-2025 | 07:25",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFEF6] font-poppins text-[#344E41] flex flex-col">
      <NavbarAfterLogin />

      <div className="px-10 pt-24 pb-16 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-8">
          Pemberitahuan Notifikasi
        </h1>

        <div className="flex flex-col gap-5">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-[#B8D68F40] rounded-[10px] px-6 py-5 shadow-[0_6px_20px_rgba(0,0,0,0.04)]"
            >
              {/* Gambar produk */}
              <div className="w-28 h-20 bg-white rounded-[10px] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                {/* nanti ganti dengan <img src={...} /> */}
                <span className="text-[10px] text-[#344E41]">IMG</span>
              </div>

              {/* Teks notif */}
              <div className="flex-1">
                <h2 className="font-semibold text-base mb-1">
                  {item.title}
                </h2>
                <p className="text-sm leading-relaxed">
                  {item.desc}
                </p>
                <p className="text-xs mt-3">{item.date}</p>
              </div>

              {/* Tombol detail */}
              <Link to="/orders-history/PNM-20230101-001">
                <button className="bg-[#344E41] text-white text-sm font-semibold px-6 py-2 rounded-[10px] hover:bg-[#2a3e33] transition">
                  Tampilkan Detail Pesanan
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;