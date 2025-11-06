package bag.repository;

import bag.modal.entity.Account;
import bag.modal.entity.Cart;
import bag.modal.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
   @Query("SELECT c FROM Cart c JOIN FETCH c.cartItems WHERE c.account.id = :accountId")   Optional<Cart> findByAccountId(@Param("accountId") int accountId);

}
