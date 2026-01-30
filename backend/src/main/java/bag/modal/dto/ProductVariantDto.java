package bag.modal.dto;

import bag.modal.entity.ProductVariant;
import lombok.Data;
import org.hibernate.engine.jdbc.Size;

import java.awt.*;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
        this.color = productVariant.getColor() != null
        ? productVariant.getColor().trim() : null;
        this.size = productVariant.getSize() != null
        ? productVariant.getSize().trim() : null;

        this.colorCode = productVariant.getColorCode();
        this.imageUrl = productVariant.getImageUrl();
        this.price = productVariant.getPrice();
        this.stockQuantity = productVariant.getStockQuantity();

    }
}
