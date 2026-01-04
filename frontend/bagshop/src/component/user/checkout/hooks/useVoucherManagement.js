import { useState } from "react";
import { toast } from "react-toastify";
import CheckoutService from "../../../../service/CheckoutService";

/**
 * Custom hook để quản lý voucher/promo code
 */
export const useVoucherManagement = () => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.warning("Vui lòng nhập mã khuyến mãi");
      return;
    }

    try {
      // Call API to validate voucher by code
      const response = await CheckoutService.getVouchers();
      const vouchers = response.data;

      const voucher = vouchers.find((v) => v.code === promoCode.toUpperCase());

      if (voucher) {
        const now = new Date();
        const startDate = new Date(voucher.startDate);
        const endDate = new Date(voucher.endDate);

        console.log("🔍 Voucher validation:", {
          code: voucher.code,
          now: now.toISOString(),
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          quantity: voucher.quantity,
        });

        if (now < startDate) {
          toast.error("Mã khuyến mãi chưa có hiệu lực");
          return;
        }

        if (now > endDate) {
          toast.error("Mã khuyến mãi đã hết hạn");
          console.log("❌ Voucher expired:", { now, endDate });
          return;
        }

        if (voucher.quantity !== undefined && voucher.quantity <= 0) {
          toast.error("Mã khuyến mãi đã hết lượt sử dụng");
          return;
        }

        setAppliedVoucher(voucher);
        toast.success(`Áp dụng mã "${voucher.code}" thành công!`);
        console.log("✅ APPLIED VOUCHER:", voucher);
      } else {
        toast.error("Mã khuyến mãi không hợp lệ!");
        console.log("❌ Voucher not found. Available vouchers:", vouchers);
      }
    } catch (error) {
      console.error("Error applying voucher:", error);
      toast.error("Không thể áp dụng mã khuyến mãi");
    }
  };

  const handleRemovePromo = () => {
    setPromoCode("");
    setAppliedVoucher(null);
    toast.info("Đã xóa mã khuyến mãi");
  };

  return {
    promoCode,
    setPromoCode,
    appliedVoucher,
    handleApplyPromo,
    handleRemovePromo,
  };
};
