package bag.modal.dto;

import bag.modal.entity.ProductImage;
import lombok.Data;

@Data
public class ProductImageDto {
    private int id;
    private String imageUrl;
    private String alt;
    private boolean isMain;
    private int productId;

    public ProductImageDto(ProductImage productImage){
        this.id = productImage.getId();
        this.imageUrl = productImage.getImageUrl();
        this.alt = productImage.getAlt();
        this.isMain = productImage.isMain();
        this.productId = productImage.getProduct().getId();
    }
}
