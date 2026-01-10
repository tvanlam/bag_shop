package bag.support.data;

import bag.modal.entity.Voucher;
import bag.modal.entity.Voucher.TypeDiscount;
import bag.modal.entity.Voucher.VoucherStatus;
import bag.repository.VoucherRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Configuration
@Order(2)
public class VoucherSeeder {

    @Bean
    CommandLineRunner initVouchers(VoucherRepository voucherRepository) {
        return args -> {
            if (voucherRepository.count() > 0) {
                System.out.println("Database already contains vouchers. Skipping seeding.");
                return;
            }

            System.out.println("Starting voucher seeding (initial promotional vouchers)...");

            LocalDateTime now = LocalDateTime.now();

            List<Voucher> vouchers = Arrays.asList(
                    createVoucher(
                            "SALE20",
                            "Giảm 20% cho tất cả đơn hàng trên 200.000đ",
                            TypeDiscount.PERCENT,
                            20.0,
                            70000.0,
                            100,
                            LocalDateTime.parse("2025-11-01T00:00:00"),
                            LocalDateTime.parse("2025-12-31T23:59:59"),
                            now
                    ),
                    createVoucher(
                            "GIAM50K",
                            "Giảm 50k cho đơn từ 300k",
                            TypeDiscount.FIXED_AMOUNT,
                            50000.0,
                            50000.0,
                            100,
                            LocalDateTime.parse("2025-11-15T00:00:00"),
                            LocalDateTime.parse("2026-12-31T23:59:59"),
                            now
                    ),
                    createVoucher(
                            "FREESHIP",
                            "Miễn phí vận chuyển cho đơn từ 500k",
                            TypeDiscount.FREE_SHIP,
                            0.0,           // giá trị không quan trọng, thường để 0
                            30000.0,       // giới hạn tối đa (nếu có)
                            150,
                            LocalDateTime.parse("2025-10-01T00:00:00"),
                            LocalDateTime.parse("2026-06-30T23:59:59"),
                            now
                    ),
                    createVoucher(
                            "NEWUSER",
                            "Giảm 100k cho đơn hàng đầu tiên",
                            TypeDiscount.FIXED_AMOUNT,
                            100000.0,
                            100000.0,
                            200,
                            LocalDateTime.parse("2025-10-01T00:00:00"),
                            LocalDateTime.parse("2026-06-30T23:59:59"),
                            now
                    )
            );

            saveAll(voucherRepository, vouchers);

            System.out.println("Seeded " + vouchers.size() + " vouchers successfully.");
        };
    }

    // =====================================================================
    // Helper Methods
    // =====================================================================

    private Voucher createVoucher(
            String code,
            String description,
            TypeDiscount typeDiscount,
            double discountValue,
            double maxDiscount,
            int quantity,
            LocalDateTime startDate,
            LocalDateTime endDate,
            LocalDateTime now) {

        Voucher v = new Voucher();
        v.setCode(code);
        v.setDescription(description);
        v.setTypeDiscount(typeDiscount);
        v.setDiscountValue(discountValue);
        v.setMaxDiscount(maxDiscount);
        v.setQuantity(quantity);
        v.setUsedQuantity(0);
        v.setStartDate(startDate);
        v.setEndDate(endDate);
        v.setStatus(VoucherStatus.ACTIVE);

        return v;
    }

    private void saveAll(VoucherRepository repo, List<Voucher> vouchers) {
        vouchers.forEach(v -> {
            repo.save(v);
            System.out.println("Created voucher: " + v.getCode() + " - " + v.getDescription()
                    + " (" + v.getTypeDiscount() + ")");
        });
    }
}