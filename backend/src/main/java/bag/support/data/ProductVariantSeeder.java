package bag.support.data;

import bag.modal.entity.Product;
import bag.modal.entity.ProductVariant;
import bag.repository.ProductRepository;
import bag.repository.VariantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
@Configuration
@Order(3)  // Chạy sau ProductSeeder (giả sử Order 2)
public class ProductVariantSeeder {

    private static final Logger log = LoggerFactory.getLogger(ProductVariantSeeder.class);

    @Bean
    CommandLineRunner initVariants(ProductRepository productRepository,
                                   VariantRepository variantRepository) {
        return args -> {
            long existingCount = variantRepository.count();
            if (existingCount > 0) {
                log.info("Database already has {} product variants. Skipping seeding.", existingCount);
                return;
            }

            log.info("Starting product variant seeding...");

            List<Product> products = productRepository.findAll();
            if (products.isEmpty()) {
                throw new IllegalStateException("No products found in database. Run ProductSeeder first!");
            }

            int totalVariantsSeeded = 0;

            for (Product product : products) {
                String productNameLower = product.getName().toLowerCase().trim();
                List<ProductVariant> variantsToCreate = new ArrayList<>();

                // Phân loại sản phẩm và tạo variants tương ứng
                if (containsAny(productNameLower, "handbag", "clutch")) {
                    variantsToCreate = createHandbagVariants(product);
                } else if (productNameLower.contains("backpack")) {
                    variantsToCreate = createBackpackVariants(product);
                } else if (productNameLower.contains("wallet")) {
                    variantsToCreate = createWalletVariants(product);
                } else if (productNameLower.contains("tote")) {
                    variantsToCreate = createToteVariants(product);
                } else if (containsAny(productNameLower, "crossbody", "saddle")) {
                    variantsToCreate = createCrossbodyVariants(product);
                } else {
                    // Fallback: tạo ít nhất 1 variant cơ bản nếu không khớp loại nào
                    log.warn("Product '{}' does not match any category. Creating basic variant.", product.getName());
                    variantsToCreate = createBasicVariant(product);
                }

                // Lọc và chỉ lưu những variant chưa tồn tại (dựa trên SKU)
                List<ProductVariant> newVariants = new ArrayList<>();
                for (ProductVariant v : variantsToCreate) {
                    Optional<ProductVariant> existing = variantRepository.findBySku(v.getSku());
                    if (existing.isEmpty()) {
                        newVariants.add(v);
                    } else {
                        log.debug("Variant with SKU {} already exists for product {}. Skipping.", v.getSku(), product.getName());
                    }
                }

                if (!newVariants.isEmpty()) {
                    variantRepository.saveAll(newVariants);
                    totalVariantsSeeded += newVariants.size();
                    log.info("Seeded {} new variants for product: {} (ID: {})",
                            newVariants.size(), product.getName(), product.getId());
                }
            }

            log.info("Product variant seeding completed. Total variants seeded: {}", totalVariantsSeeded);
        };
    }

    // Helper: kiểm tra chuỗi chứa bất kỳ từ nào trong danh sách
    private boolean containsAny(String text, String... keywords) {
        for (String kw : keywords) {
            if (text.contains(kw)) {
                return true;
            }
        }
        return false;
    }

    // =====================================================================
    // Các method tạo variants theo loại sản phẩm
    // =====================================================================

    private List<ProductVariant> createHandbagVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black", "M", 2_890_000, 8),
                createVariant(product, "Tan", "M", 2_890_000, 5),
                createVariant(product, "Navy", "L", 2_950_000, 2)
        );
    }

    private List<ProductVariant> createBackpackVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black", "One Size", 1_290_000, 12),
                createVariant(product, "Grey", "One Size", 1_290_000, 10),
                createVariant(product, "Olive", "One Size", 1_320_000, 8),
                createVariant(product, "Black", "Large", 1_350_000, 5)
        );
    }

    private List<ProductVariant> createWalletVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black", "Standard", 690_000, 25),
                createVariant(product, "Brown", "Standard", 690_000, 15),
                createVariant(product, "Coffee", "Standard", 720_000, 10)
        );
    }

    private List<ProductVariant> createToteVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Natural", "One Size", 490_000, 20),
                createVariant(product, "Black", "One Size", 490_000, 15),
                createVariant(product, "Blue", "One Size", 510_000, 10),
                createVariant(product, "Natural", "Large", 520_000, 8)
        );
    }

    private List<ProductVariant> createCrossbodyVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black", "Small", 990_000, 12),
                createVariant(product, "Red", "Small", 990_000, 8),
                createVariant(product, "Black", "Medium", 1_050_000, 6),
                createVariant(product, "Brown", "Medium", 1_050_000, 6)
        );
    }

    private List<ProductVariant> createBasicVariant(Product product) {
        return List.of(
                createVariant(product, "Default", "Standard", 1_000_000, 10)
        );
    }

    // =====================================================================
    // Tạo một ProductVariant với SKU tự động
    // =====================================================================
    private ProductVariant createVariant(Product product, String color, String size,
                                         double price, int stockQuantity) {
        ProductVariant variant = new ProductVariant();
        variant.setProduct(product);
        variant.setColor(color);
        variant.setSize(size);
        variant.setPrice(price);
        variant.setStockQuantity(stockQuantity);

        // Tạo SKU: PRODUCT_ID-COLOR-SIZE (uppercase, no spaces)
        String colorPart = color.toUpperCase().replaceAll("\\s+", "");
        String sizePart = size.toUpperCase().replaceAll("\\s+", "");
        String sku = product.getId() + "-" + colorPart + "-" + sizePart;
        variant.setSku(sku);

        return variant;
    }
}