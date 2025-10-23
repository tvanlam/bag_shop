package bag.config.seeder;

import bag.modal.request.CategoryRequest;
import bag.service.Category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CategorySeeder implements CommandLineRunner {

    private final CategoryService categoryService;

    @Override
    public void run(String... args) throws Exception {
        seedCategories();
    }

    private void seedCategories() {
        // Kiểm tra nếu đã có categories thì không seed
        if (categoryService.getAll().size() > 0) {
            System.out.println("Categories already exist. Skipping seeding.");
            return;
        }

        System.out.println("🚀 Starting Category Seeding...");

        // Seed 6 categories
        seedCategory1();
        seedCategory2();
        seedCategory3();
        seedCategory4();
        seedCategory5();
        seedCategory6();

        System.out.println("✅ Category seeding completed!");
    }

    private void seedCategory1() {
        CategoryRequest request = new CategoryRequest();
        request.setName("Electronics");
        request.setDescription("Smartphones, laptops, headphones, tablets and more");
        request.setImageUrl("https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500");
        categoryService.createCategory(request);
        System.out.println("✅ Created: Electronics");
    }

    private void seedCategory2() {
        CategoryRequest request = new CategoryRequest();
        request.setName("Fashion");
        request.setDescription("Clothing, shoes, accessories, bags and more");
        request.setImageUrl("https://images.unsplash.com/photo-1445205170230-053b83016050?w=500");
        categoryService.createCategory(request);
        System.out.println("✅ Created: Fashion");
    }

    private void seedCategory3() {
        CategoryRequest request = new CategoryRequest();
        request.setName("Home & Garden");
        request.setDescription("Furniture, decor, kitchenware, gardening tools");
        request.setImageUrl("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500");
        categoryService.createCategory(request);
        System.out.println("✅ Created: Home & Garden");
    }

    private void seedCategory4() {
        CategoryRequest request = new CategoryRequest();
        request.setName("Sports & Outdoors");
        request.setDescription("Fitness equipment, camping gear, sports apparel");
        request.setImageUrl("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500");
        categoryService.createCategory(request);
        System.out.println("✅ Created: Sports & Outdoors");
    }

    private void seedCategory5() {
        CategoryRequest request = new CategoryRequest();
        request.setName("Books");
        request.setDescription("Fiction, non-fiction, textbooks, children's books");
        request.setImageUrl("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500");
        categoryService.createCategory(request);
        System.out.println("✅ Created: Books");
    }

    private void seedCategory6() {
        CategoryRequest request = new CategoryRequest();
        request.setName("Beauty");
        request.setDescription("Skincare, makeup, haircare, fragrances");
        request.setImageUrl("https://images.unsplash.com/photo-1625772299842-348340779403?w=500");
        categoryService.createCategory(request);
        System.out.println("✅ Created: Beauty");
    }
}