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
    private List<Order> orders;
    private String code;
    private String description;
    private Voucher.TypeDiscount typeDiscount;
    private double discountValue;
    private double maxDiscount;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public VoucherDto(Voucher voucher){
        this.id = voucher.getId();
        this.orders = voucher.getOrders() != null
                ? voucher.getOrders().stream()
                .collect(Collectors.toList())
                : Collections.emptyList();
        this.description = voucher.getDescription();
        this.typeDiscount = voucher.getTypeDiscount();
        this.discountValue = voucher.getDiscountValue();
        this.maxDiscount = voucher.getMaxDiscount();
        this.startDate = voucher.getStartDate();
        this.endDate = voucher.getEndDate();

    }
}
