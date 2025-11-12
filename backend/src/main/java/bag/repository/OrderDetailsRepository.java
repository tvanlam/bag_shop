package bag.repository;

import bag.modal.dto.OrderDetailsDto;
import bag.modal.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {
    @Query("SELECT od FROM OrderDetails od " +
            "LEFT JOIN FETCH od.product p " +
            "LEFT JOIN FETCH od.order o " +
            "WHERE p.id = :productId")
    List<OrderDetails> findByProductId(@Param("productId") int productId);

    @Query("SELECT od FROM OrderDetails od " +
            "LEFT JOIN FETCH od.product " +
            "LEFT JOIN FETCH od.order " +
            "WHERE od.order.id = :orderId")
    List<OrderDetails> findByOrderId(int orderId);
}
