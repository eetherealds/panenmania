// src/admin/component/pages/AdminProducts.js
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialProducts = [
  {
    id: 1,
    name: "Beras Rojo Lele 5 Kg",
    category: "Beras",
    price: "Rp 75.0000",
    stock: 25,
    status: "available",
  },
  {
    id: 2,
    name: "Buah Naga Premium 1 Kg",
    category: "Buah",
    price: "Rp 75.0000",
    stock: 25,
    status: "unavailable",
  },
  {
    id: 3,
    name: "Beras Rojo Lele 5 Kg",
    category: "Beras",
    price: "Rp 75.0000",
    stock: 25,
    status: "available",
  },
  {
    id: 4,
    name: "Buah Naga Premium 1 Kg",
    category: "Buah",
    price: "Rp 75.0000",
    stock: 25,
    status: "unavailable",
  },
];

const AdminProducts = () => {
  const bgPage = "#FFFEF6";
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [currentSort, setCurrentSort] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageSize] = useState(10);

  // Fetch products based on sort
  const fetchProductsBySort = async (sortValue = null, page = 1) => {
    try {
      setLoadingProducts(true);
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.warn("No admin token found");
        setLoadingProducts(false);
        return;
      }

      let url = "https://pa-man-api.vercel.app/api/products/";

      // If sort is specified, use the sort endpoint
      if (sortValue) {
        url = `https://pa-man-api.vercel.app/api/products/category?sort=beras&page=${page}&limit=${pageSize}`;
      }


      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("API Response:", result, "Sort Value:", sortValue);
        let productsArray = [];

        // Handle the response structure
        if (result.data) {
          if (result.data.results && Array.isArray(result.data.results)) {
            // Products are in results array
            productsArray = result.data.results;
            setTotalProducts(result.data.total || result.data.results.length);
          } else if (Array.isArray(result.data)) {
            // If data is already an array
            productsArray = result.data;
            setTotalProducts(result.data.length);
          } else if (result.data.products && Array.isArray(result.data.products)) {
            // If products are nested in data.products
            productsArray = result.data.products;
            setTotalProducts(result.data.products.length);
          }
        }
        console.log("Products Array:", productsArray);

        // Format products for display
        const formattedProducts = productsArray.map((product) => ({
          id: product.id,
          name: product.name,
          category: product.category,
          price: `Rp ${product.price?.toLocaleString("id-ID") || 0}`,
          stock: product.stock,
          status: product.stock > 0 ? "available" : "unavailable",
          photo_url: product.photo_url,
          description: product.description,
          discounted_price: product.discounted_price,
        }));
        setProducts(formattedProducts);
        setCurrentPage(page);
      } else {
        console.error("Failed to fetch products:", response.status);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Initial fetch - all products
  useEffect(() => {
    fetchProductsBySort(null, 1);
  }, []);

  // dropdown filter
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortLabel, setSortLabel] = useState("Urutkan Berdasarkan");
  const [filterCategory, setFilterCategory] = useState("Semua Kategori");

  // checkbox select
  const [selectedProducts, setSelectedProducts] = useState([]);

  // modal delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handleSortSelect = async (value) => {
    let label = "Urutkan Berdasarkan";
    const sortValue = value === "Semua Kategori" ? null : value.toLowerCase().replace(" ", "-");

    // Map display values to API sort values
    if (value === "Semua Kategori") {
      setFilterCategory("Semua Kategori");
      label = "Urutkan Berdasarkan";
    } else {
      setFilterCategory(value);
      label = value;
    }

    setSortLabel(label);
    setIsSortOpen(false);

    // Fetch products with the selected sort
    await fetchProductsBySort(sortValue, 1);
  };

  // Since we're using API-based sorting, filteredProducts is just products
  const filteredProducts = products;

  // SELECT ALL logic
  const filteredIds = filteredProducts.map((p) => p.id);
  const isAllSelected =
    filteredIds.length > 0 &&
    filteredIds.every((id) => selectedProducts.includes(id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      // uncheck semua yang terlihat di filter
      setSelectedProducts((prev) =>
        prev.filter((id) => !filteredIds.includes(id))
      );
    } else {
      // tambahkan semua id yang terlihat
      setSelectedProducts((prev) => {
        const set = new Set(prev);
        filteredIds.forEach((id) => set.add(id));
        return Array.from(set);
      });
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // DELETE MODAL
  const openDeleteModal = (product) => {
    setDeleteTarget(product);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setDeleteTarget(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    
    setDeleteLoading(true);
    setDeleteError("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setDeleteError("Token tidak ditemukan");
        setDeleteLoading(false);
        return;
      }

      const response = await fetch(
        `https://pa-man-api.vercel.app/api/products/${deleteTarget.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Remove from products list
        setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setSelectedProducts((prev) => prev.filter((id) => id !== deleteTarget.id));
        closeDeleteModal();
        alert("Produk berhasil dihapus!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 400) {
          setDeleteError(
            "Produk tidak dapat dihapus karena sudah dipesan oleh pengguna"
          );
        } else {
          setDeleteError(
            errorData.message ||
              errorData.msg ||
              `Gagal menghapus produk (${response.status})`
          );
        }
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setDeleteError("Terjadi kesalahan saat menghapus produk");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: bgPage, fontFamily: '"Inter", sans-serif' }}
    >
      {/* SIDEBAR KIRI */}
      <aside
        className="
          w-[240px]
          bg-white
          flex flex-col
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
          <div className="text-base font-semibold text-[#3A5B40]">Produk</div>

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
            className="w-full max-w-5xl mx-auto bg-white rounded-[10px] px-4 sm:px-8 py-6"
            style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.10)" }}
          >
            {/* Header card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-sm font-semibold text-[#3A5B40]">
                Semua Produk
              </h2>

              <div className="flex items-center gap-3">
                {/* Tombol Tambahkan Produk */}
                <button
                  type="button"
                  onClick={() => navigate("/admin/products/add")}
                  className="
                    h-9 px-4
                    rounded-[10px]
                    text-xs
                    flex items-center gap-2
                    bg-white
                  "
                  style={{
                    border: "1px solid #3A5B40",
                    color: "#3A5B40",
                  }}
                >
                  Tambahkan Produk
                  <span className="text-base leading-none">+</span>
                </button>

                {/* Tombol Urutkan Berdasar + dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSortOpen((p) => !p)}
                    className="
                      h-9
                      px-4
                      rounded-[10px]
                      text-xs
                      flex items-center justify-between gap-2
                    "
                    style={{
                      backgroundColor: "rgba(88,129,87,0.75)", // #588157BF
                      border: "1px solid #3A5B40",
                      color: "#FFFFFF",
                      width: "180px", // FIXED WIDTH biar nggak geser
                    }}
                  >
                    <span className="truncate">{sortLabel}</span>
                    <span className="text-[10px]">▼</span>
                  </button>

                  {isSortOpen && (
                    <div
                      className="
                        absolute right-0 mt-1
                        w-[180px]
                        bg-white
                        rounded-[10px]
                        text-xs
                        overflow-hidden
                        z-10
                      "
                      style={{
                        boxShadow: "0 4px 6px rgba(0,0,0,0.10)",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      {["Semua Kategori", "Beras", "Buah", "Sayur", "In Stock", "Out of Stock"].map(
                        (opt) => (
                          <button
                            key={opt}
                            className="w-full text-left px-3 py-2 hover:bg-[#FFFEF6] text-[#3A5B40]"
                            onClick={() => handleSortSelect(opt)}
                          >
                            {opt}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* TABLE WRAPPER (BIAR RESPONSIF – SCROLL HORIZONTAL) */}
            <div className="overflow-x-auto">
              {/* Header tabel */}
              <div className="min-w-[800px]">
                <div className="text-[11px] font-semibold text-[#3A5B40] border-b border-[#E5E7EB] pb-3 mb-2">
                  <div className="grid grid-cols-[40px,3fr,2fr,2fr,1fr,2fr,2fr] items-center gap-2">
                    <div>
                      <input
                        type="checkbox"
                        className="accent-[#3A5B40]"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                      />
                    </div>
                    <div>Nama Produk</div>
                    <div>Kategori</div>
                    <div>Harga</div>
                    <div>Stock</div>
                    <div>Status</div>
                    <div>Aksi</div>
                  </div>
                </div>

                {/* List produk */}
                <div className="space-y-3 text-xs text-[#3A5B40]">
                  {filteredProducts.length === 0 && (
                    <div className="text-center text-[11px] text-[#3A5B40]/70 py-4">
                      Tidak ada produk pada kategori ini.
                    </div>
                  )}

                  {filteredProducts.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-[#E5E7EB] pb-3 last:border-b-0"
                    >
                      <div className="grid grid-cols-[40px,3fr,2fr,2fr,1fr,2fr,2fr] items-center gap-2">
                        {/* checkbox */}
                        <div>
                          <input
                            type="checkbox"
                            className="accent-[#3A5B40]"
                            checked={selectedProducts.includes(item.id)}
                            onChange={() => toggleSelectOne(item.id)}
                          />
                        </div>

                        {/* Nama + gambar kecil */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-[#F5F5F5] flex items-center justify-center">
                            <span className="text-[9px] text-[#3A5B40]">
                              IMG
                            </span>
                          </div>
                          <span>{item.name}</span>
                        </div>

                        {/* Kategori */}
                        <div>{item.category}</div>

                        {/* Harga */}
                        <div>{item.price}</div>

                        {/* Stok */}
                        <div>{item.stock}</div>

                        {/* Status badge */}
                        <div>
                          {item.status === "available" ? (
                            <span
                              className="px-3 py-1 rounded-[10px] text-[10px]"
                              style={{
                                backgroundColor: "rgba(49,114,32,0.8)", // #317220CC
                                color: "#FFFFFF",
                              }}
                            >
                              Stok Tersedia
                            </span>
                          ) : (
                            <span
                              className="px-3 py-1 rounded-[10px] text-[10px]"
                              style={{
                                backgroundColor: "rgba(150,53,44,0.8)", // #96352CCC
                                color: "#FFFFFF",
                              }}
                            >
                              Stok Tidak Tersedia
                            </span>
                          )}
                        </div>

                        {/* Aksi: Edit & Delete */}
                        <div className="flex items-center gap-3">
                          {/* Tombol Edit -> pindah ke halaman AdminAddProduct */}
                          <button
                            type="button"
                            className="
                              flex items-center gap-1
                              px-2 py-1
                              rounded-[8px]
                              text-[10px]
                            "
                            style={{
                              border: "1px solid #3A5B40",
                              color: "#3A5B40",
                              backgroundColor: "#FFFFFF",
                            }}
                            onClick={() => navigate("/admin/products/add")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="w-3 h-3"
                              fill="none"
                              stroke="#3A5B40"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
                            </svg>
                            <span>Edit</span>
                          </button>

                          {/* Tombol Delete */}
                          <button
                            type="button"
                            className="p-1"
                            onClick={() => openDeleteModal(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="w-4 h-4"
                              fill="none"
                              stroke="#96352C"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL DELETE */}
      {isDeleteOpen && deleteTarget && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
          {/* overlay – klik di luar tidak menutup modal */}
          <div className="absolute inset-0 bg-black/20" />

          <div
            className="
              relative
              w-full max-w-[420px]
              bg-white
              border-[3px] border-[#3A5B40]
              rounded-[15px]
              shadow-[0_4px_6px_rgba(0,0,0,0.1)]
              px-6 py-8
              text-center
            "
          >
            {/* Icon tempat sampah */}
            <div className="flex justify-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8 h-8"
                fill="none"
                stroke="#96352C"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>

            <h2 className="text-[18px] font-bold text-[#3A5B40] mb-2">
              Hapus Produk
            </h2>

            <p className="text-sm text-[#3A5B40] mb-6">
              Anda akan menghapus produk{" "}
              <span className="font-semibold">{deleteTarget.name}</span>.{" "}
              Apakah Anda yakin?
            </p>

            {/* ERROR MESSAGE */}
            {deleteError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
                {deleteError}
              </div>
            )}

            <div className="flex justify-center gap-4">
              <button
                type="button"
                disabled={deleteLoading}
                className="
                  h-[40px] px-6
                  rounded-[10px]
                  text-sm font-medium
                  bg-[#96352C]
                  text-white
                  hover:bg-[#7a2922]
                  transition
                  disabled:bg-gray-400 disabled:cursor-not-allowed
                "
                onClick={closeDeleteModal}
              >
                Tidak!
              </button>
              <button
                type="button"
                disabled={deleteLoading}
                className="
                  h-[40px] px-6
                  rounded-[10px]
                  text-sm font-medium
                  bg-[#3A5B40]
                  text-white
                  hover:bg-[#324c36]
                  transition
                  disabled:bg-gray-400 disabled:cursor-not-allowed
                "
                onClick={confirmDelete}
              >
                {deleteLoading ? "Menghapus..." : "Ya, Hapus!"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;