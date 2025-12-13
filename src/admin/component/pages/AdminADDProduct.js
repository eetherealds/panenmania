// src/admin/component/pages/AdminAddProduct.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* ---------- CUSTOM DROPDOWN: KATEGORI ---------- */

const CategoryDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const label = value || "Pilih Kategori";

  const handleSelect = (val) => {
    if (val === "Batal") {
      onChange("");
    } else {
      onChange(val);
    }
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="
          w-full h-[44px]
          rounded-md
          px-3
          text-sm
          flex items-center justify-between
          outline-none
        "
        style={{
          backgroundColor: "#3A5B40",
          border: "1px solid #3A5B40",
          color: "#FFFFFF",
        }}
      >
        <span className="truncate">
          {label === "" ? "Pilih Kategori" : label}
        </span>
        <span
          className={`text-xs transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {/* Menu */}
      {open && (
        <div
          className="
            absolute left-0 mt-1
            w-full
            bg-white
            rounded-md
            text-sm
            overflow-hidden
            z-20
          "
          style={{
            boxShadow: "0 4px 6px rgba(0,0,0,0.10)",
            border: "1px solid #E5E7EB",
          }}
        >
          {["Beras", "Buah", "Sayur", "Batal"].map((opt) => (
            <button
              key={opt}
              type="button"
              className="
                w-full
                flex items-center
                px-3 py-2
                hover:bg-[#FFFEF6]
                text-[#3A5B40]
              "
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------- CUSTOM DROPDOWN: STOK STATUS ---------- */

const StockStatusDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  // mapping status -> label & warna bar
  const getConfig = (status) => {
    if (status === "available") {
      return {
        label: "Stok Tersedia",
        bg: "#317220",
        accent: "#317220",
      };
    }
    if (status === "unavailable") {
      return {
        label: "Stok Tidak Tersedia",
        bg: "#96352C",
        accent: "#96352C",
      };
    }
    // placeholder
    return {
      label: "Pilih Stok",
      bg: "#3A5B40",
      accent: "#3A5B40",
    };
  };

  const config = getConfig(value);

  const handleSelect = (status) => {
    if (status === "batal") {
      onChange("");
    } else {
      onChange(status);
    }
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="
          w-full h-[44px]
          rounded-md
          px-3
          text-sm
          flex items-center justify-between
          outline-none
        "
        style={{
          backgroundColor: config.bg,
          border: "1px solid #3A5B40",
          color: "#FFFFFF",
        }}
      >
        <span className="truncate">{config.label}</span>
        <span
          className={`text-xs transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {/* Menu */}
      {open && (
        <div
          className="
            absolute left-0 mt-1
            w-full
            bg-white
            rounded-md
            text-sm
            overflow-hidden
            z-20
          "
          style={{
            boxShadow: "0 4px 6px rgba(0,0,0,0.10)",
            border: "1px solid #E5E7EB",
          }}
        >
          {/* Stok Tersedia */}
          <button
            type="button"
            className="
              w-full flex items-center
              px-3 py-2
              hover:bg-[#FFFEF6]
              text-[#3A5B40]
            "
            onClick={() => handleSelect("available")}
          >
            <span
              className="inline-block h-4 w-1 rounded-full mr-2"
              style={{ backgroundColor: "#317220" }}
            />
            Stok Tersedia
          </button>

          {/* Stok Tidak Tersedia */}
          <button
            type="button"
            className="
              w-full flex items-center
              px-3 py-2
              hover:bg-[#FFFEF6]
              text-[#3A5B40]
            "
            onClick={() => handleSelect("unavailable")}
          >
            <span
              className="inline-block h-4 w-1 rounded-full mr-2"
              style={{ backgroundColor: "#96352C" }}
            />
            Stok Tidak Tersedia
          </button>

          {/* Batal (reset) */}
          <button
            type="button"
            className="
              w-full flex items-center
              px-3 py-2
              hover:bg-[#FFFEF6]
              text-[#3A5B40]
            "
            onClick={() => handleSelect("batal")}
          >
            <span
              className="inline-block h-4 w-1 rounded-full mr-2"
              style={{ backgroundColor: "rgba(58,91,64,0.3)" }}
            />
            Batal
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------- HALAMAN TAMBAHKAN / EDIT PRODUK ---------- */

const AdminAddProduct = () => {
  const bgPage = "#FFFEF6";
  const navigate = useNavigate();
  const location = useLocation();

  // DATA DARI HALAMAN PRODUCTS (KETIKA EDIT)
  const editingProduct = location.state?.product || null;

  // MODE EDIT / ADD
  const [isEditMode] = useState(!!editingProduct);
  const [productId] = useState(editingProduct?.id ?? null);

  // STATE FORM (prefill jika edit)
  const [form, setForm] = useState(() => {
    if (!editingProduct) {
      return {
        name: "",
        description: "",
        category: "",
        price: "",
        discountPrice: "",
        stock: "",
        stockStatus: "",
      };
    }

    return {
      name: editingProduct.name || "",
      description: editingProduct.description || "",
      category: editingProduct.category || "",
      price: editingProduct.price || "",
      discountPrice: editingProduct.discountPrice || "",
      stock:
        typeof editingProduct.stock === "number"
          ? String(editingProduct.stock)
          : editingProduct.stock || "",
      stockStatus: editingProduct.status || "",
    };
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validation
      if (!form.name || form.name.length < 3 || form.name.length > 255) {
        setError("Nama produk harus 3-255 karakter");
        setLoading(false);
        return;
      }

      if (!form.price) {
        setError("Harga harus diisi");
        setLoading(false);
        return;
      }

      if (form.stock === "") {
        setError("Stok harus diisi");
        setLoading(false);
        return;
      }

      if (!form.description || form.description.length > 4000) {
        setError("Deskripsi harus diisi dan maksimal 4000 karakter");
        setLoading(false);
        return;
      }

      if (!form.category) {
        setError("Kategori harus dipilih");
        setLoading(false);
        return;
      }

      if (!photo) {
        setError("Foto produk harus diupload");
        setLoading(false);
        return;
      }

      // Create FormData
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("stock", form.stock);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("category", form.category);
      if (form.discountPrice) {
        formData.append("discounted_price", form.discountPrice);
      }
      formData.append("photo", photo);
      console.log("category", form.category);

      // Get token
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Token tidak ditemukan");
        setLoading(false);
        return;
      }

      // API Call
      const response = await fetch("https://pa-man-api.vercel.app/api/products/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Produk berhasil ditambahkan!");
        navigate("/admin/products");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(
          errorData.message ||
            errorData.msg ||
            `Gagal menambahkan produk (${response.status})`
        );
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Terjadi kesalahan saat menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = isEditMode ? "Edit Produk" : "Tambahkan Produk";

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: bgPage, fontFamily: '"Inter", sans-serif' }}
    >
      {/* SIDEBAR KIRI */}
      <aside
        className="
          hidden md:flex
          w-[240px]
          bg-white
          flex-col
          border-r border-[#E5E7EB]
        "
        style={{
          boxShadow: "0 4px 6px rgba(0,0,0,0.10)",
        }}
      >
        {/* Logo + nama */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-[#E5E7EB]">
          <div className="w-10 h-10 rounded-full bg-[#3A5B40]/10 border border-[#3A5B40] flex items-center justify-center">
            <span className="text-[10px] text-[#3A5B40]">LOGO</span>
          </div>
          <span className="font-semibold text-[#3A5B40]">Panen Mania</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-3 text-sm text-[#3A5B40]">
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#FFFEF6]"
            onClick={() => navigate("/admin/dashboard")}
          >
            <span>Beranda</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-[#FFFEF6] font-semibold"
            onClick={() => navigate("/admin/products")}
          >
            <span>Produk</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#FFFEF6]"
            onClick={() => navigate("/admin/orders")}
          >
            <span>Pesanan</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#FFFEF6]"
            onClick={() => navigate("/admin/users")}
          >
            <span>Pengguna</span>
          </button>
        </nav>
      </aside>

      {/* BAGIAN KANAN */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header
          className="w-full px-4 sm:px-8 py-4 flex items-center justify-between bg-white"
          style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.10)" }}
        >
          <div className="text-base font-semibold text-[#3A5B40]">
            {pageTitle}
          </div>

          <div className="flex items-center gap-3 max-w-xl w-full">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari sesuatu ..."
                className="
                  w-full h-10
                  rounded-[10px]
                  px-4
                  text-sm
                  placeholder-[#3A5B40]
                  outline-none
                  border border-transparent
                "
                style={{
                  backgroundColor: "rgba(88,129,87,0.15)",
                  color: "#3A5B40",
                }}
              />
            </div>

            <button
              type="button"
              className="hidden sm:flex h-10 w-10 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3A5B40"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </button>

            <div className="hidden sm:block w-9 h-9 rounded-full bg-[#3A5B40]/10 border border-[#3A5B40]/40" />
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 px-4 sm:px-10 py-8">
          <div
            className="
              w-full max-w-5xl mx-auto
              bg-white rounded-[15px]
              px-4 sm:px-8 py-8 sm:py-10
            "
            style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.10)" }}
          >
            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* ATAS: Informasi Umum + Upload */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Informasi Umum Produk */}
                <section>
                  <h2 className="text-sm sm:text-base font-semibold text-[#3A5B40] mb-6">
                    Informasi Umum Produk
                  </h2>

                  {/* Nama Produk */}
                  <div className="mb-4 flex flex-col gap-2">
                    <label className="text-sm text-[#3A5B40]">
                      Nama Produk
                    </label>
                    <input
                      type="text"
                      placeholder="Ketik nama produk ..."
                      className="
                        w-full h-[44px]
                        border border-[#3A5B40]
                        rounded-md
                        px-3
                        text-sm text-[#3A5B40]
                        outline-none
                        focus:ring-1 focus:ring-[#3A5B40]
                      "
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>

                  {/* Deskripsi Produk */}
                  <div className="mb-4 flex flex-col gap-2">
                    <label className="text-sm text-[#3A5B40]">
                      Deskripsi Produk
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Ketik deskripsi produk ..."
                      className="
                        w-full
                        border border-[#3A5B40]
                        rounded-md
                        px-3 py-2
                        text-sm text-[#3A5B40]
                        outline-none
                        resize-none
                        focus:ring-1 focus:ring-[#3A5B40]
                      "
                      value={form.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    />
                  </div>

                  {/* Kategori - custom dropdown */}
                  <div className="mb-2 flex flex-col gap-2">
                    <label className="text-sm text-[#3A5B40]">Kategori</label>
                    <CategoryDropdown
                      value={form.category}
                      onChange={(val) => handleChange("category", val)}
                    />
                  </div>
                </section>

                {/* Upload Gambar Produk */}
                <section>
                  <h2 className="text-sm sm:text-base font-semibold text-[#3A5B40] mb-6">
                    Unggah Gambar Produk
                  </h2>

                  <p className="text-xs text-[#3A5B40] mb-3">
                    Unggah gambar untuk ditampilkan dalam katalog.
                  </p>

                  {/* Dropzone – background putih */}
                  {photoPreview ? (
                    <div className="w-full rounded-md border border-[#3A5B40] bg-white p-4">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPhoto(null);
                          setPhotoPreview(null);
                        }}
                        className="mt-3 h-9 px-4 rounded-md text-sm bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Hapus Foto
                      </button>
                    </div>
                  ) : (
                    <div
                      className="
                        w-full
                        rounded-md
                        border border-dashed border-[#3A5B40]
                        bg-white
                        flex flex-col items-center justify-center
                        text-center
                        px-4
                        py-10 sm:py-14
                      "
                    >
                      <div className="mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-8 h-8 mx-auto"
                          fill="none"
                          stroke="#3A5B40"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 16.5A4.5 4.5 0 018.5 12H10" />
                          <path d="M15.5 7A3.5 3.5 0 0012 3.5 3.5 3.5 0 008.5 7" />
                          <path d="M12 12v7" />
                          <path d="M9.5 14.5L12 12l2.5 2.5" />
                          <path d="M4 16.5A4.5 4.5 0 008.5 21h7a4.5 4.5 0 004.5-4.5" />
                        </svg>
                      </div>

                      <p className="text-[11px] text-[#3A5B40] mb-3 max-w-xs">
                        Select a file or drag and drop here
                        <br />
                        JPG or PNG, file size no more than 10MB
                      </p>

                      <label className="mt-1">
                        <input
                          type="file"
                          accept="image/jpeg,image/png"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.currentTarget.parentElement.querySelector("input").click();
                          }}
                          className="
                            h-9 px-5
                            rounded-[999px]
                            text-xs
                            bg-[#3A5B40]
                            text-white
                            hover:bg-[#324c36]
                            transition
                            cursor-pointer
                          "
                        >
                          Browse File
                        </button>
                      </label>
                    </div>
                  )}
                </section>
              </div>

              {/* HARGA & STOK */}
              <section className="space-y-6">
                <h2 className="text-sm sm:text-base font-semibold text-[#3A5B40]">
                  Harga &amp; Stok Produk
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Harga Normal */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#3A5B40]">
                      Harga Normal
                    </label>
                    <input
                      type="text"
                      placeholder="Ketik harga normal ..."
                      className="
                        w-full h-[44px]
                        border border-[#3A5B40]
                        rounded-md
                        px-3
                        text-sm text-[#3A5B40]
                        outline-none
                        focus:ring-1 focus:ring-[#3A5B40]
                      "
                      value={form.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                    />
                  </div>

                  {/* Harga Diskon */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#3A5B40]">
                      Harga Diskon
                    </label>
                    <input
                      type="text"
                      placeholder="Ketik harga diskon ..."
                      className="
                        w-full h-[44px]
                        border border-[#3A5B40]
                        rounded-md
                        px-3
                        text-sm text-[#3A5B40]
                        outline-none
                        focus:ring-1 focus:ring-[#3A5B40]
                      "
                      value={form.discountPrice}
                      onChange={(e) =>
                        handleChange("discountPrice", e.target.value)
                      }
                    />
                  </div>

                  {/* Stok Produk */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#3A5B40]">
                      Stok Produk
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Ketik stok produk ..."
                      className="
                        w-full h-[44px]
                        border border-[#3A5B40]
                        rounded-md
                        px-3
                        text-sm text-[#3A5B40]
                        outline-none
                        focus:ring-1 focus:ring-[#3A5B40]
                      "
                      value={form.stock}
                      onChange={(e) => handleChange("stock", e.target.value)}
                    />
                  </div>

                  {/* Stok Status - custom dropdown */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#3A5B40]">
                      Stok Status
                    </label>
                    <StockStatusDropdown
                      value={form.stockStatus}
                      onChange={(val) => handleChange("stockStatus", val)}
                    />
                  </div>
                </div>
              </section>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  disabled={loading}
                  className="
                    h-[44px] px-6
                    rounded-md
                    text-sm font-medium
                    bg-[#96352C]
                    text-white
                    hover:bg-[#7a2922]
                    transition
                    disabled:bg-gray-400 disabled:cursor-not-allowed
                  "
                  onClick={() => navigate("/admin/products")}
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    h-[44px] px-6
                    rounded-md
                    text-sm font-medium
                    bg-[#3A5B40]
                    text-white
                    hover:bg-[#324c36]
                    transition
                    disabled:bg-gray-400 disabled:cursor-not-allowed
                  "
                >
                  {loading ? "Loading..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAddProduct;