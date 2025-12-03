package bag.support.data;

import bag.modal.entity.Account;
import bag.modal.entity.Account.Position;
import bag.repository.AccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Order(1)
public class AccountSeeder {

    @Bean
    CommandLineRunner initAccounts(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (accountRepository.count() == 0) {
                // Admin accounts
                Account admin1 = new Account();
                admin1.setUsername("admin1");
                admin1.setPassword(passwordEncoder.encode("admin123"));
                admin1.setEmail("admin1@example.com");
                admin1.setPhoneNumber("0123456789");
                admin1.setPosition(Position.ADMIN);
                admin1.setStatus(Account.AccountStatus.ACTIVE);

                Account admin2 = new Account();
                admin2.setUsername("admin2");
                admin2.setPassword(passwordEncoder.encode("admin123"));
                admin2.setEmail("admin2@example.com");
                admin2.setPhoneNumber("0987654321");
                admin2.setPosition(Position.ADMIN);
                admin2.setStatus(Account.AccountStatus.ACTIVE);

                // User accounts
                Account user1 = new Account();
                user1.setUsername("User1");
                user1.setPassword(passwordEncoder.encode("user123"));
                user1.setEmail("user1@example.com");
                user1.setPhoneNumber("0111111111");
                user1.setPosition(Position.USER);
                user1.setStatus(Account.AccountStatus.ACTIVE);

                Account user2 = new Account();
                user2.setUsername("user2");
                user2.setPassword(passwordEncoder.encode("user123"));
                user2.setEmail("user2@example.com");
                user2.setPhoneNumber("0222222222");
                user2.setPosition(Position.USER);
                user2.setStatus(Account.AccountStatus.ACTIVE);

                accountRepository.save(admin1);
                accountRepository.save(admin2);
                accountRepository.save(user1);
                accountRepository.save(user2);

                System.out.println("✅ Seeded 4 accounts: 2 admins + 2 users (all ACTIVE).");
            }
        };
    }
}
