package bag.modal.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import lombok.Data;
import net.minidev.json.annotate.JsonIgnore;

@Entity
@Data
@Table

public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    @JsonBackReference
    private Product product;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    @JsonBackReference
    private ProductVariant productVariant;

    @Column
    private String imageUrl;

    @Column
    private String alt;

    @Column
    private boolean isMain;


}