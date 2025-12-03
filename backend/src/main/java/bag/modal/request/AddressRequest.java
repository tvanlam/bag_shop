package bag.modal.request;

import bag.modal.entity.Account;
import bag.modal.entity.Address;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddressRequest {
    private int accountId;
    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "Address line is required")
    private String addressLine;

    private String ward;

    @NotBlank(message = "District is required")
    private String district;

    @NotBlank(message = "City is required")
    private String city;

    private String postalCode;

    private boolean isDefault = false;

    @NotNull(message = "Address type is required")
    private Address.AddressType type = Address.AddressType.HOME;
    public void setAddress(Address address){
        address.setFullName(fullName);
        address.setPhoneNumber(phoneNumber);
        address.setAddressLine(addressLine);
        address.setWard(ward);
        address.setDistrict(district);
        address.setCity(city);
        address.setPostalCode(postalCode);
    }
}

