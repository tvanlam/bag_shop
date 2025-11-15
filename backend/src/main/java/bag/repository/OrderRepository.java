package bag.repository;

import bag.modal.entity.Account;
import bag.modal.entity.CartItem;
import bag.modal.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("""
        SELECT o FROM Order o
        LEFT JOIN FETCH o.account a
        LEFT JOIN FETCH o.voucher v
        LEFT JOIN FETCH o.orderDetails od
        LEFT JOIN FETCH od.product p
        WHERE o.id = :id
        """)
    Optional<Order> findByIdWithDetails(@Param("id") int id);
}
