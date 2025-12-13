import React from "react";

const AddressCard = ({ address, onEdit, onDelete, onSetPrimary }) => {
  return (
    <div className="flex items-start justify-between border-b border-gray-300 pb-5">
      <div>
        <p className="font-semibold">{address.label}</p>
        <p className="text-sm text-gray-800 mt-1 max-w-3xl">{address.detail}</p>

        {address.isPrimary && (
          <span className="inline-block mt-2 bg-black text-white text-xs px-3 py-1 rounded">
            Alamat Utama
          </span>
        )}
      </div>

      <div className="flex gap-3 items-start">
        <button onClick={onEdit} className="text-sm text-gray-800 hover:underline">
          Ubah
        </button>
        <button onClick={onDelete} className="text-sm text-gray-800 hover:underline">
          Hapus
        </button>
        {!address.isPrimary && (
          <button
            onClick={onSetPrimary}
            className="bg-white text-[#344E41] text-xs font-semibold px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            Atur sebagai utama
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;