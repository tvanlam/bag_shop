package bag.service.cart;

import bag.modal.dto.CartDto;
import bag.modal.request.CartRequest;

import java.util.List;

public interface CartService {
    List<CartDto> getAllCarts();

    CartDto getCartById(int id);

    CartDto getCartByAccountId(int accountId);

    CartDto addToCart(CartRequest request);

    CartDto updateCartItem(CartRequest request);

    void deleteCartItem(int accountId, int cartItemId);



}
