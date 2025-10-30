package bag.support.data;

import bag.modal.entity.Account;
import bag.modal.entity.Category;
import bag.modal.entity.Product;
import bag.modal.entity.Review;
import bag.repository.AccountRepository;
import bag.repository.CategoryRepository;
import bag.repository.ProductRepository;
import bag.repository.ReviewRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@Order(2)
public class ProductSeeder {

    @Bean
    CommandLineRunner initProducts(ProductRepository productRepository, CategoryRepository categoryRepository,
                                   AccountRepository accountRepository, ReviewRepository reviewRepository) {
        return args -> {
            if (productRepository.count() > 0) {
                System.out.println("ℹ️ Database already contains products. Skipping seeding.");
                return;
            }

            System.out.println("👜 Starting product seeding...");

            // Tạo danh mục
            Category handbags = new Category();
            handbags.setName("Handbags");
            handbags.setDescription("Stylish handbags for daily use");

            Category backpacks = new Category();
            backpacks.setName("Backpacks");
            backpacks.setDescription("Durable and fashionable backpacks");

            Category wallets = new Category();
            wallets.setName("Wallets");
            wallets.setDescription("Compact and elegant wallets");

            categoryRepository.saveAll(Arrays.asList(handbags, backpacks, wallets));
            System.out.println("✅ Seeded 3 categories.");

            // Lấy tài khoản người dùng
            List<Account> accounts = accountRepository.findAll();
            Account user1 = accounts.stream().filter(a -> a.getUsername().equals("User1")).findFirst()
                    .orElseThrow(() -> new RuntimeException("User1 not found"));
            Account user2 = accounts.stream().filter(a -> a.getUsername().equals("user2")).findFirst()
                    .orElseThrow(() -> new RuntimeException("User2 not found"));

            // Seed sản phẩm
            seedProductsForCategory(productRepository, reviewRepository, handbags, user1, user2,
                    "Handbag", 2500000);
            seedProductsForCategory(productRepository, reviewRepository, backpacks, user1, user2,
                    "Backpack", 800000);
            seedProductsForCategory(productRepository, reviewRepository, wallets, user1, user2,
                    "Wallet", 1500000);

            System.out.println("✅ Seeded 15 products with reviews and empty images.");
        };
    }

    private void seedProductsForCategory(ProductRepository productRepository,
                                         ReviewRepository reviewRepository,
                                         Category category,
                                         Account user1,
                                         Account user2,
                                         String baseName,
                                         double basePrice) {

        for (int i = 1; i <= 5; i++) {
            Product product = new Product();
            product.setName(baseName + " " + i);
            product.setDescription("High-quality " + baseName.toLowerCase() + " number " + i);
            product.setPrice(basePrice + i * 10000);
            product.setStockQuantity(20 + i * 5);
            product.setCategory(category);
            product.setImages(Collections.emptyList());

            productRepository.save(product);
            System.out.println("✅ Created: " + product.getName());

            if (i == 1) {
                List<Review> reviews = Arrays.asList(
                        createReview(product, user1, 5, "Excellent " + baseName.toLowerCase() + "!"),
                        createReview(product, user2, 4, "Good value for money.")
                );
                reviewRepository.saveAll(reviews);
                System.out.println("✅ Added reviews for " + product.getName());
            }
        }
    }

    private Review createReview(Product product, Account account, int rating, String comment) {
        Review review = new Review();
        review.setProduct(product);
        review.setAccount(account);
        review.setRating(rating);
        review.setComment(comment);
        return review;
    }
}