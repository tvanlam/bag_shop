package bag.modal.request;

import lombok.Data;

@Data
public class VNPayRequest {
    private long total;
    private String orderId;
    private String returnUrl;
}
