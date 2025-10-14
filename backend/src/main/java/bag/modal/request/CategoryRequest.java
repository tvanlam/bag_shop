package bag.modal.request;

import bag.modal.entity.Category;
import lombok.Data;

import java.util.List;

@Data
public class CategoryRequest {
    private String name;
    private String description;
    private String imageUrl;
    private List<String> productId;

    public Category populate(Category category){
        category.setName(name);
        category.setDescription(description);
        category.setImageUrl(imageUrl);
        return category;
    }


}
