// src/components/common/Popup.js
import React from "react";

// import icon
import IconTrash from "../../assets/images/icons/trash merah.svg";
import IconLock from "../../assets/images/icons/kunci.svg";
import IconLogout from "../../assets/images/icons/Log out.svg";
import IconSave from "../../assets/images/icons/save.svg";

/**
 * Popup generik dengan beberapa variant:
 * - delete  : konfirmasi hapus
 * - locked  : akses terkunci
 * - logout  : konfirmasi keluar akun
 * - success : notifikasi sukses
 */
const VARIANT_CONFIG = {
  delete: {
    icon: IconTrash,
    title: "Hapus Produk",
    message: "Anda akan menghapus produk ini di keranjang. Apakah Anda yakin?",
    confirmText: "Ya, Hapus!",
    cancelText: "Tidak!",
  },
  locked: {
    icon: IconLock,
    title: "Akses Terkunci",
    message:
      "Daftar sekarang untuk membuka fitur ini dan nikmati pengalaman belanja yang lebih personal.",
    confirmText: "Ya, Daftar!",
    cancelText: "Tidak!",
  },
  logout: {
    icon: IconLogout,
    title: "Keluar Akun",
    message: "Anda akan keluar dari akun ini. Apakah Anda yakin?",
    confirmText: "Ya, Keluar",
    cancelText: "Tidak!",
  },
  success: {
    icon: IconSave,
    title: "Data Berhasil Diperbarui!",
    message: "Informasi akunmu sudah tersimpan dengan aman.",
    confirmText: "Tutup",
    cancelText: null,
  },
};

const Popup = ({
  variant = "locked",
  title,
  message,
  confirmText,
  cancelText,
  onClose,
  onCancel,
  onConfirm,
}) => {
  const cfg = VARIANT_CONFIG[variant] || VARIANT_CONFIG.locked;

  const finalTitle = title || cfg.title;
  const finalMessage = message || cfg.message;
  const finalConfirmText = confirmText || cfg.confirmText;
  const finalCancelText =
    cancelText !== undefined ? cancelText : cfg.cancelText;

  const mainColor = "#3A5B40";
  const dangerColor = "#96352C";

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[10px] shadow-xl max-w-md w-full py-8 px-6 sm:px-8 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol close khusus success */}
        {variant === "success" && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-[#3A5B40] hover:text-[#2b3e35]"
          >
            ✕
          </button>
        )}

        {/* Icon */}
        {cfg.icon && (
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src={cfg.icon}
                alt={variant}
                className="w-8 h-8 object-contain"
                style={{
                  filter:
                    variant === "delete" || variant === "locked"
                      ? // merah
                        "invert(19%) sepia(83%) saturate(2147%) hue-rotate(350deg) brightness(95%) contrast(94%)"
                      : variant === "logout"
                      ? // hijau gelap
                        "invert(34%) sepia(16%) saturate(1030%) hue-rotate(82deg) brightness(92%) contrast(88%)"
                      : // SUCCESS = warna asli hijau (NO FILTER)
                        "none",
                }}
              />
            </div>
          </div>
        )}

        {/* Judul */}
        <h2 className="text-[20px] sm:text-[22px] font-bold mb-3 text-[#3A5B40]">
          {finalTitle}
        </h2>

        {/* Pesan */}
        {finalMessage && (
          <p className="text-[14px] sm:text-[15px] text-[#3A5B40] mb-6 leading-relaxed">
            {finalMessage}
          </p>
        )}

        {/* Tombol Aksi */}
        <div className="flex flex-wrap justify-center gap-3">
          {/* Batal */}
          {finalCancelText && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="min-w-[110px] px-5 py-2.5 rounded-[10px] text-sm font-semibold"
              style={{
                backgroundColor: `${dangerColor}1A`,
                color: dangerColor,
              }}
            >
              {finalCancelText}
            </button>
          )}

          {/* Konfirmasi */}
          {finalConfirmText && onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              className="min-w-[110px] px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white"
              style={{ backgroundColor: mainColor }}
            >
              {finalConfirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;