package bag.service.productImage;

import bag.modal.dto.ProductImageDto;
import bag.modal.entity.Product;
import bag.modal.entity.ProductImage;
import bag.modal.request.ProductImageRequest;
import bag.repository.ProductImageRepository;
import bag.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductImageServiceImpl implements ProductImageService {
    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

    public ProductImageServiceImpl(ProductImageRepository productImageRepository, ProductRepository productRepository) {
        this.productImageRepository = productImageRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductImageDto> getAll() {
        return productImageRepository.findAll().stream().map(ProductImageDto::new).collect(Collectors.toList());
    }

    @Override
    public ProductImageDto getProductImageById(int id) {
        ProductImage productImage = productImageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Image not found"));
        return new ProductImageDto(productImage);
    }

    @Override
    public ProductImageDto createProductImage(ProductImageRequest request) {
        try {
            ProductImage productImage = new ProductImage();
            request.populate(productImage);
            Product product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException(request.getProductId() + "not found"));
            productImage.setProduct(product);
            if (productImageRepository.countByProduct(product) == 0) {
                productImage.setMain(true);
            }
            productImageRepository.save(productImage);
            return new ProductImageDto(productImage);
        }catch(Exception e){
            throw new RuntimeException("Create failed");
        }

    }

    @Override
    public ProductImageDto updateProductImage(ProductImageRequest request, int id) {
        try {
            ProductImage productImage = productImageRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException(request.getId() + "not found"));
            Product product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException(request.getProductId() + "not found"));
            productImage.setProduct(product);
            if(productImageRepository.countByProduct(product) == 0){
                productImage.setMain(true);
            }else if(request.isMain()){
                productImageRepository.findByProductAndIsMainTrue(product)
                        .ifPresent(mainImage -> {
                            if(mainImage.isMain() != productImage.isMain()){
                                mainImage.setMain(false);
                                productImageRepository.save(mainImage);
                            }
                        });
            }
            request.populate(productImage);
            productImageRepository.save(productImage);
            return new ProductImageDto(productImage);
        }catch(Exception e){
            throw new RuntimeException("Update failed");
        }
        }

    @Override
    public void deleteProductImage(int id) {
        ProductImage productImage = productImageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product image not found"));
        productImageRepository.delete(productImage);
    }
}
