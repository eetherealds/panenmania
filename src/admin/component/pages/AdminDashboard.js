// src/admin/component/pages/AdminDashboard.js
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../../context/AdminContext";

const AdminDashboard = () => {
  const bgPage = "#FFFEF6";
  const primary = "#3A5B40";
  const navigate = useNavigate();
  const { logout } = useContext(AdminContext);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [topProducts, setTopProducts] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  // Fetch top products and categories
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          console.warn("No admin token found");
          setLoadingAnalytics(false);
          return;
        }

        const response = await fetch(
          "https://pa-man-api.vercel.app/api/admin/top-products-categories",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result.data) {
            // Set top 3 products
            if (result.data.productsPayload?.top3Products) {
              setTopProducts(result.data.productsPayload.top3Products);
            }
            // Set top 3 categories
            if (result.data.categoriesPayload?.top3Categories) {
              setTopCategories(result.data.categoriesPayload.top3Categories);
            }
          }
        } else {
          console.error("Failed to fetch analytics:", response.status);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoadingAnalytics(false);
      }
    };

    fetchAnalytics();
  }, []);

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
          boxShadow: "0 4px 6px rgba(0,0,0,0.10)", // Soft/10
        }}
      >
        {/* Logo + nama */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-[#E5E7EB]">
          <div className="w-10 h-10 rounded-full bg-[#3A5B40]/10 border border-[#3A5B40] flex items-center justify-center">
            <span className="text-[10px] text-[#3A5B40]">LOGO</span>
          </div>
          <span className="font-semibold text-[#3A5B40]">Panen Mania</span>
        </div>

        {/* Menu (sementara, pakai navigate) */}
        <nav className="flex-1 px-4 py-6 space-y-3 text-sm text-[#3A5B40]">
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-[#FFFEF6] font-semibold"
            onClick={() => navigate("/admin/dashboard")}
          >
            <span>Beranda</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#FFFEF6]"
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
        {/* TOP BAR PUTIH DENGAN SHADOW */}
        <header
          className="w-full px-8 py-4 flex items-center justify-between bg-white"
          style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.10)" }} // Soft/10
        >
          {/* Teks BERANDA di top bar */}
          <div className="text-base font-semibold text-[#3A5B40]">
            Beranda
          </div>

          {/* Search + profile placeholder */}
          <div className="flex items-center gap-3 max-w-xl w-full">
            {/* Kolom Cari */}
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
                  backgroundColor: "rgba(88,129,87,0.15)", // #588157 15%
                  color: "#3A5B40",
                }}
              />
            </div>

            {/* Tombol search: icon saja warna #3A5B40 */}
            <button
              type="button"
              className="h-10 w-10 flex items-center justify-center"
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

            {/* Profile placeholder (nanti dari backend) */}
            <button
              onClick={() => setShowLogoutPopup(true)}
              className="w-9 h-9 rounded-full bg-[#3A5B40]/10 border border-[#3A5B40]/40 hover:bg-[#3A5B40]/20 transition"
              title="Logout"
            />
          </div>
        </header>

        {/* LOGOUT POPUP */}
        {showLogoutPopup && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold text-[#3A5B40] mb-2">
                Konfirmasi Logout
              </h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin logout?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutPopup(false)}
                  className="flex-1 px-4 py-2 border border-[#3A5B40] text-[#3A5B40] rounded-md hover:bg-[#3A5B40]/5 transition"
                >
                  Batal
                </button>
                <button
                  onClick={async () => {
                    const result = await logout();
                    setShowLogoutPopup(false);
                    if (result) {
                      navigate("/admin/login");
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-[#3A5B40] text-white rounded-md hover:bg-[#2c4a34] transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 px-10 py-8 space-y-8">
          {/* Greeting + cards */}
          <div>
            <h2 className="text-lg font-semibold text-[#3A5B40] mb-6">
              Selamat Pagi, Dearni!
            </h2>

            {/* Row kartu 7000+ */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Petani Terdaftar" },
                { label: "Desa Terdaftar" },
                { label: "Pengguna Terdaftar" },
                { label: "Total Pesanan" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="
                    rounded-[10px]
                    flex flex-col items-center justify-center
                    h-32
                    text-[#3A5B40]
                  "
                  style={{
                    backgroundColor: "rgba(88,129,87,0.25)", // #588157 25%
                  }}
                >
                  {/* Icon placeholder */}
                  <div className="mb-2 w-7 h-7 rounded-md bg-white/40" />
                  <div className="text-lg font-bold">7000 +</div>
                  <div className="text-[11px] mt-1">{item.label}</div>
                </div>
              ))}
            </section>
          </div>

          {/* GRAFIK PENJUALAN */}
          <section>
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-[#3A5B40]">
                Penjualan Bulan November
              </h3>
              <div className="h-[1px] w-full bg-[#3A5B40] mt-2" />
            </div>

            <div className="w-full h-64">
              <svg viewBox="0 0 650 260" className="w-full h-full">
                {/* Label harga di kiri (Rp ...) */}
                {[
                  { label: "Rp 15.000.000", y: 40 },
                  { label: "Rp 10.000.000", y: 90 },
                  { label: "Rp 5.000.000", y: 140 },
                  { label: "Rp 1.000.000", y: 190 },
                ].map((tick, i) => (
                  <text
                    key={i}
                    x={20}
                    y={tick.y + 3}
                    fontSize="10"
                    fill={primary}
                  >
                    {tick.label}
                  </text>
                ))}

                {/* Grid horizontal (geser ke kanan, mulai x=110) */}
                {[40, 90, 140, 190].map((y, i) => (
                  <line
                    key={i}
                    x1="110"
                    x2="620"
                    y1={y}
                    y2={y}
                    stroke="#B8D68F"
                    strokeWidth="1"
                  />
                ))}

                {/* Axis horizontal & vertical (juga mulai x=110) */}
                <line
                  x1="110"
                  y1="210"
                  x2="620"
                  y2="210"
                  stroke="#B8D68F"
                  strokeWidth="1.5"
                />
                <line
                  x1="110"
                  y1="30"
                  x2="110"
                  y2="210"
                  stroke="#B8D68F"
                  strokeWidth="1"
                />

                {/* Area + line chart */}
                <defs>
                  <linearGradient
                    id="salesGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#3A5B40" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#B8D68F" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* area: semua titik digeser 50px ke kanan (dari 60 → 110) */}
                <path
                  d="
                    M 110 205
                    C 170 204, 230 203, 280 202
                    C 320 200, 360 198, 390 195
                    C 420 193, 450 195, 480 190
                    C 510 185, 550 150, 610 90
                    L 610 210
                    L 110 210 Z
                  "
                  fill="url(#salesGradient)"
                  stroke="none"
                />

                {/* line: sama dengan area, tanpa fill */}
                <path
                  d="
                    M 110 205
                    C 170 204, 230 203, 280 202
                    C 320 200, 360 198, 390 195
                    C 420 193, 450 195, 480 190
                    C 510 185, 550 150, 610 90
                  "
                  fill="none"
                  stroke="#B8D68F"
                  strokeWidth="2"
                />

                {/* Label bulan (JUL–DEC) di bawah, sejajar dengan titik x */}
                {["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map(
                  (m, idx) => (
                    <text
                      key={m}
                      x={140 + idx * 80} // sejajar dengan grafik
                      y={230}
                      fontSize="10"
                      fill="#B8D68F"
                    >
                      {m}
                    </text>
                  )
                )}
              </svg>
            </div>
          </section>

          {/* PRODUK TERLARIS & KATEGORI TERLARIS */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Produk Terlaris */}
            <div
              className="bg-white rounded-[10px] p-6"
              style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.10)" }} // Soft/10
            >
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-[#3A5B40]">
                  Produk Terlaris
                </h3>
                <div className="h-[1px] w-full bg-[#3A5B40] mt-2" />
              </div>

              <div className="space-y-4 text-xs text-[#3A5B40]">
                {loadingAnalytics ? (
                  <p className="text-gray-500">Loading...</p>
                ) : topProducts.length > 0 ? (
                  topProducts.map((product, idx) => {
                    // Calculate percentage based on first product (max)
                    const maxSold = topProducts[0]?.total_sold || 1;
                    const percentage = (product.total_sold / maxSold) * 100;

                    return (
                      <div key={idx} className="flex items-center gap-3">
                        {/* teks kiri */}
                        <div className="w-1/3">{product.name}</div>

                        {/* bar tengah */}
                        <div className="flex-1">
                          <div className="w-full h-2 rounded-full bg-[#E5E7EB]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${percentage}%`,
                                background:
                                  "linear-gradient(90deg,#B8D68F 0%,#5A9F68 100%)",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                              }}
                            />
                          </div>
                        </div>

                        {/* teks kanan */}
                        <div className="w-[80px] text-right">
                          {product.total_sold} Produk
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">Tidak ada data produk</p>
                )}
              </div>
            </div>

            {/* Kategori Terlaris */}
            <div
              className="bg-white rounded-[10px] p-6"
              style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.10)" }} // Soft/10
            >
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-[#3A5B40]">
                  Kategori Terlaris
                </h3>
                <div className="h-[1px] w-full bg-[#3A5B40] mt-2" />
              </div>

              <div className="space-y-4 text-xs text-[#3A5B40]">
                {loadingAnalytics ? (
                  <p className="text-gray-500">Loading...</p>
                ) : topCategories.length > 0 ? (
                  topCategories.map((category, idx) => {
                    // Calculate percentage based on first category (max)
                    const maxCount = topCategories[0]?.count || 1;
                    const percentage = (category.count / maxCount) * 100;

                    return (
                      <div key={idx} className="flex items-center gap-3">
                        {/* teks kiri */}
                        <div className="w-1/3">{category.name}</div>

                        {/* bar tengah */}
                        <div className="flex-1">
                          <div className="w-full h-2 rounded-full bg-[#E5E7EB]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${percentage}%`,
                                background:
                                  "linear-gradient(90deg,#B8D68F 0%,#5A9F68 100%)",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                              }}
                            />
                          </div>
                        </div>

                        {/* teks kanan */}
                        <div className="w-[80px] text-right">
                          {category.count} Pesanan
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">Tidak ada data kategori</p>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;