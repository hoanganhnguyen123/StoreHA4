import React from "react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <h1 className="text-4xl font-bold text-orange-600 mb-4">🎉 Cảm ơn bạn đã thanh toán!</h1>
      <p className="text-gray-600 mb-8">
        Đơn hàng của bạn đã được ghi nhận. Chúng tôi sẽ xử lý và gửi thông tin sớm nhất.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold shadow hover:from-orange-600 hover:to-amber-600 transition-all"
      >
        ⬅️ Quay lại cửa hàng
      </Link>
    </div>
  );
}
