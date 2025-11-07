package bag.modal.request;

import bag.modal.dto.ProductDto;
import bag.modal.entity.Account;
import bag.modal.entity.Cart;
import bag.modal.entity.Product;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CartRequest {

    private int accountId;
    @NotEmpty(message = "Cart item cannot be empty")
    private List<CartItemRequest> items;
}
