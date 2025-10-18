// ✅ src/pages/QuanLyVIP.jsx
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function QuanLyVIP() {
  const { user, setUser } = useContext(UserContext);

  // ✅ Lấy dữ liệu user từ Context hoặc localStorage
  const [localUser, setLocalUser] = useState(
    user ||
      JSON.parse(localStorage.getItem("userProfile")) || {
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        joined: "12/08/2024",
        phone: "0909 123 456",
        address: "123 Lê Lợi, Quận 1, TP.HCM",
        avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      }
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(localUser);
  const [avatarPreview, setAvatarPreview] = useState(localUser.avatar);

  // ✅ Dữ liệu gói VIP hiện tại
  const [currentPlan, setCurrentPlan] = useState({
    title: "Thành Viên Vàng",
    billingCycle: "monthly",
    priceMonthly: 199000,
    autoRenew: true,
  });

  // ✅ Lịch sử mua hàng (mẫu)
  const [orders] = useState([
    { id: "DH001", date: "2025-08-21", total: 499000, status: "Đã giao" },
    { id: "DH002", date: "2025-09-15", total: 199000, status: "Đang xử lý" },
    { id: "DH003", date: "2025-10-01", total: 99000, status: "Đã hủy" },
  ]);

  // ✅ Gói VIP có sẵn
  const vipPlans = [
    { title: "Hỗ Trợ Viên", priceMonthly: 99000 },
    { title: "Thành Viên Vàng", priceMonthly: 199000 },
    { title: "Nhà Bảo Trợ Nghệ Thuật", priceMonthly: 499000 },
  ];

  const discountRate = 0.2;
  const getPrice = (plan, cycle) =>
    cycle === "monthly"
      ? plan.priceMonthly
      : plan.priceMonthly * 12 * (1 - discountRate);

  // ✅ Khi user thay đổi → cập nhật Context + localStorage
  useEffect(() => {
    if (localUser) {
      setUser(localUser);
      localStorage.setItem("userProfile", JSON.stringify(localUser));
    }
  }, [localUser]);

  // ==============================
  // 🎯 CÁC HÀNH ĐỘNG NGƯỜI DÙNG
  // ==============================

  const handleEditProfile = () => {
    setEditForm(localUser);
    setAvatarPreview(localUser.avatar);
    setIsEditing(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setEditForm((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setLocalUser(editForm);
    setUser(editForm);
    localStorage.setItem("userProfile", JSON.stringify(editForm));
    setIsEditing(false);
    alert("✅ Hồ sơ cá nhân đã được cập nhật!");
  };

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc muốn đăng xuất không?")) {
      localStorage.removeItem("userProfile");
      setUser(null);
      alert("👋 Đăng xuất thành công!");
      window.location.href = "/dangnhap";
    }
  };

  const handleCancel = () => {
    if (window.confirm("Bạn có chắc chắn muốn hủy gói VIP không?")) {
      alert("❌ Bạn đã hủy gói VIP.");
      setCurrentPlan(null);
    }
  };

  const handleToggleAutoRenew = () => {
    setCurrentPlan((prev) => ({ ...prev, autoRenew: !prev.autoRenew }));
  };

  const handleChangeCycle = () => {
    setCurrentPlan((prev) => ({
      ...prev,
      billingCycle: prev.billingCycle === "monthly" ? "yearly" : "monthly",
    }));
  };

  const handleUpgrade = (newPlan) => {
    if (newPlan.title === currentPlan.title) {
      alert("⚠️ Bạn đang ở gói này rồi.");
      return;
    }
    if (window.confirm(`Bạn có muốn nâng cấp lên gói "${newPlan.title}" không?`)) {
      setCurrentPlan({
        ...newPlan,
        billingCycle: currentPlan.billingCycle,
        autoRenew: currentPlan.autoRenew,
      });
      alert(`🎉 Bạn đã nâng cấp lên gói "${newPlan.title}".`);
    }
  };

  // ==============================
  // 🎨 GIAO DIỆN HIỂN THỊ
  // ==============================

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        ⚙️ Quản Lý Thành Viên VIP
      </h1>

      {/* Hồ sơ cá nhân */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">👤 Hồ Sơ Cá Nhân</h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={avatarPreview}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-orange-300 shadow-md object-cover"
          />
          {isEditing && (
            <label className="mt-3 bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
              📸 Chọn ảnh đại diện
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          )}
        </div>

        {!isEditing ? (
          <>
            <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
              <p><span className="font-semibold">Họ tên:</span> {localUser.name}</p>
              <p><span className="font-semibold">Email:</span> {localUser.email}</p>
              <p><span className="font-semibold">Số điện thoại:</span> {localUser.phone}</p>
              <p><span className="font-semibold">Ngày tham gia:</span> {localUser.joined}</p>
              <p className="sm:col-span-2"><span className="font-semibold">Địa chỉ:</span> {localUser.address}</p>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
              >
                ✏️ Chỉnh sửa hồ sơ
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                🚪 Đăng xuất
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="Họ tên"
              />
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="Email"
              />
              <input
                type="text"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="Số điện thoại"
              />
              <input
                type="text"
                value={editForm.joined}
                onChange={(e) => setEditForm({ ...editForm, joined: e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="Ngày tham gia"
              />
              <textarea
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                className="border p-2 rounded sm:col-span-2 w-full"
                placeholder="Địa chỉ"
              />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                💾 Lưu hồ sơ
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
              >
                ❌ Hủy
              </button>
            </div>
          </>
        )}
      </div>

      {/* Gói VIP hiện tại */}
      {!currentPlan ? (
        <p className="text-center text-gray-600">
          Bạn chưa đăng ký gói VIP nào.{" "}
          <a href="/vip" className="text-orange-500 underline hover:text-orange-600">
            Đăng ký ngay
          </a>
        </p>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            🎖 Gói hiện tại: <span className="text-orange-600">{currentPlan.title}</span>
          </h2>
          <p className="text-gray-600 mb-2">
            Chu kỳ:{" "}
            <span className="font-medium">
              {currentPlan.billingCycle === "monthly" ? "Trả theo tháng" : "Trả theo năm"}
            </span>
          </p>
          <p className="text-gray-600 mb-2">
            Giá:{" "}
            <span className="font-medium">
              {getPrice(currentPlan, currentPlan.billingCycle).toLocaleString()}₫
              {currentPlan.billingCycle === "monthly" ? " / tháng" : " / năm"}
            </span>
          </p>
          <p className="text-gray-600 mb-4">
            Gia hạn tự động:{" "}
            <span
              className={`font-medium ${
                currentPlan.autoRenew ? "text-green-600" : "text-red-600"
              }`}
            >
              {currentPlan.autoRenew ? "Bật ✅" : "Tắt ❌"}
            </span>
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleToggleAutoRenew}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600"
            >
              {currentPlan.autoRenew ? "Tắt Auto-Renew" : "Bật Auto-Renew"}
            </button>

            <button
              onClick={handleChangeCycle}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
              Đổi sang {currentPlan.billingCycle === "monthly" ? "Trả theo năm" : "Trả theo tháng"}
            </button>

            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
            >
              ❌ Hủy gói
            </button>
          </div>
        </div>
      )}

      {/* Lịch sử mua hàng */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🧾 Lịch Sử Mua Hàng</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">Chưa có đơn hàng nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border text-sm text-gray-700">
              <thead className="bg-orange-100">
                <tr>
                  <th className="px-4 py-2 border">Mã đơn</th>
                  <th className="px-4 py-2 border">Ngày đặt</th>
                  <th className="px-4 py-2 border">Tổng tiền</th>
                  <th className="px-4 py-2 border">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-orange-50">
                    <td className="border px-4 py-2">{order.id}</td>
                    <td className="border px-4 py-2">{order.date}</td>
                    <td className="border px-4 py-2 text-right">
                      {order.total.toLocaleString()}₫
                    </td>
                    <td
                      className={`border px-4 py-2 font-medium ${
                        order.status === "Đã giao"
                          ? "text-green-600"
                          : order.status === "Đang xử lý"
                          ? "text-blue-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Nâng cấp gói VIP */}
      {currentPlan && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">🔼 Nâng Cấp Gói VIP</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {vipPlans.map((plan) => (
              <div key={plan.title} className="border rounded-lg p-4 shadow hover:shadow-md">
                <h3 className="font-bold text-orange-600">{plan.title}</h3>
                <p className="text-gray-600">
                  {plan.priceMonthly.toLocaleString()}₫ / tháng
                </p>
                <button
                  onClick={() => handleUpgrade(plan)}
                  className="mt-3 w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Nâng cấp
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
