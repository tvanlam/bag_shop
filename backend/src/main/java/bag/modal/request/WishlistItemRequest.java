package bag.modal.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WishlistItemRequest {
    @NotNull(message = "ProductID must be required")
    private Integer productId;

    @NotNull(message = "VariantID must be required")
    private Integer productVariantId;

    @NotNull(message = "Quantity must be required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
}
