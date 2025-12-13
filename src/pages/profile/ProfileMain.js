// src/pages/afterLogin/ProfileMain.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import { ProductsContext } from "../../context/ProductsContext";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Popup from "../../components/common/Popup";
import ProfileSideBar from "../../components/layout/ProfileSideBar";

// ICONS & IMAGES
import ProfilePhoto from "../../assets/images/icons/pp.svg";

const ProfileMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profileData, setProfileData, loading, fetchProfile, logout } = useContext(ProfileContext);
  const { products: allProducts, loading: loadingProducts } = useContext(ProductsContext);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  // Paginate products
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedProducts = allProducts.slice(startIdx, startIdx + pageSize);
  const totalPages = Math.ceil(allProducts.length / pageSize);
  
  // State terpisah untuk form editing (tidak langsung update profileData)
  const [editData, setEditData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    birthday: "",
  });
  const [editGender, setEditGender] = useState("");

  // Sync editData with profileData when data loads
  useEffect(() => {
    if (profileData && profileData.full_name) {
      const birthdayValue = profileData.birthday 
        ? profileData.birthday.split('T')[0] 
        : "";
      setEditData({
        full_name: profileData.full_name,
        email: profileData.email,
        phone_number: profileData.phone_number,
        gender: profileData.gender,
        birthday: birthdayValue,
      });
      setEditGender(profileData.gender);
    }
  }, [profileData]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      // Prepare data untuk API - hanya field yang diubah/ada nilai
      const updateData = {};

      // Add fields yang memiliki nilai
      if (editData.full_name) {
        updateData.full_name = editData.full_name;
      }
      if (editData.email) {
        updateData.email = editData.email;
      }
      if (editData.phone_number) {
        // Validate phone number format (10-20 digits only)
        if (!/^\d{10,20}$/.test(editData.phone_number.replace(/\D/g, ''))) {
          alert("Nomor telepon harus 10-20 digit angka");
          setSaving(false);
          return;
        }
        updateData.phone_number = editData.phone_number.replace(/\D/g, ''); // Remove non-digits
      }
      if (editGender) {
        updateData.gender = editGender;
      }
      if (editData.birthday) {
        updateData.birthday = editData.birthday; // Send as YYYY-MM-DD format
      }

      // Check if ada field yang akan diupdate
      if (Object.keys(updateData).length === 0) {
        alert("Tidak ada perubahan data untuk disimpan");
        setSaving(false);
        return;
      }

      console.log("Sending update data:", updateData);

      const response = await fetch(
        "https://pa-man-api.vercel.app/api/user/edit-profile-data",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.status === "Success") {
          // Update profileData hanya SETELAH berhasil
          setProfileData(result.data[0]);
          // Convert ISO date to YYYY-MM-DD format if needed
          const birthdayValue = result.data[0].birthday 
            ? result.data[0].birthday.split('T')[0] 
            : "";
          setEditData({
            full_name: result.data[0].full_name,
            email: result.data[0].email,
            phone_number: result.data[0].phone_number,
            gender: result.data[0].gender,
            birthday: birthdayValue,
          });
          setEditGender(result.data[0].gender);
          setShowSuccessPopup(true);
        }
      } else {
        const error = await response.json().catch(() => ({}));
        console.error("API Error Response:", error);
        const errorMsg = error.message || error.msg || `API Error: ${response.status}`;
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Terjadi kesalahan saat menyimpan");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => setShowLogoutPopup(true);
  const closeLogoutPopup = () => setShowLogoutPopup(false);

  const confirmLogout = async () => {
    const result = await logout();
    setShowLogoutPopup(false);
    if (result) {
      navigate("/", { replace: true });
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#FFFEF6] text-[#344E41] font-poppins flex flex-col">
      <NavbarAfterLogin />

      {/* MAIN CONTENT */}
      <div className="flex w-full mt-14 gap-8">
        {/* SIDEBAR */}
        <ProfileSideBar 
          profileData={profileData} 
          loading={loading}
          onLogout={handleLogout}
        />

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
                  value={editData.full_name}
                  onChange={(e) =>
                    setEditData({ ...editData, full_name: e.target.value })
                  }
                  className="w-full bg-white py-3 px-4 rounded-[10px] mt-1 outline-none text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="w-full bg-white py-3 px-4 rounded-[10px] mt-1 outline-none text-sm"
                />
              </div>

              {/* No. Telepon */}
              <div>
                <label className="text-sm font-medium">No. Telepon</label>
                <input
                  type="text"
                  value={editData.phone_number}
                  onChange={(e) =>
                    setEditData({ ...editData, phone_number: e.target.value })
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
                    onClick={() => {
                      setEditGender("Perempuan");
                    }}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 border-[#3A5B40] flex items-center justify-center ${
                        editGender === "Perempuan"
                          ? "bg-[#3A5B40]/10"
                          : "bg-transparent"
                      }`}
                    >
                      {editGender === "Perempuan" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3A5B40]" />
                      )}
                    </span>

                    <div className="bg-white rounded-[10px] px-10 py-2 min-w-[150px] text-center">
                      Perempuan
                    </div>
                  </div>

                  {/* Laki-Laki */}
                  <div
                    onClick={() => {
                      setEditGender("Laki");
                    }}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 border-[#3A5B40] flex items-center justify-center ${
                        editGender === "Laki"
                          ? "bg-[#3A5B40]/10"
                          : "bg-transparent"
                      }`}
                    >
                      {editGender === "Laki" && (
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
                  value={editData.birthday || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, birthday: e.target.value })
                  }
                  className="w-full bg-white py-3 px-4 rounded-[10px] mt-1 outline-none text-sm"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#344E41] text-white font-semibold px-8 py-2 rounded-[10px] hover:bg-[#2a3e33] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* PRODUK REKOMENDASI SECTION */}
      <div className="w-full px-6 lg:px-20 py-12 bg-[#F8FAF7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#344E41] mb-8">Produk untuk Anda</h2>
          
          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 mb-8">
            {paginatedProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div className="bg-white rounded-3xl shadow-[0_4px_10px_rgba(0,0,0,0.08)] border border-[#E0E6D8] hover:shadow-xl transition-all duration-200 cursor-pointer w-full">
                  <div className="w-full bg-[#F4F8F1] rounded-t-3xl p-6 h-[190px] flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full object-contain"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="text-[#344E41] font-bold text-[15px] sm:text-[17px] mb-2">
                      {product.name}
                    </h3>

                    <p className="text-[#3A5A40] text-[12px] sm:text-[13px] mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    <p className="text-[#344E41] font-bold text-[15px] sm:text-[16px]">
                      {product.priceFormatted}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {paginatedProducts.length === 0 && !loadingProducts && (
              <div className="col-span-full text-center text-sm text-[#3A5A40]/70 mt-6">
                Tidak ada produk tersedia.
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-[#3A5B40] text-[#3A5B40] hover:bg-[#3A5B40] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ← Sebelumnya
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg border transition ${
                    currentPage === page
                      ? "bg-[#3A5B40] text-white border-[#3A5B40]"
                      : "border-[#3A5B40] text-[#3A5B40] hover:bg-[#3A5B40]/10"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-[#3A5B40] text-[#3A5B40] hover:bg-[#3A5B40] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Berikutnya →
              </button>
            </div>
          )}
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
