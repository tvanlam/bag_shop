import React from "react";

/**
 * Component section phương thức vận chuyển
 */
const ShippingSection = React.forwardRef(
  ({ selectedShippingMethod, onShippingMethodChange, shippingFee }, ref) => {
    return (
      <div ref={ref} className="shippingMethodStep max-w-screen-md mt-12">
        <h3 className="text-lg text-gray-700 font-bold bg-gray-200 p-3 rounded-md">
          2. Phương thức vận chuyển
        </h3>
        <p className="font-bold mb-3">PHƯƠNG THỨC GIAO HÀNG</p>
        <div className="border-2 border-gray-500 rounded-md p-4">
          <label className="flex items-center gap-3">
            <input
              onChange={(e) => onShippingMethodChange(e.target.value)}
              type="radio"
              name="shipping-method"
              value="standard"
              checked={selectedShippingMethod === "standard"}
              className="accent-black w-4 h-4"
            />
            <div className="flex-1">
              <p className="font-semibold">Giao hàng tiêu chuẩn</p>
              <p className="text-sm text-gray-600">
                Thời gian giao hàng: 3-5 ngày làm việc
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Phí vận chuyển: {shippingFee.toLocaleString("vi-VN")}đ
              </p>
            </div>
          </label>
        </div>
      </div>
    );
  }
);

ShippingSection.displayName = "ShippingSection";

export default ShippingSection;

