package bag.service.product;

import bag.modal.dto.ProductDto;
import bag.modal.entity.Category;
import bag.modal.entity.Product;
import bag.modal.request.ProductRequest;
import bag.repository.CategoryRepository;
import bag.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Page<ProductDto> getAllProductsWithPaging(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return productRepository.findAll(pageable)
                .map(ProductDto::new);
    }

    @Override
    public List<ProductDto> getAllProductsWithoutPaging() {
        return productRepository.findAll().stream().map(ProductDto::new).collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getByCategoryId(int categoryId) {
        List<Product> products = productRepository.findByCategory(categoryId);
        if (products.isEmpty()){
            return new ArrayList<>();
        }
        return products.stream().map(ProductDto::new).collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductById(int productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return new ProductDto(product);
    }

    @Override
    public ProductDto addProduct(ProductRequest request) {
        try {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException(request.getCategoryId() + "not found"));
            Product product = new Product();
            request.populate(product);
            product.setCategory(category);
            productRepository.save(product);
            return new ProductDto(product);
        } catch (Exception e) {
            throw new RuntimeException("Create product failed! " +e.getMessage());
        }
    }

    @Override
    public ProductDto updateProduct(ProductRequest request, int id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        try {
            request.populate(product);
            product.setCategory(category);
            productRepository.save(product);
            return new ProductDto(product);
        } catch (Exception e) {
            throw new RuntimeException("Update product failed");
        }
    }

    @Override
    public ProductDto deleteProductById(int productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setStockQuantity(0);
        productRepository.save(product);
        return new ProductDto(product);
    }
}