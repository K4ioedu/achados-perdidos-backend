package trabalho_web.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Libera para todas as rotas da API
                .allowedOrigins("*") // Libera para QUALQUER site (Front-end) acessar
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}