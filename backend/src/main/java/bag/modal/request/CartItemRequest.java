package bag.modal.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CartItemRequest {
    @NotNull(message = "ProductID must be required")
    private int productId;

    @NotNull(message = "Quantity must be required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    // Không cần price, totalPrice - server sẽ tự tính!
}
