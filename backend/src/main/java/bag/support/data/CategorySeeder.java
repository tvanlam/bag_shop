package bag.support.data;

import bag.modal.request.CategoryRequest;
import bag.service.Category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CategorySeeder implements CommandLineRunner {

    private final CategoryService categoryService;

    @Override
    public void run(String... args) throws Exception {
        seedCategories();
    }

    private void seedCategories() {
        if (categoryService.getAll().size() > 0) {
            System.out.println("📦 Categories already exist. Skipping seeding.");
            return;
        }

        System.out.println("👜 Starting Bag Category Seeding...");

        seedHandbags();
        seedBackpacks();
        seedWallets();
        seedToteBags();
        seedCrossbodyBags();

        System.out.println("✅ Bag category seeding completed!");
    }

    private void seedHandbags() {
        CategoryRequest request = new CategoryRequest();
        request.setName("Handbags");
        request.setDescription("Elegant and stylish handbags for everyday use");
        request.setImageUrl("https://images.unsplash.com/photo-1618354691228-3f3c3a9f2f3e?w=500");
        categoryService.createCategory(request);
        System.out.println("✅ Created: Handbags");
    }

    private void seedBackpacks() {
        CategoryRequest request = new CategoryRequest();
        request.setName("Backpacks");
        request.setDescription("Durable backpacks for travel, school, and work");
        request.setImageUrl("https://images.unsplash.com/photo-1598032893363-9f5c3f9b9f3e?w=500");
        categoryService.createCategory(request);
        System.out.println("✅ Created: Backpacks");
    }

    private void seedWallets() {
        CategoryRequest request = new CategoryRequest();
        request.setName("Wallets");
        request.setDescription("Compact wallets for cards, cash, and coins");
        request.setImageUrl("https://images.unsplash.com/photo-1600180758890-3f3c3a9f2f3e?w=500");
        categoryService.createCategory(request);
        System.out.println("✅ Created: Wallets");
    }

    private void seedToteBags() {
        CategoryRequest request = new CategoryRequest();
        request.setName("Tote Bags");
        request.setDescription("Spacious tote bags for shopping and casual outings");
        request.setImageUrl("https://images.unsplash.com/photo-1618354691228-3f3c3a9f2f3e?w=500");
        categoryService.createCategory(request);
        System.out.println("✅ Created: Tote Bags");
    }

    private void seedCrossbodyBags() {
        CategoryRequest request = new CategoryRequest();
        request.setName("Crossbody Bags");
        request.setDescription("Convenient crossbody bags for hands-free style");
        request.setImageUrl("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500");
        categoryService.createCategory(request);
        System.out.println("✅ Created: Crossbody Bags");
    }
}
