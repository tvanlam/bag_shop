package bag.seeder;

import bag.modal.entity.Account;
import bag.modal.entity.Category;
import bag.modal.entity.Product;
import bag.modal.entity.ProductImage;
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
import java.util.List;

@Configuration
@Order(2) // Chạy sau AccountSeeder (Order 1)
public class ProductSeeder {

    @Bean
    CommandLineRunner initProducts(ProductRepository productRepository, CategoryRepository categoryRepository,
                                   AccountRepository accountRepository, ReviewRepository reviewRepository) {
        return args -> {
            try {
                if (productRepository.count() == 0) {
                    // Tạo danh mục cho cửa hàng túi xách
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
                    System.out.println("✅ Seeded 3 categories: Handbags, Backpacks, Wallets.");

                    // Lấy tài khoản người dùng từ AccountRepository để gán cho Review
                    List<Account> accounts = accountRepository.findAll();
                    Account user1 = accounts.stream()
                            .filter(a -> a.getUsername().equals("user1"))
                            .findFirst()
                            .orElseThrow(() -> new RuntimeException("User1 not found"));
                    Account user2 = accounts.stream()
                            .filter(a -> a.getUsername().equals("user2"))
                            .findFirst()
                            .orElseThrow(() -> new RuntimeException("User2 not found"));
                    System.out.println("✅ Found accounts: user1, user2.");

                    // Sản phẩm 1: Túi xách tay da
                    Product leatherHandbag = new Product();
                    leatherHandbag.setName("Leather Handbag");
                    leatherHandbag.setDescription("Premium leather handbag with adjustable strap");
                    leatherHandbag.setPrice(2500000);
                    leatherHandbag.setStockQuantity(30);
                    leatherHandbag.setCategory(handbags);

                    List<ProductImage> leatherHandbagImages = Arrays.asList(
                            createProductImage("https://example.com/images/leather-handbag1.jpg", leatherHandbag),
                            createProductImage("https://example.com/images/leather-handbag2.jpg", leatherHandbag)
                    );
                    leatherHandbag.setImages(leatherHandbagImages);

                    productRepository.save(leatherHandbag);
                    System.out.println("✅ Seeded product: Leather Handbag.");

                    List<Review> leatherHandbagReviews = Arrays.asList(
                            createReview(leatherHandbag, user1, 5, "Gorgeous design, high-quality leather!"),
                            createReview(leatherHandbag, user2, 4, "Love it, but the strap could be softer.")
                    );
                    reviewRepository.saveAll(leatherHandbagReviews);
                    System.out.println("✅ Seeded reviews for Leather Handbag.");

                    // Sản phẩm 2: Ba lô du lịch
                    Product travelBackpack = new Product();
                    travelBackpack.setName("Travel Backpack");
                    travelBackpack.setDescription("Water-resistant backpack, perfect for travel");
                    travelBackpack.setPrice(800000);
                    travelBackpack.setStockQuantity(50);
                    travelBackpack.setCategory(backpacks);

                    List<ProductImage> travelBackpackImages = Arrays.asList(
                            createProductImage("https://example.com/images/travel-backpack1.jpg", travelBackpack),
                            createProductImage("https://example.com/images/travel-backpack2.jpg", travelBackpack)
                    );
                    travelBackpack.setImages(travelBackpackImages);

                    productRepository.save(travelBackpack);
                    System.out.println("✅ Seeded product: Travel Backpack.");

                    List<Review> travelBackpackReviews = Arrays.asList(
                            createReview(travelBackpack, user1, 4, "Very spacious and durable!"),
                            createReview(travelBackpack, user2, 3, "Good, but needs more compartments.")
                    );
                    reviewRepository.saveAll(travelBackpackReviews);
                    System.out.println("✅ Seeded reviews for Travel Backpack.");

                    // Sản phẩm 3: Ví da nhỏ
                    Product leatherWallet = new Product();
                    leatherWallet.setName("Leather Wallet");
                    leatherWallet.setDescription("Slim leather wallet with card slots");
                    leatherWallet.setPrice(1500000);
                    leatherWallet.setStockQuantity(100);
                    leatherWallet.setCategory(wallets);

                    List<ProductImage> leatherWalletImages = Arrays.asList(
                            createProductImage("https://example.com/images/leather-wallet1.jpg", leatherWallet),
                            createProductImage("https://example.com/images/leather-wallet2.jpg", leatherWallet)
                    );
                    leatherWallet.setImages(leatherWalletImages);

                    productRepository.save(leatherWallet);
                    System.out.println("✅ Seeded product: Leather Wallet.");

                    List<Review> leatherWalletReviews = Arrays.asList(
                            createReview(leatherWallet, user1, 5, "Perfect size, fits all my cards!"),
                            createReview(leatherWallet, user2, 4, "Great quality, but a bit small.")
                    );
                    reviewRepository.saveAll(leatherWalletReviews);
                    System.out.println("✅ Seeded reviews for Leather Wallet.");

                    System.out.println("✅ Seeded 3 bag shop products with images and reviews.");
                } else {
                    System.out.println("ℹ️ Database already contains products. Skipping seeding.");
                }
            } catch (Exception e) {
                System.err.println("❌ Error seeding products: " + e.getMessage());
                e.printStackTrace();
                throw e; // Ném lại ngoại lệ để dễ debug
            }
        };
    }

    private ProductImage createProductImage(String url, Product product) {
        ProductImage image = new ProductImage();
        image.setImageUrl(url);
        image.setProduct(product);
        return image;
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