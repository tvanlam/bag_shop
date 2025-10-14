package bag.controller;

import bag.modal.request.MailRequest;
import bag.service.mail.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
@CrossOrigin("*")
@RequiredArgsConstructor
public class MailController {
    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<?> sendMail(@RequestBody MailRequest request){
        try {
            emailService.userSendToAdmin(request);
            return ResponseEntity.ok(true);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
