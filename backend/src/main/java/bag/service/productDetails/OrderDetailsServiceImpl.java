package bag.service.productDetails;

import bag.modal.dto.OrderDetailsDto;
import bag.modal.entity.OrderDetails;
import bag.repository.OrderDetailsRepository;
import bag.repository.OrderRepository;
import bag.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailsServiceImpl implements OrderDetailsService {
    private final OrderRepository orderRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final ProductRepository productRepository;

    public OrderDetailsServiceImpl(OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.productRepository = productRepository;
    }


    @Override
    public List<OrderDetailsDto> getODs() {
        return orderDetailsRepository.findAll().stream().map(OrderDetailsDto::new).collect(Collectors.toList());
    }

    @Override
    public OrderDetailsDto getODsById(int id) {
        OrderDetails orderDetails = orderDetailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order item not found"));
        return new OrderDetailsDto(orderDetails);
    }

    @Override
    public List<OrderDetailsDto> findByProductId(int productId) {
        List<OrderDetails> orderDetails = orderDetailsRepository.findByProductId(productId);
        return orderDetails.stream()
                .map(OrderDetailsDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDetailsDto> findByOrderId(int orderId) {
        List<OrderDetails> orderDetails = orderDetailsRepository.findByOrderId(orderId);
        return orderDetails.stream()
                .map(OrderDetailsDto::new)
                .collect(Collectors.toList());

    }
}
