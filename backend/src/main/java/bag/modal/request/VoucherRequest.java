package bag.modal.request;

import bag.modal.entity.Voucher;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VoucherRequest {
    private String code;
    private String description;
    private Voucher.TypeDiscount typeDiscount;
    private double discountValue;
    private double maxDiscount;
    private int quantity;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    // order de sau

    public void setVoucher(Voucher voucher){
        voucher.setCode(code);
        voucher.setDescription(description);
        voucher.setTypeDiscount(typeDiscount);
        voucher.setDiscountValue(discountValue);
        voucher.setMaxDiscount(maxDiscount);
        voucher.setQuantity(quantity);
        voucher.setStartDate(startDate);
        voucher.setEndDate(endDate);
    }
}
