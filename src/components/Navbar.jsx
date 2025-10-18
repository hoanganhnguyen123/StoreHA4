import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, Crown, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";

export default function Navbar({ cartCount = 0, onCartClick }) {
  const loc = useLocation();
  const navigate = useNavigate();
  const { user, login, logout } = useUser();

  const menuItems = [
    { path: "/", label: "Mua Tranh In", icon: <ShoppingBag size={18} /> },
    { path: "/donate", label: "Ủng Hộ / Donate", icon: <Heart size={18} /> },
    { path: "/vip", label: "Thành Viên VIP", icon: <Crown size={18} /> },
  ];

  const handleLogin = () => navigate("/dangnhap");
  const handleProfile = () => navigate("/profile");

  return (
    <motion.header
      className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 shadow-lg sticky top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
        {/* Logo & Tên cửa hàng */}
<motion.div
  className="flex items-center gap-4 cursor-pointer select-none"
  onClick={() => navigate("/")}
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <motion.div
    className="w-12 h-12 rounded-xl bg-white/30 backdrop-blur-md flex items-center justify-center text-white font-extrabold text-lg shadow-inner border border-white/40"
    animate={{
      scale: [1, 1.03, 1],
      rotate: [0, 2, -2, 0],
    }}
    transition={{
      repeat: Infinity,
      duration: 6,
      ease: "easeInOut",
    }}
    whileHover={{
      scale: 1.15,
      boxShadow: "0px 0px 18px rgba(255,255,255,0.8)",
      rotate: 0,
    }}
  >
    HA4
  </motion.div>

  <div className="leading-tight">
    <motion.div
      className="text-sm text-yellow-50 tracking-wide"
      whileHover={{ scale: 1.05 }}
    >
      Nghệ Thuật Ký Ức 4.0
    </motion.div>
    <motion.div
      className="text-lg font-bold text-white drop-shadow-md"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      Cửa hàng tranh nghệ thuật
    </motion.div>
  </div>
</motion.div>

         
        {/* Menu + Cart + User */}
        <nav className="flex items-center gap-5">
          {/* Menu */}
          <div className="flex gap-2">
            {menuItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    loc.pathname === item.path
                      ? "bg-white text-orange-600 shadow-md"
                      : "text-white/90 hover:bg-white/25 hover:text-white"
                  }`}
                >
                  {item.icon} {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Cart */}
          <motion.button
            onClick={onCartClick}
            className="relative p-2 rounded-full text-white hover:bg-white/20 transition-all"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 10px rgba(255,255,255,0.6)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* User */}
          <div className="ml-3 flex items-center gap-2">
            {!user ? (
              <motion.button
                onClick={handleLogin}
                className="px-4 py-2 bg-white/25 hover:bg-white/40 text-white rounded-full font-semibold transition-all"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 10px rgba(255,255,255,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Đăng nhập
              </motion.button>
            ) : (
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-9 h-9 rounded-full bg-white overflow-hidden cursor-pointer border-2 border-white/60"
                  onClick={handleProfile}
                  title="Xem hồ sơ cá nhân"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-orange-200 text-orange-700 font-bold">
                      {user.name?.[0]?.toUpperCase() || <User size={18} />}
                    </div>
                  )}
                </motion.div>

                <span className="text-white font-medium truncate max-w-[120px]">
                  Xin chào, {user.name}
                </span>

                <motion.button
                  onClick={logout}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-semibold transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Đăng xuất
                </motion.button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
