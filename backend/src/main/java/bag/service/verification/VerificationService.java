package bag.service.verification;

import bag.modal.entity.Account;
import bag.modal.request.VerifiedRequest;
import bag.repository.AccountRepository;
import bag.service.mail.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import static bag.support.method.Support.buildKey;

@Service
@RequiredArgsConstructor
public class VerificationService {
    private final RedisTemplate<String, String> redisTemplate;
    private final EmailService emailService;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    private String generateOtp(){
        return String.valueOf(new Random().nextInt(90000)+10000);
    }

    public void createAndSendVerificationEmail(String email, String action) {
        createAndSendVerificationEmail(email, action, Collections.emptyMap());
    }

    public void createAndSendVerificationEmail(String email, String action, Map<String, String> extras) {
        String code = generateOtp();
        String key  = buildKey(email, action);
        Map<String, String> data = new HashMap<>();
        data.put("otp", code);
        data.putAll(extras);
        redisTemplate.opsForHash().putAll(key, data);
        redisTemplate.expire(key, Duration.ofMinutes(5));
        emailService.sendVerificationCode(email, code, action);
    }
    public boolean verifyOtp(VerifiedRequest request) {
        String otpKey = buildKey(request.getEmail(), request.getAction());
        Map<Object, Object> tempData = redisTemplate.opsForHash().entries(otpKey);
        if (tempData.isEmpty()) {
            System.out.println("❌ OTP không tìm thấy trong Redis. Key: " + otpKey);
            return false;
        }

        String storedOtp = (String) tempData.get("otp");
        System.out.println("📧 Email: " + request.getEmail());
        System.out.println("🔑 Action: " + request.getAction());
        System.out.println("🔐 Stored OTP: '" + storedOtp + "' (length: " + (storedOtp != null ? storedOtp.length() : "null") + ")");
        System.out.println("📝 Request OTP: '" + request.getOtp() + "' (length: " + request.getOtp().length() + ")");
        System.out.println("✅ Khớp: " + (storedOtp != null && storedOtp.trim().equals(request.getOtp().trim())));
        
        if (storedOtp == null || !storedOtp.trim().equals(request.getOtp().trim())) {
            return false;
        }
        redisTemplate.delete(otpKey);
        Account account;
        String accountIdStr = (String) tempData.get("accountId");
        if (accountIdStr != null && !accountIdStr.isBlank()) {
            int accountId = Integer.parseInt(accountIdStr);
            account = accountRepository.findById(accountId)
                    .orElseThrow(() -> new RuntimeException("Account not found"));
        } else {
            account = accountRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Account not found by email"));
        }
        switch (request.getAction()) {
            case "REGISTER" -> {
                account.setStatus(Account.AccountStatus.ACTIVE);
            }
            case "CHANGE_EMAIL" -> {
                String newEmail = (String) tempData.get("newEmail");
                if (newEmail == null || newEmail.isBlank()) return false;
                account.setEmail(newEmail);
            }
            case "CHANGE_PASSWORD" -> {
                String newPassword = (String) tempData.get("newPassword");
                if (newPassword == null || newPassword.isBlank()) return false;
                account.setPassword(passwordEncoder.encode(newPassword));
            }
            default -> throw new IllegalArgumentException("Unsupported action: " + request.getAction());
        }

        accountRepository.save(account);
        return true;
    }

}
