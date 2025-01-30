//package com.example.Backend.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.MediaType;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.net.http.HttpHeaders;
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class AiService {
//
//    @Autowired
//    private RestTemplate restTemplate;
//
//    public Map<String, Object> predictTaskDuration(String description) {
//        String url = "http://localhost:5000/predictDuration";
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        Map<String, String> requestBody = new HashMap<>();
//        requestBody.put("description", description);
//
//        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
//
//        Map<String, Object> response = restTemplate.postForObject(url, requestEntity, Map.class);
//        return response;
//    }
//}
