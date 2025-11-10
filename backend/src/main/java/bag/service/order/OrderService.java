package bag.service.order;

import bag.modal.dto.OrderDto;
import bag.modal.entity.Order;
import bag.modal.request.OrderRequest;

import java.util.List;

public interface OrderService {
    List<OrderDto> getOrders();

    OrderDto getOrderById(int id);

    OrderDto createOrder(OrderRequest request);

    OrderDto updateOrder(OrderRequest request, int id);

//    OrderDto updateStatusOrder(int id);

    void deleteOrder(int id);
}
