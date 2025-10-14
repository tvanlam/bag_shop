package bag.service.cart;

import bag.modal.dto.CartDto;
import bag.modal.dto.CartItemDto;
import bag.modal.entity.Account;
import bag.modal.entity.Cart;
import bag.modal.entity.Product;
import bag.modal.request.CartRequest;
import bag.repository.AccountRepository;
import bag.repository.CartItemRepository;
import bag.repository.CartRepository;
import bag.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final AccountRepository accountRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    public CartServiceImpl(CartRepository cartRepository, AccountRepository accountRepository, ProductRepository productRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.accountRepository = accountRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public CartDto getCartById(int id) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Cart not found"));
        return new CartDto(cart);
    }



    @Override
    public CartDto getCartByAccountId(int accountId ) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account " + accountId + " not found"));
        Cart cart = cartRepository.findByAccountId(accountId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setAccount(account);
                    return cartRepository.save(newCart);
                });
        return new CartDto(cart);
    }

    //user operation
    @Override
    @Transactional
    public CartDto addToCart(int accountId, CartRequest request) {
        try {
            Account account = accountRepository.findById(accountId)
                    .orElseThrow(() -> new RuntimeException("Account " + accountId + "not found"));
            Cart cart = cartRepository.findByAccountId(accountId)
                    .orElseThrow(() -> new RuntimeException("Account " + request.getAccountId() + "not found"));

            return new CartDto(cart);
        }catch(Exception e){
            throw new RuntimeException("Add to cart failed");
        }
    }

    @Override
    public CartDto updateCartItem(int accountId, CartRequest request) {
        return null;
    }

    //admin operation
    @Override
    public void deleteCart(int id) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new RuntimeException("Cart not found"));
        cartRepository.delete(cart);
    }

    @Override
    public List<CartDto> getAllCarts() {
        return cartRepository.findAll().stream().map(CartDto::new).collect(Collectors.toList());
    }


    //helper method
    @Override
    public CartDto createNewCart(CartRequest request) {
        Cart cart = new Cart();
        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException(request.getAccountId() + "not found"));
        cart.setAccount(account);
        cartRepository.save(cart);
        return new CartDto(cart);
    }



}