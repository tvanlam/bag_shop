package bag.repository;

import bag.modal.entity.Product;
import bag.modal.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
    int countByProduct(Product product);
    Optional<ProductImage> findByProductAndIsMainTrue(Product product);

    @Query("SELECT pi FROM ProductImage pi JOIN FETCH pi.product WHERE pi.id = :id")
    Optional<ProductImage> findByIdWithProduct(@Param("id") int id);


}
