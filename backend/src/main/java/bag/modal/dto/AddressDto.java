package bag.modal.dto;

import bag.modal.entity.Address;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddressDto {
    private int id;
    private int accountId;
    private String fullName;
    private String phoneNumber;
    private String addressLine;
    private String ward;
    private String district;
    private String city;
    private String postalCode;
    private boolean isDefault;
    private Address.AddressType type;

    public AddressDto (Address address) {
        this.id = address.getId();
        this.accountId = address.getAccount().getId();
        this.fullName = address.getFullName();
        this.phoneNumber = address.getPhoneNumber();
        this.addressLine = address.getAddressLine();
        this.ward = address.getWard();
        this.district = address.getDistrict();
        this.city = address.getCity();
        this.postalCode = address.getPostalCode();
        this.isDefault = address.isDefault();
        this.type = address.getType();

    }
}

