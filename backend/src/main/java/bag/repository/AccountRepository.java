package bag.repository;

import bag.modal.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    boolean existsByUsername(String s);
    boolean existsByEmail(String s);

    @Query("select a from Account a where a.email = :email and a.status = bag.modal.entity.Account.AccountStatus.ACTIVE")
    Optional<Account> findByEmailAndActiveTrue(@Param("email")String email);

    @Query("select a from Account a where a.email = :email")
    Optional<Account> findByEmail(@Param("email") String email);

    long deleteByStatusAndCreatedDateBefore(Account.AccountStatus status, LocalDateTime cutoff);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM Account a WHERE a.email = :email AND a.status = :status")
    boolean isAccountNotVerified(@Param("email") String email,
                                 @Param("status") Account.AccountStatus status);

    @Query("SELECT a FROM Account a LEFT JOIN FETCH a.addresses WHERE a.id = :accountId ")
    Optional<Account> findByIdWithAddresses(@Param("accountId") int accountId);



}
