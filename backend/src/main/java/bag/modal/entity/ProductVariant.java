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
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(unique = true, nullable = true)
    private String sku; // tự generate: productId + colorCode + size

    @Column(nullable = true)
    private String color;

    @Column
    private String colorCode; // "#B22222" → dùng cho hiển thị swatch

    @Column(nullable = true)
    private String size;

    @Column
    private String imageUrl;// ảnh variant riêng

    @Column
    private Double price;

    @Column
    private int stockQuantity;


}
