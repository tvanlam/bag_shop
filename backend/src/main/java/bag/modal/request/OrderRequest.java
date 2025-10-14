package bag.modal.request;

import bag.modal.entity.Account;
import bag.modal.entity.Order;
import bag.modal.entity.Voucher;
import lombok.Data;

@Data
public class OrderRequest {
    private double price;
    private Account account;
    private Voucher voucher;
    private Order.OrderStatus orderStatus;
}
