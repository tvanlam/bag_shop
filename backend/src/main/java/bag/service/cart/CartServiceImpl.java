package bag.service.cart;

import bag.modal.dto.CartDto;
import bag.modal.entity.Account;
import bag.modal.entity.Cart;
import bag.modal.entity.CartItem;
import bag.modal.entity.Product;
import bag.modal.request.CartItemRequest;
import bag.modal.request.CartRequest;
import bag.repository.AccountRepository;
import bag.repository.CartItemRepository;
import bag.repository.CartRepository;
import bag.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
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
    @Transactional
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

    @Override
    @Transactional
    public CartDto addToCart(CartRequest request) {
        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account " + request.getAccountId() + " not found"));
        Cart cart = account.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setAccount(account);
            account.setCart(cart);
            cartRepository.save(cart);
        }
        Map<Integer, CartItem> cartItemMap = cart.getCartItems().stream()
                .collect(Collectors.toMap(ci -> ci.getProduct().getId(), ci -> ci));

        for (CartItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product " + itemRequest.getProductId() + " not found"));

            CartItem existingItem = cartItemMap.get(itemRequest.getProductId());

            if (existingItem != null) {
                existingItem.setQuantity(existingItem.getQuantity() + itemRequest.getQuantity());
            } else {
                CartItem newItem = new CartItem();
                newItem.setProduct(product);
                newItem.setQuantity(itemRequest.getQuantity());
                newItem.setPriceAtAdd(product.getPrice());
                newItem.setCart(cart);
                cart.getCartItems().add(newItem);
            }
        }
        cartRepository.save(cart);
        return new CartDto(cart);
    }

    @Override
    @Transactional
    public CartDto updateCartItem(CartRequest request) {
        Cart cart = cartRepository.findByAccountId(request.getAccountId())
                .orElseThrow(() -> new IllegalArgumentException("Cart not found for account: " + request.getAccountId()));

        // Map productId -> CartItem hiện có
        Map<Integer, CartItem> itemMap = cart.getCartItems().stream()
                .collect(Collectors.toMap(ci -> ci.getProduct().getId(), ci -> ci));
        for (CartItemRequest req : request.getItems()) {
            CartItem item = itemMap.get(req.getProductId());
            if (item == null) {
                throw new IllegalArgumentException("Product " + req.getProductId() + " not in cart");
            }
            if (req.getQuantity() <= 0) {
                // XÓA ITEM
                cart.getCartItems().remove(item);
                cartItemRepository.delete(item);
            } else {
                // GHI ĐÈ số lượng mới
                item.setQuantity(req.getQuantity());
            }
        }
        cartRepository.save(cart);
        return new CartDto(cart);
    }

    //admin operation
    @Override
    @Transactional
    public void deleteCartItem(int accountId, int cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + cartItemId));
        Cart cart = cartItem.getCart();
        if (cart == null) {
            throw new RuntimeException("Cart item is not associated with any cart");
        }
        if (cart.getAccount().getId() != accountId) {
            throw new RuntimeException("You can only delete items from your own cart");
        }
        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
    }

    @Override
    public List<CartDto> getAllCarts() {
        return cartRepository.findAll().stream().map(CartDto::new).collect(Collectors.toList());
    }
}