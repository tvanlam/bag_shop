package bag.service.order;

import bag.modal.dto.OrderDto;
import bag.modal.entity.Account;
import bag.modal.entity.CartItem;
import bag.modal.entity.Order;

import bag.modal.entity.Voucher;
import bag.modal.request.OrderRequest;
import bag.repository.AccountRepository;

import bag.repository.CartItemRepository;
import bag.repository.OrderRepository;
import bag.repository.VoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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

    @Override
    public List<OrderDto> getOrders() {
        return orderRepository.findAll().stream()
                .map(OrderDto::new).collect(Collectors.toList());
    }

    @Override
    public OrderDto getOrderById(int id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return new OrderDto(order);
    }

    @Transactional
    @Override
    public OrderDto createOrder(OrderRequest request) {
            Account account = accountRepository.findById(request.getAccount())
                    .orElseThrow(() -> new RuntimeException("Account not found with id " + request.getAccount()));
            Voucher voucher = voucherRepository.findById(request.getVoucher())
                    .orElseThrow(() -> new RuntimeException("Voucher not found with id " + request.getVoucher()));
//            CartItem cartItem = cartItemRepository.findById(request.get)
//                    .orElseThrow(() -> new RuntimeException("Item not found"));
            Order order = new Order();

            order.setAccount(account);
            order.setVoucher(voucher);
            orderRepository.save(order);
            return new OrderDto(order);
    }

    @Transactional
    @Override
    public OrderDto updateOrder(OrderRequest request, int id) {
            Order order = orderRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            Account account = accountRepository.findById(request.getAccount())
                    .orElseThrow(() -> new RuntimeException("Account not found with id " + request.getAccount()));
            Voucher voucher = voucherRepository.findById(request.getVoucher())
                    .orElseThrow(() -> new RuntimeException("Voucher not found with id " + request.getVoucher()));
            order.setAccount(account);
            order.setVoucher(voucher);
            orderRepository.save(order);
            return new OrderDto(order);
    }

    @Override
    public void deleteOrder(int id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        orderRepository.delete(order);
    }
}
