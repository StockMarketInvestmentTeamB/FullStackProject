package com.example.MongoSpring.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AlphaVantageConfig {

    @Value("${alpha.vantage.api.key}")
    private static String apiKey;
    
        @Bean
        public RestTemplate restTemplate() {
            return new RestTemplate();
        }
    
        public static String getApiKey() {
            return apiKey;
    }
}