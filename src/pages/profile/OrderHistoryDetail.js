// src/pages/afterLogin/OrderHistoryDetail.js
import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Popup from "../../components/common/Popup";

// ICONS & IMAGES (sidebar)
import EditIcon from "../../assets/images/icons/edit.svg";
import ProfileIcon from "../../assets/images/icons/profile.svg";
import CheckIcon from "../../assets/images/icons/ceklis.svg";
import OutIcon from "../../assets/images/icons/out.svg";
import ProfilePhoto from "../../assets/images/icons/pp.svg";

// ICONS STEP PESANAN (samakan dengan AdminOrders)
import deliveryIcon from "../../assets/images/icons/delivery.png";
import dollarIcon from "../../assets/images/icons/dollar.png";
import likeIcon from "../../assets/images/icons/like.png";
import orderIcon from "../../assets/images/icons/order.png";
import packageIcon from "../../assets/images/icons/package.png";

const OrderHistoryDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(ProfileContext);

  // State kontrol popup logout
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // State untuk menyimpan foto profil sementara (preview)
  const [profilePic, setProfilePic] = useState(null);

  // Handler pembukaan popup logout
  const handleLogout = () => setShowLogoutPopup(true);

  // Handler penutupan popup logout
  const closeLogoutPopup = () => setShowLogoutPopup(false);

  // Handler konfirmasi logout dan penghapusan token
  const confirmLogout = async () => {
    const result = await logout();
    setShowLogoutPopup(false);
    if (result) {
      navigate("/", { replace: true });
    }
  };

  // Handler unggah foto profil (hanya untuk preview lokal)
  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  // Fungsi untuk menandai menu sidebar yang aktif
  const isActive = (path) => location.pathname === path;

  // ========= DATA PESANAN (samakan objek AdminOrders pertama) =========
  const order = {
    id: "PNM-20230101-001",
    status: "Selesai",
    customerName: "Full Name",
    phone: "(+62)",
    addressDescription:
      "Jl. Melati No. 25, RT 04/RW 03, Kelurahan Sukamaju, Kecamatan Sukasari, Jakarta Selatan, DKI Jakarta, Kode Pos 12345",
    productName: "Belimbing fresh 500g",
    quantity: 1,
    price: 19000,
    shipping: 2500,
    packing: 1000,
  };

  // Fungsi format nilai rupiah
  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);

  const subtotalProduk = order.price;
  const subtotalPengiriman = order.shipping;
  const subtotalPengemasan = order.packing;
  const total = subtotalProduk + subtotalPengemasan + subtotalPengiriman;

  // Data tahapan proses pesanan
  const steps = [
    { icon: dollarIcon, label: "Pembayaran Dikonfirmasi" },
    { icon: orderIcon, label: "Pesanan Dikemas" },
    { icon: deliveryIcon, label: "Pesanan Dikirim" },
    { icon: packageIcon, label: "Pesanan Diterima" },
    { icon: likeIcon, label: "Selesai" },
  ];

  // Komponen ikon panah di antara langkah pesanan
  const StepArrow = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 24"
      className="w-8 h-5 md:w-10 md:h-6 flex-shrink-0"
      fill="none"
    >
      <line
        x1="2"
        y1="12"
        x2="32"
        y2="12"
        stroke="#3A5B40"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <polyline
        points="26,6 32,12 26,18"
        stroke="#3A5B40"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#FFFEF6] text-[#344E41] font-poppins flex flex-col">
      <NavbarAfterLogin />

      {/* MAIN CONTENT – responsif, tetapi layout desktop tetap sidebar kiri + konten kanan */}
      <div className="flex w-full mt-14 gap-8 flex-col lg:flex-row px-4 sm:px-6 lg:px-0">
        {/* SIDEBAR – sama dengan halaman profile lain */}
        <div className="w-full lg:w-72 bg-white px-6 py-8 rounded-[10px] shadow flex flex-col overflow-y-auto min-h-[calc(100vh-56px)]">
          <div className="flex flex-col items-center text-center">
            {/* Foto profil + tombol edit (input file) */}
            <label className="relative cursor-pointer inline-block">
              <input type="file" className="hidden" onChange={handleUploadPic} />
              <div className="w-40 h-40 bg-[#F2F2F2] rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={profilePic || ProfilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] flex items-center justify-center">
                <img src={EditIcon} alt="Edit" className="w-4 h-4" />
              </div>
            </label>

            <p className="mt-3 font-semibold text-lg">Dearni Lambardo</p>
          </div>

          {/* MENU SIDEBAR */}
          <div className="mt-8 space-y-6 text-left w-full">
            {/* PROFILE SECTION */}
            <div>
              <div className="flex items-center gap-2">
                <img src={ProfileIcon} alt="Profile icon" className="w-5 h-5" />
                <Link to="/profile">
                  <p
                    className={`text-sm cursor-pointer ${
                      isActive("/profile")
                        ? "font-semibold text-[#344E41]"
                        : "text-gray-600 hover:text-[#344E41]"
                    }`}
                  >
                    Profile
                  </p>
                </Link>
              </div>

              <div className="ml-7 mt-1 space-y-1">
                <Link to="/profile/address">
                  <p
                    className={`text-sm cursor-pointer ${
                      isActive("/profile/address")
                        ? "font-semibold text-[#344E41]"
                        : "text-gray-600 hover:text-[#344E41]"
                    }`}
                  >
                    Alamat
                  </p>
                </Link>

                <Link to="/profile/password">
                  <p
                    className={`text-sm cursor-pointer ${
                      isActive("/profile/password")
                        ? "font-semibold text-[#344E41]"
                        : "text-gray-600 hover:text-[#344E41]"
                    }`}
                  >
                    Kata Sandi
                  </p>
                </Link>
              </div>
            </div>

            {/* ORDERS SECTION */}
            <div>
              <div className="flex items-center gap-2">
                <img src={CheckIcon} alt="Orders icon" className="w-5 h-5" />
                <Link to="/orders-status">
                  <p
                    className={`text-sm cursor-pointer ${
                      isActive("/orders-status")
                        ? "font-semibold text-[#344E41]"
                        : "text-gray-600 hover:text-[#344E41]"
                    }`}
                  >
                    Status Pesanan
                  </p>
                </Link>
              </div>

              <div className="ml-7 mt-1 space-y-1">
                <Link to="/orders-history">
                  <p
                    className={`text-sm cursor-pointer ${
                      isActive("/orders-history")
                        ? "font-semibold text-[#344E41]"
                        : "text-gray-600 hover:text-[#344E41]"
                    }`}
                  >
                    Riwayat Pesanan
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* BUTTON KELUAR */}
          <button
            onClick={handleLogout}
            className="mt-20 self-center flex items-center justify-center gap-2 bg-[#3A5B40] px-8 py-2 rounded-[10px] text-sm font-semibold text-white hover:bg-[#314c35] transition"
          >
            <img src={OutIcon} alt="Keluar" className="w-4 h-4" />
            Keluar
          </button>
        </div>

        {/* MAIN CONTENT – detail pesanan (mengikuti AdminOrders detail) */}
        <div className="flex-1 mr-0 md:mr-6 lg:mr-20 flex flex-col mt-10 mb-10">
          {/* BAR KEMBALI + ID PESANAN */}
          <div
            className="w-full bg-white rounded-[15px] px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4"
            style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.08)" }}
          >
            <button
              type="button"
              className="flex items-center gap-2 text-[#3A5B40] text-sm font-semibold"
              onClick={() => navigate(-1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="#3A5B40"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Kembali</span>
            </button>

            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-xs md:text-sm text-[#3A5B40]">
              <span>ID Pesanan : {order.id}</span>
              <span className="font-semibold">{order.status}</span>
            </div>
          </div>

          {/* CARD DETAIL PESANAN */}
          <div
            className="w-full rounded-[15px] border border-[#3A5B40] px-4 md:px-8 py-5 md:py-7 space-y-5 md:space-y-7"
            style={{
              boxShadow: "0 4px 6px rgba(0,0,0,0.10)",
              backgroundColor: "#FFFEF6",
            }}
          >
            {/* STEP ICONS (bagian atas kartu, background putih) */}
            <div className="-mx-4 md:-mx-8 -mt-5 md:-mt-7 px-4 md:px-8 pt-5 md:pt-7 pb-0 bg-white rounded-t-[15px]">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 md:gap-4 flex-1 min-w-[90px]"
                    >
                      {/* Lingkaran ikon + label di bawahnya */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] border-[#3A5B40] flex items-center justify-center mb-2 bg-white">
                          <img
                            src={step.icon}
                            alt={step.label}
                            className="w-9 h-9 md:w-12 md:h-12 object-contain"
                          />
                        </div>
                        <p className="text-[10px] md:text-xs text-[#3A5B40] leading-tight">
                          {step.label}
                        </p>
                      </div>

                      {/* Panah antar step (kecuali step terakhir) */}
                      {idx < steps.length - 1 && (
                        <div className="flex-1 flex justify-center md:justify-start">
                          <StepArrow />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Garis pemisah horizontal penuh */}
              <div className="border-t border-[#3A5B40] mt-5 -mx-4 md:-mx-8" />
            </div>

            {/* INFO CUSTOMER + PRODUK */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* KIRI: INFORMASI CUSTOMER */}
              <div className="flex-1 space-y-2 text-xs md:text-sm text-[#3A5B40]">
                <div className="font-semibold">{order.customerName}</div>
                <div className="text-xs">{order.phone}</div>
                <p className="mt-2 leading-relaxed">{order.addressDescription}</p>
              </div>

              {/* GARIS VERTICAL (hanya tampil di desktop) */}
              <div className="hidden md:block w-px bg-[#3A5B40]" />

              {/* KANAN: RINGKASAN PRODUK */}
              <div className="flex-[1.2]">
                <div
                  className="flex items-center gap-4 rounded-[10px] px-4 py-3"
                  style={{
                    boxShadow: "0 4px 6px rgba(0,0,0,0.06)",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <div className="w-14 h-14 rounded-md bg-white flex items-center justify-center border border-[#E5E7EB]">
                    {/* Ganti teks ini dengan gambar produk apabila telah tersedia */}
                    <span className="text-[10px] text-[#3A5B40]">IMG</span>
                  </div>
                  <div className="flex-1 text-xs md:text-sm text-[#3A5B40] space-y-1">
                    <div className="font-semibold">{order.productName}</div>
                    <div className="text-xs">x{order.quantity}</div>
                  </div>
                  <div className="text-xs md:text-sm text-[#3A5B40] font-medium">
                    {formatRupiah(order.price)}
                  </div>
                </div>
              </div>
            </div>

            {/* GARIS PEMISAH RINCIAN HARGA */}
            <div className="border-t border-[#3A5B40]" />

            {/* RINCIAN HARGA PESANAN */}
            <div className="space-y-2 text-xs md:text-sm text-[#3A5B40]">
              <div className="flex justify-between">
                <span>Subtotal Produk</span>
                <span>{formatRupiah(subtotalProduk)}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Pengemasan</span>
                <span>{formatRupiah(subtotalPengemasan)}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal Pengiriman</span>
                <span>{formatRupiah(subtotalPengiriman)}</span>
              </div>

              <div className="border-t border-[#3A5B40] mt-3 pt-3 flex justify-between font-semibold">
                <span>Total Pemesanan</span>
                <span>{formatRupiah(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP LOGOUT – menggunakan Popup generik terbaru */}
      {showLogoutPopup && (
        <Popup
          variant="logout"
          title="Anda Yakin Ingin Keluar?"
          message="Anda akan keluar dari akun ini. Apakah Anda yakin?"
          onClose={closeLogoutPopup}    // tutup saat klik backdrop
          onCancel={closeLogoutPopup}   // batal keluar
          onConfirm={confirmLogout}     // konfirmasi keluar aplikasi
        />
      )}
    </div>
  );
};

export default OrderHistoryDetail;