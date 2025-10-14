package bag.service.mail;

import bag.modal.entity.Account;
import bag.modal.request.MailRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.Year;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.host}")
    private String adminMail;

    private String loadTemplate() {
        ClassPathResource classPathResource = new ClassPathResource("templates/emailTemplate.html");
        try (InputStream inputStream = classPathResource.getInputStream()) {
            return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Không thể load template email", e);
        }
    }

    private String buildHtmlContent(String title, String dynamicContent) {
        String template = loadTemplate();
        return template
                .replace("{{title}}", title)
                .replace("{{content}}", dynamicContent)
                .replace("{{appName}}", "Bag Shop")
                .replace("{{year}}", String.valueOf(Year.now().getValue()));
    }

    private void sendMail(String to, String subject, String htmlContent,
                          String attachmentName, String attachmentContent) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, attachmentContent != null, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        if (attachmentContent != null) {
            byte[] bytes = attachmentContent.getBytes(StandardCharsets.UTF_8);
            ByteArrayResource resource = new ByteArrayResource(bytes);
            helper.addAttachment(attachmentName, resource);
        }

        mailSender.send(mimeMessage);
    }


    @Override
    public void sendVerificationCode(String to, String code, String action) {
        String title = "Xác thực tài khoản";
        String body = "<p>Xin chào,</p><p>Bạn đang thực hiện: <b>" + action + "</b></p>"
                + "<p>Mã xác thực của bạn là: <b style='color:blue;'>" + code + "</b></p>";
        String htmlContent = buildHtmlContent(title, body);

        try {
            sendMail(to, title, htmlContent, null, null);
        } catch (MessagingException e) {
            throw new RuntimeException("Gửi mail xác thực thất bại", e);
        }
    }

    @Override
    public void resendVerificationCode(String to, String code, String action) {
        sendVerificationCode(to, code, action + " (Gửi lại)");
    }

    @Override
    public void userSendToAdmin(MailRequest request) {
        String title = "Phản hồi";
        String content = "<p><b>Email người dùng:</b> " + request.getFrom() + "</p>"
                + "<p><b>Nội dung:</b></p><p>" + request.getBody() + "</p>";
        String htmlContent = buildHtmlContent(title, content);

        try {
            sendMail(adminMail, request.getSubject(), htmlContent,
                    request.getBody() != null ? "attachment.txt" : null,
                    request.getFile());
        } catch (MessagingException e) {
            throw new RuntimeException("Gửi mail đến admin thất bại", e);
        }
    }




}
