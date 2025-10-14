package bag.support.scheduling;

import bag.modal.entity.Account;
import bag.repository.AccountRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeleteAccountNotVerified {
    private final AccountRepository accountRepository;

    @Value("${app.account.verification-ttl}")
    private Duration duration;

        @Scheduled(cron = "0 0 3 * * *", zone = "Asia/Ho_Chi_Minh")
        @Transactional
        public void run() {
            ZoneId zone = ZoneId.of("Asia/Ho_Chi_Minh");
            LocalDateTime nowVN = LocalDateTime.now(zone);
            LocalDateTime cutoff = nowVN.minus(duration);

            long deleted = accountRepository.deleteByStatusAndCreatedDateBefore(
                    Account.AccountStatus.NOT_VERIFIED, cutoff
            );
            log.info("Deleted {} NOT_VERIFIED accounts created before {} (VN time)", deleted, cutoff);
        }
}
