package bag.modal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "address")
@EqualsAndHashCode(callSuper = true)
public class Address extends Time {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String addressLine;

    @Column
    private String ward;

    @Column(nullable = false)
    private String district;

    @Column(nullable = false)
    private String city;

    @Column
    private String postalCode;

    @Column(nullable = false)
    private boolean isDefault = false; // Địa chỉ mặc định

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AddressType type = AddressType.HOME;

    public enum AddressType {
        HOME,    // Nhà riêng
        OFFICE,  // Văn phòng
        OTHER    // Khác
    }
}

