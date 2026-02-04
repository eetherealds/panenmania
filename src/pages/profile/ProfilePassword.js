// src/pages/afterLogin/ProfilePassword.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Popup from "../../components/common/Popup";
import ProfileSideBar from "../../components/layout/ProfileSideBar";

const ProfilePassword = () => {
  const navigate = useNavigate();
  const { profileData, loading, logout } = useContext(ProfileContext);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});

  // State untuk kontrol tampilan popup
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

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
  const confirmLogout = async () => {
    const result = await logout();
    setShowLogout(false);
    if (result) {
      navigate("/", { replace: true });
    }
  };

  // Handler untuk buka popup logout
  const handleLogout = () => setShowLogout(true);

  return (
    <div className="min-h-screen bg-[#FFFEF6] text-[#344E41] font-poppins flex flex-col">
      <NavbarAfterLogin />

      {/* MAIN CONTENT – tepat di bawah navbar, responsif kolom/row */}
      <div className="flex w-full mt-14 gap-8 flex-col lg:flex-row px-4 sm:px-6 lg:px-0">
        {/* SIDEBAR – pakai komponen ProfileSideBar */}
        <ProfileSideBar
          profileData={profileData}
          loading={loading}
          onLogout={handleLogout}
        />

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
