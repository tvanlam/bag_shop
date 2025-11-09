package bag.modal.request;

import bag.modal.dto.OrderDetailsDto;
import bag.modal.entity.Order;
import bag.modal.entity.OrderDetails;
import bag.modal.entity.Product;
import lombok.Data;

@Data
public class OrderDetailsRequest {
//    private Order order;
    private Product product;
    private int quantity;
    private double price;
    private double totalPrice;
}
