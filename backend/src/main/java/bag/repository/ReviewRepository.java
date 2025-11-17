package bag.repository;

import bag.modal.entity.Review;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query("SELECT r FROM Review r WHERE r.createdDate BETWEEN :start AND :end")
    List<Review> findByDate(@Param("start") LocalDateTime start,
                            @Param("end") LocalDateTime end);

    boolean existsByCreatedDateBetween(LocalDateTime start, LocalDateTime end);
}
