// src/pages/afterLogin/OrderStatus.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import ProfileSideBar from "./ProfileSideBar";
import Popup from "../../components/common/Popup";

// STATUS TABS ICONS
import IconBelumBayar from "../../assets/images/icons/belum bayar.svg";
import IconDikemas from "../../assets/images/icons/dikemas.svg";
import IconDikirim from "../../assets/images/icons/dikirim.svg";
import IconSelesai from "../../assets/images/icons/selesai.svg";

const OrderStatus = () => {
  const navigate = useNavigate();
  const { profileData, loading } = useContext(ProfileContext);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // State untuk foto profil sementara (preview)
  const [profilePic, setProfilePic] = useState(null);

  // Handler unggah foto profil (hanya untuk preview lokal)
  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  // Set avatar dari context
  useEffect(() => {
    if (profileData.avatar_url) {
      setProfilePic(profileData.avatar_url);
    }
  }, [profileData.avatar_url]);

  // Handler membuka popup logout
  const handleLogout = () => setShowLogoutPopup(true);

  // Handler menutup popup logout
  const closeLogoutPopup = () => setShowLogoutPopup(false);

  // Handler konfirmasi logout dan kembali ke halaman utama
  const confirmLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutPopup(false);
    navigate("/", { replace: true });
  };

  // State untuk filter tab status pesanan (null = semua)
  const [activeTab, setActiveTab] = useState(null);



  // DATA PESANAN (status: belum, dikemas, dikirim, selesai)
  const orders = [
    {
      id: "ORD20251015-001",
      status: "belum",
      title: "Pembelian",
      product: "Bawang Merah Lokal kering besar 500g (x1)",
      date: "15-10-2025 | 07:25",
    },
    {
      id: "ORD20251015-002",
      status: "selesai",
      title: "Pembelian",
      product: "Beras Pulen Berkualitas Cap Dero 5Kg (x1)",
      date: "15-10-2025 | 07:25",
    },
    {
      id: "ORD20251015-003",
      status: "selesai",
      title: "Pembelian",
      product: "Tomat Merah Segar Hasil Petik Dadakan (x1)",
      date: "15-10-2025 | 07:25",
    },
    {
      id: "ORD20251015-004",
      status: "dikirim",
      title: "Pembelian",
      product: "Beras Pulen Berkualitas Cap Dero 5Kg (x1)",
      date: "15-10-2025 | 07:25",
    },
  ];

  // Filter pesanan berdasarkan tab aktif
  const filteredOrders = activeTab
    ? orders.filter((o) => o.status === activeTab)
    : orders;

  // Data tab status
  const tabs = [
    { key: "belum", label: "Belum Bayar", icon: IconBelumBayar },
    { key: "dikemas", label: "Dikemas", icon: IconDikemas },
    { key: "dikirim", label: "Dikirim", icon: IconDikirim },
    { key: "selesai", label: "Selesai", icon: IconSelesai },
  ];

  // Handler klik tab status
  const handleTabClick = (key) => {
    // jika tab yang sama diklik lagi, reset ke semua status
    if (activeTab === key) {
      setActiveTab(null);
    } else {
      setActiveTab(key);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFEF6] text-[#344E41] font-poppins flex flex-col">
      <NavbarAfterLogin />

      {/* MAIN CONTENT (di bawah navbar) – responsif kolom/row */}
      <div className="flex w-full mt-14 gap-8 flex-col lg:flex-row px-4 sm:px-6 lg:px-0">
        {/* SIDEBAR – reusable ProfileSideBar component */}
        <ProfileSideBar
          profileData={profileData}
          loading={loading}
          onLogout={handleLogout}
          onUploadPic={handleUploadPic}
        />

        {/* KONTEN STATUS PESANAN */}
        <div className="flex-1 mr-0 md:mr-6 lg:mr-20 flex flex-col mt-10 mb-10 gap-6">
          {/* CARD TAB STATUS – responsif dan masih rata seperti desktop di lg */}
          <div className="w-full bg-white rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] px-4 sm:px-6 lg:px-10 py-4 sm:py-6 flex flex-wrap gap-4 sm:gap-6 justify-between">
            {tabs.map((tab) => {
              const isTabActive = !activeTab || activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleTabClick(tab.key)}
                  className="flex flex-col items-center gap-2 focus:outline-none flex-1 min-w-[90px] sm:min-w-[120px]"
                >
                  <img
                    src={tab.icon}
                    alt={tab.label}
                    className={`w-10 h-10 transition ${
                      isTabActive ? "opacity-100" : "opacity-40"
                    }`}
                  />
                  <span
                    className={`text-xs sm:text-sm font-semibold text-center ${
                      isTabActive ? "text-[#344E41]" : "text-gray-500"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* LIST PESANAN */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row md:justify-between md:items-center bg-white rounded-[10px] px-4 sm:px-6 py-4 shadow-[0_6px_20px_rgba(0,0,0,0.04)] gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail produk (placeholder) */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F2F2F2] rounded-[10px] overflow-hidden flex items-center justify-center">
                    {/* ganti dengan gambar produk jika tersedia */}
                    {/* <img src={BawangMerahImg} alt="Bawang Merah" className="w-full h-full object-cover" /> */}
                  </div>

                  <div className="flex flex-col text-sm">
                    <p className="font-semibold">{order.title}</p>
                    <p>{order.product}</p>
                    <p className="mt-1 text-xs text-gray-700">{order.date}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/orders-history/${order.id}`)}
                  className="bg-[#3A5B40] text-white px-4 sm:px-5 py-2 rounded-[10px] text-xs md:text-sm font-semibold hover:bg-[#2a3e33] transition self-start md:self-auto"
                >
                  Tampilkan Detail Pesanan
                </button>
              </div>
            ))}

            {/* Jika setelah filter tidak ada pesanan */}
            {filteredOrders.length === 0 && (
              <p className="text-sm text-gray-600">
                Belum ada pesanan untuk status ini.
                <button
                  type="button"
                  onClick={() => setActiveTab(null)}
                  className="ml-1 underline text-[#344E41]"
                >
                  Lihat semua pesanan
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* POPUP LOGOUT – menggunakan Popup generik variant "logout" */}
      {showLogoutPopup && (
        <Popup
          variant="logout"
          title="Anda Yakin Ingin Keluar?"
          message="Anda akan keluar dari akun ini. Apakah Anda yakin?"
          onClose={closeLogoutPopup}    // tutup saat klik backdrop
          onCancel={closeLogoutPopup}   // batal keluar
          onConfirm={confirmLogout}     // konfirmasi keluar
        />
      )}
    </div>
  );
};

export default OrderStatus;