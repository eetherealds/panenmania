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

  // Fetch profile dari API dengan retry logic untuk 429 errors
  const fetchProfile = useCallback(async (retryCount = 0) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found in localStorage");
        return;
      }

      if (retryCount === 0) {
        setLoading(true);
      }
      console.log("Fetching profile with token:", token.substring(0, 20) + "...");
      
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
      } else if (response.status === 429 && retryCount < 3) {
        // Rate limit - retry after delay
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
        console.warn(`Rate limited (429). Retrying in ${delay}ms...`);
        // Wait for retry to complete before returning
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchProfile(retryCount + 1);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to fetch profile:", response.status, errorData);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      if (retryCount === 0) {
        setLoading(false);
      }
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
