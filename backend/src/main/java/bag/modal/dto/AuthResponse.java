package bag.modal.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private int accountId;
    private String position;

    public AuthResponse(String accessToken, String refreshToken, int accountId, String position) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.accountId = accountId;
        this.position = position;
    }
}
