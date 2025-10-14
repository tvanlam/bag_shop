package bag.modal.request;

import bag.modal.entity.Category;
import bag.modal.entity.Product;
import bag.modal.entity.ProductImage;
import bag.modal.entity.Review;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ProductRequest {
    @NotBlank(message = "product name is required")
    private String name;
    @NotBlank(message = "description is required")
    private String description;
    @NotNull(message = "price must be required")
    private double price;
    @NotNull(message = "quantity is required")
    @Min(value = 0)
    private int stockQuantity;
    @NotEmpty(message = "At least one image is required")
    private List<String> images;
    private int categoryId;


    public void populate(Product product){
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStockQuantity(stockQuantity);

    }

}
