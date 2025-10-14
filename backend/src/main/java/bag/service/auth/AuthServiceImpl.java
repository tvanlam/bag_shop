package bag.service.auth;

import bag.configuaration.security.JwtTokenUtil;
import bag.modal.dto.AuthResponse;
import bag.modal.entity.Account;
import bag.modal.request.AuthRequest;
import bag.repository.AccountRepository;
import bag.service.verification.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.Duration;

import static bag.support.method.Support.buildKey;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final AccountRepository accountRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final VerificationService verificationService;

    private static final String REFRESH_TOKEN_PREFIX = "refreshToken:";

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
