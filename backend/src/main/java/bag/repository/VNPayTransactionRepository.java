package bag.repository;

import bag.modal.entity.VNPayTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VNPayTransactionRepository extends JpaRepository<VNPayTransaction, Long> {
}
