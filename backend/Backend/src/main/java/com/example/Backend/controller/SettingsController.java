// backend/src/main/java/com/example/Backend/controller/SettingsController.java
package com.example.Backend.controller;

import com.example.Backend.model.User;
import com.example.Backend.model.UserSettings;
import com.example.Backend.repository.UserSettingsRepository;
import com.example.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "http://localhost:3000")
public class SettingsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @GetMapping
    public UserSettings getSettings(Authentication auth) {
        String username = auth.getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        // findByUser is optional; or findOne if your user_id is unique
        return userSettingsRepository
                .findById(user.getId())
                .orElseGet(() -> {
                    // create default settings if none
                    UserSettings settings = new UserSettings(user, "light", "grid", true);
                    return userSettingsRepository.save(settings);
                });
    }

    @PutMapping
    public UserSettings updateSettings(Authentication auth, @RequestBody UserSettings newSettings) {
        String username = auth.getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        // load existing settings or create new
        UserSettings settings = userSettingsRepository
                .findById(user.getId())
                .orElse(new UserSettings(user, "light", "grid", true));

        // update fields
        settings.getClass(newSettings.getTheme());
        settings.setDefaultView(newSettings.getDefaultView());
        settings.setNotifications(newSettings.isNotifications());

        // save
        return userSettingsRepository.save(settings);
    }
}
