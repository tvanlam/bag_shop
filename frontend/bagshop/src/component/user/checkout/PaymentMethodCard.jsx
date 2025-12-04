import React from "react";

/**
 * Component thẻ phương thức thanh toán
 * Reusable cho COD, VNPay, MoMo, Credit Card
 */
const PaymentMethodCard = ({
  value,
  label,
  logo,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`border-2 rounded-md p-4 cursor-pointer ${
        isSelected ? "border-black bg-gray-50" : "border-gray-500"
      }`}
      onClick={() => onSelect(value)}
    >
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-3 flex-1 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value={value}
            checked={isSelected}
            onChange={(e) => onSelect(e.target.value)}
            className="accent-black w-4 h-4"
          />
          <span className="text-sm leading-none">{label}</span>
        </label>
        {logo && <img src={logo} alt={label} className="w-6 h-auto" />}
      </div>
    </div>
  );
};

export default PaymentMethodCard;

