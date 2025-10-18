import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

export default function ProfilePage() {
  const { user, updateProfile } = useUser();
  const [formData, setFormData] = useState(user || {});

  useEffect(() => {
    setFormData(user || {});
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormData((prev) => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile(formData);
    alert("✅ Cập nhật hồ sơ thành công!");
  };

  if (!user) {
    return <p className="text-center mt-10">Vui lòng đăng nhập trước!</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Hồ Sơ Cá Nhân</h2>
      <div className="flex flex-col items-center">
        <img
          src={formData.avatar || "https://via.placeholder.com/100"}
          alt="Avatar"
          className="w-24 h-24 rounded-full mb-3 border"
        />
        <input type="file" accept="image/*" onChange={handleAvatarChange} className="mb-4" />
      </div>

      <input name="name" value={formData.name || ""} onChange={handleChange} placeholder="Họ tên" className="border p-2 w-full mb-3 rounded" />
      <input name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="Số điện thoại" className="border p-2 w-full mb-3 rounded" />
      <input name="address" value={formData.address || ""} onChange={handleChange} placeholder="Địa chỉ" className="border p-2 w-full mb-3 rounded" />
      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600">
        Lưu hồ sơ
      </button>
    </div>
  );
}
