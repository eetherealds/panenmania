import React, { createContext, useState, useCallback, useEffect } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

  const fetchProducts = useCallback(async (page = 1, limit = 100, forceRefresh = false) => {
    // Check if we have fresh cached data
    const now = Date.now();
    if (!forceRefresh && lastFetchTime && now - lastFetchTime < CACHE_DURATION && products.length > 0) {
      return products;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
      const response = await fetch(
        `https://pa-man-api.vercel.app/api/products/?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (response.ok) {
        const result = await response.json();
        let productsArray = [];

        // Handle the response structure
        if (result.data) {
          if (result.data.results && Array.isArray(result.data.results)) {
            productsArray = result.data.results;
          } else if (Array.isArray(result.data)) {
            productsArray = result.data;
          }
        }

        // Format products for consistent display
        const formattedProducts = productsArray.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description || "",
          price: product.price,
          priceFormatted: `Rp ${product.price?.toLocaleString("id-ID") || 0}`,
          photo_url: product.photo_url,
          image: product.photo_url || "https://via.placeholder.com/260x160",
          category: product.category,
          stock: product.stock,
          status: product.stock > 0 ? "available" : "unavailable",
          discounted_price: product.discounted_price,
        }));

        setProducts(formattedProducts);
        setLastFetchTime(now);
        return formattedProducts;
      } else if (response.status === 429) {
        // Rate limited - use cached data if available
        setError("Server sedang ramai. Menggunakan data tersimpan.");
        return products.length > 0 ? products : [];
      } else {
        setError(`Gagal mengambil produk: ${response.status}`);
        return [];
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
      return products.length > 0 ? products : [];
    } finally {
      setLoading(false);
    }
  }, [products, lastFetchTime]);

  // Fetch products on mount
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(1, 100);
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
