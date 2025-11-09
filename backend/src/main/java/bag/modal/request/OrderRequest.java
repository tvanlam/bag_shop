package bag.modal.request;

import bag.modal.entity.Account;
import bag.modal.entity.Order;
import bag.modal.entity.Voucher;
import lombok.Data;

@Data
public class OrderRequest {
    private Account account;
    private Voucher voucher;
    private double totalPrice;
    private Order.OrderStatus orderStatus;
    public void setOrder(Order order){
        order.setAccount(account);
        order.setVoucher(voucher);
        order.setTotalPrice(totalPrice);
    }
}
