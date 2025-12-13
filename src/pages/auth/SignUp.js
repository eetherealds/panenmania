import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FarmerSignup from "../../assets/images/banners/petani signup.svg";
import GoogleIcon from "../../assets/images/icons/google.svg";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    phone: "",
    email: "",
    password: "",
    gender: "",
  });

  const [genderError, setGenderError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    if (apiError) setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama || formData.nama.trim().length < 3) {
      newErrors.nama = "Nama lengkap minimal 3 karakter";
    } else if (!/^[a-zA-Z0-9 ]+$/.test(formData.nama)) {
      newErrors.nama = "Nama hanya boleh berisi huruf, angka, dan spasi";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email wajib diisi";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    }

    if (!formData.phone) {
      newErrors.phone = "Nomor telepon wajib diisi";
    } else if (!/^\d{10,20}$/.test(formData.phone)) {
      newErrors.phone = "Nomor telepon harus 10-20 digit angka";
    }

    if (!formData.gender) {
      newErrors.gender = "Silakan pilih jenis kelamin";
      setGenderError("Silakan pilih salah satu jenis kelamin.");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenderSelect = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
    if (genderError) setGenderError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        full_name: formData.nama,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone,
        gender: formData.gender,
      };

      const response = await fetch(
        "https://pa-man-api.vercel.app/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userData", JSON.stringify(formData));
        alert("Registrasi berhasil! Silakan login.");
        navigate("/signin");
      } else {
        setApiError(data.message || "Registrasi gagal. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setApiError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full py-1 px-4 rounded-lg bg-[#3A5A40] border border-white text-[11px] sm:text-xs md:text-sm text-white placeholder-white/60 focus:outline-none";

  const genderOptionClass = () =>
    "flex items-center gap-2 cursor-pointer text-[11px] sm:text-xs md:text-sm";
  const genderPillClass = (value) =>
    `px-5 py-1 rounded-[10px] border border-white font-semibold ${
      formData.gender === value
        ? "bg-white text-[#3A5A40]"
        : "bg-transparent text-white"
    }`;
  const genderCircleClass = (value) =>
    `w-4 h-4 rounded-full border border-white flex items-center justify-center ${
      formData.gender === value ? "bg-white" : "bg-transparent"
    }`;

  return (
    <div className="bg-[#F8F8ED] min-h-screen flex justify-center items-center font-poppins px-4">
      {/* Main Container */}
      <div className="max-w-4xl w-full bg-white rounded-[32px] border-2 border-[#588157] overflow-hidden h-auto lg:h-[580px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/*left*/}
          <div className="p-8 lg:p-10 flex flex-col items-center">
            <div className="flex flex-col items-center mt-2 lg:mt-4">
              {/*farmer signup*/}
              <img
                src={FarmerSignup}
                alt="Petani membawa hasil panen"
                className="rounded-[28px] mb-8 w-full max-w-[360px] h-[220px] lg:h-[240px] object-cover"
              />
              {/*title*/}
              <h2 className="text-[20px] lg:text-[22px] font-bold text-[#3A5A40] text-center">
                Selamat Datang di PaMan!
              </h2>
              {/*description*/}
              <p className="text-xs sm:text-sm text-[#3A5A40] text-center mt-3 max-w-xs leading-relaxed">
                Temukan produk pertanian segar pilihan langsung dari petani
                terbaik.
              </p>
              {/*line*/}
              <div className="w-[70%] border-t border-[#3A5B40] mt-6" />
              {/*google*/}
              <button className="mt-6">
                <img
                  src={GoogleIcon}
                  className="w-7 h-7 object-contain"
                  alt="Google"
                />
              </button>
            </div>
          </div>

          {/*form*/}
          <div className="bg-[#3A5A40] text-white p-8 lg:p-10 relative flex flex-col h-full">
            {/*register*/}
            <div className="absolute top-6 right-8 flex gap-4 text-xs sm:text-sm font-semibold">
              <Link to="/signin" className="opacity-80 hover:opacity-100">
                Masuk
              </Link>
              <span className="bg-white text-[#3A5A40] px-4 py-1 rounded-lg shadow-md">
                Daftar
              </span>
            </div>

            {/*title*/}
            <h2 className="text-xl sm:text-2xl font-bold mb-3 mt-6">
              Daftar Akun
            </h2>

            {/*form*/}
            <div className="flex-1 overflow-y-auto pr-1">
              <form
                onSubmit={handleSubmit}
                className="space-y-2.5 text-[11px] sm:text-xs md:text-sm"
              >
                {/*full name*/}
                <div>
                  <label className="block mb-1">Nama Lengkap</label>
                  <input
                    name="nama"
                    type="text"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                  {errors.nama && (
                    <p className="text-[10px] text-red-300 mt-1">
                      {errors.nama}
                    </p>
                  )}
                </div>

                {/*gender*/}
                <div>
                  <label className="block mb-2">Jenis Kelamin</label>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                    <button
                      type="button"
                      onClick={() => handleGenderSelect("Perempuan")}
                      className={genderOptionClass()}
                    >
                      <span className={genderCircleClass("Perempuan")} />
                      <span className={genderPillClass("Perempuan")}>
                        Perempuan
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleGenderSelect("Laki")}
                      className={genderOptionClass()}
                    >
                      <span className={genderCircleClass("Laki")} />
                      <span className={genderPillClass("Laki")}>
                        Laki-laki
                      </span>
                    </button>
                  </div>
                  {(genderError || errors.gender) && (
                    <p className="text-[10px] text-red-300 mt-1">
                      {genderError || errors.gender}
                    </p>
                  )}
                </div>

                {/*phone*/}
                <div>
                  <label className="block mb-1">No. Telepon</label>
                  <input
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-300 mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/*email*/}
                <div>
                  <label className="block mb-1">E-mail</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-300 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/*password*/}
                <div>
                  <label className="block mb-1">Kata Sandi</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                  {errors.password && (
                    <p className="text-[10px] text-red-300 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/*confirm password*/}
                {apiError && (
                  <div className="bg-red-500/20 border border-red-300 text-red-100 px-3 py-2 rounded-lg text-[10px] sm:text-xs">
                    {apiError}
                  </div>
                )}

                {/*agreement*/}
                <label className="flex items-center gap-2 text-[10px] leading-tight mt-0.5">
                  <input type="checkbox" required className="w-3 h-3" />
                  <span>Saya menyetujui ketentuan yang berlaku.</span>
                </label>

                {/*submit*/}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-[#3A5A40] py-2 rounded-lg font-semibold mt-1 text-[11px] sm:text-xs md:text-sm hover:bg-[#F1F1F1] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Mendaftar..." : "Daftar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
