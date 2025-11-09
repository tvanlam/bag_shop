package bag.service.orderDetail;

import bag.modal.dto.OrderDetailsDto;
import bag.modal.entity.OrderDetails;
import bag.modal.request.OrderDetailsRequest;
import bag.repository.OrderDetailsRepository;
import bag.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailsServiceImpl implements OrderDetailsService {
    private final OrderDetailsRepository orderDetailsRepository;
    private final ProductRepository productRepository;

    public OrderDetailsServiceImpl(OrderDetailsRepository orderDetailsRepository, ProductRepository productRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<OrderDetailsDto> getOrderDetails() {
        return orderDetailsRepository.findAll().stream()
                .map(OrderDetailsDto::new).collect(Collectors.toList());
    }

    @Override
    public OrderDetailsDto getOrderDetailsById(int OTid) {
        OrderDetails orderDetails = orderDetailsRepository.findById(OTid)
                .orElseThrow(() -> new RuntimeException("OrderDetails not found"));
        return new OrderDetailsDto(orderDetails);
    }
    @Override
    public OrderDetailsDto createOrderDetails(OrderDetailsRequest request) {
        OrderDetails orderDetails = new OrderDetails();

        return null;
    }

    @Override
    public OrderDetailsDto updateOrderDetails(OrderDetailsRequest request, int OTid) {
        return null;
    }

    @Override
    public void deleteOrderDetails(int OTid) {

    }
}
