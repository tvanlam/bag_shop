package bag.modal.request;

import bag.modal.entity.Product;
import bag.modal.entity.ProductImage;
import lombok.Data;

@Data
public class ProductImageRequest {
    private int id;
    private String imageUrl;
    private String alt;
    private boolean isMain;
    private int productId;
    private int productVariantId;

    public void populate(ProductImage productImage){
        productImage.setImageUrl(imageUrl);
        productImage.setAlt(alt);
        productImage.setMain(isMain);

    }


}
