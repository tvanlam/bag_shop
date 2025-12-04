import React from "react";
import CartItemList from "./CartItemList";
import PromoCodeInput from "./PromoCodeInput";
import PriceSummary from "./PriceSummary";

/**
 * Component tổng kết đơn hàng (sidebar bên phải)
 * Bao gồm: Danh sách sản phẩm, Mã khuyến mãi, Tổng tiền
 */
const OrderSummary = ({
  cartItems,
  promoCode,
  onPromoCodeChange,
  appliedVoucher,
  onApplyPromo,
  onRemovePromo,
  orderCalculation,
}) => {
  const { subtotal, shippingFee, discount, total, formatPrice, parsePrice } =
    orderCalculation;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
        <h3 className="text-xl font-bold mb-4">Thông tin đơn hàng</h3>

        {/* Danh sách sản phẩm */}
        <CartItemList cartItems={cartItems} parsePrice={parsePrice} />

        {/* Mã khuyến mãi */}
        <PromoCodeInput
          promoCode={promoCode}
          onPromoCodeChange={onPromoCodeChange}
          appliedVoucher={appliedVoucher}
          onApplyPromo={onApplyPromo}
          onRemovePromo={onRemovePromo}
        />

        {/* Tổng kết giá */}
        <PriceSummary
          subtotal={subtotal}
          shippingFee={shippingFee}
          discount={discount}
          total={total}
          formatPrice={formatPrice}
        />
      </div>
    </div>
  );
};

export default OrderSummary;

