// src/pages/afterLogin/ProfileAddress.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Popup from "../../components/common/Popup";
import AddressModal from "./AddressModal";

// ICONS & IMAGES (samakan dengan ProfileMain)
import EditIcon from "../../assets/images/icons/edit.svg";
import ProfileIcon from "../../assets/images/icons/profile.svg";
import CheckIcon from "../../assets/images/icons/ceklis.svg";
import OutIcon from "../../assets/images/icons/out.svg";
import ProfilePhoto from "../../assets/images/icons/pp.svg";
import TrashIcon from "../../assets/images/icons/trash.svg";
import PencilIcon from "../../assets/images/icons/pensil.svg";

const ProfileAddress = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Dearni Lambardo Saragih",
      detail:
        "Jl. Kenanga No. 47, RT.03/RW.05, Kompleks Perumahan Sukamaju Indah, Kelurahan Sukamaju, Kecamatan Bogor Barat, Kota Bogor, Jawa Barat 16112.",
      isPrimary: true,
    },
    {
      id: 2,
      name: "Dearni Lambardo Saragih",
      detail:
        "Jl. Melati Indah Blok B2 No. 10, Perumahan Melati Asri, Kelurahan Helvetia, Kecamatan Medan Helvetia, Kota Medan, Sumatera Utara 20234.",
      isPrimary: false,
    },
    {
      id: 3,
      name: "Dearni Lambardo Saragih",
      detail:
        "Jl. Pahlawan II No. 88, Perumahan Taman Sari, Kelurahan Tanjung Rejo, Kecamatan Klojen, Kota Malang, Jawa Timur 65112.",
      isPrimary: false,
    },
    {
      id: 4,
      name: "Dearni Lambardo Saragih",
      detail:
        "Jl. Raya Sukamulia KM. 5, Desa Sukajaya, Kecamatan Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17550.",
      isPrimary: false,
    },
  ]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
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

  // upload foto profil
  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  // buka modal tambah alamat
  const openAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  // buka modal edit alamat
  const openEdit = (addr) => {
    setEditing(addr);
    setShowModal(true);
  };

  // hapus alamat dari list
  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  // set alamat utama
  const setPrimary = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isPrimary: a.id === id }))
    );
  };

  // simpan alamat baru / edit
  const saveAddress = (payload) => {
    if (editing) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editing.id
            ? {
                ...a,
                name: payload.name || a.name,
                detail: payload.detail,
                isPrimary: payload.isPrimary,
              }
            : payload.isPrimary
            ? { ...a, isPrimary: false }
            : a
        )
      );
    } else {
      const newId = Math.max(0, ...addresses.map((a) => a.id)) + 1;
      const newAddress = {
        id: newId,
        name: payload.name || "Dearni Lambardo Saragih",
        detail: payload.detail,
        isPrimary: payload.isPrimary || false,
      };
      setAddresses((prev) =>
        (payload.isPrimary
          ? prev.map((a) => ({ ...a, isPrimary: false }))
          : prev
        ).concat(newAddress)
      );
    }
    setShowModal(false);
    setShowSuccess(true);
  };

  // buka popup logout
  const handleLogout = () => setShowLogout(true);
  // tutup popup logout
  const closeLogoutPopup = () => setShowLogout(false);

  // konfirmasi logout
  const confirmLogout = () => {
    localStorage.removeItem("token");
    setShowLogout(false);
    navigate("/", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#FFFEF6] text-[#344E41] font-poppins flex flex-col">
      <NavbarAfterLogin />

      {/* MAIN CONTENT – sama layout dengan ProfileMain */}
      <div className="flex w-full mt-14 gap-8">
        {/* SIDEBAR – copy dari ProfileMain */}
        <div className="w-72 bg-white px-6 py-8 rounded-[10px] shadow flex flex-col overflow-y-auto min-h-[calc(100vh-56px)]">
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

            <p className="mt-3 font-semibold text-lg">{profileData.full_name || "Loading..."}</p>
            <p className="text-sm text-gray-600">{profileData.email}</p>
          </div>

          {/* MENU – sama persis ProfileMain */}
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

          {/* BUTTON KELUAR – sama dengan ProfileMain */}
          <button
            onClick={handleLogout}
            className="mt-20 self-center flex items-center justify-center gap-2 bg-[#3A5B40] px-8 py-2 rounded-[10px] text-sm font-semibold text-white hover:bg-[#314c35] transition"
          >
            <img src={OutIcon} alt="Keluar" className="w-4 h-4" />
            Keluar
          </button>
        </div>

        {/* CARD ALAMAT */}
        <div className="flex-1 mr-6 lg:mr-20 flex">
          <div className="w-full bg-[#B8D68F40] p-10 rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] mt-10 mb-10">
            {/* Header card: judul + button kanan */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold">Alamat Saya</h2>
              <button
                onClick={openAdd}
                className="flex items-center gap-2 bg-[#3A5B40] text-white px-5 py-2 rounded-[10px] text-sm font-semibold hover:bg-[#2a3e33] transition"
              >
                <span className="w-5 h-5 rounded-full border border-white flex items-center justify-center text-xs">
                  +
                </span>
                Tambahkan Alamat Baru
              </button>
            </div>

            {/* Garis hijau tebal 2px */}
            <hr className="border-t-2 border-[#3A5B40] mb-4" />

            {/* Label 'Alamat' bold di bawah garis */}
            <p className="text-sm font-semibold mb-4">Alamat</p>

            {/* List alamat */}
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white rounded-[10px] px-5 py-4 flex justify-between items-start shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                >
                  {/* Left: nama + detail */}
                  <div className="flex-1 pr-6">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        {addr.name}
                      </span>
                      {addr.isPrimary && (
                        <span className="text-xs text-[#344E41]">
                          Alamat Utama
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#222] leading-relaxed">
                      {addr.detail}
                    </p>
                  </div>

                  {/* Right: icons (edit & hapus) */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(addr)}
                        className="p-2 rounded-full hover:bg-[#F2F2F2] transition"
                        aria-label="Ubah alamat"
                      >
                        <img
                          src={PencilIcon}
                          alt="Edit"
                          className="w-4 h-4"
                        />
                      </button>
                      <button
                        onClick={() => removeAddress(addr.id)}
                        className="p-2 rounded-full hover:bg-[#F2F2F2] transition"
                        aria-label="Hapus alamat"
                      >
                        <img
                          src={TrashIcon}
                          alt="Hapus"
                          className="w-4 h-4"
                        />
                      </button>
                    </div>

                    {/* ❌ Atur sebagai utama dihapus sesuai request */}
                    {/* Jika tetap mau bisa panggil setPrimary(addr.id) di sini */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* POPUP SUKSES – pakai popup baru (variant success) */}
      {showSuccess && (
        <Popup
          variant="success"
          onClose={() => setShowSuccess(false)}
          onConfirm={() => setShowSuccess(false)}
        />
      )}

      {/* POPUP LOGOUT – pakai popup baru (variant logout) */}
      {showLogout && (
        <Popup
          variant="logout"
          onClose={closeLogoutPopup}
          onCancel={closeLogoutPopup}
          onConfirm={confirmLogout}
        />
      )}

      {/* MODAL TAMBAH / UBAH ALAMAT */}
      {showModal && (
        <AddressModal
          onClose={() => setShowModal(false)}
          onSave={saveAddress}
          initialData={editing}
          isEdit={!!editing} // penanda mode edit
        />
      )}
    </div>
  );
};

export default ProfileAddress;
