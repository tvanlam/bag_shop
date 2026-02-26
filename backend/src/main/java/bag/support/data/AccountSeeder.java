package bag.support.data;

import bag.modal.entity.Account;
import bag.repository.AccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.List;

@Configuration
@Order(1)
public class AccountSeeder {

    // Khai báo hằng số static final để code dễ đọc và tránh lặp lại "Account.Position."
    private static final Account.Position ADMIN_POSITION = Account.Position.ADMIN;
    private static final Account.Position USER_POSITION  = Account.Position.USER;

    @Bean
    CommandLineRunner initAccounts(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (accountRepository.count() > 0) {
                System.out.println("ℹ️ Database already has accounts. Skipping AccountSeeder.");
                return;
            }

            System.out.println("Starting account seeding (2 admins + 2 users)...");

            // Admin accounts
            Account admin1 = createAccount("admin1", "admin123", "admin1@example.com", "0123456789",
                    "Admin", "One", new Date(0), ADMIN_POSITION, Account.AccountStatus.ACTIVE, passwordEncoder);
            Account admin2 = createAccount("admin2", "admin123", "admin2@example.com", "0987654321",
                    "Admin", "Two", new Date(0), ADMIN_POSITION, Account.AccountStatus.ACTIVE, passwordEncoder);

            // User accounts
            Account user1 = createAccount("user1", "user123", "user1@example.com", "0111111111",
                    "Nguyen", "Van A", new Date(0), USER_POSITION, Account.AccountStatus.ACTIVE, passwordEncoder);
            Account user2 = createAccount("user2", "user123", "user2@example.com", "0222222222",
                    "Tran", "Thi B", new Date(0), USER_POSITION, Account.AccountStatus.ACTIVE, passwordEncoder);

            accountRepository.saveAll(List.of(admin1, admin2, user1, user2));

            System.out.println("✅ Seeded 4 accounts successfully (2 admins + 2 users).");
        };
    }

    private Account createAccount(String username, String rawPassword, String email, String phone,
                                  String firstName, String lastName, Date dob,
                                  Account.Position position,               // ← sửa ở đây: thêm Account.
                                  Account.AccountStatus status,
                                  PasswordEncoder encoder) {
        Account acc = new Account();
        acc.setUsername(username);
        acc.setPassword(encoder.encode(rawPassword));
        acc.setEmail(email);
        acc.setPhoneNumber(phone);
        acc.setFirstName(firstName);
        acc.setLastName(lastName);
        acc.setDateOfBirth(dob);
        acc.setPosition(position);
        acc.setStatus(status);
        return acc;
    }
}