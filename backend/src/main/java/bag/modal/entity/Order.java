package bag.modal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

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

    //@ManyToOne mặc định là EAGER
    //Nếu trong thực tế bạn chỉ hiển thị đơn hàng mà không cần voucher chi tiết -> dung LAZY
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;

    @Column
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    public enum OrderStatus {
        SUCCESS, WAITING
    }
}
