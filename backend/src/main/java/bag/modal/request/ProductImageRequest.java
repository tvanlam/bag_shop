package bag.modal.request;

import bag.modal.entity.Product;
import bag.modal.entity.ProductImage;
import lombok.Data;

@Data
public class ProductImageRequest {
    private int id;
    private String imageUrl;
    private String alt;
    private boolean main;
    private int productId;

    public void populate(ProductImage productImage){
        productImage.setImageUrl(imageUrl);
        productImage.setAlt(alt);
        productImage.setMain(main);
    }


}
