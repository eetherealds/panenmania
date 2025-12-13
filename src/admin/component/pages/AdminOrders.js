// src/admin/component/pages/AdminOrders.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ICONS (sesuaikan path kalau beda di project-mu)
import deliveryIcon from "../../../assets/images/icons/delivery.png";
import dollarIcon from "../../../assets/images/icons/dollar.png";
import likeIcon from "../../../assets/images/icons/like.png";
import orderIcon from "../../../assets/images/icons/order.png";
import packageIcon from "../../../assets/images/icons/package.png";

const AdminOrders = () => {
  const bgPage = "#FFFEF6";
  const navigate = useNavigate();

  // ================= DATA DUMMY =================
  const initialOrders = [
    {
      id: "PNM-20230101-001",
      email: "dearnils@gmail.com",
      status: "Pembayaran Dikonfirmasi",
      total: 300000,
      dateTime: "03/12/2025 08:45:45 AM",
      customerName: "Full Name",
      phone: "(+62)",
      addressDescription:
        "Premium 5 kg merupakan beras yang diproses dengan baik sehingga menghasilkan beras premium yang sangat pulen dan sehat",
      productName: "Belimbing fresh 500g",
      quantity: 1,
      price: 19000,
      shipping: 2500,
      packing: 1000,
    },
    {
      id: "PNM-20230101-002",
      email: "dearnils@gmail.com",
      status: "Pesanan Dibuat",
      total: 300000,
      dateTime: "04/12/2025 09:30:10 AM",
      customerName: "Full Name",
      phone: "(+62)",
      addressDescription:
        "Premium 5 kg merupakan beras yang diproses dengan baik sehingga menghasilkan beras premium yang sangat pulen dan sehat",
      productName: "Belimbing fresh 500g",
      quantity: 1,
      price: 19000,
      shipping: 2500,
      packing: 1000,
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [selectedIds, setSelectedIds] = useState([]); // checkbox
  const [selectedOrder, setSelectedOrder] = useState(null); // detail view

  // modal hapus
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // daftar status sesuai desain dropdown
  const statusOptions = [
    "Pembayaran Dikonfirmasi",
    "Pesanan Dibuat",
    "Pesanan Dikirim",
    "Selesai",
  ];

  const allChecked = selectedIds.length === orders.length && orders.length > 0;

  // ========= HELPERS =========
  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);

  // warna select berdasarkan status (sesuai desain)
  const getSelectStyles = (status) => {
    if (!status) {
      return {
        backgroundColor: "#3A5B40",
        color: "#FFFFFF",
        borderColor: "#3A5B40",
      };
    }

    switch (status) {
      case "Pembayaran Dikonfirmasi":
        return {
          backgroundColor: "#FFF89D",
          color: "#3A5B40",
          borderColor: "#FFF89D",
        };
      case "Pesanan Dibuat":
        return {
          backgroundColor: "#FFCC85",
          color: "#3A5B40",
          borderColor: "#FFCC85",
        };
      case "Pesanan Dikirim":
        return {
          backgroundColor: "#AFD6FF",
          color: "#3A5B40",
          borderColor: "#AFD6FF",
        };
      case "Selesai":
        return {
          backgroundColor: "rgba(49,114,32,0.8)", // #317220CC
          color: "#FFFFFF",
          borderColor: "rgba(49,114,32,0.8)",
        };
      default:
        return {
          backgroundColor: "#3A5B40",
          color: "#FFFFFF",
          borderColor: "#3A5B40",
        };
    }
  };

  // ========= HANDLER LIST =========
  const toggleSelectAll = () => {
    if (allChecked) {
      setSelectedIds([]);
    } else {
      setSelectedIds(orders.map((o) => o.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  // buka modal hapus
  const openDeleteModal = (order) => {
    setDeleteTarget(order);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setDeleteTarget(null);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setOrders((prev) => prev.filter((o) => o.id !== deleteTarget.id));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteTarget.id));
    if (selectedOrder && selectedOrder.id === deleteTarget.id) {
      setSelectedOrder(null);
    }
    closeDeleteModal();
  };

  // ========= REUSABLE LAYOUT =========
  const Sidebar = () => (
    <aside
      className="w-[240px] bg-white flex flex-col border-r border-[#E5E7EB]"
      style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.10)" }}
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
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#FFFEF6]"
          onClick={() => navigate("/admin/products")}
        >
          <span>Produk</span>
        </button>
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-[#FFFEF6] font-semibold"
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
  );

  const TopBar = ({ title }) => (
    <header
      className="w-full px-8 py-4 flex items-center justify-between bg-white"
      style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.10)" }}
    >
      <div className="text-base font-semibold text-[#3A5B40]">{title}</div>

      <div className="flex items-center gap-3 max-w-xl w-full">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Cari sesuatu ..."
            className="w-full h-10 rounded-[10px] px-4 text-sm placeholder-[#3A5B40] outline-none border border-transparent"
            style={{
              backgroundColor: "rgba(88,129,87,0.15)",
              color: "#3A5B40",
            }}
          />
        </div>

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

        <div className="w-9 h-9 rounded-full bg-[#3A5B40]/10 border border-[#3A5B40]/40" />
      </div>
    </header>
  );

  // ========= LIST VIEW =========
  const renderList = () => (
    <main className="flex-1 px-10 py-8">
      <div
        className="w-full max-w-5xl mx-auto bg-white rounded-[10px] px-6 md:px-8 py-6"
        style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.10)" }}
      >
        <h2 className="text-sm font-semibold text-[#3A5B40] mb-4">
          Semua Pesanan
        </h2>

        {/* Header tabel */}
        <div className="text-[11px] font-semibold text-[#3A5B40] border-b border-[#E5E7EB] pb-3 mb-2">
          <div className="grid grid-cols-[40px,3fr,2fr,2fr,2fr,1.5fr] items-center gap-2">
            <div>
              <input
                type="checkbox"
                className="accent-[#3A5B40]"
                checked={allChecked}
                onChange={toggleSelectAll}
              />
            </div>
            <div>Nama Pengguna</div>
            <div className="text-left">Status</div>
            <div className="text-center">Total</div>
            <div className="text-left">Tanggal</div>
            <div className="text-left">Aksi</div>
          </div>
        </div>

        {/* List pesanan */}
        <div className="space-y-3 text-xs text-[#3A5B40]">
          {orders.map((order) => {
            const selectStyle = getSelectStyles(order.status);

            return (
              <div
                key={order.id}
                className="border-b border-[#E5E7EB] pb-3 last:border-b-0"
              >
                <div className="grid grid-cols-[40px,3fr,2fr,2fr,2fr,1.5fr] items-center gap-2">
                  {/* checkbox */}
                  <div>
                    <input
                      type="checkbox"
                      className="accent-[#3A5B40]"
                      checked={selectedIds.includes(order.id)}
                      onChange={() => toggleSelectOne(order.id)}
                    />
                  </div>

                  {/* Email + avatar kecil */}
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#3A5B40]/10 flex items-center justify-center">
                      <span className="text-[9px] text-[#3A5B40]">IMG</span>
                    </div>
                    <span>{order.email}</span>
                  </div>

                  {/* Status dropdown */}
                  <div className="text-left">
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="
                          w-full h-5
                          rounded-[10px]
                          pl-2 pr-6
                          text-[11px]
                          focus:outline-none focus:ring-1 focus:ring-[#3A5B40]
                          appearance-none
                          min-w-[160px]
                        "
                        style={selectStyle}
                      >
                        <option value="">Pilih Status Pesanan</option>
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>

                      {/* icon panah dropdown */}
                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-3 h-3"
                          fill="none"
                          stroke={
                            order.status === "Selesai" ? "#FFFFFF" : "#3A5B40"
                          }
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pl-16">{formatRupiah(order.total)}</div>

                  {/* Tanggal */}
                  <div className="text-left">{order.dateTime}</div>

                  {/* Aksi */}
                  <div className="flex items-center gap-3 justify-start">
                    {/* Lihat detail (mata) */}
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                        fill="none"
                        stroke="#3A5B40"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>

                    {/* Hapus -> buka modal */}
                    <button type="button" onClick={() => openDeleteModal(order)}>
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
            );
          })}
        </div>
      </div>
    </main>
  );

  // ========= KOMPONEN PANAH STEP =========
  const StepArrow = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 24"
      className="w-8 h-5 md:w-10 md:h-6 flex-shrink-0"
      fill="none"
    >
      <line
        x1="2"
        y1="12"
        x2="32"
        y2="12"
        stroke="#3A5B40"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <polyline
        points="26,6 32,12 26,18"
        stroke="#3A5B40"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  // ========= DETAIL VIEW =========
  const renderDetail = () => {
    if (!selectedOrder) return null;

    const subtotalProduk = selectedOrder.price;
    const subtotalPengiriman = selectedOrder.shipping;
    const subtotalPengemasan = selectedOrder.packing;
    const total =
      subtotalProduk + subtotalPengemasan + subtotalPengiriman;

    const steps = [
      { icon: dollarIcon, label: "Pembayaran Dikonfirmasi" },
      { icon: orderIcon, label: "Pesanan Dibuat" },
      { icon: deliveryIcon, label: "Pesanan Dikirim" },
      { icon: packageIcon, label: "Pesanan Diterima" },
      { icon: likeIcon, label: "Selesai" },
    ];

    return (
      <main className="flex-1 px-4 md:px-10 py-6 md:py-8">
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
          {/* BAR KEMBALI */}
          <div
            className="w-full bg-white rounded-[15px] px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.08)" }}
          >
            <button
              type="button"
              className="flex items-center gap-2 text-[#3A5B40] text-sm font-semibold"
              onClick={() => setSelectedOrder(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="#3A5B40"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Kembali</span>
            </button>

            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-xs md:text-sm text-[#3A5B40]">
              <span>ID Pesanan : {selectedOrder.id}</span>
              <span className="font-semibold">Selesai</span>
            </div>
          </div>

          {/* CARD DETAIL BESAR */}
          <div
            className="rounded-[15px] border border-[#3A5B40] px-4 md:px-8 py-5 md:py-7 space-y-5 md:space-y-7"
            style={{
              boxShadow: "0 4px 6px rgba(0,0,0,0.10)",
              backgroundColor: "#FFFEF6",
            }}
          >
            {/* AREA ATAS: STEP ICONS DI BACKGROUND PUTIH + GARIS PEMISAH */}
            <div
              className="
                -mx-4 md:-mx-8
                -mt-5 md:-mt-7
                px-4 md:px-8
                pt-5 md:pt-7
                pb-0
                bg-white
                rounded-t-[15px]
              "
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 md:gap-4 flex-1 min-w-[90px]"
                    >
                      {/* Lingkaran + label */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] border-[#3A5B40] flex items-center justify-center mb-2 bg-white">
                          <img
                            src={step.icon}
                            alt={step.label}
                            className="w-9 h-9 md:w-12 md:h-12 object-contain"
                          />
                        </div>
                        <p className="text-[10px] md:text-xs text-[#3A5B40] leading-tight">
                          {step.label}
                        </p>
                      </div>

                      {/* Panah ke step berikutnya (kecuali terakhir) */}
                      {idx < steps.length - 1 && (
                        <div className="flex-1 flex justify-center md:justify-start">
                          <StepArrow />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* GARIS PEMISAH FULL-WIDTH (MENTOK KIRI-KANAN KARTU) */}
              <div className="border-t border-[#3A5B40] mt-5 -mx-4 md:-mx-8" />
            </div>

            {/* INFO CUSTOMER + PRODUK */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* KIRI: INFO CUSTOMER */}
              <div className="flex-1 space-y-2 text-xs md:text-sm text-[#3A5B40]">
                <div className="font-semibold">Full Name</div>
                <div className="text-xs">(+62)</div>
                <p className="mt-2 leading-relaxed">
                  Premium 5 kg merupakan beras yang diproses dengan baik
                  sehingga menghasilkan beras premium yang sangat pulen dan
                  sehat
                </p>
              </div>

              {/* GARIS VERTICAL */}
              <div className="hidden md:block w-px bg-[#3A5B40]" />

              {/* KANAN: PRODUK (card putih) */}
              <div className="flex-[1.2]">
                <div
                  className="flex items-center gap-4 rounded-[10px] px-4 py-3"
                  style={{
                    boxShadow: "0 4px 6px rgba(0,0,0,0.06)",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <div className="w-14 h-14 rounded-md bg-white flex items-center justify-center border border-[#E5E7EB]">
                    <span className="text-[10px] text-[#3A5B40]">IMG</span>
                  </div>
                  <div className="flex-1 text-xs md:text-sm text-[#3A5B40] space-y-1">
                    <div className="font-semibold">
                      {selectedOrder.productName}
                    </div>
                    <div className="text-xs">x{selectedOrder.quantity}</div>
                  </div>
                  <div className="text-xs md:text-sm text-[#3A5B40] font-medium">
                    {formatRupiah(selectedOrder.price)}
                  </div>
                </div>
              </div>
            </div>

            {/* GARIS PEMISAH */}
            <div className="border-t border-[#3A5B40]" />

            {/* RINCIAN HARGA */}
            <div className="space-y-2 text-xs md:text-sm text-[#3A5B40]">
              <div className="flex justify-between">
                <span>Subtotal Produk</span>
                <span>{formatRupiah(subtotalProduk)}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Pengemasan</span>
                <span>{formatRupiah(subtotalPengemasan)}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal Pengiriman</span>
                <span>{formatRupiah(subtotalPengiriman)}</span>
              </div>

              <div className="border-t border-[#3A5B40] mt-3 pt-3 flex justify-between font-semibold">
                <span>Total Pemesanan</span>
                <span>{formatRupiah(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };

  // ========= RENDER ROOT =========
  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: bgPage, fontFamily: '"Inter", sans-serif' }}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar title={selectedOrder ? "Detail Pesanan" : "Pesanan"} />
        {selectedOrder ? renderDetail() : renderList()}
      </div>

      {/* MODAL HAPUS PESANAN */}
      {isDeleteOpen && deleteTarget && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
          {/* overlay (tidak menutup modal saat diklik) */}
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
                stroke="#B0413C"
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

            <h2 className="text-[18px] font-bold text-[#3A5B40] mb-3">
              Hapus Pesanan
            </h2>

            <p className="text-sm text-[#3A5B40] mb-6">
              Anda akan menghapus pesanan dengan ID{" "}
              <span className="font-semibold">{deleteTarget.id}</span>.
              <br />
              Apakah Anda yakin?
            </p>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="
                  h-[40px] px-5
                  rounded-[10px]
                  text-sm font-medium
                  bg-[#B0413C]
                  text-white
                "
                onClick={closeDeleteModal}
              >
                Tidak!
              </button>
              <button
                type="button"
                className="
                  h-[40px] px-6
                  rounded-[10px]
                  text-sm font-medium
                  bg-[#3A5B40]
                  text-white
                "
                onClick={confirmDelete}
              >
                Ya, Hapus!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;