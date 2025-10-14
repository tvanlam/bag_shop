package bag.service.auth;

import bag.modal.dto.AuthResponse;
import bag.modal.request.AuthRequest;

public interface AuthService {
    AuthResponse login(AuthRequest request);
    AuthResponse refreshToken(String refreshToken);
    void logout(int accountId);
    String resentOtp(String email, String action);
}
