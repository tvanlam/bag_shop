package bag.modal.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(unique = true, nullable = true)
    private String sku; // tự generate: productId + colorCode + size

    @Column
    private String color;

    @Column
    private String colorCode; // "#B22222" → dùng cho hiển thị swatch

    @Column
    private String size;

    @Column
    private String imageUrl;// ảnh variant riêng

    @Column
    private double price;

    @Column
    private int stockQuantity;


}
