import { useMemo } from "react";

/**
 * Custom hook để tính toán giá tiền trong đơn hàng
 * Bao gồm: subtotal, shipping, discount, total
 */
export const useOrderCalculation = (
  cartItems,
  appliedVoucher,
  shippingFee = 30000
) => {
  // Parse price string to number
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.toString().replace(/,/g, "")) || 0;
  };

  // Tính tổng tiền sản phẩm (chưa bao gồm ship và giảm giá)
  const subtotal = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((sum, item) => {
      const price = parsePrice(item.priceAtAdd || item.price);
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);
  }, [cartItems]);

  // Tính số tiền giảm giá dựa trên voucher
  const discount = useMemo(() => {
    if (!appliedVoucher) return 0;

    if (appliedVoucher.typeDiscount === "PERCENT") {
      const discountAmount = (subtotal * appliedVoucher.discountValue) / 100;
      return Math.min(
        discountAmount,
        appliedVoucher.maxDiscount || discountAmount
      );
    } else if (appliedVoucher.typeDiscount === "FIXED_AMOUNT") {
      return appliedVoucher.discountValue;
    } else if (appliedVoucher.typeDiscount === "FREE_SHIPPING") {
      return shippingFee;
    }
    return 0;
  }, [appliedVoucher, subtotal, shippingFee]);

  // Tính tổng tiền cuối cùng
  const total = useMemo(() => {
    return subtotal + shippingFee - discount;
  }, [subtotal, shippingFee, discount]);

  // Format số tiền theo định dạng VN
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN");
  };

  return {
    subtotal,
    shippingFee,
    discount,
    total,
    formatPrice,
    parsePrice,
  };
};
