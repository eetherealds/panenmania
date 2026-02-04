import React, { useState, useMemo, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavbarAfterLogin from "../../components/layout/NavbarAfterLogin";
import Footer from "../../components/layout/Footer";
import { ProductsContext } from "../../context/ProductsContext";

// Banner gambar katalog
import CatalogBanner from "../../assets/images/banners/petani katalog.svg";
// Icon search
import IconSearch from "../../assets/images/icons/pencarian.svg";

const CATEGORY_OPTIONS = [
  { label: "Semua Kategori", value: "all" },
  { label: "Buah", value: "buah" },
  { label: "Sayur", value: "sayur" },
  { label: "Beras", value: "beras" },
];

const PRODUCTS = [
  {
    name: "Semangka Merah Manis",
    description: "Buah segar langsung dari kebun petani lokal.",
    price: "Rp 25.000",
    image: "https://via.placeholder.com/260x160?text=Buah",
    category: "Buah",
  },
  {
    name: "Pisang Cavendish 1kg",
    description: "Pisang berkualitas, matang merata dan manis.",
    price: "Rp 22.000",
    image: "https://via.placeholder.com/260x160?text=Buah",
    category: "Buah",
  },
  {
    name: "Apel Malang 1kg",
    description: "Apel renyah dengan rasa manis sedikit asam.",
    price: "Rp 30.000",
    image: "https://via.placeholder.com/260x160?text=Buah",
    category: "Buah",
  },
  {
    name: "Bayam Hijau 250g",
    description: "Sayur hijau segar kaya akan zat besi.",
    price: "Rp 6.000",
    image: "https://via.placeholder.com/260x160?text=Sayur",
    category: "Sayur",
  },
  {
    name: "Wortel Fresh 500g",
    description: "Wortel oranye cerah dengan tekstur renyah.",
    price: "Rp 9.000",
    image: "https://via.placeholder.com/260x160?text=Sayur",
    category: "Sayur",
  },
  {
    name: "Brokoli Organik 300g",
    description: "Brokoli segar ditanam tanpa pestisida berbahaya.",
    price: "Rp 15.000",
    image: "https://via.placeholder.com/260x160?text=Sayur",
    category: "Sayur",
  },
  {
    name: "Beras Lele 5kg",
    description: "Beras pulen untuk kebutuhan keluarga sehari-hari.",
    price: "Rp 70.000",
    image: "https://via.placeholder.com/260x160?text=Beras",
    category: "Beras",
  },
  {
    name: "Beras Pandan Wangi 5kg",
    description: "Aroma wangi, tekstur pulen dan lembut.",
    price: "Rp 80.000",
    image: "https://via.placeholder.com/260x160?text=Beras",
    category: "Beras",
  },
  {
    name: "Beras Merah 2kg",
    description: "Pilihan lebih sehat dengan serat lebih tinggi.",
    price: "Rp 45.000",
    image: "https://via.placeholder.com/260x160?text=Beras",
    category: "Beras",
  },
  {
    name: "Tomat Merah 500g",
    description: "Tomat segar cocok untuk sambal dan masakan.",
    price: "Rp 8.000",
    image: "https://via.placeholder.com/260x160?text=Sayur",
    category: "Sayur",
  },
  {
    name: "Jeruk Manis 1kg",
    description: "Jeruk segar dengan rasa manis dan banyak air.",
    price: "Rp 24.000",
    image: "https://via.placeholder.com/260x160?text=Buah",
    category: "Buah",
  },
  {
    name: "Beras Hitam 1kg",
    description: "Beras tinggi antioksidan, cocok untuk diet sehat.",
    price: "Rp 35.000",
    image: "https://via.placeholder.com/260x160?text=Beras",
    category: "Beras",
  },
];

function CatalogAfterLogin() {
  const location = useLocation();
  const { products: allProducts, loading: loadingProducts } = useContext(ProductsContext);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  // Calculate pagination
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedProducts = allProducts.slice(startIdx, startIdx + pageSize);
  const totalPages = Math.ceil(allProducts.length / pageSize);

  // Membaca query string dari URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const searchParam = params.get("search");

    const allowed = ["all", "buah", "sayur", "beras"];

    if (categoryParam) {
      const normalized = categoryParam.toLowerCase();
      if (allowed.includes(normalized)) {
        setSelectedCategory(normalized);
      }
    } else {
      setSelectedCategory("all");
    }

    if (searchParam && searchParam.trim().length > 0) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery("");
    }
  }, [location.search]);

  // Filter produk dari paginated list
  const filteredProducts = useMemo(() => {
    return paginatedProducts.filter((item) => {
      const productCategory = item.category.toLowerCase();
      const matchCategory =
        selectedCategory === "all" || productCategory === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchCategory;

      const matchText =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      return matchCategory && matchText;
    });
  }, [paginatedProducts, selectedCategory, searchQuery]);

  return (
    <div className="font-poppins bg-[#F8FAF7] min-h-screen flex flex-col pt-14 sm:pt-16">
      <NavbarAfterLogin />

      {/* BANNER */}
      <section className="w-full relative">
        <img
          src={CatalogBanner}
          alt="Banner katalog"
          className="w-full h-[220px] sm:h-[260px] md:h-[320px] lg:h-[380px] object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-20 sm:h-24 bg-gradient-to-b from-transparent to-[#F8FAF7]" />
      </section>

      {/* SEARCH BAR */}
      <section className="flex justify-center items-center py-6 md:py-8">
        <form
          onSubmit={handleSearchSubmit}
          className="w-full flex justify-center"
        >
          <div className="relative w-full max-w-[520px] min-w-[260px]">
            <input
              type="text"
              placeholder="Cari produk segar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-2 border-[#588157] rounded-full px-6 py-2.5 sm:py-3 pr-11 focus:outline-none bg-transparent text-sm sm:text-base"
            />

            <button
              type="submit"
              className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 flex items-center justify-center"
              aria-label="Cari produk"
            >
              <img
                src={IconSearch}
                alt="Cari"
                className="w-5 h-5 object-contain"
              />
            </button>
          </div>
        </form>
      </section>

      {/* TITLE + DROPDOWN */}
      <section className="w-full px-6 lg:px-16 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[#344E41] text-[18px] sm:text-[20px] font-semibold">
          Semua Produk
        </h2>

        <div className="w-full sm:w-auto">
          <label htmlFor="kategori" className="sr-only">
            Kategori
          </label>
          <div className="relative inline-block w-full sm:w-52">
            <select
              id="kategori"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-[#588157]/75 text-white text-sm font-medium rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#588157]"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}
                className="bg-white text-[#3A5A40]">
                  {opt.label}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="w-full bg-[#F8FAF7] pb-14 md:pb-16">
        <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 md:gap-y-12 gap-x-6 md:gap-x-8">
            {filteredProducts.map((product, index) => (
              <Link key={index} to={`/product/${index}`}>
                <div className="bg-white rounded-3xl shadow-[0_4px_10px_rgba(0,0,0,0.08)] border border-[#E0E6D8] hover:shadow-xl transition-all duration-200 cursor-pointer w-full max-w-[310px] mx-auto">
                  <div className="w-full bg-[#F4F8F1] rounded-t-3xl p-6 h-[190px] sm:h-[200px] flex items-center justify-center">
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

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-sm text-[#3A5A40]/70 mt-6">
                Belum ada produk yang cocok dengan pencarian atau kategori ini.
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
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
      </section>

      <Footer />
    </div>
  );
}

export default CatalogAfterLogin;
