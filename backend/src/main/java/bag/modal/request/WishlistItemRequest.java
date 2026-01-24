package bag.modal.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WishlistItemRequest {
    @NotNull(message = "ProductID must be required")
    private int productId;
}
