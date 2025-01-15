package com.example.Backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status; // TODO, IN_PROGRESS, DONE
    private Date dueDate;

    // Getters and Setters

    // the getter and setter of title
    public String getTitle(){
        return  title;
    }
    public void setTitle(String title){
        this.title = title;
    }

    // getter and setter of description
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }

    // getter and setter of status
    public String getStatus(){
        return status;
    }
    public void setStatus(String status){
        this.status = status;
    }

    // getter and setter of dueDate
    public Date getDueDate(){
        return dueDate;
    }
    public void setDueDate(Date dueDate){
        this.dueDate = dueDate;
    }


}