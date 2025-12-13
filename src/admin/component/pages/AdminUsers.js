// src/admin/component/pages/AdminUsers.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const bgPage = "#FFFEF6";
  const navigate = useNavigate();

  const usersData = [
    {
      id: 1,
      name: "Dearnil Lambardo Saragih",
      email: "dearnils@gmail.com",
      role: "Admin",
      joinedAt: "03/12/2025 08:45:45 AM",
    },
    {
      id: 2,
      name: "Dearnil Lambardo Saragih",
      email: "dearnils@gmail.com",
      role: "Pengguna",
      joinedAt: "03/12/2025 08:45:45 AM",
    },
    {
      id: 3,
      name: "Dearnil Lambardo Saragih",
      email: "dearnils@gmail.com",
      role: "Admin",
      joinedAt: "03/12/2025 08:45:45 AM",
    },
    {
      id: 4,
      name: "Dearnil Lambardo Saragih",
      email: "dearnils@gmail.com",
      role: "Pengguna",
      joinedAt: "03/12/2025 08:45:45 AM",
    },
  ];

  const [users] = useState(usersData);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // === FILTER ROLE (pakai gaya tombol seperti AdminProducts) ===
  const [roleFilter, setRoleFilter] = useState("Semua Role");

  const sortLabel =
    roleFilter === "Semua Role" ? "Urutkan Berdasarkan" : roleFilter;

  const handleSortSelect = (value) => {
    setRoleFilter(value);
    setIsSortOpen(false);
  };

  const filteredUsers =
    roleFilter === "Semua Role"
      ? users
      : users.filter((u) => u.role === roleFilter);

  const allChecked =
    filteredUsers.length > 0 &&
    filteredUsers.every((u) => selectedIds.includes(u.id));

  const toggleSelectAll = () => {
    if (allChecked) {
      // uncheck semua yg tampil
      setSelectedIds((prev) =>
        prev.filter((id) => !filteredUsers.some((u) => u.id === id))
      );
    } else {
      // check semua yg tampil
      const idsToAdd = filteredUsers.map((u) => u.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...idsToAdd])));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const Sidebar = () => (
    <aside
      className="w-[240px] bg-white flex flex-col border-r border-[#E5E7EB]"
      style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.10)" }}
    >
      <div className="flex items-center gap-3 px-6 py-6 border-b border-[#E5E7EB]">
        <div className="w-10 h-10 rounded-full bg-[#3A5B40]/10 border border-[#3A5B40] flex items-center justify-center">
          <span className="text-[10px] text-[#3A5B40]">LOGO</span>
        </div>
        <span className="font-semibold text-[#3A5B40]">Panen Mania</span>
      </div>

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
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#FFFEF6]"
          onClick={() => navigate("/admin/orders")}
        >
          <span>Pesanan</span>
        </button>
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-[#FFFEF6] font-semibold"
          onClick={() => navigate("/admin/users")}
        >
          <span>Pengguna</span>
        </button>
      </nav>
    </aside>
  );

  const TopBar = () => (
    <header
      className="w-full px-8 py-4 flex items-center justify-between bg-white"
      style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.10)" }}
    >
      <div className="text-base font-semibold text-[#3A5B40]">Pengguna</div>

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

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: bgPage, fontFamily: '"Inter", sans-serif' }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="flex-1 px-10 py-8">
          <div
            className="w-full max-w-5xl mx-auto bg-white rounded-[10px] px-8 py-6"
            style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.10)" }}
          >
            {/* HEADER CARD */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
              <h2 className="text-sm font-semibold text-[#3A5B40]">
                Semua Pengguna
              </h2>

              {/* === TOMBOL URUTKAN BERDASARKAN (SAMA SEPERTI AdminProducts) === */}
              <div className="relative self-start md:self-auto">
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
                    {["Semua Role", "Admin", "Pengguna"].map((opt) => (
                      <button
                        key={opt}
                        className="w-full text-left px-3 py-2 hover:bg-[#FFFEF6] text-[#3A5B40]"
                        onClick={() => handleSortSelect(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* HEADER TABEL */}
            <div className="text-[11px] font-semibold text-[#3A5B40] border-b border-[#E5E7EB] pb-3 mb-2">
              <div className="grid grid-cols-[40px,3fr,3fr,2fr,3fr] items-center gap-2">
                <div>
                  <input
                    type="checkbox"
                    className="accent-[#3A5B40]"
                    checked={allChecked}
                    onChange={toggleSelectAll}
                  />
                </div>
                <div>Nama Pengguna</div>
                <div>Email</div>
                <div>Role</div>
                <div>Tanggal Bergabung</div>
              </div>
            </div>

            {/* LIST PENGGUNA */}
            <div className="space-y-3 text-xs text-[#3A5B40]">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="border-b border-[#E5E7EB] pb-3 last:border-b-0"
                >
                  <div className="grid grid-cols-[40px,3fr,3fr,2fr,3fr] items-center gap-2">
                    <div>
                      <input
                        type="checkbox"
                        className="accent-[#3A5B40]"
                        checked={selectedIds.includes(user.id)}
                        onChange={() => toggleSelectOne(user.id)}
                      />
                    </div>

                    {/* Nama + avatar fake */}
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3A5B40]/10 flex items-center justify-center">
                        <span className="text-[9px] text-[#3A5B40]">A</span>
                      </div>
                      <span>{user.name}</span>
                    </div>

                    <div>{user.email}</div>

                    <div>
                      {user.role === "Admin" ? (
                        <span
                          className="px-3 py-1 rounded-[10px] text-[10px]"
                          style={{
                            backgroundColor: "rgba(49,114,32,0.8)", // #317220CC
                            color: "#FFFFFF",
                          }}
                        >
                          Admin
                        </span>
                      ) : (
                        <span
                          className="px-3 py-1 rounded-[10px] text-[10px]"
                          style={{
                            backgroundColor: "rgba(150,53,44,0.8)", // #96352CCC
                            color: "#FFFFFF",
                          }}
                        >
                          Pengguna
                        </span>
                      )}
                    </div>

                    <div>{user.joinedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;