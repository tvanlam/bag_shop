package bag.modal.dto;

import bag.modal.entity.Account;
import lombok.Data;

@Data
public class AccountDto {
    private int id;
    private String username;
    private String email;
    private String phoneNumber;
    private String city;
    private String address;
    private String position;
    private String status;
    private int cartId;

    public AccountDto(Account account) {
        this.id = account.getId();
        this.username = account.getUsername();
        this.email = account.getEmail();
        this.phoneNumber = account.getPhoneNumber();
        this.city = account.getCity();
        this.address = account.getAddress();
        this.position = account.getPosition().toString();
        this.status = account.getStatus().toString();
        this.cartId = account.getCart().getId();
    }
}
