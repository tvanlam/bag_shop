package bag.service.cart;

import bag.modal.dto.CartDto;
import bag.modal.request.CartRequest;

import java.util.List;

public interface CartService {
    List<CartDto> getAllCarts();

    CartDto getCartById(int id);

    CartDto getCartByAccountId(int accountId);

    CartDto addToCart(int accountId, CartRequest request);

    CartDto updateCartItem(int accountId, CartRequest request);

    void deleteCartItem(int accountId, int cartItemId);

    CartDto createNewCart(CartRequest request);

}
