package com.gymtracker.backend;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "workouts")
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Workout name is required")
    private String name;

    @Min(value = 1, message = "Reps must be at least 1")
    private int reps;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Workout() {}

    public Long getId() { return id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public int getReps() { return reps; }
    public void setReps(int reps) { this.reps = reps; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}