// src/components/OrderSuccessModal.jsx
import React, { useEffect, useState } from "react";

export default function OrderSuccessModal({ show, onClose }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setCount((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      const timeout = setTimeout(onClose, 3000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-sm">
        <h2 className="text-2xl font-semibold text-[#b98839] mb-3">
          🎉 Đặt hàng thành công!
        </h2>
        <p className="text-gray-600 mb-4">
          Cảm ơn bạn đã mua hàng. Trang cảm ơn sẽ hiển thị sau {count}s...
        </p>
        <div className="animate-bounce text-3xl">🛍️</div>
      </div>
    </div>
  );
}
