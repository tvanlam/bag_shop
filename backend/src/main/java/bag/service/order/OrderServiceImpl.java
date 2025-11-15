package bag.service.order;

import bag.modal.dto.OrderDetailsDto;
import bag.modal.dto.OrderDto;
import bag.modal.entity.*;

import bag.modal.request.OrderRequest;
import bag.repository.AccountRepository;

import bag.repository.CartItemRepository;
import bag.repository.OrderRepository;
import bag.repository.VoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;
    private final VoucherRepository voucherRepository;
    private final AccountRepository accountRepository;
    private final CartItemRepository cartItemRepository;

    public OrderServiceImpl(OrderRepository orderRepository, VoucherRepository voucherRepository, AccountRepository accountRepository, CartItemRepository cartItemRepository) {
        this.orderRepository = orderRepository;
        this.voucherRepository = voucherRepository;
        this.accountRepository = accountRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Transactional
    @Override
    public List<OrderDto> getOrders() {
        return orderRepository.findAll().stream()
                .map(OrderDto::new).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public OrderDto getOrderById(int id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return new OrderDto(order);
    }

    @Transactional
    @Override
    public OrderDto createOrder(OrderRequest request) {
            Account account = accountRepository.findById(request.getAccountId())
                    .orElseThrow(() -> new RuntimeException("Account not found with id " + request.getAccountId()));
            Voucher voucher = voucherRepository.findById(request.getVoucherId())
                    .orElseThrow(() -> new RuntimeException("Voucher not found with id " + request.getVoucherId()));
        // 3. Lấy CartItems của user (chưa có order)
        List<CartItem> cartItems = cartItemRepository.findByCartAccountAndOrderIsNull(account);
        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("Giỏ hàng trống");
        }
        // 4. Tạo Order
            Order order = new Order();
            order.setAccount(account);
            order.setVoucher(voucher);
            order.setStatus(Order.OrderStatus.PENDING);
        // 5. CHUYỂN CartItem → OrderDetails
            List<OrderDetails> orderDetails = convertCartItemsToOrderDetails(cartItems, order);
            order.setOrderDetails(orderDetails);
        // 6. TÍNH GIÁ
            OrderPrice price = calculateOrderPrice(orderDetails, voucher);
            order.setSubTotal(price.subTotal);
        order.setDiscountAmount(price.discountAmount());
        order.setTotalPrice(price.totalPrice());
            orderRepository.save(order);
            cartItemRepository.deleteAll(cartItems);
            return new OrderDto(order);
    }

    @Transactional
    @Override
    public OrderDto updateOrder(OrderRequest request, int id) {
            Order order = orderRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            Account account = accountRepository.findById(request.getAccountId())
                    .orElseThrow(() -> new RuntimeException("Account not found with id " + request.getAccountId()));
            Voucher voucher = voucherRepository.findById(request.getVoucherId())
                    .orElseThrow(() -> new RuntimeException("Voucher not found with id " + request.getVoucherId()));
            order.setAccount(account);
            order.setVoucher(voucher);
            orderRepository.save(order);
            return new OrderDto(order);
    }

    @Override
    public OrderDto updateStatusOrder(int id) {

        return null;
    }

    @Override
    public void deleteOrder(int id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        orderRepository.delete(order);
    }

    // PRIVATE METHODS
    private List<OrderDetails> convertCartItemsToOrderDetails(List<CartItem> cartItems, Order order) {
        return cartItems.stream()
                .map(cartItem -> {
                    OrderDetails detail = new OrderDetails();
                    detail.setOrder(order);
                    detail.setProduct(cartItem.getProduct());
                    detail.setQuantity(cartItem.getQuantity());
                    detail.setPriceAtAdd(cartItem.getPriceAtAdd());
                    return detail;
                })
                .collect(Collectors.toList());
    }

    private OrderPrice calculateOrderPrice(List<OrderDetails> details, Voucher voucher) {
        double subTotal = details.stream().mapToDouble(d -> d.getPriceAtAdd() * d.getQuantity())
                .sum();
        double discount = calculateDiscountAmount(subTotal,voucher);
        double totalPrice = subTotal - discount;
        return new OrderPrice(Math.round(subTotal * 100.0) / 100.0,
                Math.round(discount * 100.0) / 100.0,
                Math.round(totalPrice * 100.0) / 100.0);
    }

    private double calculateDiscountAmount(double subtotal, Voucher voucher) {
        if (voucher == null || !voucher.isActive()) {
            return 0.0;
        }
        return switch (voucher.getTypeDiscount()) {
            case PERCENT -> {
                double amount = subtotal * (voucher.getDiscountValue() / 100.0);
                if (voucher.getMaxDiscount() > 0) {
                    amount = Math.min(amount, voucher.getMaxDiscount());
                }
                yield amount;
            }
            case FIXED_AMOUNT -> voucher.getDiscountValue();
            case FREE_SHIP -> 0.0; // xử lý riêng ở shipping
        };
    }

    private record OrderPrice(double subTotal, double discountAmount, double totalPrice){}
}
