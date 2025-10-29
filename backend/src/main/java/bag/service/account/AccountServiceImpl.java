package bag.service.account;

import bag.modal.dto.AccountDto;
import bag.modal.entity.Account;
import bag.modal.request.AccountRequest;
import bag.repository.AccountRepository;
import bag.service.verification.VerificationService;
import bag.support.method.Support;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final VerificationService verificationService;
    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public List<AccountDto> getAll() {
        return accountRepository.findAll().stream().map(AccountDto::new).collect(Collectors.toList());
    }

    @Override
    public AccountDto getById(int accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        return new AccountDto(account);
    }

    @Override
    public AccountDto addUser(AccountRequest request) {
        Account account = request.register();
        accountRepository.save(account);
        try {
            verificationService.createAndSendVerificationEmail(request.getEmail(), "REGISTER");
            return new AccountDto(account);
        } catch (Exception e) {
            System.err.println("❌ Lỗi gửi email xác thực: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public AccountDto addAdmin(AccountRequest request) {
        Account account = request.registerAdmin();
        accountRepository.save(account);
        verificationService.createAndSendVerificationEmail(request.getEmail(), "REGISTER_ADMIN");
        return new AccountDto(account);
    }

    @Override
    public AccountDto updateInformation(AccountRequest request, int accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        request.updateInformation(account);
        accountRepository.save(account);
        return new AccountDto(account);
    }

    @Override
    public void changePassword(AccountRequest request, int accountId) {
        Account account = getAccountOrThrow(accountId);

        sendVerificationAndCache(account.getEmail(), "CHANGE_PASSWORD", accountId, "newPassword", request.getPassword());
    }

    @Override
    public void changeEmail(AccountRequest request, int accountId) {
        getAccountOrThrow(accountId);

        sendVerificationAndCache(request.getEmail(), "CHANGE_EMAIL", accountId, "newEmail", request.getEmail());
    }

    @Override
    public AccountDto deleteAccount(int accountId, AccountRequest request) {
        Account account = accountRepository.findById(accountId).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        request.deleteAccount(account);
        accountRepository.save(account);
        return new AccountDto(account);
    }

    private Account getAccountOrThrow(int accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    private void sendVerificationAndCache(String email, String action, int accountId, String keyField, String value) {
        verificationService.createAndSendVerificationEmail(email, action);

        String redisKey = Support.buildKey(email, action);
        redisTemplate.opsForHash().put(redisKey, "accountId", String.valueOf(accountId));
        redisTemplate.opsForHash().put(redisKey, keyField, value);
        redisTemplate.expire(redisKey, Duration.ofMinutes(5));
    }
}