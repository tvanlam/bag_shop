package bag.service.Category;

import bag.modal.dto.CategoryDto;
import bag.modal.request.CategoryRequest;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getAll();

    CategoryDto getCategoryById(int Categoryid);

    CategoryDto createCategory(CategoryRequest request);

    CategoryDto updateCategory(CategoryRequest request, int categoryId);

    void deleteCategory(int categoryId);
}
