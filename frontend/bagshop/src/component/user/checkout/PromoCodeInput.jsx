import React from "react";

/**
 * Component nhập và áp dụng mã khuyến mãi
 */
const PromoCodeInput = ({
  promoCode,
  onPromoCodeChange,
  appliedVoucher,
  onApplyPromo,
  onRemovePromo,
}) => {
  return (
    <div className="mb-4 pb-4 border-b">
      <label className="block text-sm font-medium mb-2">Mã khuyến mãi</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => onPromoCodeChange(e.target.value.toUpperCase())}
          placeholder="Nhập mã khuyến mãi"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          disabled={appliedVoucher !== null}
        />
        {appliedVoucher ? (
          <button
            onClick={onRemovePromo}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
          >
            Xóa
          </button>
        ) : (
          <button
            onClick={onApplyPromo}
            className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800"
          >
            Áp dụng
          </button>
        )}
      </div>
      {appliedVoucher && (
        <p className="text-xs text-green-600 mt-2">
          Đã áp dụng mã "{appliedVoucher.code}" - Giảm{" "}
          {appliedVoucher.typeDiscount === "PERCENT"
            ? `${appliedVoucher.discountValue}%`
            : appliedVoucher.typeDiscount === "FIXED_AMOUNT"
            ? `${appliedVoucher.discountValue.toLocaleString("vi-VN")}đ`
            : "phí ship"}
        </p>
      )}
    </div>
  );
};

export default PromoCodeInput;
