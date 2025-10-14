package bag.modal.request;

import lombok.Data;

@Data
public class MailRequest {
    private String from;
    private String subject;
    private String body;
    private String file;
}
