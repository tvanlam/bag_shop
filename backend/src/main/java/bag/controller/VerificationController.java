package bag.controller;

import bag.modal.request.VerifiedRequest;
import bag.service.verification.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/verify")
@RequiredArgsConstructor
public class VerificationController {
    private final VerificationService verificationService;

    @PostMapping
    public ResponseEntity<?> verify(@RequestBody VerifiedRequest request) {
        try {
            return ResponseEntity.ok(verificationService.verifyOtp(request));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
