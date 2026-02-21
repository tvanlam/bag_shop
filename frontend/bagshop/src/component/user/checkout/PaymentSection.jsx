import React from "react";
import PaymentMethodCard from "./PaymentMethodCard";
import vnpayLogo from "../../../assets/vnpayLogo.png";
import momoLogo from "../../../assets/momoLogo.png";
import creditCardLogo from "../../../assets/creditCardLogo.png";

/**
 * Component section thanh toán
 * Bao gồm: Chọn phương thức thanh toán, Nút đặt hàng
 */
const PaymentSection = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
  onPlaceOrder,
  loading,
  paymentError,
}) => {
  const paymentMethods = [
    {
      value: "COD",
      label: "Thanh toán khi nhận hàng",
      logo: null,
    },
    {
      value: "VNPAY",
      label: "Thanh toán VnPay",
      logo: vnpayLogo,
    },
    {
      value: "MOMO",
      label: "MoMo Pay",
      logo: momoLogo,
    },
    {
      value: "CREDIT_CARD",
      label: "Thẻ tín dụng / ghi nợ",
      logo: creditCardLogo,
    },
  ];

  return (
    <div className="paymentStep max-w-screen-md mt-12">
      <h3 className="text-lg text-gray-700 font-bold bg-gray-200 p-3 rounded-md">
        3. Thanh toán
      </h3>
      <p className="font-bold mb-3">Chọn phương thức thanh toán</p>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.value}
            value={method.value}
            label={method.label}
            logo={method.logo}
            isSelected={selectedPaymentMethod === method.value}
            onSelect={onPaymentMethodChange}
          />
        ))}
      </div>
      {paymentError && (
        <p className="text-red-500 text-sm mt-2">{paymentError}</p>
      )}

      {/* Place Order Button */}
      <div className="flex justify-center">
        <button
          onClick={onPlaceOrder}
          disabled={loading}
          className="mt-8 border border-green-600 px-32 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Đang xử lý..." : "Đặt hàng"}
        </button>
      </div>
    </div>
  );
};

export default PaymentSection;
