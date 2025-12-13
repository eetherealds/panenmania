// src/pages/afterLogin/ProfileMain.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Popup from "../../components/common/Popup";

// ICONS & IMAGES
import EditIcon from "../../assets/images/icons/edit.svg";
import ProfileIcon from "../../assets/images/icons/profile.svg";
import CheckIcon from "../../assets/images/icons/ceklis.svg";
import OutIcon from "../../assets/images/icons/out.svg";
import ProfilePhoto from "../../assets/images/icons/pp.svg";

const ProfileMain = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    birthday: "",
  });

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
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
            setGender(result.data.gender);
          }
        } else {
          // Token might be invalid
          if (response.status === 401) {
            localStorage.removeItem("token");
            navigate("/signin");
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();
    setShowSuccessPopup(true);
  };

  const handleLogout = () => setShowLogoutPopup(true);
  const closeLogoutPopup = () => setShowLogoutPopup(false);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutPopup(false);
    navigate("/", { replace: true });
  };

  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#FFFEF6] text-[#344E41] font-poppins flex flex-col">
      <NavbarAfterLogin />

      {/* MAIN CONTENT – mulai tepat di bawah navbar (h-14 = 56px) */}
      <div className="flex w-full mt-14 gap-8">
        {/* SIDEBAR – tinggi FIX dari bawah navbar sampai bawah layar */}
        <div className="w-72 bg-white px-6 py-8 rounded-[10px] shadow flex flex-col overflow-y-auto min-h-[calc(100vh-56px)]">
          <div className="flex flex-col items-center text-center">
            {/* Profile Pic + Edit */}
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

          {/* BUTTON KELUAR */}
          <button
            onClick={handleLogout}
            className="mt-20 self-center flex items-center justify-center gap-2 bg-[#3A5B40] px-8 py-2 rounded-[10px] text-sm font-semibold text-white hover:bg-[#314c35] transition"
          >
            <img src={OutIcon} alt="Keluar" className="w-4 h-4" />
            Keluar
          </button>
        </div>

        {/* PROFILE FORM CARD */}
        <div className="flex-1 mr-6 lg:mr-20 flex">
          <div className="w-full bg-[#B8D68F40] p-10 rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] mt-10 mb-10">
            <h2 className="text-xl font-bold mb-2">Profile</h2>
            <p className="text-sm mb-4">
              Perbarui informasi akun Anda untuk pengalaman belanja yang lebih
              nyaman dan personal.
            </p>
            {/* GARIS HORIZONTAL TEBAL 2, WARNA #3A5B40 */}
            <hr className="border-t-2 border-[#3A5B40] mb-6" />

            <form onSubmit={handleSave} className="space-y-6">
              {/* Nama Lengkap */}
              <div>
                <label className="text-sm font-medium">Nama Lengkap</label>
                <input
                  type="text"
                  value={profileData.full_name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, full_name: e.target.value })
                  }
                  className="w-full bg-white py-3 px-4 rounded-[10px] mt-1 outline-none text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full bg-white py-3 px-4 rounded-[10px] mt-1 outline-none text-sm"
                />
              </div>

              {/* No. Telepon */}
              <div>
                <label className="text-sm font-medium">No. Telepon</label>
                <input
                  type="text"
                  value={profileData.phone_number}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone_number: e.target.value })
                  }
                  className="w-full bg-white py-3 px-4 rounded-[10px] mt-1 outline-none text-sm"
                />
              </div>

              {/* JENIS KELAMIN – custom radio + button putih */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Jenis Kelamin
                </label>

                <div className="flex flex-wrap gap-8">
                  {/* Perempuan */}
                  <div
                    onClick={() => setGender("Perempuan")}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 border-[#3A5B40] flex items-center justify-center ${
                        gender === "Perempuan"
                          ? "bg-[#3A5B40]/10"
                          : "bg-transparent"
                      }`}
                    >
                      {gender === "Perempuan" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3A5B40]" />
                      )}
                    </span>

                    <div className="bg-white rounded-[10px] px-10 py-2 min-w-[150px] text-center">
                      Perempuan
                    </div>
                  </div>

                  {/* Laki-Laki */}
                  <div
                    onClick={() => setGender("Laki-Laki")}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 border-[#3A5B40] flex items-center justify-center ${
                        gender === "Laki-Laki"
                          ? "bg-[#3A5B40]/10"
                          : "bg-transparent"
                      }`}
                    >
                      {gender === "Laki-Laki" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3A5B40]" />
                      )}
                    </span>

                    <div className="bg-white rounded-[10px] px-10 py-2 min-w-[150px] text-center">
                      Laki-Laki
                    </div>
                  </div>
                </div>
              </div>

              {/* Tanggal Lahir */}
              <div>
                <label className="text-sm font-medium">Tanggal Lahir</label>
                <input
                  type="date"
                  value={
                    profileData.birthday
                      ? new Date(profileData.birthday).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setProfileData({ ...profileData, birthday: e.target.value })
                  }
                  className="w-full bg-white py-3 px-4 rounded-[10px] mt-1 outline-none text-sm"
                />
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

      {/* POPUP SIMPAN – pakai variant success popup baru */}
      {showSuccessPopup && (
        <Popup
          variant="success"
          onClose={() => setShowSuccessPopup(false)}
          onConfirm={() => setShowSuccessPopup(false)}
        />
      )}

      {/* POPUP LOGOUT – pakai variant logout popup baru */}
      {showLogoutPopup && (
        <Popup
          variant="logout"
          onClose={closeLogoutPopup}
          onCancel={closeLogoutPopup}
          onConfirm={confirmLogout}
        />
      )}
    </div>
  );
};

export default ProfileMain;
