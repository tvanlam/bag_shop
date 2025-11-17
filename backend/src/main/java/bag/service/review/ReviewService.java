package bag.service.review;

import bag.modal.dto.ReviewDto;
import bag.modal.request.ReviewRequest;

import java.util.List;

public interface ReviewService {
    List<ReviewDto> getAll();

    ReviewDto findReviewById(int id);
    List<ReviewDto> getReviewByDate(String date);

    ReviewDto createReview(ReviewRequest request);

    ReviewDto updateReview(ReviewRequest request, int id);

    void deleteReview(int id);
}
