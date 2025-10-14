package bag.modal.request;

import lombok.Data;

@Data
public class VerifiedRequest {
    private String email;
    private String otp;
    private String action;
}
