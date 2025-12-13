// src/admin/component/pages/AdminTwoFA.js
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminTwoFA = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    // hanya angka 0–9
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto fokus ke kotak berikutnya
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // nanti validasi ke backend / API
    navigate("/admin/dashboard"); // sesuaikan dengan rute tujuanmu
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4 sm:px-6
      "
      style={{ backgroundColor: "#FFFEF6", fontFamily: '"Inter", sans-serif' }}
    >
      {/* CARD — COPY PERSIS DARI AdminLogin.js */}
      <div
        className="
          w-full max-w-[500px]
          h-[600px]
          bg-white
          border-[3px] border-[#3A5B40]
          rounded-[15px]
          shadow-[0_4px_6px_rgba(0,0,0,0.1)]
          flex flex-col items-center

          px-6 py-12
          sm:px-10 sm:py-14
          lg:px-12 lg:py-16
          2xl:px-16 2xl:py-20
        "
      >
        {/* LOGO — sama */}
        <div className="w-24 h-24 mb-8 rounded-full bg-[#3A5B40]/10 border border-[#3A5B40] flex items-center justify-center">
          <span className="text-xs text-[#3A5B40]">LOGO</span>
        </div>

        {/* TITLE — sama class, beda teks */}
        <h1 className="text-[22px] font-bold text-[#3A5B40] mb-10 text-center">
          Verifikasi 2 Langkah
        </h1>

        {/* FORM — pola sama: 3 blok, space-y-6 */}
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          {/* BLOK 1: teks instruksi (setara “Email Admin” block di login) */}
          <div className="text-sm text-[#3A5B40] text-center">
            <p>Masukkan kode yang dikirim ke email Anda untuk melanjutkan</p>
          </div>

          {/* BLOK 2: label + OTP (setara “Kata Sandi”) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#3A5B40]">
              Masukkan Kode OTP
            </label>

            <div className="flex items-center justify-between w-full">
              {otp.map((val, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={val}
                  onChange={(e) => handleChange(e.target.value, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  className="
                    w-[55px] h-[55px]
                    rounded-md
                    text-center
                    text-lg font-semibold
                    outline-none
                    bg-[#588157]/20
                    focus:bg-[#588157]/30
                    focus:ring-2 focus:ring-[#588157]
                  "
                  style={{ color: "#3A5B40" }}
                />
              ))}
            </div>
          </div>

          {/* BLOK 3: tombol + resend (setara blok tombol login) */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="
                mt-6
                w-full h-[52px]
                rounded-md
                bg-[#3A5B40]
                text-white
                text-sm font-medium
                flex items-center justify-center
                hover:bg-[#324c36]
                transition
              "
            >
              Verifikasi
            </button>
            <p className="text-xs text-[#3A5B40]/70 text-center">
              Kirim ulang kode (30s)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminTwoFA;