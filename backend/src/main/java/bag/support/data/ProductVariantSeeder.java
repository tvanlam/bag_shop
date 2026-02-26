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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Configuration
@Order(3)  // Chạy sau ProductSeeder (Order 2)
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
            if(products.isEmpty()){
                log.warn("No products found. Skipping variant seeding.");
                return;
            }

            int totalVariantsSeeded = 0;

            for (Product product : products) {
                List<ProductVariant> variantsToCreate;

                switch (product.getName()) {
                    // ── Handbags ──────────────────────────────────────────
                    case "Leather Tote Handbag"      -> variantsToCreate = createLeatherToteVariants(product);
                    case "Canvas Everyday Handbag"   -> variantsToCreate = createCanvasHandbagVariants(product);
                    case "Mini Evening Clutch"        -> variantsToCreate = createEveningClutchVariants(product);
                    // ── Backpacks ─────────────────────────────────────────
                    case "Urban Traveler Backpack"   -> variantsToCreate = createUrbanBackpackVariants(product);
                    case "Hiking Pro Backpack"        -> variantsToCreate = createHikingBackpackVariants(product);
                    case "Student Daily Backpack"     -> variantsToCreate = createStudentBackpackVariants(product);
                    // ── Wallets ───────────────────────────────────────────
                    case "Slim Leather Bifold Wallet" -> variantsToCreate = createBifoldWalletVariants(product);
                    case "Minimalist Card Holder"     -> variantsToCreate = createCardHolderVariants(product);
                    case "Zip-Around Long Wallet"     -> variantsToCreate = createZipWalletVariants(product);
                    // ── Tote Bags ─────────────────────────────────────────
                    case "Eco Canvas Tote"            -> variantsToCreate = createEcoCanvasToteVariants(product);
                    case "Beach Straw Tote"           -> variantsToCreate = createBeachStrawToteVariants(product);
                    case "Market Shopper Tote"        -> variantsToCreate = createMarketShopperToteVariants(product);
                    // ── Crossbody Bags ────────────────────────────────────
                    case "Compact Crossbody"          -> variantsToCreate = createCompactCrossbodyVariants(product);
                    case "Leather Saddle Bag"         -> variantsToCreate = createLeatherSaddleVariants(product);
                    case "Sporty Nylon Crossbody"     -> variantsToCreate = createSportyNylonVariants(product);
                    default -> {
                        log.warn("Product '{}' không khớp tên nào. Creating basic variant.", product.getName());
                        variantsToCreate = createBasicVariant(product);
                    }
                }

                // Lọc những variant chưa tồn tại (theo SKU)
                List<ProductVariant> newVariants = new ArrayList<>();
                for (ProductVariant v : variantsToCreate) {
                    if (variantRepository.findBySku(v.getSku()).isEmpty()) {
                        newVariants.add(v);
                    } else {
                        log.debug("SKU {} đã tồn tại cho product {}. Bỏ qua.", v.getSku(), product.getName());
                    }
                }

                if (!newVariants.isEmpty()) {
                    variantRepository.saveAll(newVariants);
                    totalVariantsSeeded += newVariants.size();

                    // Cập nhật totalStockQuantity của product = tổng stock tất cả variants
                    int totalStock = newVariants.stream()
                            .mapToInt(ProductVariant::getStockQuantity).sum();
                    product.setTotalStockQuantity(totalStock);
                    productRepository.save(product);

                    log.info("Seeded {} variants cho product '{}' (ID: {}) | totalStock: {}",
                            newVariants.size(), product.getName(), product.getId(), totalStock);
                }
            }

            log.info("Product variant seeding completed. Total variants seeded: {}", totalVariantsSeeded);
        };
    }

    // =====================================================================
    // Variants riêng biệt cho từng sản phẩm
    // =====================================================================

    // ── Handbags ──────────────────────────────────────────────────────────

    /** ID 1 – Leather Tote Handbag */
    private List<ProductVariant> createLeatherToteVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black",    "#000000", "S", 2_790_000,  6),
                createVariant(product, "Black",    "#000000", "M", 2_890_000,  8),
                createVariant(product, "Tan",      "#C8956C", "M", 2_890_000,  5),
                createVariant(product, "Burgundy", "#800020", "M", 2_920_000,  4),
                createVariant(product, "Brown",    "#795548", "L", 2_950_000,  4)
        );
    }

    /** ID 2 – Canvas Everyday Handbag */
    private List<ProductVariant> createCanvasHandbagVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black",   "#000000", "M", 1_590_000, 10),
                createVariant(product, "Navy",    "#1B2A4A", "M", 1_590_000,  8),
                createVariant(product, "Olive",   "#6B7C4B", "M", 1_620_000,  6),
                createVariant(product, "Beige",   "#F5F0E8", "L", 1_590_000,  7)
        );
    }

    /** ID 3 – Mini Evening Clutch */
    private List<ProductVariant> createEveningClutchVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black",    "#000000",   "L", 2_190_000, 8),
                createVariant(product, "Gold",     "#FFD700",   "L", 2_290_000, 5),
                createVariant(product, "Silver",   "#C0C0C0",   "L", 2_250_000, 5),
                createVariant(product, "Rose Gold", "#B76E79",  "L", 2_300_000, 4)
        );
    }

    // ── Backpacks ──────────────────────────────────────────────────────────

    /** ID 4 – Urban Traveler Backpack */
    private List<ProductVariant> createUrbanBackpackVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black",  "#000000", "M", 1_290_000, 12),
                createVariant(product, "Black",  "#000000", "L", 1_350_000,  5),
                createVariant(product, "Grey",   "#9E9E9E", "M", 1_290_000,  8),
                createVariant(product, "Navy",   "#1B2A4A", "L", 1_360_000,  5)
        );
    }

    /** ID 5 – Hiking Pro Backpack */
    private List<ProductVariant> createHikingBackpackVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black",  "#000000", "L",  1_890_000,  8),
                createVariant(product, "Black",  "#000000", "XL", 1_990_000,  4),
                createVariant(product, "Green",  "#2E7D32", "L",  1_890_000,  6),
                createVariant(product, "Orange", "#E65100", "XL", 1_990_000,  4),
                createVariant(product, "Grey",   "#9E9E9E", "L",  1_890_000,  5)
        );
    }

    /** ID 6 – Student Daily Backpack */
    private List<ProductVariant> createStudentBackpackVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black",  "#000000", "M",  890_000, 15),
                createVariant(product, "Blue",   "#1565C0", "M",  890_000, 12),
                createVariant(product, "Pink",   "#E91E8C", "M",  890_000,  8),
                createVariant(product, "Purple", "#6A1B9A", "L",  940_000,  5)
        );
    }

    // ── Wallets ────────────────────────────────────────────────────────────

    /** ID 7 – Slim Leather Bifold Wallet */
    private List<ProductVariant> createBifoldWalletVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black",  "#000000", "M", 690_000, 25),
                createVariant(product, "Brown",  "#795548", "M", 690_000, 15),
                createVariant(product, "Tan",    "#C8956C", "M", 700_000,  8)
        );
    }

    /** ID 8 – Minimalist Card Holder */
    private List<ProductVariant> createCardHolderVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black",  "#000000", "M", 450_000, 20),
                createVariant(product, "Silver", "#C0C0C0", "M", 470_000, 12),
                createVariant(product, "Gold",   "#FFD700", "M", 480_000,  8)
        );
    }

    /** ID 9 – Zip-Around Long Wallet */
    private List<ProductVariant> createZipWalletVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black",  "#000000", "M", 890_000, 15),
                createVariant(product, "Brown",  "#795548", "M", 890_000, 10),
                createVariant(product, "Coffee", "#6F4E37", "M", 920_000,  7),
                createVariant(product, "Tan",    "#C8956C", "M", 900_000,  6)
        );
    }

    // ── Tote Bags ──────────────────────────────────────────────────────────

    /** ID 10 – Eco Canvas Tote */
    private List<ProductVariant> createEcoCanvasToteVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Natural", "#D2B48C", "L", 490_000, 20),
                createVariant(product, "Black",   "#000000", "L", 490_000, 15),
                createVariant(product, "Blue",    "#1565C0", "L", 510_000, 10)
        );
    }

    /** ID 11 – Beach Straw Tote */
    private List<ProductVariant> createBeachStrawToteVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Natural", "#D2B48C", "L", 790_000, 12),
                createVariant(product, "Brown",   "#795548", "L", 790_000,  8),
                createVariant(product, "Beige",   "#F5F0E8", "L", 790_000,  8)
        );
    }

    /** ID 12 – Market Shopper Tote */
    private List<ProductVariant> createMarketShopperToteVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Natural", "#D2B48C", "L", 390_000, 18),
                createVariant(product, "Black",   "#000000", "L", 390_000, 12),
                createVariant(product, "Red",     "#DC2626", "L", 390_000,  8),
                createVariant(product, "Blue",    "#1565C0", "L", 390_000,  8)
        );
    }

    // ── Crossbody Bags ─────────────────────────────────────────────────────

    /** ID 13 – Compact Crossbody */
    private List<ProductVariant> createCompactCrossbodyVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black",  "#000000", "S",  990_000, 12),
                createVariant(product, "Black",  "#000000", "M", 1_050_000,  6),
                createVariant(product, "Red",    "#DC2626", "S",  990_000,  8),
                createVariant(product, "Brown",  "#795548", "M", 1_050_000,  6)
        );
    }

    /** ID 14 – Leather Saddle Bag */
    private List<ProductVariant> createLeatherSaddleVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Brown",    "#795548", "S", 1_490_000,  8),
                createVariant(product, "Black",    "#000000", "S", 1_490_000,  7),
                createVariant(product, "Tan",      "#C8956C", "M", 1_550_000,  5),
                createVariant(product, "Burgundy", "#800020", "M", 1_560_000,  4)
        );
    }

    /** ID 15 – Sporty Nylon Crossbody */
    private List<ProductVariant> createSportyNylonVariants(Product product) {
        return Arrays.asList(
                createVariant(product, "Black",  "#000000", "S",  690_000, 14),
                createVariant(product, "Navy",   "#1B2A4A", "S",  690_000, 10),
                createVariant(product, "Red",    "#DC2626", "M",  720_000,  8),
                createVariant(product, "Grey",   "#9E9E9E", "M",  720_000,  8)
        );
    }

    private List<ProductVariant> createBasicVariant(Product product) {
        return List.of(
                createVariant(product, "Black", "#000000", "", 1_000_000, 10)
        );
    }

    // =====================================================================
    // Tạo ProductVariant với SKU tự động: {productId}-{COLOR}-{SIZE}
    // =====================================================================
    private ProductVariant createVariant(Product product, String color, String colorCode,
                                         String size, double price, int stockQuantity) {
        ProductVariant variant = new ProductVariant();
        variant.setProduct(product);
        variant.setColor(color);
        variant.setColorCode(colorCode);
        variant.setSize(size);
        variant.setPrice(price);
        variant.setStockQuantity(stockQuantity);

        String colorPart = color.toUpperCase().replaceAll("\\s+", "");
        String sizePart  = size.toUpperCase().replaceAll("\\s+", "");
        variant.setSku(product.getId() + "-" + colorPart + "-" + sizePart);

        return variant;
    }
}