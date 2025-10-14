package bag.modal.dto;

import bag.modal.entity.Account;
import bag.modal.entity.Review;
import lombok.Data;

@Data
public class ReviewDto {
    private int id;
    private int accountId;
    private int productId;
    private String comment;
    private int rating;
    public ReviewDto(Review review){
        this.id = review.getId();
        this.comment = review.getComment();
        this.rating = review.getRating();
        this.accountId = review.getAccount().getId();
        this.productId = review.getProduct().getId();

    }
}
