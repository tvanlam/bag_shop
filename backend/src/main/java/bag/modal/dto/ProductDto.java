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
    private double price;
    private int stockQuantity;
    private List<ProductImageDto> images;
    private List<ReviewDto> reviews;
    private int categoryId;
    private String categoryName;
    private double averageRating;
    private int totalReviews;
    private double minPrice;
    private double maxPrice;

    public ProductDto(Product product){
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price =  product.getPrice();
        this.stockQuantity = product.getStockQuantity();
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
        this.categoryId = product.getCategory().getId();


    }
}
