package bag.controller;

import bag.modal.request.CartRequest;
import bag.service.cart.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<?> getAllCarts(){
        try{
            return ResponseEntity.ok(cartService.getAllCarts());
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCartById(@PathVariable("id") int id){
        try{
            return ResponseEntity.ok(cartService.getCartById(id));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<?> getCartByAccountId(@PathVariable int accountId) {
        try {
            return ResponseEntity.ok(cartService.getCartByAccountId(accountId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartRequest request) {
        try {
            return ResponseEntity.ok(cartService.addToCart(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCart(
            @RequestBody CartRequest request) {
        try {
            return ResponseEntity.ok(cartService.updateCartItem( request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("{accountId}/delete/{cartItemId}")
    public ResponseEntity<?> deleteCartItem(@PathVariable int accountId,@PathVariable("cartItemId") int cartItemId) {
        try {
            cartService.deleteCartItem(accountId,cartItemId);
            return ResponseEntity.ok("Cart item deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
