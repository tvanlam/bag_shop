package bag.service.review;

import bag.modal.dto.ReviewDto;
import bag.modal.entity.Account;
import bag.modal.entity.Product;
import bag.modal.entity.Review;
import bag.modal.request.ReviewRequest;
import bag.repository.AccountRepository;
import bag.repository.ProductRepository;
import bag.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;
    private final AccountRepository accountRepository;
    private final ProductRepository productRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository, AccountRepository accountRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.accountRepository = accountRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<ReviewDto> getAll() {
        return reviewRepository.findAll().stream().map(ReviewDto::new).collect(Collectors.toList());
    }

    @Override
    public ReviewDto findReviewById(int id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));

        return new ReviewDto(review);
    }

    @Override
    public List<ReviewDto> getReviewByDate(String date) {
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        LocalDateTime startOfDay = localDate.atStartOfDay();              // 00:00:00
        LocalDateTime endOfDay = localDate.atTime(23, 59, 59);            // 23:59:59
        List<Review> reviews = reviewRepository.findByDate(startOfDay, endOfDay);
        return reviews.stream()
                .map(ReviewDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public ReviewDto createReview(ReviewRequest request) {
        try {
            Account account = accountRepository.findById(request.getAccountId())
                    .orElseThrow(() -> new RuntimeException(request.getAccountId() + "not found"));
            Product product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException(request.getProductId() + "not found"));
            Review review = new Review();
            request.setReview(review);
            review.setAccount(account);
            review.setProduct(product);
            reviewRepository.save(review);
            return new ReviewDto(review);
        }catch(Exception e){
            throw new RuntimeException("Create failed");
        }
        }


    @Override
    public ReviewDto updateReview(ReviewRequest request, int id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
        try{
            request.setReview(review);
            reviewRepository.save(review);
            return new ReviewDto(review);
        }catch (Exception e){
            throw new RuntimeException("Update failed");
        }
    }

    @Override
    public void deleteReview(int id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        reviewRepository.delete(review);
    }
}
