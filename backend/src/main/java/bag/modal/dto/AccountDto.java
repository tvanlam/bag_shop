package bag.modal.dto;

import bag.modal.entity.Account;
import lombok.Data;

@Data
public class AccountDto {
    private int id;
    private String username;
    private String email;
    private String phoneNumber;
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private String city;
    private String address;
    private String position;
    private String status;
    private Double point;

    public AccountDto(Account account) {
        this.id = account.getId();
        this.username = account.getUsername();
        this.email = account.getEmail();
        this.firstName = account.getFirstName();
        this.lastName = account.getLastName();
        this.dateOfBirth = account.getDateOfBirth() != null
                ? account.getDateOfBirth().toString()
                : null;
        this.phoneNumber = account.getPhoneNumber();
        this.city = account.getCity();
        this.address = account.getAddress();
        this.position = account.getPosition().toString();
        this.status = account.getStatus().toString();
        this.point = account.getPoint() != null ? account.getPoint() : null;
    }
}
