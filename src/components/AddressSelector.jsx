// src/components/AddressSelector.jsx
import React, { useState } from "react";

export default function AddressSelector({ selectedAddress, onChange }) {
  const [editing, setEditing] = useState(false);
  const [tempAddress, setTempAddress] = useState(selectedAddress);

  const handleSave = () => {
    onChange(tempAddress);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-lg mb-3 text-gray-800">
          Cập nhật địa chỉ nhận hàng
        </h2>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 mb-2"
          placeholder="Họ và tên"
          value={tempAddress.name}
          onChange={(e) =>
            setTempAddress({ ...tempAddress, name: e.target.value })
          }
        />
        <input
          className="w-full border border-gray-300 rounded-lg p-2 mb-2"
          placeholder="Số điện thoại"
          value={tempAddress.phone}
          onChange={(e) =>
            setTempAddress({ ...tempAddress, phone: e.target.value })
          }
        />
        <textarea
          className="w-full border border-gray-300 rounded-lg p-2 mb-2"
          placeholder="Địa chỉ chi tiết"
          value={tempAddress.address}
          onChange={(e) =>
            setTempAddress({ ...tempAddress, address: e.target.value })
          }
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setEditing(false)}
            className="text-gray-500 hover:underline"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="bg-[#b98839] text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            Lưu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex justify-between">
      <div>
        <h2 className="font-semibold text-lg mb-2 text-gray-800">
          Địa chỉ nhận hàng
        </h2>
        <p className="text-gray-700">
          {selectedAddress.name}{" "}
          <span className="text-sm text-gray-500">
            ({selectedAddress.phone})
          </span>
        </p>
        <p className="text-gray-600 text-sm">{selectedAddress.address}</p>
      </div>
      <button
        onClick={() => setEditing(true)}
        className="text-[#b98839] text-sm hover:underline"
      >
        Thay đổi
      </button>
    </div>
  );
}
