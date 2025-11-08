package bag.service.order;

import bag.modal.dto.OrderDto;
import bag.modal.request.OrderRequest;
import bag.repository.CartRepository;
import bag.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    public OrderServiceImpl(OrderRepository orderRepository, CartRepository cartRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    @Override
    public List<OrderDto> getOrders() {
        return null;
    }

    @Override
    public OrderDto getOrderById(int id) {
        return null;
    }

    @Override
    public OrderDto createOrder(OrderRequest request) {
        return null;
    }

    @Override
    public OrderDto updateOrder(OrderRequest request, int id) {
        return null;
    }

    @Override
    public void deleteOrder(int id) {

    }
}
