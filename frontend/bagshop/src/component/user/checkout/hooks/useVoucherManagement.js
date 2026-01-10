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

        if (now < startDate) {
          toast.error("Mã khuyến mãi chưa có hiệu lực");
          return;
        }

        if (now > endDate) {
          toast.error("Mã khuyến mãi đã hết hạn");

          return;
        }

        if (voucher.quantity !== undefined && voucher.quantity <= 0) {
          toast.error("Mã khuyến mãi đã hết lượt sử dụng");
          return;
        }

        setAppliedVoucher(voucher);
        toast.success(`Áp dụng mã "${voucher.code}" thành công!`);
      } else {
        toast.error("Mã khuyến mãi không hợp lệ!");
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
