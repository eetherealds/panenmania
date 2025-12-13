// src/pages/afterLogin/ProfilePassword.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Popup from "../../components/common/Popup";

// ICONS & IMAGES (sama seperti ProfileMain)
import EditIcon from "../../assets/images/icons/edit.svg";
import ProfileIcon from "../../assets/images/icons/profile.svg";
import CheckIcon from "../../assets/images/icons/ceklis.svg";
import OutIcon from "../../assets/images/icons/out.svg";
import ProfilePhoto from "../../assets/images/icons/pp.svg";

const ProfilePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State untuk input kata sandi dan pesan kesalahan
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});

  // State untuk kontrol tampilan popup
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  // State untuk menyimpan sementara foto profil yang diunggah
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

  // Handler unggah foto profil (hanya untuk keperluan preview)
  const handleUploadPic = (e) => {
    const f = e.target.files[0];
    if (f) setProfilePic(URL.createObjectURL(f));
  };

  // Fungsi validasi sederhana untuk form ubah kata sandi
  const validate = () => {
    let temp = {};
    if (!oldPass) temp.old = "Kata sandi lama tidak boleh kosong!";
    else if (oldPass.length < 8) temp.old = "Kata sandi lama minimal 8 karakter!";
    
    if (!newPass) temp.new = "Kata sandi baru tidak boleh kosong!";
    else if (newPass.length < 8) temp.new = "Kata sandi baru minimal 8 karakter!";
    
    if (!confirm) temp.conf = "Konfirmasi kata sandi tidak boleh kosong!";
    else if (newPass !== confirm) temp.conf = "Konfirmasi kata sandi tidak cocok!";
    
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // Handler ketika tombol simpan ditekan
  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      const response = await fetch(
        "https://pa-man-api.vercel.app/api/user/change-password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            old_password: oldPass,
            new_password: newPass,
            new_password_confirmation: confirm,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.status === "Success") {
          // Reset form
          setOldPass("");
          setNewPass("");
          setConfirm("");
          setErrors({});
          setShowSuccess(true);
        }
      } else {
        const error = await response.json();
        // Tampilkan error dari API
        if (error.message) {
          if (error.message.includes("old password")) {
            setErrors({ old: "Kata sandi lama tidak sesuai!" });
          } else {
            alert(error.message);
          }
        } else {
          alert("Gagal mengubah kata sandi");
        }
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Terjadi kesalahan saat mengubah kata sandi");
    }
  };

  // Handler konfirmasi logout dan penghapusan token
  const confirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  // Fungsi untuk menentukan menu aktif pada sidebar
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#FFFEF6] text-[#344E41] font-poppins flex flex-col">
      <NavbarAfterLogin />

      {/* MAIN CONTENT – tepat di bawah navbar, responsif kolom/row */}
      <div className="flex w-full mt-14 gap-8 flex-col lg:flex-row px-4 sm:px-6 lg:px-0">
        {/* SIDEBAR – sama seperti ProfileMain */}
        <div className="w-full lg:w-72 bg-white px-6 py-8 rounded-[10px] shadow flex flex-col overflow-y-auto min-h-[calc(100vh-56px)]">
          <div className="flex flex-col items-center text-center">
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
            <p className="text-sm text-gray-600">{profileData.email}</p>
          </div>

          {/* MENU */}
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

          {/* BUTTON KELUAR – kecil, hijau, center */}
          <button
            onClick={() => setShowLogout(true)}
            className="mt-20 self-center flex items-center justify-center gap-2 bg-[#3A5B40] px-8 py-2 rounded-[10px] text-sm font-semibold text-white hover:bg-[#314c35] transition"
          >
            <img src={OutIcon} alt="Keluar" className="w-4 h-4" />
            Keluar
          </button>
        </div>

        {/* CONTENT CARD – ubah kata sandi */}
        <div className="flex-1 mr-0 md:mr-6 lg:mr-20 flex">
          <div className="w-full bg-[#B8D68F40] p-6 md:p-10 rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] mt-10 mb-10">
            <h2 className="text-xl font-bold mb-2">Ubah Kata Sandi</h2>
            {/* garis horizontal ukuran 2 warna hijau */}
            <hr className="border-t-2 border-[#3A5B40] mb-6" />

            <form onSubmit={handleSave} className="space-y-6 max-w-xl">
              <div>
                <label className="text-sm">Kata Sandi Lama</label>
                <input
                  type="password"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  className={`w-full bg-white py-3 px-4 rounded-[10px] mt-1 outline-none text-sm ${
                    errors.old && "border border-red-500"
                  }`}
                />
                {errors.old && (
                  <p className="text-red-500 text-xs">{errors.old}</p>
                )}
              </div>

              <div>
                <label className="text-sm">Kata Sandi Baru</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className={`w-full bg-white py-3 px-4 rounded-[10px] mt-1 outline-none text-sm ${
                    errors.new && "border border-red-500"
                  }`}
                />
                {errors.new && (
                  <p className="text-red-500 text-xs">{errors.new}</p>
                )}
              </div>

              <div>
                <label className="text-sm">Konfirmasi Kata Sandi Baru</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={`w-full bg-white py-3 px-4 rounded-[10px] mt-1 outline-none text-sm ${
                    errors.conf && "border border-red-500"
                  }`}
                />
                {errors.conf && (
                  <p className="text-red-500 text-xs">{errors.conf}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#344E41] text-white font-semibold px-8 py-2 rounded-[10px] hover:bg-[#2a3e33] transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Popup Berhasil – menggunakan Popup generik variant "success" */}
      {showSuccess && (
        <Popup
          variant="success"
          title="Berhasil Mengubah Kata Sandi!"
          message="Kata sandi akun Anda telah diperbarui."
          onClose={() => setShowSuccess(false)}     // tutup saat klik backdrop / ikon tutup
          onConfirm={() => setShowSuccess(false)}   // tutup saat klik tombol konfirmasi
        />
      )}

      {/* Popup Keluar – menggunakan Popup generik variant "logout" */}
      {showLogout && (
        <Popup
          variant="logout"
          title="Anda Yakin Ingin Keluar?"
          message="Anda akan keluar dari akun ini. Apakah Anda yakin?"
          onClose={() => setShowLogout(false)}      // tutup saat klik di luar popup
          onCancel={() => setShowLogout(false)}     // batal keluar
          onConfirm={confirmLogout}                 // konfirmasi keluar akun
        />
      )}
    </div>
  );
};

export default ProfilePassword;
