package bag.service.productDetails;


import bag.modal.dto.OrderDetailsDto;

import java.util.List;

public interface OrderDetailsService {
    List<OrderDetailsDto> getODs();

    OrderDetailsDto getODsById(int id);

    List<OrderDetailsDto> findByProductId(int productId);

    List<OrderDetailsDto> findByOrderId(int orderId);
}
