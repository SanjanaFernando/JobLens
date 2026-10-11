package lk.joblens.shared.controller;

import lk.joblens.config.GeminiProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HealthController {

    private final GeminiProperties geminiProperties;

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "JobLens API",
            "aiModelConfigured", geminiProperties.getModel(),
            "hasGeminiKey", geminiProperties.getApiKey() != null && !geminiProperties.getApiKey().isBlank(),
            "timestamp", Instant.now().toString()
        ));
    }
}
