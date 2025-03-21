// backend/src/main/java/com/example/Backend/repository/UserSettingsRepository.java
package com.example.Backend.repository;

import com.example.Backend.model.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
    // maybe a findByUserId if needed
}
