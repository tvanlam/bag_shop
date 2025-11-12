package bag.modal.dto;

import bag.modal.entity.OrderDetails;
import lombok.Data;

@Data
public class OrderDetailsDto {
    private int id;
    private int orderId;
    private int productId;
    private int quantity;
    public OrderDetailsDto(OrderDetails orderDetails) {
        this.id = orderDetails.getId();
        this.productId = orderDetails.getProduct() != null ? orderDetails.getProduct().getId() : null;
        this.quantity = orderDetails.getQuantity();
    }

}
