package com.example.Backend.repository;

import com.example.Backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // CRUD methods are provided by JpaRepository
}
