package bag.controller;

import bag.modal.request.ProductRequest;
import bag.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("getAllProductsWithPaging/{page}/{size}/{sortBy}/{sortDir}")
    public ResponseEntity<?> getAllProductsWithPaging(
            @PathVariable int page,
            @PathVariable int size,
            @PathVariable String sortBy,
            @PathVariable String sortDir
    ) {
        try {
            return ResponseEntity.ok(productService.getAllProductsWithPaging(page, size, sortBy, sortDir));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllProductsWithoutPaging(){
        try{
            return ResponseEntity.ok(productService.getAllProductsWithoutPaging());
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") int id){
        try{
            return ResponseEntity.ok(productService.getProductById(id));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getProductByCategory(@PathVariable int categoryId){
        try{
            return ResponseEntity.ok(productService.getByCategoryId(categoryId));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/filterByRangePrice")
    public ResponseEntity<?> filterByRange(@RequestParam double minPrice,
                                           @RequestParam double maxPrice){
        try{
            return ResponseEntity.ok(productService.getProductByRangePrice(minPrice, maxPrice));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request){
        try{
            return ResponseEntity.ok(productService.addProduct(request));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequest request, @PathVariable int id){
        try{
            return ResponseEntity.ok(productService.updateProduct(request,id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable int id){
        try{
            return ResponseEntity.ok(productService.deleteProductById(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
