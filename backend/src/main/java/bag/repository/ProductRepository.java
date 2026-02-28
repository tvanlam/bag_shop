package bag.repository;

import bag.modal.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // Tìm sản phẩm theo tên gần đúng
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchByName(@Param("keyword") String keyword);

    // Tìm tất cả sản phẩm theo category
    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId")
    List<Product> findByCategory(@Param("categoryId") int categoryId);

    // Lấy sản phẩm kèm reviews
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.reviews WHERE p.id = :productId")
    Optional<Product> findByIdWithReviews(@Param("productId") int productId);

    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.images WHERE p.id = :productId")
    Optional<Product> findByIdWithImages(@Param("productId") int productId);

    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.images LEFT JOIN FETCH p.productVariants")
    List<Product> findAllWithImagesAndVariants();

    @Query("SELECT p FROM Product p WHERE p.basePrice BETWEEN :minPrice AND :maxPrice")
    List<Product> findByRangePrice(
            @Param("minPrice") double minPrice,
            @Param("maxPrice") double maxPrice
    );

    @Query("SELECT p FROM Product p ORDER BY p.basePrice DESC")
    List<Product> findAllPriceByDesc();

    @Query("SELECT p FROM Product p ORDER BY p.basePrice DESC")
    Page<Product> findAllByPriceDesc(Pageable pageable);

    //tìm sp theo variant
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.productVariants WHERE p.id = :productId")
    Optional<Product> findByIdWithVariants(@Param("productId") Integer productId);



}
