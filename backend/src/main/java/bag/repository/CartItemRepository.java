package bag.repository;

import bag.modal.entity.Account;
import bag.modal.entity.Cart;
import bag.modal.entity.CartItem;
import bag.modal.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findByCartAccountAndOrderIsNull(Account account);

    void deleteByProduct(Product product);

    @Query("DELETE FROM CartItem ci WHERE ci.id = :cartItemId")
    void deleteByCartItemId(@Param("cartItemId") int cartItemId);

    @Query("SELECT ci FROM CartItem ci " +
            "LEFT JOIN FETCH ci.productVariant v " +
            "WHERE ci.cart.account.id = :accountId")
    List<CartItem> findAllByAccountId(@Param("accountId") int accountId);


}
