package bag.modal.dto;

import bag.modal.entity.ProductVariant;
import lombok.Data;

@Data
public class ProductVariantDto {
    private int id;
    private int productId;
    private String sku;
    private String color;
    private String colorCode;
    private String size;
    private String imageUrl;
    private double price;
    private int stockQuantity;

    public ProductVariantDto(ProductVariant productVariant){
        this.id = productVariant.getId();
        this.productId = productVariant.getProduct().getId();
        this.sku = productVariant.getSku();
        this.color = productVariant.getColor();
        this.colorCode = productVariant.getColorCode();
        this.imageUrl = productVariant.getImageUrl();
        this.price = productVariant.getPrice();
        this.stockQuantity = productVariant.getStockQuantity();

    }
}
