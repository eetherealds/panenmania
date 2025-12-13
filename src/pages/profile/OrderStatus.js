// src/pages/afterLogin/OrderStatus.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Popup from "../../components/common/Popup";

// ICONS & IMAGES (sidebar & status)
import EditIcon from "../../assets/images/icons/edit.svg";
import ProfileIcon from "../../assets/images/icons/profile.svg";
import CheckIcon from "../../assets/images/icons/ceklis.svg";
import OutIcon from "../../assets/images/icons/out.svg";
import ProfilePhoto from "../../assets/images/icons/pp.svg";

// STATUS TABS ICONS
import IconBelumBayar from "../../assets/images/icons/belum bayar.svg";
import IconDikemas from "../../assets/images/icons/dikemas.svg";
import IconDikirim from "../../assets/images/icons/dikirim.svg";
import IconSelesai from "../../assets/images/icons/selesai.svg";

const OrderStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State untuk kontrol popup logout
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // State untuk foto profil sementara (preview)
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    full_name: "",
    email: "",
    avatar_url: "",
  });

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://pa-man-api.vercel.app/api/user/my-profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result.status === "Success" && result.data) {
            setProfileData(result.data);
            if (result.data.avatar_url) {
              setProfilePic(result.data.avatar_url);
            }
          }
        } else {
          console.error("Failed to fetch profile:", response.status);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // State untuk filter tab status pesanan (null = semua)
  const [activeTab, setActiveTab] = useState(null);

  // Handler buka popup logout
  const handleLogout = () => setShowLogoutPopup(true);

  // Handler tutup popup logout
  const closeLogoutPopup = () => setShowLogoutPopup(false);

  // Handler konfirmasi logout
  const confirmLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutPopup(false);
    navigate("/", { replace: true });
  };

  // Handler unggah foto profil (hanya untuk preview lokal)
  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  // Fungsi penanda menu aktif pada sidebar
  const isActiveMenu = (path) => location.pathname === path;

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
        {/* SIDEBAR – tema sama dengan ProfileMain */}
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

            <p className="mt-3 font-semibold text-lg">
              {loading ? "Loading..." : profileData.full_name || "User"}
            </p>
            {profileData.email && (
              <p className="text-sm text-gray-600">{profileData.email}</p>
            )}
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
                      isActiveMenu("/profile")
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
                      isActiveMenu("/profile/address")
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
                      isActiveMenu("/profile/password")
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
                      isActiveMenu("/orders-status")
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
                      isActiveMenu("/orders-history")
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