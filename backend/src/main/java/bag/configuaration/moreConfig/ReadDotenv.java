package bag.configuaration.moreConfig;

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

        // APP – JWT
        setProp(dotenv, "APP_JWT_ACCESS_SECRET_B64", "app.jwt.access-secret-b64");
        setProp(dotenv, "APP_JWT_REFRESH_SECRET_B64", "app.jwt.refresh-secret-b64");
        setProp(dotenv, "APP_JWT_ACCESS_EXP_SECONDS", "app.jwt.access-exp-seconds");
        setProp(dotenv, "APP_JWT_REFRESH_EXP_SECONDS", "app.jwt.refresh-exp-seconds");

        // APP – Cloudinary
        setProp(dotenv, "APP_CLOUDINARY_NAME", "app.cloudinary.name");
        setProp(dotenv, "APP_CLOUDINARY_KEY", "app.cloudinary.key");
        setProp(dotenv, "APP_CLOUDINARY_SECRET", "app.cloudinary.secret");

        // APP – VNPAY
        setProp(dotenv, "APP_VNPAY_TMN", "app.vnpay.tmn");
        setProp(dotenv, "APP_VNPAY_SECRET", "app.vnpay.secret");
        setProp(dotenv, "APP_VNPAY_URL", "app.vnpay.url");
        setProp(dotenv, "APP_VNPAY_RETURN", "app.vnpay.return");
    }

    private void setProp(Dotenv dotenv, String envKey, String springKey) {
        String val = dotenv.get(envKey);
        if (val != null && !val.isBlank()) {
            System.setProperty(springKey, val);
        }
    }
}
