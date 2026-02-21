package bag.support.data;

import bag.modal.entity.Category;
import bag.modal.entity.Product;
import bag.repository.CategoryRepository;
import bag.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.util.Arrays;
import java.util.List;

@Configuration
@Order(2)
public class ProductSeeder {

    @Bean
    CommandLineRunner initProducts(ProductRepository productRepository,
                                   CategoryRepository categoryRepository) {
        return args -> {
            if (productRepository.count() > 0) {
                System.out.println("Database already contains products. Skipping seeding.");
                return;
            }

            System.out.println("Starting product seeding (15 products, no images, no reviews)...");

            // Lấy các category theo tên
            Category handbags = getCategory(categoryRepository, "Handbags");
            Category backpacks = getCategory(categoryRepository, "Backpacks");
            Category wallets = getCategory(categoryRepository, "Wallets");
            Category toteBags = getCategory(categoryRepository, "Tote Bags");
            Category crossbodyBags = getCategory(categoryRepository, "Crossbody Bags");

            // Tạo sản phẩm cho từng category
            seedHandbags(productRepository, handbags);
            seedBackpacks(productRepository, backpacks);
            seedWallets(productRepository, wallets);
            seedToteBags(productRepository, toteBags);
            seedCrossbodyBags(productRepository, crossbodyBags);

            System.out.println("Seeded 15 products successfully.");
        };
    }

    // === Helper: Lấy category ===
    private Category getCategory(CategoryRepository repo, String name) {
        return repo.findByName(name)
                .orElseThrow(() -> new RuntimeException("Category '" + name + "' not found"));
    }

    // =====================================================================
    // SEED METHODS (3 sản phẩm mỗi loại)
    // =====================================================================

    private void seedHandbags(ProductRepository repo, Category cat) {
        List<Product> products = Arrays.asList(
                createProduct("Leather Tote Handbag", "Premium genuine leather with gold hardware", 2890000, 15, cat),
                createProduct("Canvas Everyday Handbag", "Lightweight canvas with adjustable strap", 1590000, 25, cat),
                createProduct("Mini Evening Clutch", "Elegant satin clutch for special occasions", 2190000, 20, cat)
        );
        saveAll(repo, products, "Handbag");
    }

    private void seedBackpacks(ProductRepository repo, Category cat) {
        List<Product> products = Arrays.asList(
                createProduct("Urban Traveler Backpack", "Water-resistant with laptop compartment", 1290000, 30, cat),
                createProduct("Hiking Pro Backpack", "40L capacity with rain cover", 1890000, 18, cat),
                createProduct("Student Daily Backpack", "Affordable and spacious for school", 890000, 40, cat)
        );
        saveAll(repo, products, "Backpack");
    }

    private void seedWallets(ProductRepository repo, Category cat) {
        List<Product> products = Arrays.asList(
                createProduct("Slim Leather Bifold Wallet", "Genuine leather with RFID protection", 690000, 50, cat),
                createProduct("Minimalist Card Holder", "Aluminum with cash strap", 450000, 60, cat),
                createProduct("Zip-Around Long Wallet", "Full-grain leather with compartments", 890000, 35, cat)
        );
        saveAll(repo, products, "Wallet");
    }

    private void seedToteBags(ProductRepository repo, Category cat) {
        List<Product> products = Arrays.asList(
                createProduct("Eco Canvas Tote", "100% organic cotton with reinforced handles", 490000, 45, cat),
                createProduct("Beach Straw Tote", "Handwoven straw with leather straps", 790000, 28, cat),
                createProduct("Market Shopper Tote", "Foldable and lightweight for shopping", 390000, 55, cat)
        );
        saveAll(repo, products, "Tote Bag");
    }

    private void seedCrossbodyBags(ProductRepository repo, Category cat) {
        List<Product> products = Arrays.asList(
                createProduct("Compact Crossbody", "Adjustable strap and secure zipper", 990000, 32, cat),
                createProduct("Leather Saddle Bag", "Vintage-inspired with magnetic closure", 1490000, 22, cat),
                createProduct("Sporty Nylon Crossbody", "Lightweight and water-resistant", 690000, 40, cat)
        );
        saveAll(repo, products, "Crossbody Bag");
    }

    // =====================================================================
    // Helper Methods
    // =====================================================================

    private Product createProduct(String name, String desc, double price, int stock, Category cat) {
        Product p = new Product();
        p.setName(name);
        p.setDescription(desc);
        p.setBasePrice(price);
        p.setTotalStockQuantity(0); // Sẽ được cộng từ tổng variant sau khi ProductVariantSeeder chạy
        p.setCategory(cat);
        return p;
    }

    private void saveAll(ProductRepository repo, List<Product> products, String type) {
        products.forEach(p -> {
            repo.save(p);
            System.out.println("Created: " + p.getName() + " (" + type + ")");
        });
    }
}