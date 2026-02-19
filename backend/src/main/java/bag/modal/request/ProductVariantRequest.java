package bag.modal.request;
import bag.modal.entity.Product;
import bag.modal.entity.ProductVariant;
import lombok.Data;

import java.util.List;

@Data
public class ProductVariantRequest {
    private int productId;
    private String sku;
    private String color;
    private String colorCode;
    private String size;
    private List<String> images;
    private Double price;
    private Integer stockQuantity;

    public void setProductVariant(ProductVariant productVariant){
        productVariant.setSku(sku);
        productVariant.setColor(color);
        productVariant.setColorCode(colorCode);
        productVariant.setSize(size);
        productVariant.setPrice(price);
        productVariant.setStockQuantity(stockQuantity);


    }

}
