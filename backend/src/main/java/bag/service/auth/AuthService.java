package bag.service.auth;

import bag.modal.dto.AuthResponse;
import bag.modal.request.AuthRequest;
import bag.modal.request.GoogleAuthRequest;

public interface AuthService {
    AuthResponse login(AuthRequest request);
    AuthResponse googleLogin(GoogleAuthRequest request);
    AuthResponse refreshToken(String refreshToken);
    void logout(int accountId);
    String resentOtp(String email, String action);
}
