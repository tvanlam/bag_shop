package bag.modal.request;

import bag.modal.entity.Account;
import bag.modal.entity.Order;
import bag.modal.entity.OrderDetails;
import bag.modal.entity.Voucher;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private int account;
    private List<String> orderDetails;
    private int voucher;

    private Order.OrderStatus orderStatus;

}
