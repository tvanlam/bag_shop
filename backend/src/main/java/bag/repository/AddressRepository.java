package bag.repository;

import bag.modal.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import bag.modal.entity.Account;


import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    @Query("SELECT a.account FROM Address a WHERE a.id = :addressId")
    Optional<Account> findAccountByAddressId(@Param("addressId") int addressId);

    // Lấy tất cả địa chỉ của một account
    List<Address> findByAccountId(int accountId);

    // Lấy địa chỉ mặc định của một account
    Optional<Address> findByAccountIdAndIsDefaultTrue(int accountId);

}
