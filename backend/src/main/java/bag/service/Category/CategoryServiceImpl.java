package bag.service.Category;

import bag.modal.dto.CategoryDto;
import bag.modal.entity.Category;
import bag.modal.request.CategoryRequest;
import bag.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDto> getAll() {
        return categoryRepository.findAll().stream().map(CategoryDto::new).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryDto getCategoryById(int categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return new CategoryDto(category);
    }

    @Override
    public CategoryDto createCategory(CategoryRequest request) {
        try {
            Category category = new Category();
            request.populate(category);
            categoryRepository.save(category);
            return new CategoryDto(category);
        }catch(Exception e){
            throw new RuntimeException("Create category failed");
        }
    }

    @Override
    public CategoryDto updateCategory(CategoryRequest request, int categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NullPointerException("Category not found") );
        try{
             request.populate(category);
            return new CategoryDto(category);
        }catch(Exception e){
            throw new RuntimeException("Update category failed");
        }
    }

    @Override
    public void deleteCategory(int categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        try{
            categoryRepository.save(category);
        }catch (Exception e){
            throw new NullPointerException("Delete failed");
        }
    }
}
