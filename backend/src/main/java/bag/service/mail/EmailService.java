package bag.service.mail;


import bag.modal.dto.AuthResponse;
import bag.modal.request.MailRequest;

public interface EmailService {
    void sendVerificationCode(String to, String code, String action);
    void userSendToAdmin(MailRequest request);
    void resendVerificationCode(String to, String code, String action);
}
