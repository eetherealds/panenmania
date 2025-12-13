// src/pages/afterLogin/Checkout.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import { MapPinIcon } from "@heroicons/react/24/solid";

import BerasImage from "../../assets/images/products/beras.svg";
import MidtransIcon from "../../assets/images/icons/midtrans.svg";

const Checkout = () => {
  const navigate = useNavigate();

  // sementara: 2 produk contoh
  const [cartItems] = useState([
    {
      id: 1,
      name: "Beras Majasem Barat Pulen Kemasan 5kg",
      price: 79500,
      qty: 1,
    },
    {
      id: 2,
      name: "Beras Majasem Barat Pulen Kemasan 5kg",
      price: 79500,
      qty: 1,
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("cod"); // hanya COD

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleOrder = () => {
    if (paymentMethod !== "cod") {
      alert("Silakan pilih metode pembayaran COD.");
      return;
    }
    navigate("/checkout-success");
  };

  return (
    <div className="bg-[#FFFEF6] min-h-screen font-poppins text-[#3A5B40]">
      <NavbarAfterLogin />

      <div className="pt-24 pb-16 max-w-[1350px] mx-auto px-6 lg:px-16 space-y-8">
        {/* ====== CARD ALAMAT ====== */}
        <section className="bg-white rounded-[10px] shadow-md px-6 py-5 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <MapPinIcon className="w-6 h-6 text-[#3A5B40] mt-1" />
            <div>
              <p className="font-semibold text-[16px] mb-1">
                Dearni Lambardo
              </p>
              <p className="text-sm mb-1 font-medium">(+62)</p>
              <p className="text-sm leading-relaxed max-w-3xl">
                Jl. Melati No. 25, RT 04/RW 03, Kelurahan Sukamaju, Kecamatan
                Sukasari, Jakarta Selatan, DKI Jakarta, Kode Pos 12345.
              </p>
            </div>
          </div>

          <button className="text-sm font-semibold underline-offset-2 hover:underline">
            Ubah
          </button>
        </section>

        {/* ====== CARD PRODUK DIPESAN ====== */}
        <section className="space-y-2">
          {/* Bagian produk */}
          <div className="bg-[#B8D68F]/25 px-6 py-6 rounded-[10px]">
            {/* Header judul + kolom kanan */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[17px]">
                Produk Dipesan
              </h2>
              <div className="flex text-xs sm:text-sm font-semibold w-[360px] justify-between text-right">
                <span className="w-[110px] text-center">Harga Satuan</span>
                <span className="w-[80px] text-center">Jumlah</span>
                <span className="w-[120px] text-right">Subtotal</span>
              </div>
            </div>

            {/* Garis pemisah */}
            <div className="border-t border-[#3A5B40] mb-4" />

            {/* List produk */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  {/* kiri: gambar + nama */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-[80px] h-[80px] bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                      <img
                        src={BerasImage}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[14px] font-medium">
                      {item.name}
                    </p>
                  </div>

                  {/* kanan: harga, jumlah, subtotal */}
                  <div className="flex items-center justify-between w-[360px] text-sm">
                    <span className="w-[110px] text-center">
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                    <span className="w-[80px] text-center">
                      {item.qty}
                    </span>
                    <span className="w-[120px] text-right font-semibold">
                      Rp {(item.price * item.qty).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bar total produk – radius 8 semua sudut, tetap dekat dengan card atas */}
          <div className="bg-[#3A5B40] text-white flex items-center justify-between px-6 py-4 rounded-[8px]">
            <span className="font-semibold text-[15px]">
              Total Produk ({cartItems.length})
            </span>
            <span className="font-bold text-[16px]">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
          </div>
        </section>

        {/* ====== CARD METODE PEMBAYARAN ====== */}
        <section className="bg-[#3A5B40] rounded-[10px] px-6 py-6 text-white flex flex-col gap-6">
          {/* baris: label + COD + Midtrans dalam satu row */}
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-semibold text-[15px] m-0">
              Pilih Metode Pembayaran:
            </p>

            {/* COD - bisa diklik */}
            <button
              onClick={() => setPaymentMethod("cod")}
              className={`px-6 py-2 rounded-[10px] text-sm font-semibold border ${
                paymentMethod === "cod"
                  ? "bg-white text-[#3A5B40] border-white"
                  : "bg-transparent text-white border-white"
              }`}
            >
              COD
            </button>

            {/* Midtrans - hanya pajangan */}
            <div className="px-5 py-2 rounded-[10px] bg-white flex items-center gap-2">
              <img
                src={MidtransIcon}
                alt="Midtrans"
                className="h-5 object-contain"
              />
            </div>
          </div>

          {/* tombol pesan sekarang di kanan */}
          <div className="flex justify-end">
            <button
              onClick={handleOrder}
              className="bg-white text-[#3A5B40] font-semibold text-[15px] px-8 py-2 rounded-[8px] hover:bg-[#F4F4F4] transition"
            >
              Pesan Sekarang
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;