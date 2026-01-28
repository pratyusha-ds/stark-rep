package com.gymtracker.backend;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "http://localhost:3000") 
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    // GET: http://localhost:8080/api/workouts
    @GetMapping
    public List<Workout> getAll() {
        return workoutService.getAllWorkouts();
    }

    // POST: http://localhost:8080/api/workouts
    @PostMapping
    public Workout create(@Valid @RequestBody Workout workout) {
        return workoutService.saveWorkout(workout);
    }
}