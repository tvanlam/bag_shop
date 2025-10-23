package bag.controller;

import bag.modal.request.CartRequest;
import bag.modal.request.ProductRequest;
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

    @PostMapping("/{accountId}/add")
    public ResponseEntity<?> addToCart(@PathVariable int accountId, @RequestBody CartRequest request) {
        try {
            return ResponseEntity.ok(cartService.addToCart(accountId, request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{accountId}/update")
    public ResponseEntity<?> updateCart(
            @PathVariable int accountId,
            @RequestBody CartRequest request) {
        try {
            return ResponseEntity.ok(cartService.updateCartItem(accountId, request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCart(@PathVariable int id) {
        try {
            cartService.deleteCart(id);
            return ResponseEntity.ok("Cart deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
