// 🧭 App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ArtProvider } from "./context/ArtContext";
import { UserProvider } from "./context/UserContext";

// Pages
import MuaTranhIn from "./pages/MuaTranhIn.jsx";
import ChiTietTranh from "./pages/ChiTietTranh.jsx";
import DonatUngHo from "./pages/DonatUngHo.jsx";
import ThanhVienVIP from "./pages/ThanhVienVIP.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import QuanLyVIP from "./pages/QuanLyVIP.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import DangKyDangNhap from "./pages/DangKyDangNhap.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import Admin from "./pages/Admin.jsx";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartPopup from "./components/CartPopup.jsx";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🛒 Load giỏ hàng từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mt4_cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  // 💾 Lưu giỏ hàng mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("mt4_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Thêm sản phẩm vào giỏ
// nhận thêm selectedType (mặc định "Tranh Canvas")
// 🛒 Thêm sản phẩm vào giỏ
const addToCart = (art, selectedType) => {
  const price = art.price?.[selectedType] || art.price || 0;
  const imageUrl =
    art.images?.[selectedType] ||
    art.displayImage ||
    Object.values(art.images || {})[0] ||
    "/no-image.jpg";

  setCartItems((prev) => {
    const newCart = [
      ...prev,
      {
        id: art.id,
        title: art.title,
        price,
        selectedType, // ✅ loại sản phẩm (Canvas, Gỗ, v.v.)
        thumbnail: imageUrl,
        quantity: 1,
      },
    ];

    try {
      localStorage.setItem("mt4_cart", JSON.stringify(newCart));
    } catch (error) {
      console.error("❌ Không thể lưu giỏ hàng:", error);
      alert("⚠️ Dung lượng giỏ hàng quá lớn. Hãy xoá bớt tranh!");
    }

    return newCart;
  });
};



  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("mt4_cart");
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem("mt4_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const cartCount = cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0);

  // 👇 Chỉ hiển thị Navbar + Footer nếu KHÔNG ở trang admin
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <UserProvider>
      <ArtProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
          {!isAdminPage && (
            <Navbar cartCount={cartCount} onCartClick={() => setShowCart(true)} />
          )}

          <main className="flex-1">
            <Routes>
              {/* Trang người dùng */}
              <Route path="/" element={<MuaTranhIn addToCart={addToCart} />} />
              <Route path="/chi-tiet/:id" element={<ChiTietTranh addToCart={addToCart} />} />
              <Route path="/donate" element={<DonatUngHo />} />
              <Route path="/vip" element={<ThanhVienVIP />} />
              <Route path="/quanly-vip" element={<QuanLyVIP />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dangnhap" element={<DangKyDangNhap />} />

              {/* Thanh toán */}
              <Route
                path="/checkout"
                element={
                  <CheckoutPage
                    cartItems={cartItems}
                    clearCart={clearCart}
                    removeFromCart={removeFromCart}
                  />
                }
              />
              <Route path="/thank-you" element={<ThankYou />} />

              {/* Admin */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          {!isAdminPage && <Footer />}

          {!isAdminPage && showCart && (
            <CartPopup
              cartItems={cartItems}
              onClose={() => setShowCart(false)}
              onCheckout={() => {
                setShowCart(false);
                navigate("/checkout");
              }}
            />
          )}
        </div>
      </ArtProvider>
    </UserProvider>
  );
}
