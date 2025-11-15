package bag.modal.dto;

import bag.modal.entity.OrderDetails;
import lombok.Data;

@Data
public class OrderDetailsDto {
    private int id;
    private int productId;
    private String productName;
    private double priceAtAdd;
    private int quantity;
    private double subTotal;
    public OrderDetailsDto(OrderDetails orderDetails) {
        this.id = orderDetails.getId();
        this.productId = orderDetails.getProduct().getId();
        this.productName = orderDetails.getProduct().getName();
        this.priceAtAdd = orderDetails.getPriceAtAdd();
        this.quantity = orderDetails.getQuantity();
        this.subTotal = orderDetails.getSubTotal();

    }

}
