package bag.modal.dto;

import bag.modal.entity.Order;
import bag.modal.entity.Voucher;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class VoucherDto {
    private int id;
    private String code;
    private String description;
    private Voucher.TypeDiscount typeDiscount;
    private double discountValue;
    private double maxDiscount;
    private int quantity;
    private Integer usedQuantity;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public VoucherDto(Voucher voucher){
        this.id = voucher.getId();
        this.code = voucher.getCode();
        this.description = voucher.getDescription();
        this.typeDiscount = voucher.getTypeDiscount();
        this.discountValue = voucher.getDiscountValue();
        this.maxDiscount = voucher.getMaxDiscount();
        this.quantity = voucher.getQuantity();
        this.startDate = voucher.getStartDate();
        this.endDate = voucher.getEndDate();

    }
}
