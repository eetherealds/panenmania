// src/pages/afterLogin/OrderHistory.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import ProfileSideBar from "../../components/layout/ProfileSideBar";
import Popup from "../../components/common/Popup";

const OrderHistory = () => {
  const navigate = useNavigate();
  const { profileData, loading, logout } = useContext(ProfileContext);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // State foto profil sementara (preview)
  const [profilePic, setProfilePic] = useState(null);

  // Handler unggah foto profil (preview lokal)
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
  const confirmLogout = async () => {
    const result = await logout();
    setShowLogoutPopup(false);
    if (result) {
      navigate("/", { replace: true });
    }
  };



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
        {/* SIDEBAR – reusable ProfileSideBar component */}
        <ProfileSideBar
          profileData={profileData}
          loading={loading}
          onLogout={handleLogout}
          onUploadPic={handleUploadPic}
        />

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