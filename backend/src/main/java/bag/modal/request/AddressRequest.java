//package bag.modal.request;
//
//import bag.modal.entity.Address;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotNull;
//import lombok.Data;
//
//@Data
//public class AddressRequest {
//    @NotBlank(message = "Full name is required")
//    private String fullName;
//
//    @NotBlank(message = "Phone number is required")
//    private String phoneNumber;
//
//    @NotBlank(message = "Address line is required")
//    private String addressLine;
//
//    private String ward;
//
//    @NotBlank(message = "District is required")
//    private String district;
//
//    @NotBlank(message = "City is required")
//    private String city;
//
//    private String postalCode;
//
//    private boolean isDefault = false;
//
//    @NotNull(message = "Address type is required")
//    private Address.AddressType type = Address.AddressType.HOME;
//}
//
