import React, { useState } from "react";

export default function CheckoutModal({ total, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-md shadow-2xl p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg"
        >
          ✕
        </button>

        {!success ? (
          <>
            <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
              💳 Thanh toán giả lập
            </h2>

            <p className="text-center mb-6 text-gray-600">
              Tổng thanh toán: <span className="font-bold text-orange-600">{total.toLocaleString()}₫</span>
            </p>

            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg shadow hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-70"
            >
              {loading ? "⏳ Đang xử lý..." : "Xác nhận thanh toán"}
            </button>
          </>
        ) : (
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold text-green-600 mb-2">✅ Thanh toán thành công!</h2>
            <p className="text-gray-600 mb-4">Cảm ơn bạn đã ủng hộ dự án 💖</p>
            <button
              onClick={onClose}
              className="py-2 px-6 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600"
            >
              Trở về trang chủ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
