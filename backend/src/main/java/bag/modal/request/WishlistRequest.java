package bag.modal.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class WishlistRequest {
    private int accountId;
    @NotEmpty(message = "Wishlist item cannot be empty")
    private List<WishlistItemRequest> items;
}
