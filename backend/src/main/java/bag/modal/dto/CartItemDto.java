package bag.modal.dto;

import bag.modal.entity.CartItem;
import lombok.Data;

@Data
public class CartItemDto {
    private int id;
    private int productId;
    private String productName;
    private String productDescription;
    private String thumbnail;
    private int quantity;
    private double priceAtAdd;
    private double subTotal;

    public CartItemDto(CartItem cartItem){
        this.id = cartItem.getId();
        this.productId = cartItem.getProduct().getId();
        this.productName = cartItem.getProduct().getName();
        this.productDescription = cartItem.getProduct().getDescription();
        this.thumbnail = cartItem.getProduct().getImages() != null ? cartItem.getProduct().getImages().get(0).getImageUrl() : null;
        this.quantity = cartItem.getQuantity();
        this.priceAtAdd = cartItem.getPriceAtAdd();
        this.subTotal = cartItem.getQuantity() * cartItem.getPriceAtAdd();
    }
}
