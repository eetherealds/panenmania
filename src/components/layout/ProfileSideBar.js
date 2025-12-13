import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import { useContext } from "react";

// ICONS & IMAGES
import EditIcon from "../../assets/images/icons/edit.svg";
import ProfileIcon from "../../assets/images/icons/profile.svg";
import CheckIcon from "../../assets/images/icons/ceklis.svg";
import OutIcon from "../../assets/images/icons/out.svg";
import ProfilePhoto from "../../assets/images/icons/pp.svg";

const ProfileSideBar = ({ profileData, loading, onLogout, onUploadPic }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchProfile, logout } = useContext(ProfileContext);
  const isActive = (path) => location.pathname === path;

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi file
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Format file harus JPG, JPEG, PNG, atau WEBP');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file maksimal 2MB');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      const formData = new FormData();
      formData.append('avatar', file);

      console.log("Uploading avatar...");
      const response = await fetch(
        'https://pa-man-api.vercel.app/api/user/edit-avatar',
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      console.log("Upload response:", response.status);
      if (response.ok) {
        const result = await response.json();
        console.log("Avatar API response:", result);
        if (result.status === 'Success') {
          // Tunggu fetchProfile selesai sebelum alert
          console.log("Fetching updated profile...");
          await fetchProfile();
          console.log("Profile refetch complete");
          alert('Avatar berhasil diupdate!');
        }
      } else {
        const error = await response.json().catch(() => ({}));
        console.error('Avatar upload error:', error);
        alert(error.message || 'Gagal upload avatar');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Terjadi kesalahan saat upload avatar');
    }
  };

  return (
    <div className="w-full lg:w-72 bg-white px-6 py-8 rounded-[10px] shadow flex flex-col overflow-y-auto min-h-[calc(100vh-56px)]">
      <div className="flex flex-col items-center text-center">
        {/* Profile Pic + Edit */}
        <label className="relative cursor-pointer inline-block">
          <input type="file" className="hidden" onChange={handleAvatarUpload} />
          <div className="w-40 h-40 bg-[#F2F2F2] rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={profileData?.avatar_url ? `${profileData.avatar_url}?t=${Date.now()}` : ProfilePhoto}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] flex items-center justify-center">
            <img src={EditIcon} alt="Edit" className="w-4 h-4" />
          </div>
        </label>

        <p className="mt-3 font-semibold text-lg">
          {loading ? "Loading..." : profileData?.full_name || "User"}
        </p>
        {profileData?.email && (
          <p className="text-sm text-gray-600">{profileData.email}</p>
        )}
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
        onClick={async () => {
          const result = await logout();
          if (result) {
            navigate("/");
          }
        }}
        className="mt-20 self-center flex items-center justify-center gap-2 bg-[#3A5B40] px-8 py-2 rounded-[10px] text-sm font-semibold text-white hover:bg-[#314c35] transition"
      >
        <img src={OutIcon} alt="Keluar" className="w-4 h-4" />
        Keluar
      </button>
    </div>
  );
};

export default ProfileSideBar;
