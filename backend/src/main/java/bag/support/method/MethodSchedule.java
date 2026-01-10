package bag.support.method;

import bag.modal.entity.Account;
import bag.modal.entity.Order;
import bag.repository.AccountRepository;
import bag.repository.OrderRepository;
import org.springframework.transaction.annotation.Transactional;

public class MethodSchedule {
    private final OrderRepository orderRepository;
    private final AccountRepository accountRepository;

    public MethodSchedule(OrderRepository orderRepository, AccountRepository accountRepository) {
        this.orderRepository = orderRepository;
        this.accountRepository = accountRepository;
    }

    @Transactional
    public void addPointAfterPayment (int orderId){
        try {
            Order order = orderRepository.findById(orderId).orElseThrow(
                    () -> new RuntimeException("Order not found!")
            );
            Account account = accountRepository.findById(order.getAccount().getId()).orElseThrow(
                    () -> new RuntimeException("Account not found!")
            );
            account.setPoint(order.getTotalPrice()/1000);
            accountRepository.save(account);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
