// src/pages/afterLogin/CartPage.js
import React, { useState, useEffect } from "react";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/common/Popup";

import BerasImage from "../../assets/images/products/beras.svg";
import IconTrash from "../../assets/images/icons/trash.svg";

/* ----- QtyControl: sama persis seperti di detail produk ----- */
// Komponen kontrol jumlah produk
const QtyControl = ({ quantity, setQuantity }) => (
  <div className="flex h-[32px]">
    <button
      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
      className="px-3 flex items-center justify-center bg-white text-black font-semibold text-lg border-2 border-[#3A5B40] rounded-l-[8px]"
      aria-label="kurangi"
    >
      −
    </button>

    <span className="px-4 flex items-center justify-center text-black font-semibold border-y-2 border-[#3A5B40] min-w-[40px] h-full bg-white">
      {quantity}
    </span>

    <button
      onClick={() => setQuantity((q) => q + 1)}
      className="px-3 flex items-center justify-center bg-white text-black font-semibold text-lg border-2 border-[#3A5B40] rounded-r-[8px] -ml-[2px]"
      aria-label="tambah"
    >
      +
    </button>
  </div>
);

const CartPage = () => {
  const navigate = useNavigate();

  // Data sementara keranjang
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Beras Pulen Berkualitas Cap Dero 5kg",
      price: 79500,
      qty: 1,
      checked: false,
    },
    {
      id: 2,
      name: "Beras Pulen Berkualitas Cap Dero 5kg",
      price: 79500,
      qty: 1,
      checked: false,
    },
    {
      id: 3,
      name: "Beras Pulen Berkualitas Cap Dero 5kg",
      price: 79500,
      qty: 1,
      checked: false,
    },
  ]);

  const [checkAll, setCheckAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // State popup hapus (item yang akan dihapus)
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Hitung total dan sinkron status "Pilih Semua"
  useEffect(() => {
    const total = cartItems
      .filter((item) => item.checked)
      .reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotalPrice(total);

    const allChecked =
      cartItems.length > 0 && cartItems.every((item) => item.checked);
    setCheckAll(allChecked);
  }, [cartItems]);

  // Toggle pilih semua
  const toggleCheckAll = () => {
    const newValue = !checkAll;
    setCheckAll(newValue);
    setCartItems((prev) => prev.map((item) => ({ ...item, checked: newValue })));
  };

  // Toggle checkbox per item
  const toggleCheckItem = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Tambah qty
  // eslint-disable-next-line no-unused-vars
  const _increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Kurangi qty
  // eslint-disable-next-line no-unused-vars
  const _decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  // Hapus item (dipanggil setelah konfirmasi popup)
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCheckedItems = cartItems.filter((item) => item.checked).length;

  return (
    <div className="bg-[#FFFEF6] min-h-screen font-poppins text-[#344E41]">
      <NavbarAfterLogin />

      <div className="pt-24 pb-16 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Judul halaman */}
        <h1 className="text-[20px] sm:text-[22px] font-bold mb-6 sm:mb-8">
          Keranjang Anda
        </h1>

        {/* Pilih Semua */}
        <div className="flex justify-end items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={checkAll}
            onChange={toggleCheckAll}
            className="w-4 h-4 border-2 border-[#3A5B40] rounded-sm accent-[#3A5B40]"
          />
          <span className="text-xs sm:text-sm font-medium text-[#344E41]">
            Pilih Semua
          </span>
        </div>

        {/* List item keranjang */}
        <div className="space-y-4 sm:space-y-5">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#B8D68F]/25 border-2 border-[#3A5B40] rounded-[10px] px-4 sm:px-6 py-4 flex flex-wrap md:flex-nowrap items-start md:items-center gap-4 sm:gap-5"
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheckItem(item.id)}
                className="mt-1 w-4 h-4 border-2 border-[#3A5B40] rounded-sm accent-[#3A5B40]"
              />

              {/* Gambar produk */}
              <div className="w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] rounded-[14px] bg-white flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={BerasImage}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info produk */}
              <div className="flex-1 min-w-[160px]">
                <p className="font-semibold text-[14px] sm:text-[15px] leading-snug">
                  {item.name}
                </p>
                <p className="font-normal text-[14px] sm:text-[15px] mt-2 text-[#3A5B40]">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>

              {/* Kolom kanan: trash di atas, stok + qty di bawah */}
              <div className="flex flex-col justify-between items-end h-[96px] ml-auto mt-2 md:mt-0">
                {/* Tombol hapus (tetap di pojok kanan atas card) */}
                <button
                  onClick={() => setDeleteTarget(item)} // buka popup hapus
                  className="mb-2"
                  aria-label={`Hapus ${item.name}`}
                >
                  <img src={IconTrash} alt="hapus" className="w-6 h-6" />
                </button>

                {/* Baris: Tersisa + QtyControl */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <p className="text-[11px] sm:text-xs text-[#3A5B40] whitespace-nowrap">
                    Tersisa: 25 Barang
                  </p>
                  <QtyControl
                    quantity={item.qty}
                    setQuantity={(q) =>
                      setCartItems((prev) =>
                        prev.map((x) =>
                          x.id === item.id ? { ...x, qty: q } : x
                        )
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          {cartItems.length === 0 && (
            <p className="text-center text-sm text-[#6B6B6B] mt-6">
              Keranjang Anda masih kosong.
            </p>
          )}
        </div>

        {/* Bar total bawah */}
        <div className="mt-8 sm:mt-10 bg-[#3A5B40] rounded-[10px] px-5 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between text-white gap-3 sm:gap-0">
          <p className="font-semibold text-[14px] sm:text-[15px]">
            Total Produk ({totalCheckedItems})
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="font-bold text-[15px] sm:text-[16px]">
              Rp {totalPrice.toLocaleString("id-ID")}
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-white text-[#3A5B40] font-semibold text-[14px] sm:text-[15px] px-6 py-2 rounded-[8px] hover:bg-[#F4F4F4] transition text-center"
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* POPUP HAPUS KERANJANG (desain baru) */}
      {deleteTarget && (
        <Popup
          variant="delete"
          onClose={() => setDeleteTarget(null)}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            removeItem(deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
};

export default CartPage;