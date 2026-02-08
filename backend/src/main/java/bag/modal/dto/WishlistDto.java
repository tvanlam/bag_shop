package bag.modal.dto;

import lombok.Data;

import java.util.List;

@Data
public class WishlistDto {
    private int id;
    private int accountId;
    private List<WishlistItemDto> items;
}
