package bag.modal.request;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import java.util.List;

@Data
public class CartRequest {

    private int accountId;
    @NotEmpty(message = "Cart item cannot be empty")
    private List<CartItemRequest> items;
}
