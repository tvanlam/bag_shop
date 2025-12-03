package bag.service.AddressService;

import bag.modal.dto.AddressDto;
import bag.modal.entity.Account;
import bag.modal.entity.Address;
import bag.modal.request.AddressRequest;
import bag.repository.AccountRepository;
import bag.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService{
    private final AccountRepository accountRepository;
    private final AddressRepository addressRepository;

    public AddressServiceImpl(AccountRepository accountRepository, AddressRepository addressRepository) {
        this.accountRepository = accountRepository;
        this.addressRepository = addressRepository;
    }

    @Override
    public List<AddressDto> getAddresses() {
        return addressRepository.findAll().stream().map(AddressDto::new).collect(Collectors.toList());
    }

    @Override
    public AddressDto getAddressById(int id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("address not found"));
        return new AddressDto(address);
    }

    @Override
    public AddressDto createAddress(AddressRequest request) {
        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(()-> new RuntimeException(request.getAccountId() + "not found"));
        Address address = new Address();
        address.setAccount(account);
        request.setAddress(address);
        addressRepository.save(address);
        return new AddressDto(address);
    }

    @Override
    public AddressDto updateAddress(AddressRequest request, int id) {
        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(()-> new RuntimeException(request.getAccountId() + "not found"));
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found with id: " + id));
        request.setAddress(address);
        address.setAccount(account);
        addressRepository.save(address);
        return new AddressDto(address);
    }

    @Override
    public AddressDto deleteAddress(int id) {
        return null;
    }
}
