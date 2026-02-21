package bag.service.productImage;

import bag.modal.dto.ProductImageDto;
import bag.modal.entity.Product;
import bag.modal.entity.ProductImage;
import bag.modal.entity.ProductVariant;
import bag.modal.request.ProductImageRequest;
import bag.repository.ProductImageRepository;
import bag.repository.ProductRepository;
import bag.repository.VariantRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductImageServiceImpl implements ProductImageService {
    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;
    private final VariantRepository variantRepository;

    public ProductImageServiceImpl(ProductImageRepository productImageRepository, ProductRepository productRepository, VariantRepository variantRepository) {
        this.productImageRepository = productImageRepository;
        this.productRepository = productRepository;
        this.variantRepository = variantRepository;
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

    @Transactional
    @Override
    public ProductImageDto createProductImage(ProductImageRequest request) {
        try {
            ProductImage productImage = new ProductImage();
            request.populate(productImage);
            Product product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException(request.getProductId() + "not found"));
            ProductVariant variant = variantRepository.findById(request.getProductVariantId())
                    .orElseThrow(() -> new RuntimeException(request.getProductVariantId() + "not found"));

            productImage.setProduct(product);
            productImage.setProductVariant(variant);
            if (productImageRepository.countByProductVariant(variant) == 0) {
                productImage.setMain(true);
            }
            productImageRepository.save(productImage);
            return new ProductImageDto(productImage);
        }catch(Exception e){
            throw new RuntimeException("Create failed: " + e.getMessage(), e);
        }
    }

    @Transactional
    @Override
    public ProductImageDto updateProductImage(ProductImageRequest request, int id) {
        try {
            ProductImage productImage = productImageRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException(request.getId() + "not found"));
            Product product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException(request.getProductId() + "not found"));
            ProductVariant variant = variantRepository.findById(request.getProductVariantId())
                    .orElseThrow(() -> new RuntimeException(request.getProductVariantId() + "not found"));
            request.populate(productImage);
            productImage.setProduct(product);
            productImage.setProductVariant(variant);
            if(request.isMain() && !productImage.isMain()){
                productImageRepository.findByProductVariantAndIsMainTrue(variant)
                        .ifPresent(oldMain -> {
                            oldMain.setMain(false);
                            productImageRepository.save(oldMain);
                        });
                productImage.setMain(true);
            }

            productImageRepository.save(productImage);
            return new ProductImageDto(productImage);
        }catch(Exception e){
            throw new RuntimeException("Update failed: " + e.getMessage(), e);
        }
        }

    @Override
    public void deleteProductImage(int variantId, int id) {
        ProductImage productImage = productImageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product image not found"));
        productImageRepository.delete(productImage);
    }
}
