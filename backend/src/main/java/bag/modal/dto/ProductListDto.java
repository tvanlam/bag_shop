package bag.modal.dto;

import bag.modal.entity.Product;
import lombok.Data;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * DTO cho danh sách sản phẩm (paging). Không load reviews để giảm query và payload.
 */
@Data
public class ProductListDto {
    private int id;
    private String name;
    private String description;
    private double basePrice;
    private int totalStockQuantity;
    private List<ProductImageDto> images;
    private List<ProductVariantDto> productVariants;
    private int categoryId;
    private String categoryName;

    public ProductListDto(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.basePrice = product.getBasePrice();
        this.totalStockQuantity = product.getTotalStockQuantity();
        this.images = product.getImages() != null
                ? product.getImages().stream()
                .map(ProductImageDto::new)
                .collect(Collectors.toList())
                : Collections.emptyList();
        this.productVariants = product.getProductVariants() != null
                ? product.getProductVariants().stream()
                .map(ProductVariantDto::new)
                .collect(Collectors.toList())
                : Collections.emptyList();
        this.categoryId = product.getCategory().getId();
        this.categoryName = product.getCategory() != null ? product.getCategory().getName() : null;
    }
}
