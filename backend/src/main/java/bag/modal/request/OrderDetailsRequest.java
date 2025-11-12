package bag.modal.request;

import bag.modal.entity.Order;
import bag.modal.entity.Product;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderDetailsRequest {
    private Order order;
    @NotNull(message = "Product ID không được để trống")
    private Product product;
    @NotNull(message = "Số lượng không được để trống")
    @Min(value = 1, message = "Số lượng phải >= 1")
    private int quantity;
    private double price;
    private double totalPrice;
}
