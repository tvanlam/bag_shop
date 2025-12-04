import React from "react";

/**
 * Component hiển thị tổng kết giá tiền
 * Bao gồm: Tạm tính, Phí ship, Giảm giá, Tổng cộng
 */
const PriceSummary = ({ subtotal, shippingFee, discount, total, formatPrice }) => {
  return (
    <>
      {/* Tổng tiền */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tạm tính:</span>
          <span className="font-medium">{formatPrice(subtotal)}đ</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span className="font-medium">{formatPrice(shippingFee)}đ</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Giảm giá:</span>
            <span className="font-medium">-{formatPrice(discount)}đ</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Tổng cộng:</span>
          <span className="text-red-600">{formatPrice(total)}đ</span>
        </div>
      </div>

      {/* Ghi chú */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>• Giá đã bao gồm VAT</p>
        <p>• Miễn phí đổi trả trong 7 ngày</p>
      </div>
    </>
  );
};

export default PriceSummary;

