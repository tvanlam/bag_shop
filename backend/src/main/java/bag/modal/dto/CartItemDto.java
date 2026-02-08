package bag.modal.dto;

import bag.modal.entity.CartItem;
import lombok.Data;

@Data
public class CartItemDto {
    private int itemId;
    private Integer productId;
    private int productVariantId;
    private String productName;
    private String color;
    private String size;
    private String sku;
    private String thumbnail;
    private int quantity;
    private double priceAtAdd;
    private double subTotal;

    public CartItemDto(CartItem cartItem){
        this.itemId = cartItem.getId();
        this.productId = cartItem.getProduct().getId();
        this.productVariantId = cartItem.getProductVariant().getId();
        this.productName = cartItem.getProduct().getName();
        this.color = cartItem.getProductVariant().getColor();
        this.size = cartItem.getProductVariant().getSize();;
        this.sku = cartItem.getProductVariant().getSku();
//        this.thumbnail = cartItem.getProduct().getImages() != null ? cartItem.getProduct().getImages().get(0).getImageUrl() : null;
        this.quantity = cartItem.getQuantity();
        this.priceAtAdd = cartItem.getPriceAtAdd();
        this.subTotal = cartItem.getQuantity() * cartItem.getPriceAtAdd();
    }
}
