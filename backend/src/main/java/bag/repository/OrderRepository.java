package bag.repository;

import bag.modal.entity.Account;
import bag.modal.entity.CartItem;
import bag.modal.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

}
