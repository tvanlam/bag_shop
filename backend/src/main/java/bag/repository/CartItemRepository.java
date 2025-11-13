package bag.repository;

import bag.modal.entity.Account;
import bag.modal.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findByCartAccountAndOrderIsNull(Account account);
}
