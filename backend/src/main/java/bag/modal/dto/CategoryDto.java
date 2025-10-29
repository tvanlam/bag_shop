package bag.modal.dto;

import bag.modal.entity.Category;
import bag.modal.entity.Product;
import lombok.Data;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class CategoryDto {
    private int id;
    private String name;
    private String description;
    private String imageUrl;
    private List<ProductDto> products;

    public CategoryDto(Category category){
        this.id = category.getId();
        this.name = category.getName();
        this.description = category.getDescription();
        this.imageUrl =  category.getImageUrl();
        this.products = category.getProducts() != null
                ? category.getProducts().stream().map(ProductDto::new)
                .collect(Collectors.toList())
                : Collections.emptyList();

    }
}
