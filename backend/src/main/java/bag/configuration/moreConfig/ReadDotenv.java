package bag.configuration.moreConfig;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ReadDotenv {

    @PostConstruct
    public void loadEnv() {
        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();

        // SERVER
        setProp(dotenv, "SERVER_PORT", "server.port");

        // DATABASE
        setProp(dotenv, "DB_URL", "spring.datasource.url");
        setProp(dotenv, "DB_USERNAME", "spring.datasource.username");
        setProp(dotenv, "DB_PASSWORD", "spring.datasource.password");
        setProp(dotenv, "SPRING_DATASOURCE_URL", "spring.datasource.url");
        setProp(dotenv, "SPRING_DATASOURCE_USERNAME", "spring.datasource.username");
        setProp(dotenv, "SPRING_DATASOURCE_PASSWORD", "spring.datasource.password");

        // MAIL
        setProp(dotenv, "SPRING_MAIL_HOST", "spring.mail.host");
        setProp(dotenv, "SPRING_MAIL_PORT", "spring.mail.port");
        setProp(dotenv, "SPRING_MAIL_USERNAME", "spring.mail.username");
        setProp(dotenv, "SPRING_MAIL_PASSWORD", "spring.mail.password");

        // REDIS
        setProp(dotenv, "SPRING_DATA_REDIS_HOST", "spring.data.redis.host");
        setProp(dotenv, "SPRING_DATA_REDIS_PORT", "spring.data.redis.port");
        setProp(dotenv, "SPRING_DATA_REDIS_PASSWORD", "spring.data.redis.password");
        setProp(dotenv, "SPRING_DATA_REDIS_TIMEOUT", "spring.data.redis.timeout");
        setProp(dotenv, "SPRING_DATA_REDIS_SSL_ENABLED", "spring.data.redis.ssl.enabled");

        // APP – JWT
        setProp(dotenv, "APP_JWT_ACCESS_TOKEN", "app.jwt.access-token");
        setProp(dotenv, "APP_JWT_REFRESH_TOKEN", "app.jwt.refresh-token");
        setProp(dotenv, "APP_JWT_ACCESS_EXP_SECONDS", "app.jwt.access-exp-seconds");
        setProp(dotenv, "APP_JWT_REFRESH_EXP_SECONDS", "app.jwt.refresh-exp-seconds");

        // GOOGLE OAUTH2
        setProp(dotenv, "GOOGLE_CLIENT_ID", "app.google.client-id");
        setProp(dotenv, "GOOGLE_CLIENT_SECRET", "app.google.client-secret");

        // APP – Cloudinary
        setProp(dotenv, "APP_CLOUDINARY_NAME", "app.cloudinary.name");
        setProp(dotenv, "APP_CLOUDINARY_KEY", "app.cloudinary.key");
        setProp(dotenv, "APP_CLOUDINARY_SECRET", "app.cloudinary.secret");

        // VNPAY
        setProp(dotenv, "VNP_PAY_URL", "vnp.payUrl");
        setProp(dotenv, "VNP_RETURN_URL", "vnp.returnUrl");
        setProp(dotenv, "VNP_TMN_CODE", "vnp.tmnCode");
        setProp(dotenv, "VNP_HASH_SECRET", "vnp.hashSecret");
        setProp(dotenv, "VNP_API_URL", "vnp.apiUrl");
    }

    private void setProp(Dotenv dotenv, String envKey, String springKey) {
        String val = dotenv.get(envKey);
        if (val != null && !val.isBlank()) {
            System.setProperty(springKey, val);
        }
    }
}
