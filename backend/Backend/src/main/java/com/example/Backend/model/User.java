package com.example.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true,nullable = false)
    private String username;

    @Column
    private String password;

    private String theme;
    private String defaultView;
    private boolean notification;

    //Constructors
    public User(){

    }
    public User(String username, String password) {
        this.username = username;
        this.password = password;

        this.theme = "ligiht";
        this.defaultView = "grid";
        this.notification = true;
    }

    //Getters and setters
    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public  String getUsername(){
        return username;
    }
    public void setUsername(String username){
        this.username = username;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public String getTheme() {
        return theme;
    }
    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getDefaultView() {
        return defaultView;
    }
    public void setDefaultView(String defaultView) {
        this.defaultView = defaultView;
    }

    public boolean isNotifications() {
        return notification;
    }
    public void setNotifications(boolean notification) {
        this.notification = notification;
    }
}
