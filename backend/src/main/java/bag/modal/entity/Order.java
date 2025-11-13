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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    //@ManyToOne mặc định là EAGER
    //Nếu trong thực tế bạn chỉ hiển thị đơn hàng mà không cần voucher chi tiết -> dung LAZY
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetails> orderDetails = new ArrayList<>();

    @Column
    private double subTotal;

    @Column
    private double discountAmount;

    @Column
    private double totalPrice;

    @Column
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    public enum OrderStatus {
        SUCCESS, PENDING,CANCELLED,REFUNDED;
    }

    // Helper: add OrderDetails
    public void addOrderDetail(OrderDetails detail) {
        orderDetails.add(detail);
        detail.setOrder(this);
    }

    // Helper: remove OrderDetails
    public void removeOrderDetail(OrderDetails detail) {
        orderDetails.remove(detail);
        detail.setOrder(null);
    }

}
