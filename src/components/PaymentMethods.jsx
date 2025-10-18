// src/components/PaymentMethods.jsx
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function PaymentMethods({ total = 0, onPay, defaultMethod = "momo" }) {
  const [method, setMethod] = useState(defaultMethod);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // card + bank info
  const [card, setCard] = useState({ name: "", number: "", exp: "", cvv: "" });
  const [bankInfo, setBankInfo] = useState({ accountName: "", accountNumber: "" });

  const validateCard = () => {
    return card.name && card.number.length >= 12 && card.exp && card.cvv.length >= 3;
  };
  const validateBank = () => {
    return bankInfo.accountName && bankInfo.accountNumber;
  };

  const handlePay = () => {
    if (method === "card" && !validateCard()) {
      alert("Vui lòng nhập đầy đủ thông tin thẻ (demo).");
      return;
    }
    if (method === "bank" && !validateBank()) {
      alert("Vui lòng nhập thông tin chuyển khoản (demo).");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      const details = { amount: total, method, card, bankInfo, status: "success" };
      onPay && onPay(method, details);

      // Bắt đầu đếm ngược
      let time = 3;
      const timer = setInterval(() => {
        time--;
        setCountdown(time);
        if (time === 0) {
          clearInterval(timer);
          window.location.href = "/thank-you"; // chuyển sang trang cảm ơn
        }
      }, 1000);
    }, 1500);
  };

  // Nếu thanh toán thành công → hiển thị hiệu ứng cảm ơn
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-3 text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
        <div className="text-2xl font-semibold text-green-600">Thanh toán thành công!</div>
        <div className="text-gray-600">Cảm ơn bạn đã mua hàng 💖</div>
        <div className="text-sm text-gray-500">Tự động chuyển sau {countdown}s...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid md:grid-cols-3 gap-3">
        {/* MoMo */}
        <label
          className={`p-3 rounded-lg border transition transform hover:scale-105 cursor-pointer ${
            method === "momo" ? "border-pink-500 bg-pink-50 shadow-md" : "border-gray-200"
          }`}
        >
          <input type="radio" name="pay" value="momo" checked={method === "momo"} onChange={() => setMethod("momo")} className="hidden" />
          <div className="font-semibold">🟣 Ví MoMo</div>
          <div className="text-sm text-gray-600 mt-2">Quét mã QR để thanh toán (demo)</div>
          <div className="mt-3 flex justify-center">
            <div className="w-36 h-36 bg-white border rounded flex items-center justify-center text-gray-500 text-xs">
              QR Demo
            </div>
          </div>
        </label>

        {/* Bank */}
        <label
          className={`p-3 rounded-lg border transition transform hover:scale-105 cursor-pointer ${
            method === "bank" ? "border-amber-400 bg-amber-50 shadow-md" : "border-gray-200"
          }`}
        >
          <input type="radio" name="pay" value="bank" checked={method === "bank"} onChange={() => setMethod("bank")} className="hidden" />
          <div className="font-semibold">🏦 Chuyển khoản ngân hàng</div>
          <div className="text-sm text-gray-600 mt-2">Điền thông tin chuyển khoản (demo)</div>

          {method === "bank" && (
            <div className="mt-3 space-y-2">
              <input
                placeholder="Tên chủ tài khoản"
                value={bankInfo.accountName}
                onChange={(e) => setBankInfo((s) => ({ ...s, accountName: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                placeholder="Số tài khoản"
                value={bankInfo.accountNumber}
                onChange={(e) => setBankInfo((s) => ({ ...s, accountNumber: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="text-xs text-gray-500">Ngân hàng DEMO: 000-111-222</div>
            </div>
          )}
        </label>

        {/* Card */}
        <label
          className={`p-3 rounded-lg border transition transform hover:scale-105 cursor-pointer ${
            method === "card" ? "border-blue-400 bg-blue-50 shadow-md" : "border-gray-200"
          }`}
        >
          <input type="radio" name="pay" value="card" checked={method === "card"} onChange={() => setMethod("card")} className="hidden" />
          <div className="font-semibold">💳 Thẻ quốc tế / nội địa</div>
          <div className="text-sm text-gray-600 mt-2">Nhập thông tin thẻ (demo)</div>

          {method === "card" && (
            <div className="mt-3 space-y-2">
              <input placeholder="Tên trên thẻ" value={card.name} onChange={(e) => setCard((s) => ({ ...s, name: e.target.value }))} className="w-full border px-3 py-2 rounded" />
              <input placeholder="Số thẻ" value={card.number} onChange={(e) => setCard((s) => ({ ...s, number: e.target.value }))} className="w-full border px-3 py-2 rounded" />
              <div className="flex gap-2">
                <input placeholder="MM/YY" value={card.exp} onChange={(e) => setCard((s) => ({ ...s, exp: e.target.value }))} className="w-1/2 border px-3 py-2 rounded" />
                <input placeholder="CVV" value={card.cvv} onChange={(e) => setCard((s) => ({ ...s, cvv: e.target.value }))} className="w-1/2 border px-3 py-2 rounded" />
              </div>
            </div>
          )}
        </label>
      </div>

      {/* Tổng + nút xác nhận */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <div className="text-sm text-gray-600">Tổng thanh toán</div>
          <div className="text-xl font-bold text-orange-600">{total.toLocaleString()}₫</div>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-md hover:shadow-lg disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
        </button>
      </div>
    </div>
  );
}
