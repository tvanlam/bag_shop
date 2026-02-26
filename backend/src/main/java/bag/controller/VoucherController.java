package bag.controller;

import bag.modal.request.ProductRequest;
import bag.modal.request.VoucherRequest;
import bag.service.voucher.VoucherService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/voucher")
@RequiredArgsConstructor
public class VoucherController {
    private final VoucherService voucherService;
    @GetMapping
    public ResponseEntity<?> getVouchers(){
        try{
            return ResponseEntity.ok(voucherService.getVouchers());
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getVoucherById(@PathVariable("id") int id){
        try{
            return ResponseEntity.ok(voucherService.getVoucherById(id));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody VoucherRequest request){
        try{
            return ResponseEntity.ok(voucherService.createVoucher(request));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateVoucher(@RequestBody VoucherRequest request, @PathVariable int id){
        try{
            return ResponseEntity.ok(voucherService.updateVoucher(request,id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteAccount(@PathVariable int id){
//        try{
//            return ResponseEntity.ok(voucherService.deleteVoucher(id));
//        }catch (Exception e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
}
