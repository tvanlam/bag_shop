package bag.service.point;

import bag.modal.entity.Account;
import bag.modal.entity.Order;
import bag.repository.AccountRepository;
import bag.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class PointService {
    private final OrderRepository orderRepository;
    private final AccountRepository accountRepository;

    public PointService(OrderRepository orderRepository, AccountRepository accountRepository) {
        this.orderRepository = orderRepository;
        this.accountRepository = accountRepository;
    }

    @Transactional
    public void addPointAfterPayment(int orderId){
         Order order = orderRepository.findById(orderId)
                 .orElseThrow(() -> new RuntimeException("Order not found " +orderId));
         Account account = accountRepository.findById(order.getAccount().getId())
                 .orElseThrow(() -> new IllegalArgumentException("Account not fount for order " + orderId));
         double pointsToAdd = order.getTotalPrice() / 1000;
         account.setPoint(account.getPoint() + pointsToAdd);
         accountRepository.save(account);

    }
}
