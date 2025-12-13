// src/pages/admin/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin/2fa");
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
      {/* CARD */}
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
        {/* LOGO */}
        <div className="w-24 h-24 mb-8 rounded-full bg-[#3A5B40]/10 border border-[#3A5B40] flex items-center justify-center">
          <span className="text-xs text-[#3A5B40]">LOGO</span>
        </div>

        {/* TITLE */}
        <h1 className="text-[22px] font-bold text-[#3A5B40] mb-10 text-center">
          Login Admin
        </h1>

        {/* FORM */}
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#3A5B40]">
              Email Admin
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full h-[52px]
                border border-[#3A5B40]
                rounded-md
                px-4
                text-sm text-[#3A5B40]
                outline-none
                focus:ring-1 focus:ring-[#3A5B40]
              "
              placeholder="Masukkan email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#3A5B40]">
              Kata Sandi
            </label>
            <div
              className="
                w-full h-[52px]
                border border-[#3A5B40]
                rounded-md
                flex items-center
                px-4
              "
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 text-sm text-[#3A5B40] outline-none bg-transparent"
                placeholder="Masukkan Kata Sandi"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 text-[#3A5B40]"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.5a10.523 10.523 0 01-4.293 5.774"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Button */}
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
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
