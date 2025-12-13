import React, { createContext, useCallback, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState({
    id: null,
    email: null,
    name: null,
    avatar_url: null,
  });
  const [loading, setLoading] = useState(false);

  // Logout function
  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        setAdminData({
          id: null,
          email: null,
          name: null,
          avatar_url: null,
        });
        return true;
      }

      const response = await fetch(
        "https://pa-man-api.vercel.app/api/admin/logout",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Logout API failed:", response.status);
      }

      // Always clear local data regardless of API response
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      setAdminData({
        id: null,
        email: null,
        name: null,
        avatar_url: null,
      });

      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      // Clear data even if API fails
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      setAdminData({
        id: null,
        email: null,
        name: null,
        avatar_url: null,
      });
      return true;
    }
  }, []);

  return (
    <AdminContext.Provider value={{ adminData, setAdminData, loading, setLoading, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
