package bag.service.productImage;

import bag.modal.dto.ProductImageDto;
import bag.modal.request.ProductImageRequest;

import java.util.List;

public interface ProductImageService {
    List<ProductImageDto> getAll();

    ProductImageDto getProductImageById(int id);

    ProductImageDto createProductImage(ProductImageRequest request);

    ProductImageDto updateProductImage(ProductImageRequest request, int id);

    void deleteProductImage(int variantId, int imageId);
}
