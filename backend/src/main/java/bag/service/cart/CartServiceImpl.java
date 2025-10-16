package bag.service.cart;

import bag.modal.dto.CartDto;
import bag.modal.dto.CartItemDto;
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
            // b1: lấy account và cart
            Account account = accountRepository.findById(accountId)
                    .orElseThrow(() -> new RuntimeException("Account " + accountId + "not found"));
            Cart cart = cartRepository.findByAccountId(accountId)
                    .orElseGet(() -> {
                       Cart newCart = new Cart();
                       newCart.setAccount(account);
                       return cartRepository.save(newCart);
                    });
            // b2: kiểm tra product
            for(CartItemRequest cartItemRequest : request.getItems()){
                Product product = productRepository.findById(cartItemRequest.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product " + cartItemRequest.getProductId() + "not found"));
                // tìm xem sp có trong cart chưa
                var existingItem = cart.getCartItems().stream()
                        .filter(ci -> ci.getProduct().getId() == cartItemRequest.getProductId())
                        .findFirst();
                // nếu có thì tăng số lượng
                if(existingItem.isPresent()){
                    int newQty = existingItem.get().getQuantity() + cartItemRequest.getQuantity();
                    existingItem.get().setQuantity(newQty);
                // nếu chưa có thì tạo mới
                }else{
                    var newItem = new bag.modal.entity.CartItem();
                    newItem.setCart(cart);
                    newItem.setQuantity(cartItemRequest.getQuantity());
                    newItem.setProduct(product);
                    cart.getCartItems().add(newItem);
                }
            }
            cartRepository.save(cart);
            return new CartDto(cart);
        }catch(Exception e){
            throw new RuntimeException("Add to cart failed");
        }
    }

    @Override
    public CartDto updateCartItem(int accountId, CartRequest request) {
        Cart cart = cartRepository.findByAccountId(accountId)
                .orElseThrow(() -> new RuntimeException("Account" + accountId + "not found"));
        for(CartItemRequest cartItemRequest : request.getItems()){
            CartItem existingItem = cart.getCartItems().stream()
                    .filter(ci -> ci.getProduct().getId() == cartItemRequest.getProductId())
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Product " + cartItemRequest.getProductId() + "not found in cart"));
            //cap nhat so luong
            if(cartItemRequest.getQuantity() <= 0){
                cart.getCartItems().remove(existingItem);
                cartItemRepository.delete(existingItem);
            }else{
                // neu > 0, cap nhat lai so luong
                existingItem.setQuantity(cartItemRequest.getQuantity());
            }
        }
        cartRepository.save(cart);
        return new CartDto(cart);
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