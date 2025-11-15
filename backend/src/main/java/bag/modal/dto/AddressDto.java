//package bag.modal.dto;
//
//import bag.modal.entity.Address;
//import lombok.Data;
//
//import java.time.LocalDateTime;
//
//@Data
//public class AddressDto {
//    private int id;
//    private int accountId;
//    private String fullName;
//    private String phoneNumber;
//    private String addressLine;
//    private String ward;
//    private String district;
//    private String city;
//    private String postalCode;
//    private boolean isDefault;
//    private Address.AddressType type;
//    private LocalDateTime createdDate;
//    private LocalDateTime modifiedDate;
//
//    public static AddressDto toDto(Address address) {
//        if (address == null) {
//            return null;
//        }
//
//        AddressDto dto = new AddressDto();
//        dto.setId(address.getId());
//        dto.setAccountId(address.getAccount() != null ? address.getAccount().getId() : 0);
//        dto.setFullName(address.getFullName());
//        dto.setPhoneNumber(address.getPhoneNumber());
//        dto.setAddressLine(address.getAddressLine());
//        dto.setWard(address.getWard());
//        dto.setDistrict(address.getDistrict());
//        dto.setCity(address.getCity());
//        dto.setPostalCode(address.getPostalCode());
//        dto.setDefault(address.isDefault());
//        dto.setType(address.getType());
//        dto.setCreatedDate(address.getCreatedDate());
//        dto.setModifiedDate(address.getModifiedDate());
//
//        return dto;
//    }
//}
//
