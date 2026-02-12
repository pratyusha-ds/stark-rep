package com.gymtracker.backend.config;

import com.gymtracker.backend.categories.Category;
import com.gymtracker.backend.categories.CategoryRepository;
import com.gymtracker.backend.exercises.Exercise;
import com.gymtracker.backend.exercises.ExerciseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ExerciseRepository exerciseRepository;

    public DatabaseSeeder(CategoryRepository categoryRepository, ExerciseRepository exerciseRepository) {
        this.categoryRepository = categoryRepository;
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {

            Category chest = new Category();
            chest.setName("Chest");

            Category legs = new Category();
            legs.setName("Legs");

            categoryRepository.saveAll(Arrays.asList(chest, legs));

            Exercise benchPress = new Exercise();
            benchPress.setName("Bench Press");
            benchPress.setCategory(chest);
            chest.getExercises().add(benchPress);

            Exercise flys = new Exercise();
            flys.setName("Chest Flys");
            flys.setCategory(chest);
            chest.getExercises().add(flys);

            Exercise squats = new Exercise();
            squats.setName("Squats");
            squats.setCategory(legs);
            legs.getExercises().add(squats);

            exerciseRepository.saveAll(Arrays.asList(benchPress, flys, squats));

            System.out.println("Database seeded with initial Categories and Exercises.");
        }
    }
}