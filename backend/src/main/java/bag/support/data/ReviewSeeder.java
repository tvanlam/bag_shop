package bag.support.data;

import bag.modal.entity.Account;
import bag.modal.entity.Product;
import bag.modal.entity.Review;
import bag.repository.AccountRepository;
import bag.repository.ProductRepository;
import bag.repository.ReviewRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Configuration
@Order(2)
public class ReviewSeeder {

    @Bean
    CommandLineRunner initReviews(ReviewRepository reviewRepository,
                                  ProductRepository productRepository,
                                  AccountRepository accountRepository) {
        return args -> {
            LocalDate today = LocalDate.now();
            LocalDateTime startOfDay = today.atStartOfDay();              // 00:00
            LocalDateTime endOfDay = today.atTime(23, 59, 59);            // 23:59:59

            boolean hasTodayReviews = reviewRepository.existsByCreatedDateBetween(startOfDay, endOfDay);
            if (!hasTodayReviews) {
                List<Product> products = productRepository.findAll();
                List<Account> accounts = accountRepository.findAll();
                Random random = new Random();
                int productCount = Math.min(products.size(), 10); // chỉ lấy 10 product
                for (int i = 0; i < productCount; i++) {
                    Product product = products.get(i);
                    for (int j = 0; j < 2; j++) {
                        Review review = new Review();
                        review.setProduct(product);
                        Account account = accounts.get(random.nextInt(accounts.size()));
                        review.setAccount(account);
                        review.setRating(3 + random.nextInt(3));
                        review.setComment("Review " + (j+1) + " cho sản phẩm " + product.getName());
                        review.setCreatedDate(LocalDateTime.now());

                        reviewRepository.save(review);
                    }
                }
                System.out.println("✅ Seeded reviews: mỗi product 2 review cho ngày " + today);
            } else {
                System.out.println("ℹ️ Hôm nay đã có review, không seed thêm.");
            }
        };
    }
}
