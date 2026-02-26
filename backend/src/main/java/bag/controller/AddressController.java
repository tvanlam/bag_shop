package bag.controller;

import bag.modal.request.AddressRequest;
import bag.service.AddressService.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;
    @GetMapping
    public ResponseEntity<?> getAddresses(){
        try{
            return ResponseEntity.ok(addressService.getAddresses());
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getAddressById(@PathVariable("id") int id){
        try{
            return ResponseEntity.ok(addressService.getAddressById(id));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAddress(@RequestBody AddressRequest request){
        try{
            return ResponseEntity.ok(addressService.createAddress(request));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateVoucher(@RequestBody AddressRequest request, @PathVariable int id){
        try{
            return ResponseEntity.ok(addressService.updateAddress(request,id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

        @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable int id){
        try{
            return ResponseEntity.ok(addressService.deleteAddress(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
