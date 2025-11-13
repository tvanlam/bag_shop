package bag.modal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table
@EqualsAndHashCode(callSuper=true)
public class Voucher extends Time{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String code; // GIAM50K, FREESHIP, SALE10

    @Column
    private String description;

    @Column
    @Enumerated(EnumType.STRING)
    private TypeDiscount typeDiscount;

    @Column
    private double discountValue; // 100.000, 50.000

    @Column
    private double maxDiscount; // Toi da giam theo %(VD:200000)

    @Column
    private LocalDateTime startDate;

    @Column
    private LocalDateTime endDate;

    @Column
    private int quantity;

    @OneToMany(mappedBy = "voucher", fetch = FetchType.LAZY)
    private List<Order> orders;

    @Column
    @Enumerated(EnumType.STRING)
    private VoucherStatus status;

    @Column
    private boolean isActive = true;

    public enum TypeDiscount {
        PERCENT,
        FIXED_AMOUNT,
        FREE_SHIP
    }

    public enum VoucherStatus {
        ACTIVE, INACTIVE, EXPIRED
    }
}
