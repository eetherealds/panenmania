// src/pages/afterLogin/OrderHistory.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Popup from "../../components/common/Popup";

// ICONS & IMAGES – sama dengan ProfileMain
import EditIcon from "../../assets/images/icons/edit.svg";
import ProfileIcon from "../../assets/images/icons/profile.svg";
import CheckIcon from "../../assets/images/icons/ceklis.svg";
import OutIcon from "../../assets/images/icons/out.svg";
import ProfilePhoto from "../../assets/images/icons/pp.svg";

const OrderHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State kontrol popup logout
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // State foto profil sementara (preview)
  const [profilePic, setProfilePic] = useState(null);
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
        if (!token) return;

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
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

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

  // Handler unggah foto profil (preview lokal)
  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  // Fungsi penanda menu sidebar yang aktif
  const isActive = (path) => location.pathname === path;

  // Data dummy riwayat pesanan
  const orders = [
    {
      id: "ORD20240315-001",
      date: "15 Maret 2024",
      total: "Rp 10.000",
      status: "Diterima",
    },
    {
      id: "ORD20240315-002",
      date: "15 Maret 2024",
      total: "Rp 10.000",
      status: "Diterima",
    },
    {
      id: "ORD20240315-003",
      date: "15 Maret 2024",
      total: "Rp 10.000",
      status: "Diterima",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFEF6] text-[#344E41] font-poppins flex flex-col">
      <NavbarAfterLogin />

      {/* MAIN CONTENT – responsif, layout desktop tetap sidebar kiri + konten kanan */}
      <div className="flex w-full mt-14 gap-8 flex-col lg:flex-row px-4 sm:px-6 lg:px-0">
        {/* SIDEBAR – sama dengan ProfileMain */}
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

            <p className="mt-3 font-semibold text-lg">{profileData.full_name || "Loading..."}</p>
            <p className="text-sm text-gray-600">{profileData.email}</p>
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

          {/* BUTTON KELUAR – kecil, hijau */}
          <button
            onClick={handleLogout}
            className="mt-20 self-center flex items-center justify-center gap-2 bg-[#3A5B40] px-8 py-2 rounded-[10px] text-sm font-semibold text-white hover:bg-[#314c35] transition"
          >
            <img src={OutIcon} alt="Keluar" className="w-4 h-4" />
            Keluar
          </button>
        </div>

        {/* ORDER HISTORY CONTENT – card hijau muda */}
        <div className="flex-1 mr-0 md:mr-6 lg:mr-20 flex">
          <div className="w-full bg-[#B8D68F40] p-6 md:p-10 rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] mt-10 mb-10">
            <h2 className="text-xl font-bold mb-2">Riwayat Pesanan</h2>
            {/* Garis horizontal ukuran 2 warna hijau */}
            <hr className="border-t-2 border-[#3A5B40] mb-6" />

            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.05)] px-4 sm:px-6 py-4"
                >
                  {/* Header pesanan */}
                  <p className="text-sm font-semibold">
                    ID Pesanan: {order.id}
                  </p>
                  <p className="text-xs text-gray-700 mb-2">
                    Tanggal: {order.date}
                  </p>
                  <hr className="border-[#3A5B40] mb-4" />

                  {/* Detail produk */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Thumbnail produk */}
                    <div className="w-20 h-20 rounded-[10px] bg-[#F2F2F2] flex items-center justify-center overflow-hidden">
                      {/* Ganti dengan gambar produk apabila telah tersedia */}
                      {/* <img src={BerasPulenImg} alt="Beras Pulen" className="w-full h-full object-cover" /> */}
                    </div>

                    <div className="flex-1 text-sm">
                      <p className="font-semibold mb-1">
                        Beras Pulen 500g (x1)
                      </p>
                      <p className="font-medium">{order.total}</p>

                      <div className="flex items-center gap-2 mt-3 text-xs">
                        <span className="text-[#344E41] font-medium">
                          Status Pesanan:
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#3A5B40] text-white text-[11px]">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer card */}
                  <hr className="border-[#3A5B40] mt-4 mb-3" />
                  <button
                    onClick={() => navigate(`/orders-history/${order.id}`)}
                    className="w-full bg-[#3A5B40] text-white text-sm font-semibold py-2 rounded-[10px] hover:bg-[#2a3e33] transition"
                  >
                    Detail Pesanan
                  </button>
                </div>
              ))}
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
          onCancel={closeLogoutPopup}   // batal logout
          onConfirm={confirmLogout}     // konfirmasi logout
        />
      )}
    </div>
  );
};

export default OrderHistory;