//package com.example.Backend.controller;
//
//import com.example.Backend.service.AiService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/ai")
//public class AiController {
//
//    @Autowired
//    private AiService aiService;
//
//    @PostMapping("/predict")
//    public Map<String, Object> predict(@RequestBody Map<String, String> taskData) {
//        String description = taskData.get("description");
//        return aiService.predictTaskDuration(description);
//    }
//}
