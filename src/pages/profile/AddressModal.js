// src/pages/afterLogin/AddressModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressModal = ({ onClose, onSave, initialData }) => {
  // === STATE INPUT FORM ===
  const [label, setLabel] = useState(""); // nama alamat
  const [prov, setProv] = useState("");
  const [city, setCity] = useState("");
  const [subdist, setSubdist] = useState("");
  const [postal, setPostal] = useState("");
  const [street, setStreet] = useState("");
  const [extra, setExtra] = useState("");

  // === LIST DROPDOWN ===
  const [provinsiList, setProvinsiList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [subdistList, setSubdistList] = useState([]);

  // === ERROR VALIDATION ===
  const [errors, setErrors] = useState({});

  // === FADE ANIMATION ===
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => setFadeIn(true), []);

  // === LOAD PROVINSI ===
  useEffect(() => {
    axios
      .get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => setProvinsiList(res.data))
      .catch(() => console.error("Gagal memuat provinsi"));
  }, []);

  // === LOAD KOTA ===
  useEffect(() => {
    if (prov) {
      axios
        .get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov}.json`
        )
        .then((res) => setCityList(res.data))
        .catch(() => console.error("Gagal memuat kota"));
    }
  }, [prov]);

  // === LOAD KECAMATAN ===
  useEffect(() => {
    if (city) {
      const selectedCity = cityList.find((c) => c.name === city);

      if (selectedCity) {
        axios
          .get(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedCity.id}.json`
          )
          .then((res) => setSubdistList(res.data))
          .catch(() => console.error("Gagal memuat kecamatan"));
      }
    }
  }, [city, cityList]);

  // === LOAD DATA EDIT ===
  useEffect(() => {
    if (initialData) {
      setLabel(initialData.name || "");
      setStreet(initialData.detail || "");
    }
  }, [initialData]);

  // === VALIDASI INPUT ===
  const validate = () => {
    let temp = {};
    if (!label) temp.label = "Nama alamat wajib diisi!";
    if (!prov) temp.prov = "Provinsi wajib dipilih!";
    if (!city) temp.city = "Kota wajib dipilih!";
    if (!subdist) temp.subdist = "Kecamatan wajib dipilih!";
    if (!street) temp.street = "Nama jalan wajib diisi!";
    if (!postal) temp.postal = "Kode pos wajib diisi!";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // === SIMPAN DATA ===
  const handleSave = () => {
    if (!validate()) return;

    const provName =
      provinsiList.find((p) => String(p.id) === String(prov))?.name || prov;

    onSave({
      name: label,
      street: street,
      city: city,
      kecamatan: subdist,
      province: provName,
      postal_code: postal,
      detail: extra,
      isPrimary: initialData?.isPrimary ?? false,
    });
  };

  // === STYLE INPUT ===
  const inputBaseClass =
    "w-full bg-white py-3 px-4 rounded-[10px] mt-1 outline-none text-sm shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-transparent focus:border-[#344E41]/40";

  return (
    <div className="fixed inset-0 bg-black/40 z-[999] flex justify-center items-center px-4">
      {/* === WRAPPER MODAL === */}
      <div
        className={`w-full max-w-2xl rounded-[16px] bg-[#FFFEF6] shadow-[0_16px_40px_rgba(0,0,0,0.18)] p-6 md:p-10 overflow-y-auto max-h-[95vh] transition-all duration-300 ${
          fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* === TITLE === */}
        <h2 className="text-xl font-bold mb-2 text-[#344E41]">
          {initialData ? "Ubah Alamat" : "Alamat Baru"}
        </h2>
        <hr className="border-t border-[#344E41]/30 mb-6" />

        {/* === FORM === */}
        <div className="space-y-4">
          {/* Nama Alamat */}
          <div>
            <label className="text-sm text-[#344E41]">Nama Alamat</label>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className={`${inputBaseClass} ${
                errors.label ? "border-red-500" : ""
              }`}
            />
            {errors.label && (
              <p className="text-red-500 text-xs mt-1">{errors.label}</p>
            )}
          </div>

          {/* Provinsi */}
          <div>
            <label className="text-sm text-[#344E41]">Provinsi</label>
            <select
              value={prov}
              onChange={(e) => {
                setProv(e.target.value);
                setCity("");
                setSubdist("");
              }}
              className={`${inputBaseClass} ${
                errors.prov ? "border-red-500" : ""
              }`}
            >
              <option value="">Pilih Provinsi</option>
              {provinsiList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.prov && (
              <p className="text-red-500 text-xs mt-1">{errors.prov}</p>
            )}
          </div>

          {/* Kota */}
          <div>
            <label className="text-sm text-[#344E41]">Kota</label>
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setSubdist("");
              }}
              className={`${inputBaseClass} ${
                errors.city ? "border-red-500" : ""
              }`}
            >
              <option value="">Pilih Kota</option>
              {cityList.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>

          {/* Kecamatan */}
          <div>
            <label className="text-sm text-[#344E41]">Kecamatan</label>
            <select
              value={subdist}
              onChange={(e) => setSubdist(e.target.value)}
              className={`${inputBaseClass} ${
                errors.subdist ? "border-red-500" : ""
              }`}
            >
              <option value="">Pilih Kecamatan</option>
              {subdistList.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.subdist && (
              <p className="text-red-500 text-xs mt-1">{errors.subdist}</p>
            )}
          </div>

          {/* Kode Pos */}
          <div>
            <label className="text-sm text-[#344E41]">Kode Pos</label>
            <input
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              className={`${inputBaseClass} ${
                errors.postal ? "border-red-500" : ""
              }`}
            />
            {errors.postal && (
              <p className="text-red-500 text-xs mt-1">{errors.postal}</p>
            )}
          </div>

          {/* Jalan */}
          <div>
            <label className="text-sm text-[#344E41]">
              Nama Jalan / Gedung / No. Rumah
            </label>
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className={`${inputBaseClass} ${
                errors.street ? "border-red-500" : ""
              }`}
            />
            {errors.street && (
              <p className="text-red-500 text-xs mt-1">{errors.street}</p>
            )}
          </div>

          {/* Detail tambahan */}
          <div>
            <label className="text-sm text-[#344E41]">Detail Tambahan</label>
            <input
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              className={inputBaseClass}
            />
          </div>

          {/* ==== BUTTON AKSI ==== */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={onClose}
              className="bg-[#96352C]/80 text-white px-5 py-2 rounded-[10px] hover:bg-gray-400 transition text-sm font-semibold"
            >
              Kembali
            </button>

            <button
              onClick={handleSave}
              className="bg-[#344E41] text-white px-6 py-2 rounded-[10px] hover:bg-[#2a3e33] transition text-sm font-semibold"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
