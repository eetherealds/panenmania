import React, { createContext, useState, useEffect, useCallback } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    birthday: "",
    avatar_url: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch profile dari API
  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoading(true);
      const response = await fetch(
        "https://pa-man-api.vercel.app/api/user/my-profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.status === "Success" && result.data) {
          setProfileData(result.data);
          // Simpan ke localStorage sebagai cache
          localStorage.setItem("profileData", JSON.stringify(result.data));
        }
      } else {
        console.error("Failed to fetch profile:", response.status);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load dari localStorage jika ada, fetch dari API di background
  useEffect(() => {
    // Load dari cache localStorage
    const cachedProfile = localStorage.getItem("profileData");
    if (cachedProfile) {
      try {
        setProfileData(JSON.parse(cachedProfile));
      } catch (error) {
        console.error("Error parsing cached profile:", error);
      }
    } else {
      setLoading(true);
    }

    // Fetch dari API di background
    fetchProfile();
  }, [fetchProfile]);

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData, loading, fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
