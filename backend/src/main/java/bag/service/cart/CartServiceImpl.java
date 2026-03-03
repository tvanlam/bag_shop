package bag.service.cart;

import bag.modal.dto.CartDto;
import bag.modal.entity.*;
import bag.modal.request.CartItemRequest;
import bag.modal.request.CartRequest;
import bag.repository.*;
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
    private final VariantRepository variantRepository;

    public CartServiceImpl(CartRepository cartRepository, AccountRepository accountRepository, ProductRepository productRepository, CartItemRepository cartItemRepository, VariantRepository variantRepository) {
        this.cartRepository = cartRepository;
        this.accountRepository = accountRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
        this.variantRepository = variantRepository;
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

        Cart cart = cartRepository.findByAccountIdWithItems(request.getAccountId())
                .orElseGet(() -> {
                            Account account = accountRepository.findById(request.getAccountId())
                                .orElseThrow(() -> new RuntimeException("Account " + request.getAccountId() + " not found"));
                            Cart newCart = new Cart();
                            newCart.setAccount(account);
                            return cartRepository.save(newCart);
                });

        Map<Integer, CartItem> cartItemMap = cart.getCartItems().stream()
                .filter(ci -> ci.getProductVariant() != null)
                .collect(Collectors.toMap(
                        ci -> ci.getProductVariant().getId(),
                        ci -> ci,
                        (old, neu) -> old
                ));

        for (CartItemRequest itemRequest : request.getItems()) {
            ProductVariant variant = variantRepository.findById(itemRequest.getProductVariantId())
                    .orElseThrow(() -> new RuntimeException("Variant " + itemRequest.getProductVariantId() + " not found"));

            CartItem existingItem = cartItemMap.get(itemRequest.getProductVariantId());

            if (existingItem != null) {
                int newQuantity = existingItem.getQuantity() + itemRequest.getQuantity();
                if(newQuantity > variant.getStockQuantity()){
                    throw new IllegalArgumentException("Tổng số lượng vượt quá tồn kho");
                }
                existingItem.setQuantity(newQuantity);

            } else {
                CartItem newItem = new CartItem();
                newItem.setProduct(variant.getProduct());
                newItem.setProductVariant(variant);
                newItem.setQuantity(itemRequest.getQuantity());
                newItem.setPriceAtAdd(variant.getPrice());
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
        List<CartItem> items = cartItemRepository.findAllByAccountId(request.getAccountId());
        Map<Integer, CartItem> itemMap = items.stream()
                .filter(ci -> ci.getProductVariant() != null)
                .collect(Collectors.toMap(ci -> ci.getProductVariant().getId(), ci -> ci));

        for (CartItemRequest req : request.getItems()) {
            CartItem item = itemMap.get(req.getProductVariantId());
            if (item == null) throw new IllegalArgumentException("Product not in cart");

            if (req.getQuantity() <= 0) {
                cartItemRepository.deleteByCartItemId(item.getId());
            } else {
                if (req.getQuantity() > item.getProductVariant().getStockQuantity()) {
                    throw new IllegalArgumentException("Vượt quá tồn kho");
                }
                item.setQuantity(req.getQuantity());
                cartItemRepository.save(item);
            }
        }

        return getCartByAccountId(request.getAccountId());
    }

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