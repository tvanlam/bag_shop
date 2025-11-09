package bag.modal.dto;

import bag.modal.entity.Order;
import lombok.Data;

@Data
public class OrderDto {
    private int id;
    private double totalPrice;
    private int account;
    private int voucher;
    public OrderDto(Order order){
        this.id = order.getId();
        this.totalPrice = order.getTotalPrice();
        this.account = order.getAccount().getId();
        this.voucher = order.getVoucher().getId();
    }
}
