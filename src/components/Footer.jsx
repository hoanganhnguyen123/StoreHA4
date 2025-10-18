import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-800 to-blue-900 text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột 1 */}
        <div>
          <h2 className="text-xl font-bold mb-3">Nghệ Thuật Ký Ức 4.0</h2>
          <p className="text-gray-400 text-sm">
            Dự án kết hợp nghệ thuật truyền thống với công nghệ AI, nhằm tái hiện ký ức văn hóa Việt Nam sống động và gần gũi hơn.
          </p>
        </div>

        {/* Cột 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên kết nhanh</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-yellow-300">🏠 Trang chủ</a></li>
            <li><a href="/donate" className="hover:text-yellow-300">💖 Ủng hộ</a></li>
            <li><a href="/vip" className="hover:text-yellow-300">👑 Thành viên VIP</a></li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Kết nối với chúng tôi</h3>
          <div className="flex space-x-5 mt-3">
            <a href="#" className="hover:text-blue-400 transition">
              <Facebook size={22} />
            </a>
            <a href="#" className="hover:text-pink-400 transition">
              <Instagram size={22} />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <Youtube size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-gray-400 text-sm border-t border-gray-700">
        © 2025 MT4. All rights reserved. — Designed by Nghệ Thuật Ký Ức 4.0
      </div>
    </footer>
  );
}
