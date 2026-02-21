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
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    //@ManyToOne mặc định là EAGER
    //Nếu trong thực tế bạn chỉ hiển thị đơn hàng mà không cần voucher chi tiết -> dung LAZY
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<OrderDetails> orderDetails = new ArrayList<>();

    @Column(name="sub_total")
    private double subTotal;

    @Column(name = "discount_amount")
    private double discountAmount;

    @Column(name = "total_price")
    private double totalPrice;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    public enum paymentMethod{
        COD, VNPAY,MOMO,ZALOPAY,BANK_TRANSFER,CREDIT_CARD;
    }

    public enum OrderStatus {
        CONFIRMED,PENDING, SUCCESS,CANCELLED,REFUNDED;
    }

    public enum PaymentStatus{
        UNPAID, PENDING, PAID, FAILED, REFUNDED;
    }



}
