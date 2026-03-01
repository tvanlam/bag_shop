package bag.service.AddressService;

import bag.modal.dto.AddressDto;
import bag.modal.entity.Address;
import bag.modal.request.AddressRequest;

import java.util.List;

public interface AddressService {
    List<AddressDto> getAddresses();

    AddressDto getAddressById(int id);

    // Lấy tất cả địa chỉ của một account
    List<AddressDto> getAddressesByAccountId(int accountId);

    // Lấy địa chỉ mặc định của một account
    AddressDto getDefaultAddress(int accountId);

    // Đặt địa chỉ mặc định
    AddressDto setDefaultAddress(int addressId);

    AddressDto createAddress(AddressRequest request);

    AddressDto updateAddress(AddressRequest request, int id);

    AddressDto deleteAddress(int id);
}
