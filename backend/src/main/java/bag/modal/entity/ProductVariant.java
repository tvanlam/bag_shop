package bag.modal.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

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

    @JsonManagedReference
    @OneToMany(mappedBy = "productVariant", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ProductImage> images = new ArrayList<>();

    @Column
    private Double price;

    @Column
    private Integer stockQuantity;


}
