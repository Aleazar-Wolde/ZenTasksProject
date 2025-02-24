package com.example.Backend.controller;

import com.example.Backend.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3001")  // Allow your React app to access this endpoint
@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/predict")
    public Map<String, Object> predict(@RequestBody Map<String, String> taskData) {
        String description = taskData.get("description");
        return aiService.predictTaskDuration(description);
    }
}