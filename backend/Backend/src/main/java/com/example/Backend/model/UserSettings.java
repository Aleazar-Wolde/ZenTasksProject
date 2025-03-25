// backend/src/main/java/com/example/Backend/model/UserSettings.java
package com.example.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_settings")
public class UserSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // One-to-one with a user
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    private String theme;         // "light" or "dark"
    private String defaultView;   // "grid", "kanban", or "charts"
    private boolean notifications; // true/false

    // Constructors
    public UserSettings() {}
    public UserSettings(User user, String theme, String defaultView, boolean notifications) {
        this.user = user;
        this.theme = theme;
        this.defaultView = defaultView;
        this.notifications = notifications;
    }

    public Object getTheme() {
        return null;
    }
}
