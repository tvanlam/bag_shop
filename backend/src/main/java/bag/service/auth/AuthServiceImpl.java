package bag.service.auth;

import bag.configuration.security.JwtTokenUtil;
import bag.modal.dto.AuthResponse;
import bag.modal.dto.GoogleUserInfo;
import bag.modal.entity.Account;
import bag.modal.entity.Cart;
import bag.modal.request.AuthRequest;
import bag.modal.request.GoogleAuthRequest;
import bag.repository.AccountRepository;
import bag.repository.CartRepository;
import bag.service.verification.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.time.Duration;
import java.util.Date;
import java.util.UUID;

import static bag.support.method.Support.buildKey;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final AccountRepository accountRepository;
    private final CartRepository cartRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final VerificationService verificationService;
    private final PasswordEncoder passwordEncoder;

    private static final String REFRESH_TOKEN_PREFIX = "refreshToken:";
    private static final String GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

    @Override
    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        String accessToken = jwtTokenUtil.generateAccessToken(
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getPosition()
        );

        String refreshToken = jwtTokenUtil.generateRefreshToken(
                userDetails.getId(),
                userDetails.getUsername()
        );

        String key = REFRESH_TOKEN_PREFIX + userDetails.getId();
        redisTemplate.opsForValue().set(key, refreshToken, Duration.ofDays(7));
        return new AuthResponse(accessToken, refreshToken, userDetails.getId(), userDetails.getPosition());
    }

    @Override
    public AuthResponse googleLogin(GoogleAuthRequest request) {
        // Gọi Google userinfo API để lấy thông tin người dùng
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(request.getAccessToken());
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<GoogleUserInfo> response;
        try {
            response = restTemplate.exchange(GOOGLE_USERINFO_URL, HttpMethod.GET, entity, GoogleUserInfo.class);
        } catch (Exception e) {
            throw new RuntimeException("Token Google không hợp lệ hoặc đã hết hạn");
        }

        GoogleUserInfo userInfo = response.getBody();
        if (userInfo == null || userInfo.getEmail() == null) {
            throw new RuntimeException("Không lấy được thông tin từ Google");
        }

        // Tìm account theo email
        Account account = accountRepository.findByEmail(userInfo.getEmail()).orElse(null);

        if (account != null) {
            if (account.getStatus() == Account.AccountStatus.DELETED) {
                throw new RuntimeException("Tài khoản này đã bị xóa");
            }
            // Nếu chưa verify thì kích hoạt luôn (Google đã xác minh email)
            if (account.getStatus() == Account.AccountStatus.NOT_VERIFIED) {
                account.setStatus(Account.AccountStatus.ACTIVE);
                accountRepository.save(account);
            }
        } else {
            // Tạo account mới từ thông tin Google
            account = new Account();
            account.setEmail(userInfo.getEmail());
            account.setUsername(generateUniqueUsername(userInfo.getEmail()));
            account.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
            account.setFirstName(userInfo.getFamilyName() != null ? userInfo.getFamilyName() : "Google");
            account.setLastName(userInfo.getGivenName() != null ? userInfo.getGivenName() : "User");
            account.setDateOfBirth(new Date(0)); // placeholder, người dùng cập nhật sau
            account.setPhoneNumber("Chưa cập nhật");
            account.setPosition(Account.Position.USER);
            account.setStatus(Account.AccountStatus.ACTIVE);
            accountRepository.save(account);

            Cart cart = new Cart();
            cart.setAccount(account);
            account.setCart(cart);
            cartRepository.save(cart);
        }

        return generateAuthResponse(account);
    }

    private String generateUniqueUsername(String email) {
        String base = email.split("@")[0].replaceAll("[^a-zA-Z0-9]", "");
        if (base.isEmpty()) base = "user";
        String username = base;
        int counter = 1;
        while (accountRepository.existsByUsername(username)) {
            username = base + counter++;
        }
        return username;
    }

    private AuthResponse generateAuthResponse(Account account) {
        String accessToken = jwtTokenUtil.generateAccessToken(
                account.getId(),
                account.getEmail(),
                account.getPosition().toString()
        );
        String refreshToken = jwtTokenUtil.generateRefreshToken(
                account.getId(),
                account.getEmail()
        );
        String key = REFRESH_TOKEN_PREFIX + account.getId();
        redisTemplate.opsForValue().set(key, refreshToken, Duration.ofDays(7));
        return new AuthResponse(accessToken, refreshToken, account.getId(), account.getPosition().toString());
    }

    @Override
    public AuthResponse refreshToken(String refreshToken) {
        if (!jwtTokenUtil.isTokenValid(refreshToken, true)) {
            throw new RuntimeException("Invalid refresh token");
        }

        int accountId = jwtTokenUtil.getAccountIdFromToken(refreshToken, true);
        String key = REFRESH_TOKEN_PREFIX + accountId;

        String storedToken = redisTemplate.opsForValue().get(key);
        if (!storedToken.equals(refreshToken)) {
            throw new RuntimeException("Refresh token not recognized or expired");
        }

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found with Id: " + accountId));

        String accessToken = jwtTokenUtil.generateAccessToken(
                account.getId(),
                account.getEmail(),
                account.getPosition().toString()
        );

        return new AuthResponse(accessToken, null, account.getId(), account.getPosition().toString());
    }



    @Override
    public void logout(int accountId) {
        String key = REFRESH_TOKEN_PREFIX + accountId;
        redisTemplate.delete(key);
    }

    @Override
    public String resentOtp(String email, String action) {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Account deleted or not found"));

        if (account.getStatus() != Account.AccountStatus.NOT_VERIFIED) {
            return "account already verified or auto deleted if you weren't confirm otp";
        }

        String key = buildKey(email, action);
        Long ttl = redisTemplate.getExpire(key);
        if (ttl > 0) {
            return "otp already sent, please wait";
        }
        verificationService.createAndSendVerificationEmail(email, "REGISTER");
        return "otp sent";
    }
}
