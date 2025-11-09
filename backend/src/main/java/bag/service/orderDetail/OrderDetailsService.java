package bag.service.orderDetail;

import bag.modal.dto.OrderDetailsDto;
import bag.modal.request.OrderDetailsRequest;

import java.util.List;

public interface OrderDetailsService {
    List<OrderDetailsDto> getOrderDetails();

    OrderDetailsDto getOrderDetailsById(int OTid);

    OrderDetailsDto createOrderDetails(OrderDetailsRequest request);

    OrderDetailsDto updateOrderDetails(OrderDetailsRequest request, int OTid);

    void deleteOrderDetails(int OTid);
}
