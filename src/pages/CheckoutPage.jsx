// src/pages/CheckoutPage.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressSelector from "../components/AddressSelector";
import PaymentMethods from "../components/PaymentMethods";
import OrderSuccessModal from "../components/OrderSuccessModal";

export default function CheckoutPage({ cartItems, clearCart, removeFromCart }) {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [address, setAddress] = useState({
    name: "Nguyễn Hoàng Anh",
    phone: "+84 399 148 815",
    address:
      "Số 26, Đường Số 23, Phường Bình Trưng Đông, Thành Phố Thủ Đức, TP. Hồ Chí Minh",
  });

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
      ),
    [cartItems]
  );

  const shippingFee = 202584;
  const insurance = 31999;
  const xuDiscount = 400;
  const grandTotal = total + shippingFee + insurance - xuDiscount;

  const handleOnPay = (method, details) => {
    setShowSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate("/thank-you", { state: { method, amount: grandTotal } });
    }, 3000);
  };

  {cartItems.map((it, idx) => (
  <div
    key={idx}
    className="flex items-center justify-between border-b last:border-none py-4"
  >
    <div className="flex items-center gap-4">
      {it.thumbnail ? (
        <img
          src={it.thumbnail}
          alt={it.title || "Không có tiêu đề"}
          className="w-20 h-20 object-cover rounded-lg"
        />
      ) : (
        <div className="w-20 h-20 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg text-xs">
          Không có ảnh
        </div>
      )}

      <div>
        <div className="font-medium text-gray-800">{it.title}</div>
        <div className="text-sm text-gray-500">{it.selectedType}</div>
      </div>
    </div>

    <div className="text-right">
      <div className="text-gray-700">
        {(it.price || 0).toLocaleString()}₫ x {it.quantity || 1}
      </div>
      <div className="font-semibold text-[#b98839]">
        {((it.price || 0) * (it.quantity || 1)).toLocaleString()}₫
      </div>
      <button
        onClick={() => removeFromCart(idx)}
        className="text-red-500 text-xs mt-1 hover:underline"
      >
        Xóa
      </button>
    </div>
  </div>
))}


  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-[#b98839] mb-4">
        Thanh toán đơn hàng
      </h1>

      <AddressSelector selectedAddress={address} onChange={setAddress} />

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-lg mb-4 text-gray-800">Sản phẩm</h2>
        {cartItems.map((it, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border-b last:border-none py-4"
          >
                    <img
            src={it.thumbnail || "/no-image.jpg"}
            alt={it.title || "Sản phẩm"}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="font-medium text-gray-800">{it.title}</div>
          <div className="text-sm text-gray-500">{it.selectedType}</div>



            <div className="text-right">
              <div className="text-gray-700">
                {(it.price || 0).toLocaleString()}₫ x {it.quantity || 1}
              </div>
              <div className="font-semibold text-[#b98839]">
                {((it.price || 0) * (it.quantity || 1)).toLocaleString()}₫
              </div>
              <button
                onClick={() => removeFromCart(idx)}
                className="text-red-500 text-xs mt-1 hover:underline"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tổng kết & thanh toán */}
      <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
        <div className="flex justify-between text-gray-700 text-sm mb-2">
          <span>Tổng tiền hàng:</span>
          <span>{total.toLocaleString()}₫</span>
        </div>
        <div className="flex justify-between text-gray-700 text-sm mb-2">
          <span>Phí vận chuyển:</span>
          <span>{shippingFee.toLocaleString()}₫</span>
        </div>
        <div className="flex justify-between text-gray-700 text-sm mb-2">
          <span>Bảo hiểm:</span>
          <span>{insurance.toLocaleString()}₫</span>
        </div>
        <div className="flex justify-between text-gray-700 text-sm mb-2">
          <span>Shopee Xu:</span>
          <span>-{xuDiscount.toLocaleString()}₫</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-lg text-[#b98839] mb-4">
          <span>Tổng thanh toán:</span>
          <span>{grandTotal.toLocaleString()}₫</span>
        </div>

        <PaymentMethods total={grandTotal} onPay={handleOnPay} />
      </div>

      {/* Hiệu ứng xác nhận */}
      <OrderSuccessModal show={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
