package com.example.Backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@Service
public class AiService {

    @Autowired
    private RestTemplate restTemplate;

    public Map<String, Object> predictTaskDuration(String description) {
        String url = "http://127.0.0.1:5000/predictDuration";  // or use your IP if needed

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("description", description);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
        Map<String, Object> response = restTemplate.postForObject(url, requestEntity, Map.class);
        return response;
    }
}