package bag.controller;

import bag.modal.dto.OrderDto;
import bag.modal.entity.Order;
import bag.modal.request.OrderRequest;
import bag.service.order.OrderService;
import bag.service.paymentService.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final VNPayService vnpayService;

    @Value("${vnp.returnUrl}")
    private String defaultReturnUrl;
    @GetMapping
    public ResponseEntity<?> getOrders(){
        try{
            return ResponseEntity.ok(orderService.getOrders());
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") int id){
        try{
            return ResponseEntity.ok(orderService.getOrderById(id));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request, HttpServletRequest httpRequest){
        try{
            OrderDto orderDto = orderService.createOrder(request);

            // Nếu phương thức thanh toán là VNPAY, tạo URL thanh toán
            if (Order.paymentMethod.VNPAY.equals(request.getPaymentMethod())) {
                String paymentUrl = vnpayService.createOrder(
                        (int) orderDto.getTotalPrice(),
                        "Order #" + orderDto.getId(),
                        defaultReturnUrl,
                        httpRequest
                );
                orderDto.setPaymentUrl(paymentUrl);
            }

            return ResponseEntity.ok(orderDto);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateOrder(@RequestBody OrderRequest request, @PathVariable int id){
        try{
            return ResponseEntity.ok(orderService.updateOrder(request,id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable int id){
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
