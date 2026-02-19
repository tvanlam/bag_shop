package bag.service.product;

import bag.modal.dto.ProductDto;
import bag.modal.dto.ProductVariantDto;
import bag.modal.request.ProductRequest;
import bag.modal.request.ProductVariantRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    Page<ProductDto> getAllProductsWithPaging(int page, int size, String sortBy, String sortDir);

    List<ProductDto> getAllProductsWithoutPaging();
    List<ProductDto> getByCategoryId(int categoryId);
    List<ProductDto> getProductByRangePrice(double minPrice, double maxPrice );
    ProductDto getProductById(int productId);
    List<ProductDto> getProductsHighToLow();

    ProductDto addProduct(ProductRequest request);

    ProductDto updateProduct(ProductRequest request, int id);
    ProductDto deleteProductById(int productId);

    //variant
    ProductVariantDto createVariant(int productId, ProductVariantRequest request);

    ProductVariantDto updateVariant( ProductVariantRequest request, int id) ;

    ProductVariantDto getVariantBySku(String sku);

    ProductVariantDto getVariantByColorAndSize(int productId, String color, String size);


    ProductVariantDto deleteVariant(int variantId);
}
