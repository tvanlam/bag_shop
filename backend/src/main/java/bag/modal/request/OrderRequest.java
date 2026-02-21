package bag.modal.request;

import bag.modal.entity.Account;
import bag.modal.entity.Order;
import bag.modal.entity.OrderDetails;
import bag.modal.entity.Voucher;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    // Không bắt buộc khi chỉ update status
    private Integer accountId;
    private Integer voucherId;
    private Order.OrderStatus orderStatus;
    private Order.paymentMethod paymentMethod;

}
