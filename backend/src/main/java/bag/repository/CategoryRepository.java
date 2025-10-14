package bag.repository;

import bag.modal.entity.Category;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // Lấy category và toàn bộ product
    @Query("SELECT ct FROM Category ct LEFT JOIN FETCH ct.products WHERE ct.id = :categoryId ")
    Optional<Category> findByIdWithProducts(@Param("categoryId") int categoryId);

    //tìm cate theo tên
    Optional<Category> findByName(String name);
}
