package bag.service.AddressService;

import bag.modal.dto.AddressDto;
import bag.modal.entity.Address;
import bag.modal.request.AddressRequest;

import java.util.List;

public interface AddressService {
    List<AddressDto> getAddresses();

    AddressDto getAddressById(int id);

    AddressDto createAddress(AddressRequest request);

    AddressDto updateAddress(AddressRequest request, int id);

    AddressDto deleteAddress(int id);
}
