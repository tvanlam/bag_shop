package bag.modal.dto;

import bag.modal.entity.Order;
import bag.modal.entity.OrderDetails;
import bag.modal.entity.Product;
import lombok.Data;

@Data
public class OrderDetailsDto {
    private int id;
    private Order order;
    private Product product;
    private int quantity;
    private double price;
    private double totalPrice;
    public OrderDetailsDto(OrderDetails orderDetails){
        this.id = orderDetails.getId();
        this.product = orderDetails.getProduct();
        this.quantity = orderDetails.getQuantity();
        this.price = orderDetails.getPrice();
    }
}
