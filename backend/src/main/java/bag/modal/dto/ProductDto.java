package bag.modal.dto;

import bag.modal.entity.Product;
import bag.modal.entity.ProductImage;
import bag.modal.entity.Review;
import lombok.Data;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ProductDto {
    private int id;
    private String name;
    private String description;
    private double basePrice;
    private int totalStockQuantity;
    private List<ProductImageDto> images;
    private List<ReviewDto> reviews;
    private List<ProductVariantDto> productVariants;
    private int categoryId;
    private String categoryName;
    private double averageRating;
    private int totalReviews;


    public ProductDto(Product product){
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.basePrice =  product.getBasePrice();
        this.totalStockQuantity = product.getTotalStockQuantity();
        this.images = product.getImages() != null
                ? product.getImages().stream()
                .map(ProductImageDto::new)
                .collect(Collectors.toList())
                : Collections.emptyList();
        this.reviews = product.getReviews() != null
                ? product.getReviews().stream()
                .map(ReviewDto::new)
                .collect(Collectors.toList())
                : Collections.emptyList();
        this.productVariants = product.getProductVariants() != null
                ? product.getProductVariants().stream()
                .map(ProductVariantDto::new)
                .collect(Collectors.toList()) : null;
        this.categoryId = product.getCategory().getId();


    }
}
