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
    @Min(1)
    @NotNull(message = "AccountID must be required")
    private int accountId;
    private int voucherId;
    private Order.OrderStatus orderStatus;

}
