import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // ✅ Dùng context


export default function DangKyDangNhap() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { login, setUser } = useUser(); // ✅ lấy từ context
 // 🧩 Khởi tạo tài khoản admin mặc định nếu chưa có
  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const hasAdmin = existingUsers.some((u) => u.role === "admin");

    if (!hasAdmin) {
      existingUsers.push({
        name: "Quản trị viên",
        email: "admin@gmail.com",
        password: "123456",
        phone: "0123456789",
        address: "Hà Nội",
        role: "admin",
      });
      localStorage.setItem("users", JSON.stringify(existingUsers));
      console.log("✅ Đã thêm tài khoản admin mặc định!");
    }
  }, []);

  // 🟢 Đăng ký tài khoản
  const handleRegister = () => {
    if (!name || !email || !password || !phone || !address)
      return alert("Vui lòng nhập đầy đủ thông tin!");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      return alert("Email này đã được đăng ký!");
    }

    const newUser = {
      name,
      email,
      password,
      phone,
      address,
      role: "user",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
    setIsLogin(true);
  };

  // 🔑 Đăng nhập
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      login(found);
      setUser(found);
      alert(`Chào mừng ${found.name}!`);

      // ✅ Nếu là admin thì chuyển hướng sang trang quản trị
      if (found.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Đăng Nhập Tài Khoản" : "Đăng Ký Thành Viên Mới"}
        </h2>

        {/* Form nhập liệu */}
        <div className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <input
                type="text"
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email đăng nhập"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>

        {/* Nút hành động */}
        <button
          onClick={isLogin ? handleLogin : handleRegister}
          className="mt-6 w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-lg transition-all duration-200"
        >
          {isLogin ? "Đăng Nhập" : "Đăng Ký"}
        </button>

        {/* Chuyển đổi tab */}
        <p className="mt-4 text-center text-gray-600">
          {isLogin ? (
            <>
              Chưa có tài khoản?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-rose-600 font-semibold hover:underline"
              >
                Đăng ký ngay
              </button>
            </>
          ) : (
            <>
              Đã có tài khoản?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-rose-600 font-semibold hover:underline"
              >
                Đăng nhập
              </button>
            </>
          )}
        </p>

        {/* Nút quay lại */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 text-gray-500 hover:text-gray-800 w-full text-center"
        >
          ← Quay về trang chủ
        </button>
      </div>
    </div>
  );
}
