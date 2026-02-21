// src/main/java/bag/modal/dto/OrderDto.java
package bag.modal.dto;

import bag.modal.entity.Order;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class OrderDto {
    private int id;
    private int accountId;
    private Integer voucherId;
    private String status;
    private List<OrderDetailsDto> items;
    private double subtotal;
    private double discountAmount;
    private double totalPrice;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String paymentUrl; // URL thanh toán (VNPay, MoMo,...)

    public OrderDto(Order order) {
        this.id = order.getId();
        this.accountId = order.getAccount().getId();
        this.voucherId = order.getVoucher() != null ? order.getVoucher().getId() : null;
        this.status = order.getStatus().name();

        this.items = order.getOrderDetails().stream()
                .map(OrderDetailsDto::new)
                .collect(Collectors.toList());
        // TÍNH CHI TIẾT GIÁ
        this.subtotal = items.stream()
                .mapToDouble(OrderDetailsDto::getSubTotal)
                .sum();

        this.discountAmount = order.getDiscountAmount();

        this.totalPrice = order.getTotalPrice(); // đã lưu trong DB

    }
}