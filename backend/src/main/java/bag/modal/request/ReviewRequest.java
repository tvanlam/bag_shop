package bag.modal.request;

import bag.modal.entity.Review;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class ReviewRequest {
    private int productId;
    private int accountId;
    @Min(value = 1) @Max(value = 5)
    private int rating;
    private String comment;
    public void setReview(Review review){
        review.setRating(rating);
        review.setComment(comment);

    }
}
