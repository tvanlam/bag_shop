package bag.modal.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "oder_details")
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn
    private Order order;

    @ManyToOne
    @JoinColumn
    private Product product;

    @Column
    private int quantity;

    @Column
    private double price;

    @Column
    private double totalPrice;
}
