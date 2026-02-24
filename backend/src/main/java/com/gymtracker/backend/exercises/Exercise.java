package com.gymtracker.backend.exercises;

import com.gymtracker.backend.categories.Category;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Objects;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = { "name", "category_id" })
})
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Exercise exercise = (Exercise) o;
        return Objects.equals(id, exercise.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}