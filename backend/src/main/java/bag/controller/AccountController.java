package bag.controller;

import bag.modal.request.AccountRequest;
import bag.service.account.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getAccounts(){
        try {
            return ResponseEntity.ok(accountService.getAll());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getAccountById(@PathVariable("id") int id){
        try{
            return ResponseEntity.ok(accountService.getById(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerAccount(@RequestBody AccountRequest request){
        try{
            return ResponseEntity.ok(accountService.addUser(request));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> adminRegisterAccount(@RequestBody AccountRequest request){
        try {
            return ResponseEntity.ok(accountService.addAdmin(request));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/email/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> updateEmail(@RequestBody AccountRequest request, @PathVariable int id){
        try{
            accountService.changeEmail(request, id);
            return ResponseEntity.ok("otp send your email. pls check");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/password/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> updatePassword(@RequestBody AccountRequest request, @PathVariable int id){
        try{
            accountService.changePassword(request, id);
            return ResponseEntity.ok("otp send your password. pls check");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/information/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> changePassword(@RequestBody AccountRequest request, @PathVariable int id){
        try{
            return ResponseEntity.ok(accountService.updateInformation(request,id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> deleteAccount(@PathVariable int id, @RequestBody AccountRequest request){
        try{
            return ResponseEntity.ok(accountService.deleteAccount(id, request));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
