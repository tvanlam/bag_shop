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

    @PostMapping("/create")
    public ResponseEntity<?> createCart(@RequestBody CartRequest request){
        try{
            return ResponseEntity.ok(cartService.createCart(request));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCart(@RequestBody CartRequest request, @PathVariable int id){
        try{
            return ResponseEntity.ok(cartService.updateCart(request,id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
