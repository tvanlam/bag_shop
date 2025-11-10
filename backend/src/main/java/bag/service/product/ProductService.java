package bag.service.product;

import bag.modal.dto.ProductDto;
import bag.modal.entity.Product;
import bag.modal.request.ProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    Page<ProductDto> getAllProductsWithPaging(int page, int size, String sortBy, String sortDir);

    List<ProductDto> getAllProductsWithoutPaging();
    List<ProductDto> getByCategoryId(int categoryId);
    List<ProductDto> getProductByRangePrice(double minPrice, double maxPrice );
    ProductDto getProductById(int productId);

    ProductDto addProduct(ProductRequest request);

    ProductDto updateProduct(ProductRequest request, int id);
    ProductDto deleteProductById(int productId);
}
