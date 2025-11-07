package bag.modal.dto;

import bag.modal.entity.Account;
import bag.modal.entity.Cart;
import bag.modal.entity.CartItem;
import bag.modal.entity.Product;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class CartDto {
    private int id;
    private int accountId;
    private List<CartItemDto> items;


    public CartDto(Cart cart){
        this.id = cart.getId();
        this.accountId = cart.getAccount().getId();
        this.items = cart.getCartItems() != null
                ? cart.getCartItems().stream()
                .map(CartItemDto::new)
                .collect(Collectors.toList())
                : null;
    }
}
