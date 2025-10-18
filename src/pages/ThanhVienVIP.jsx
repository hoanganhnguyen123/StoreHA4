// src/pages/ThanhVienVIP.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PaymentMethods from "../components/PaymentMethods";
import { motion } from "framer-motion";

export default function ThanhVienVIP() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [autoRenew, setAutoRenew] = useState(false);

  const discountRate = 0.2;

  const vipPlans = [
    {
      title: "Hỗ Trợ Viên",
      priceMonthly: 99000,
      benefits: [
        { text: "Xem sớm nội dung", tooltip: "Được truy cập trước các bài viết, video" },
        { text: "Nhận ưu đãi khi mua tranh", tooltip: "Giảm giá khi mua sản phẩm dự án" },
      ],
      color: "from-yellow-400 to-amber-400",
    },
    {
      title: "Thành Viên Vàng",
      priceMonthly: 199000,
      benefits: [
        { text: "Toàn bộ quyền cơ bản", tooltip: "Bao gồm mọi quyền lợi gói Hỗ Trợ Viên" },
        { text: "Tặng tranh mini mỗi tháng", tooltip: "Nhận 1 tranh mini AI mỗi tháng" },
        { text: "Ưu tiên sự kiện offline", tooltip: "Được ưu tiên đăng ký sự kiện trực tiếp" },
      ],
      color: "from-orange-400 to-amber-500",
      popular: true,
    },
    {
      title: "Nhà Bảo Trợ Nghệ Thuật",
      priceMonthly: 499000,
      benefits: [
        { text: "Tên hiển thị trên website", tooltip: "Vinh danh trên trang Tri ân" },
        { text: "Tham gia triển lãm ảo", tooltip: "Tham dự triển lãm AI đặc biệt" },
        { text: "Tặng NFT tranh độc quyền", tooltip: "Nhận NFT tranh AI duy nhất" },
      ],
      color: "from-red-500 to-orange-500",
    },
  ];

  const allBenefits = [
    "Xem sớm nội dung",
    "Nhận ưu đãi khi mua tranh",
    "Toàn bộ quyền cơ bản",
    "Tặng tranh mini mỗi tháng",
    "Ưu tiên sự kiện offline",
    "Tên hiển thị trên website",
    "Tham gia triển lãm ảo",
    "Tặng NFT tranh độc quyền",
  ];

  const getPrice = (plan) => {
    if (billingCycle === "monthly") return plan.priceMonthly;
    return plan.priceMonthly * 12 * (1 - discountRate);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setAutoRenew(false);
  };

  const handlePayment = (method, details) => {
    alert(
      `🎉 Cảm ơn bạn đã đăng ký gói "${selectedPlan.title}" (${billingCycle === "monthly" ? "theo tháng" : "theo năm"}) với giá ${details.amount.toLocaleString()}₫ bằng ${method}!\n🔄 Tự động gia hạn: ${autoRenew ? "Bật ✅" : "Tắt ❌"}`
    );
    setSelectedPlan(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-orange-600 mb-4 text-center">
        🌟 Thành Viên VIP
      </h1>
      <p className="text-gray-600 text-center mb-10">
        Trở thành thành viên VIP để đồng hành cùng dự án và nhận nhiều quyền lợi đặc biệt.
      </p>

      {/* Bộ chọn chu kỳ thanh toán */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-100 p-2 rounded-lg flex">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              billingCycle === "monthly"
                ? "bg-orange-500 text-white shadow"
                : "text-gray-700"
            }`}
          >
            Trả theo tháng
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              billingCycle === "yearly"
                ? "bg-orange-500 text-white shadow"
                : "text-gray-700"
            }`}
          >
            Trả theo năm (-20%)
          </button>
        </div>
      </div>

      {/* DANH SÁCH GÓI VIP */}
      {!selectedPlan && (
        <>
         <div className="grid gap-8 md:grid-cols-3">
  {vipPlans.map((plan, idx) => {
    const price = getPrice(plan);
    const priceLabel =
      billingCycle === "monthly"
        ? `${plan.priceMonthly.toLocaleString()}₫ / tháng`
        : `${price.toLocaleString()}₫ / năm`;

    return (
      <motion.div
        key={idx}
        className={`relative bg-gradient-to-br ${plan.color} rounded-2xl shadow-lg p-8 text-white transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col h-full`}
        whileHover={{ scale: 1.03 }}
        onClick={() => handleSelectPlan(plan)}
      >
        {plan.popular && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            Most Popular
          </div>
        )}
        <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
        <p className="text-lg font-semibold mb-4">{priceLabel}</p>
        <ul className="mb-6 space-y-2 text-sm flex-1">
          {plan.benefits.map((b, i) => (
            <li key={i} className="relative group">
              <span>• {b.text}</span>
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap transition-opacity z-50">
                {b.tooltip}
              </span>
            </li>
          ))}
        </ul>
        <button className="mt-auto bg-white text-orange-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-100 transition-all">
          Đăng ký ngay 🚀
        </button>
      </motion.div>
    );
  })}
</div>


          {/* BẢNG SO SÁNH QUYỀN LỢI */}
          <div className="mt-16 overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-lg border border-gray-200">
              <thead>
                <tr className="bg-orange-100">
                  <th className="p-4 text-left text-gray-800">Quyền lợi</th>
                  {vipPlans.map((plan, idx) => (
                    <th
                      key={idx}
                      className={`p-4 text-center text-gray-800 transition-colors duration-300 ${
                        selectedPlan && selectedPlan.title === plan.title
                          ? "bg-orange-200"
                          : ""
                      }`}
                    >
                      {plan.title}
                      {plan.popular && (
                        <div className="mt-1 inline-block bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Most Popular
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allBenefits.map((benefit, i) => (
                  <motion.tr
                    key={i}
                    className="border-t border-gray-200 hover:bg-orange-50 transition-colors duration-300"
                  >
                    <td className="p-4 text-gray-700">{benefit}</td>
                    {vipPlans.map((plan, idx) => (
                      <td
                        key={idx}
                        className={`p-4 text-center transition-colors duration-300 ${
                          selectedPlan && selectedPlan.title === plan.title
                            ? "bg-orange-50 font-semibold text-orange-700"
                            : ""
                        }`}
                      >
                        {plan.benefits.some((b) => b.text === benefit) ? (
                          <span className="text-green-600 font-bold">✓</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* GIAO DIỆN THANH TOÁN */}
      {selectedPlan && (
        <motion.div
          className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Thanh toán gói <span className="text-orange-600">{selectedPlan.title}</span>
          </h2>
          <p className="text-gray-600 mb-4">
            {billingCycle === "monthly"
              ? `${selectedPlan.priceMonthly.toLocaleString()}₫ / tháng`
              : `${getPrice(selectedPlan).toLocaleString()}₫ / năm`}
          </p>

          <div className="flex items-center justify-center mb-4">
            <input
              type="checkbox"
              id="autoRenew"
              checked={autoRenew}
              onChange={(e) => setAutoRenew(e.target.checked)}
              className="mr-2 w-4 h-4"
            />
            <label htmlFor="autoRenew" className="text-gray-700 text-sm">
              🔄 Gia hạn tự động mỗi kỳ thanh toán
            </label>
          </div>

          <PaymentMethods
            total={getPrice(selectedPlan)}
            onPay={handlePayment}
          />

          <button
            onClick={() => setSelectedPlan(null)}
            className="mt-6 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
          >
            ⬅ Quay lại chọn gói
          </button>
        </motion.div>
      )}
    </div>
    
  );
  
}
