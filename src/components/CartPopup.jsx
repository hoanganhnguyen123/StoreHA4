import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPopup({ cartItems, onClose }) {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  // ✅ Đóng popup khi nhấn ra ngoài vùng nội dung
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("popup-overlay")) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleCheckout = () => {
    localStorage.setItem("mt4_cart", JSON.stringify(cartItems));
    onClose();
    navigate("/checkout", { state: { cartItems } });
  };

  return (
    <div className="popup-overlay fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl w-[90%] max-w-md shadow-2xl p-6 relative animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl transition-transform hover:scale-110"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
          🛒 Giỏ hàng của bạn
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Giỏ hàng trống</p>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-100 pb-2"
              >
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.type}</p>
                </div>
                <p className="text-orange-500 font-semibold">
                  {item.price.toLocaleString()}₫
                </p>
              </div>
            ))}

            <div className="flex justify-between font-bold text-lg mt-4 border-t border-gray-200 pt-2">
              <span>Tổng cộng:</span>
              <span className="text-orange-600">{total.toLocaleString()}₫</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg shadow-md hover:from-orange-600 hover:to-amber-600 transition-all active:scale-95"
            >
              Thanh toán 💳
            </button>
          </div>
        )}
      </div>

      {/* ✨ CSS animation tiện lợi */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-in-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
