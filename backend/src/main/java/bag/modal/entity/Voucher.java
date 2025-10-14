package bag.modal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Data
@Table
@EqualsAndHashCode(callSuper=true)
public class Voucher extends Time{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String code;

    @Column
    private String description;

    @Column
    @Enumerated(EnumType.STRING)
    private typeDiscount type;

    @Column
    private String value;

    @Column
    private LocalDateTime startDate;

    @Column
    private LocalDateTime endDate;

    @Column
    private int quantity;

    @Column
    @Enumerated(EnumType.STRING)
    private VoucherStatus status;


    public enum typeDiscount {
        PERCENTAGE,
        FIXED_AMOUNT,
        FREE_SHIPPING
    }

    public enum VoucherStatus {
        ACTIVE, INACTIVE, EXPIRED
    }
}
