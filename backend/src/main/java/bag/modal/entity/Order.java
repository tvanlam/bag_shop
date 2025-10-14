package bag.modal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@Table(name = "orders")
@EqualsAndHashCode(callSuper=true)
public class Order extends Time{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private double price;

    @OneToOne
    @JoinColumn
    private Account account;

    @ManyToOne
    @JoinColumn
    private Voucher voucher;

    @Column
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    public enum OrderStatus {
        SUCCESS, WAITING
    }
}
