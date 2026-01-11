package bag.modal.request;

import bag.modal.entity.Account;
import bag.validation.account.UniqueEmail;
import bag.validation.account.UniqueUsername;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
public class AccountRequest {
    @UniqueUsername
    private String username;
    private String password;
    @UniqueEmail
    private String email;
    private String phoneNumber;
    private String city;
    private String address;
    private Double point;

    public Account register(){
        Account account = new Account();
        populate(account);
        account.setPosition(Account.Position.USER);
        account.setStatus(Account.AccountStatus.NOT_VERIFIED);
        return account;
    }

    public Account registerAdmin(){
        Account account = new Account();
        populate(account);
        account.setPosition(Account.Position.ADMIN);
        account.setStatus(Account.AccountStatus.INACTIVE);
        return account;
    }

    private void populate(Account account) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        account.setUsername(username);
        account.setPassword(passwordEncoder.encode(password));
        account.setEmail(email);
        account.setPhoneNumber(phoneNumber);
        account.setCity(null);
        account.setAddress(null);
        account.setPoint(point);
    }

    public void updateInformation(Account account){
        account.setUsername(username);
        account.setPhoneNumber(phoneNumber);
        account.setCity(city);
        account.setAddress(address);
    }

    public void deleteAccount(Account account){
        account.setStatus(Account.AccountStatus.DELETED);
    }
}
