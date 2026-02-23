package bag.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Replace domains below with your actual frontend hosting domains (no trailing slash)
        registry.addMapping("/**")
            .allowedOrigins(
                "https://bagshop-23df6.web.app",
                "https://bagshop-23df6.firebaseapp.com",
                "http://localhost:5173"
            )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true);
    }
}
