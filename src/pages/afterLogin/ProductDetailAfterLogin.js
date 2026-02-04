// src/pages/afterLogin/ProductDetailAfterLogin.js
import React, { useState, useEffect } from "react";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Footer from "../../components/layout/Footer";
import { useNavigate, useParams } from "react-router-dom";

// ICONS
import IconTruk from "../../assets/images/icons/truk.svg";
import IconLike from "../../assets/images/icons/like.svg";
import IconDislike from "../../assets/images/icons/dislike.svg";
import IconPilihProduk from "../../assets/images/icons/pilih produk.svg";
import IconMasukkanKeranjang from "../../assets/images/icons/masukkan keranjang.svg";
import IconMelakukanPembayaran from "../../assets/images/icons/melakukan pembayaran.svg";
import IconMenungguPesanan from "../../assets/images/icons/menunggu pesanan.svg";

import IconCart from "../../assets/images/icons/cart.svg";
import BerasImage from "../../assets/images/products/beras.svg";

/* ---------- Reusable components ---------- */

// Kontrol jumlah produk
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

// Kartu langkah belanja
const StepCard = ({ icon, label }) => {
  const parts = label.split(" ");
  return (
    <div className="flex flex-col items-center">
      <div className="w-[90px] h-[90px] rounded-xl flex items-center justify-center bg-[#588157]/45">
        <img src={icon} alt={label} className="object-contain w-[70px]" />
      </div>
      <p className="text-[#344E41] font-semibold text-[15px] leading-tight mt-4 text-center">
        {parts[0]} <br />
        {parts.slice(1).join(" ")}
      </p>
    </div>
  );
};

// Item ulasan
const ReviewItem = ({ name, rating, text }) => (
  <div className="flex flex-col border-b-2 border-[#3A5B40] pb-6 mb-6">
    <div className="flex justify-between items-start gap-4">
      <div className="flex gap-5">
        <div className="w-14 h-14 rounded-full bg-gray-300 shrink-0" />
        <div className="flex-1">
          <p className="font-bold text-[#3A5B40] text-[15px]">{name}</p>
          <div className="flex items-center gap-1 mb-2 text-[#3A5B40]">
            <span className="text-sm leading-none">
              {"★".repeat(rating)}
            </span>
          </div>
          <p className="text-[#3A3A3A] text-[14px] leading-relaxed">{text}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-0 sm:ml-4">
        <button className="p-1" aria-label="like">
          <img src={IconLike} alt="like" className="w-6 h-6" />
        </button>
        <button className="p-1" aria-label="dislike">
          <img src={IconDislike} alt="dislike" className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
);

/* ---------- Main component ---------- */

const ProductDetailAfterLogin = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const response = await fetch(`https://pa-man-api.vercel.app/api/products/${id}`, {
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) {
          throw new Error('Produk tidak ditemukan');
        }
        const result = await response.json();
        // Handle response structure: result.data.product
        const productData = result.data?.product || result.data || result;
        const reviewsData = result.data?.product?.product_review || [];
        
        setProduct({
          id: id,
          name: productData.name,
          price: productData.price,
          discountedPrice: productData.discounted_price,
          description: productData.description,
          image: productData.photo_url || BerasImage,
          stock: productData.stock || 0,
          rating: parseFloat(productData.average_rating) || 0,
          reviewCount: productData.total_reviews || 0,
          reviews: reviewsData,
        });
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Tambah ke keranjang (logika backend bisa disesuaikan)
  const handleAddToCart = async () => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      });

      // Tampilkan notifikasi sukses singkat
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      console.error("Gagal menambahkan ke keranjang:", err);
    }
  };

  // Pesan sekarang → ke halaman checkout
  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        productId: product.id,
        quantity,
      },
    });
  };

  return (
    <div className="bg-[#FFFEF6] min-h-screen font-poppins flex flex-col">
      {/* Navbar after login */}
      <NavbarAfterLogin />

      {/* Spacer agar konten tidak tertutup navbar */}
      <div className="pt-24" />

      {/* Loading state */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Memuat produk...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#3A5B40] text-white rounded-lg hover:bg-[#2c3d33]"
          >
            Kembali
          </button>
        </div>
      )}

      {/* Product detail - only show when product is loaded */}
      {!loading && !error && product && (
        <>
      {/* ========== DETAIL PRODUK ========== */}
      <section className="w-full mt-0">
        <div className="max-w-[1350px] mx-auto">
          {/* Card produk utama */}
          <div className="bg-[#B8D68F]/25 rounded-[10px] py-10 sm:py-16 mx-4 sm:mx-10 lg:mx-16 px-4 sm:px-10">
            {/* Grid isi card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-[1050px] mx-auto">
              {/* Kiri: gambar produk */}
              <div className="flex flex-col items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-[340px] h-[360px] object-contain rounded-xl border border-[#E0E6D8] bg-white"
                />

                {/* Thumbnail kecil */}
                <div className="flex justify-between gap-4 mt-6 w-full max-w-[340px]">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="w-[90px] h-[90px] bg-white rounded-md flex items-center justify-center border border-[#B8D68F]"
                    >
                      <img
                        src={product.image}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-[70px] h-[70px] object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Kanan: informasi produk */}
              <div className="text-left text-[#3A5B40] md:-ml-4 lg:-ml-16">
                <h2 className="text-[22px] sm:text-[24px] md:text-[26px] font-extrabold text-[#3A5B40] mb-3">
                  {product.name}
                </h2>

                {/* Rating dan info singkat */}
                <div className="flex flex-wrap items-center gap-3 text-[#3A5B40] text-[14px] font-medium mb-4">
                  <span>{product.rating?.toFixed(1) || "0.0"}</span>
                  <span className="text-[16px] leading-none text-[#3A5B40]">
                    {"★".repeat(Math.round(product.rating || 0))}{"☆".repeat(5 - Math.round(product.rating || 0))}
                  </span>
                  <span>|</span>
                  <span>{product.reviewCount || 0} Ulasan</span>
                </div>

                {/* Harga utama */}
                <div className="inline-block mb-6">
                  <div className="bg-[#3A5B40] rounded-[10px] px-5 py-3">
                    {product.discountedPrice ? (
                      <div className="flex flex-col">
                        <p className="text-[14px] text-gray-300 line-through">
                          Rp {product.price?.toLocaleString("id-ID") || "0"}
                        </p>
                        <p className="text-[20px] sm:text-[22px] font-extrabold text-white">
                          Rp {product.discountedPrice?.toLocaleString("id-ID") || "0"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-[20px] sm:text-[22px] font-extrabold text-white">
                        Rp {product.price?.toLocaleString("id-ID") || "0"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Deskripsi produk */}
                <p className="text-[#3A5B40] text-[14px] sm:text-[13px] leading-relaxed mb-6 max-w-[515px]">
                  {product.description || "Deskripsi produk tidak tersedia."}
                </p>

                {/* Info pengiriman, stok, dan qty */}
                <div className="flex flex-wrap items-center gap-4 text-[#3A5B40] text-[14px] sm:text-[15px] font-medium mb-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span>Pengiriman</span>
                    <div className="flex items-center gap-2">
                      <img
                        src={IconTruk}
                        alt="pengiriman"
                        className="w-5 h-5"
                      />
                      <span>5–7 Hari</span>
                    </div>
                    <span>|</span>
                    <span>Tersisa: {product.stock || 0} barang</span>
                  </div>

                  <div className="lg:-ml-0">
                    <QtyControl
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  </div>
                </div>

                {/* Notifikasi sukses setelah tambah keranjang */}
                {showSuccess && (
                  <div className="mb-4 w-full bg-green-600 text-white px-4 py-2 rounded-md text-center text-sm sm:text-base font-semibold">
                    Produk berhasil ditambahkan ke keranjang ✔
                  </div>
                )}

                {/* Tombol aksi utama */}
                <div className="flex flex-wrap gap-4 mt-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 bg-[#3A5B40] text-white text-[15px] font-semibold px-8 py-3 rounded-[10px] min-w-[230px] hover:bg-[#2c3d33] transition"
                  >
                    <img src={IconCart} alt="keranjang" className="w-5 h-5" />
                    <span>Masukkan Keranjang</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex items-center justify-center bg-[#3A5B40] text-white text-[15px] font-semibold px-8 py-3 rounded-[10px] min-w-[230px] hover:bg-[#486947] transition"
                  >
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PENILAIAN & ULASAN ========== */}
      <section className="w-full mt-10">
        {/* Header penilaian */}
        <div className="max-w-[1350px] mx-auto px-4 sm:px-10 lg:px-16">
          <div className="bg-[#3A5B40] text-white py-3 px-6 sm:px-8 font-semibold text-[17px] rounded-[10px]">
            Penilaian & Ulasan
          </div>
        </div>

        {/* Ringkasan rating */}
        <div className="max-w-[1150px] mx-auto px-4 sm:px-10 lg:px-16 bg-[#FFFEF6] pt-6 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-[210px_auto] gap-4">
            <div>
              <p className="text-[32px] sm:text-[36px] font-extrabold text-[#3A5B40] mb-1">
                5.0/
                <span className="text-[22px] sm:text-[24px] font-semibold">
                  5
                </span>
              </p>
              <p className="text-[16px] sm:text-[18px] text-[#3A5A40] mb-1 font-medium">
                <span className="text-[#3A5B40]">★★★★★</span>{" "}
                <span className="text-sm text-[#555]">(4 ulasan)</span>
              </p>
            </div>

            {/* Bar rating */}
            <div className="flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((star, index) => (
                <div key={star} className="flex items-center gap-3 text-sm">
                  <span className="text-[#3A5B40] whitespace-nowrap">
                    {"★".repeat(star)}
                    {"☆".repeat(5 - star)}
                  </span>
                  <div className="w-full max-w-[230px] h-3 bg-[#588157]/25">
                    <div
                      className={`h-full bg-[#3A5A40] ${
                        index === 0 ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                  <span className="text-[#3A5B40] w-4 text-right">
                    {index === 0 ? "5" : "0"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Header ulasan produk */}
        <div className="max-w-[1350px] mx-auto px-4 sm:px-10 lg:px-16 mt-6">
          <div className="bg-[#3A5B40] text-white py-3 px-6 sm:px-8 font-semibold text-[17px] rounded-[10px]">
            Ulasan Produk
          </div>
        </div>

        {/* Daftar ulasan */}
        <div className="max-w-[1350px] mx-auto bg-[#FFFEF6] pt-6 pb-6">
          <div className="max-w-[1150px] mx-auto px-4 sm:px-8 lg:px-10">
            <ReviewItem
              name="Dearni Lombardo Saragih"
              rating={5}
              text="Berasnya bersih, pulen saat dimasak, dan aromanya enak. Tidak banyak patahan atau kotoran, kualitasnya bagus dan konsisten."
            />
            <ReviewItem
              name="A. Customer"
              rating={4}
              text="Produk bagus, pengiriman sesuai estimasi."
            />
          </div>
        </div>
      </section>

      {/* ========== LANGKAH BELANJA ========== */}
      <section className="bg-[#FFFEF6] w-full pb-24 pt-10">
        <div className="max-w-[1350px] mx-auto px-6 sm:px-10 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-10">
            {[
              { label: "Pilih Produk", icon: IconPilihProduk },
              { label: "Masukkan Keranjang", icon: IconMasukkanKeranjang },
              { label: "Melakukan Pembayaran", icon: IconMelakukanPembayaran },
              { label: "Menunggu Pesanan", icon: IconMenungguPesanan },
            ].map((step, i) => (
              <StepCard key={i} icon={step.icon} label={step.label} />
            ))}
          </div>
        </div>
      </section>
      </>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetailAfterLogin;