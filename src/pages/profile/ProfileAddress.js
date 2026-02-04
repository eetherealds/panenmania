// src/pages/afterLogin/ProfileAddress.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Popup from "../../components/common/Popup";
import AddressModal from "./AddressModal";
import ProfileSideBar from "../../components/layout/ProfileSideBar";

// ICONS & IMAGES
import TrashIcon from "../../assets/images/icons/trash.svg";
import PencilIcon from "../../assets/images/icons/pensil.svg";

const ProfileAddress = () => {
  const navigate = useNavigate();
  const { profileData, loading, logout } = useContext(ProfileContext);

  const [addresses, setAddresses] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  // fetch alamat dari API
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }

        setLoadingAddresses(true);
        const response = await fetch(
          "https://pa-man-api.vercel.app/api/user/address",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result.data && Array.isArray(result.data)) {
            const formattedAddresses = result.data.map((addr) => ({
              id: addr.id,
              name: addr.recipient_name,
              detail: `${addr.street}, ${addr.kecamatan}, ${addr.city}, ${addr.province} ${addr.postal_code}`,
              isPrimary: addr.is_default || false,
            }));
            setAddresses(formattedAddresses);
          }
        } else {
          console.error("Failed to fetch addresses:", response.status);
          if (response.status === 404) {
            console.warn("Address endpoint not available, continuing with empty addresses");
            setAddresses([]);
          }
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, [navigate]);

  const openAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  // buka modal edit alamat
  const openEdit = (addr) => {
    setEditing(addr);
    setShowModal(true);
  };

  // hapus alamat dari list + API call
  const deleteAddress = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      const response = await fetch(
        `https://pa-man-api.vercel.app/api/user/address/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Address deleted successfully:", result);
        // Hapus alamat dari list lokal
        setAddresses((prev) => prev.filter((a) => a.id !== id));
        setShowSuccess(true);
      } else {
        const error = await response.json().catch(() => ({}));
        console.error("Delete address error:", error);
        const errorMsg = error.message || error.msg || `API Error: ${response.status}`;
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Terjadi kesalahan saat menghapus alamat");
    }
  };

  const removeAddress = (id) => {
    // Tampilkan konfirmasi sebelum delete
    if (window.confirm("Apakah Anda yakin ingin menghapus alamat ini?")) {
      deleteAddress(id);
    }
  };

  // set alamat utama
  // eslint-disable-next-line no-unused-vars
  const _setPrimary = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isPrimary: a.id === id }))
    );
  };

  // simpan alamat baru / edit via API
  const saveAddress = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      // Format data untuk API
      const addressData = {
        recipient_name: payload.name,
        street: payload.street || "",
        kecamatan: payload.kecamatan || "",
        city: payload.city || "",
        province: payload.province || "",
        postal_code: payload.postal_code || "",
        detail: payload.detail || "",
      };

      const response = await fetch(
        "https://pa-man-api.vercel.app/api/user/address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addressData),
        }
      );

      console.log("Address request data:", addressData);

      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          // Tambah address baru ke list
          const newAddress = {
            id: result.data.id,
            name: result.data.recipient_name,
            detail: `${result.data.street}, ${result.data.kecamatan}, ${result.data.city}, ${result.data.province} ${result.data.postal_code}`,
            isPrimary: result.data.is_default || false,
          };
          setAddresses((prev) => [...prev, newAddress]);
          setShowModal(false);
          setShowSuccess(true);
        }
      } else {
        const error = await response.json().catch(() => ({}));
        console.error("Address API error:", error);
        if (response.status === 404) {
          alert("Endpoint alamat tidak tersedia di backend. Hubungi administrator.");
        } else {
          const errorMsg = error.message || error.msg || `API Error: ${response.status}`;
          alert(errorMsg);
        }
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Terjadi kesalahan saat menyimpan alamat");
    }
  };

  // buka popup logout
  const handleLogout = () => setShowLogout(true);
  // tutup popup logout
  const closeLogoutPopup = () => setShowLogout(false);

  // konfirmasi logout
  const confirmLogout = async () => {
    const result = await logout();
    setShowLogout(false);
    if (result) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFEF6] text-[#344E41] font-poppins flex flex-col">
      <NavbarAfterLogin />

      {/* MAIN CONTENT – sama layout dengan ProfileMain */}
      <div className="flex w-full mt-14 gap-8">
        {/* SIDEBAR – pakai komponen ProfileSideBar */}
        <ProfileSideBar
          profileData={profileData}
          loading={loading}
          onLogout={handleLogout}
        />

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
              {loadingAddresses ? (
                <p className="text-center text-gray-600 py-4">Memuat alamat...</p>
              ) : addresses.length === 0 ? (
                <p className="text-center text-gray-600 py-4">Tidak ada alamat. Silakan tambahkan alamat baru.</p>
              ) : (
                addresses.map((addr) => (
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
                ))
              )}
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
