package com.fittrack.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "training_sheets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingSheet {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    private String goal;
    private String duration;
    
    @OneToMany(mappedBy = "trainingSheet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Exercise> exercises = new ArrayList<>();
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    
    @ElementCollection
    @CollectionTable(name = "training_sheet_assignments", joinColumns = @JoinColumn(name = "training_sheet_id"))
    @Column(name = "client_id")
    private List<String> assignedTo = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public void addExercise(Exercise exercise) {
        exercises.add(exercise);
        exercise.setTrainingSheet(this);
    }
    
    public void removeExercise(Exercise exercise) {
        exercises.remove(exercise);
        exercise.setTrainingSheet(null);
    }
}