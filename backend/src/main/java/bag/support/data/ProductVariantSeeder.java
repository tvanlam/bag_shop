package bag.support.data;

import bag.modal.entity.Product;
import bag.modal.entity.ProductVariant;
import bag.repository.ProductRepository;
import bag.repository.VariantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
@Configuration
@Order(3)  // Chạy sau ProductSeeder (Order 2)
public class ProductVariantSeeder {

    @Bean
    CommandLineRunner initVariants(ProductRepository productRepository,
                                   VariantRepository variantRepository) {
        return args -> {
            if (variantRepository.count() > 0) {
                System.out.println("Database already contains variants. Skipping variant seeding.");
                return;
            }

            System.out.println("Starting product variant seeding...");

            // Lấy tất cả sản phẩm đã seed (giả sử đã có từ ProductSeeder)
            List<Product> allProducts = productRepository.findAll();
            if (allProducts.isEmpty()) {
                throw new RuntimeException("No products found. Please run ProductSeeder first.");
            }

            int variantCount = 0;

            for (Product product : allProducts) {
                String productName = product.getName().toLowerCase();
                int productId = product.getId();

                List<ProductVariant> variants = new ArrayList<>();

                // Handbags
                if (productName.contains("handbag") || productName.contains("clutch")) {
                    variants.addAll(createVariantsForHandbags(product, productId));
                }
                // Backpacks
                else if (productName.contains("backpack")) {
                    variants.addAll(createVariantsForBackpacks(product, productId));
                }
                // Wallets (ít size hơn)
                else if (productName.contains("wallet")) {
                    variants.addAll(createVariantsForWallets(product, productId));
                }
                // Tote Bags
                else if (productName.contains("tote")) {
                    variants.addAll(createVariantsForToteBags(product, productId));
                }
                // Crossbody Bags
                else if (productName.contains("crossbody") || productName.contains("saddle")) {
                    variants.addAll(createVariantsForCrossbody(product, productId));
                }

                // Save variants
                if (!variants.isEmpty()) {
                    variantRepository.saveAll(variants);
                    variantCount += variants.size();
                    System.out.println("Seeded " + variants.size() + " variants for: " + product.getName());
                }
            }

            System.out.println("Seeded total " + variantCount + " product variants successfully.");
        };
    }

    // =====================================================================
    // Variant creation helpers cho từng loại sản phẩm
    // =====================================================================

    private List<ProductVariant> createVariantsForHandbags(Product product, int productId) {
        return Arrays.asList(
                createVariant(product, "Black", "M", 2890000, 8),
                createVariant(product, "Tan", "M", 2890000, 5),
                createVariant(product, "Navy", "L", 2950000, 2)  // giá cao hơn tí cho size lớn
        );
    }

    private List<ProductVariant> createVariantsForBackpacks(Product product, int productId) {
        return Arrays.asList(
                createVariant(product, "Black", "One Size", 1290000, 12),
                createVariant(product, "Grey", "One Size", 1290000, 10),
                createVariant(product, "Olive", "One Size", 1320000, 8),
                createVariant(product, "Black", "Large", 1350000, 5)
        );
    }

    private List<ProductVariant> createVariantsForWallets(Product product, int productId) {
        return Arrays.asList(
                createVariant(product, "Black", "Standard", 690000, 25),
                createVariant(product, "Brown", "Standard", 690000, 15),
                createVariant(product, "Coffee", "Standard", 720000, 10)
        );
    }

    private List<ProductVariant> createVariantsForToteBags(Product product, int productId) {
        return Arrays.asList(
                createVariant(product, "Natural", "One Size", 490000, 20),
                createVariant(product, "Black", "One Size", 490000, 15),
                createVariant(product, "Blue", "One Size", 510000, 10),
                createVariant(product, "Natural", "Large", 520000, 8)
        );
    }

    private List<ProductVariant> createVariantsForCrossbody(Product product, int productId) {
        return Arrays.asList(
                createVariant(product, "Black", "Small", 990000, 12),
                createVariant(product, "Red", "Small", 990000, 8),
                createVariant(product, "Black", "Medium", 1050000, 6),
                createVariant(product, "Brown", "Medium", 1050000, 6)
        );
    }

    // =====================================================================
    // Helper: Tạo một ProductVariant
    // =====================================================================

    private ProductVariant createVariant(Product product, String color, String size,
                                         double price, int stock) {
        ProductVariant v = new ProductVariant();
        v.setProduct(product);
        v.setColor(color);
        v.setSize(size);
        v.setPrice(price);
        v.setStockQuantity(stock);

        // Generate SKU: productId-COLOR-SIZE (COLOR viết hoa, loại bỏ khoảng trắng)
        String colorPart = color.toUpperCase().replace(" ", "");
        String sizePart = size.toUpperCase().replace(" ", "");
        v.setSku(product.getId() + "-" + colorPart + "-" + sizePart);

        // Nếu bạn có field colorCode, imageUrl,... có thể thêm ở đây
        // v.setColorCode("#000000"); // ví dụ cho Black

        return v;
    }
}