package bag.repository;

import bag.modal.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VariantRepository extends JpaRepository<ProductVariant, Integer> {
    @Query("SELECT v FROM ProductVariant v " +
            "WHERE v.product.id = :productId " +
            "AND UPPER(v.color) = UPPER(:color) " +
            "AND UPPER(v.size) = UPPER(:size)")
    Optional<ProductVariant> findByProductIdAndColorAndSize(
            @Param("productId") int productId,
            @Param("color") String color,
            @Param("size") String size);

    Optional<ProductVariant> findBySku(String sku);



}
