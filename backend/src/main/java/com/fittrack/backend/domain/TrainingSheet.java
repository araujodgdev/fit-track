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
    
    /**
     * Gets the ID of the training sheet
     * @return The training sheet ID
     */
    public Long getId() {
        return this.id;
    }
    
    /**
     * Sets the ID of the training sheet
     * @param id The training sheet ID
     */
    public void setId(Long id) {
        this.id = id;
    }
    
    /**
     * Gets the list of assigned clients
     * @return The list of assigned client IDs
     */
    public List<String> getAssignedTo() {
        return this.assignedTo;
    }
    
    /**
     * Sets the list of assigned clients
     * @param assignedTo The list of assigned client IDs
     */
    public void setAssignedTo(List<String> assignedTo) {
        this.assignedTo = assignedTo;
    }
    
    /**
     * Gets the name of the training sheet
     * @return The training sheet name
     */
    public String getName() {
        return this.name;
    }
    
    /**
     * Sets the name of the training sheet
     * @param name The training sheet name
     */
    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * Gets the description of the training sheet
     * @return The training sheet description
     */
    public String getDescription() {
        return this.description;
    }
    
    /**
     * Sets the description of the training sheet
     * @param description The training sheet description
     */
    public void setDescription(String description) {
        this.description = description;
    }
    
    /**
     * Gets the goal of the training sheet
     * @return The training sheet goal
     */
    public String getGoal() {
        return this.goal;
    }
    
    /**
     * Sets the goal of the training sheet
     * @param goal The training sheet goal
     */
    public void setGoal(String goal) {
        this.goal = goal;
    }
    
    /**
     * Gets the duration of the training sheet
     * @return The training sheet duration
     */
    public String getDuration() {
        return this.duration;
    }
    
    /**
     * Sets the duration of the training sheet
     * @param duration The training sheet duration
     */
    public void setDuration(String duration) {
        this.duration = duration;
    }
    
    /**
     * Gets the exercises list
     * @return The list of exercises
     */
    public List<Exercise> getExercises() {
        return this.exercises;
    }
    
    /**
     * Sets the exercises list
     * @param exercises The list of exercises
     */
    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }
    
    /**
     * Gets the creation timestamp
     * @return The creation timestamp
     */
    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }
    
    /**
     * Sets the creation timestamp
     * @param createdAt The creation timestamp
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    /**
     * Gets the update timestamp
     * @return The update timestamp
     */
    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }
    
    /**
     * Sets the update timestamp
     * @param updatedAt The update timestamp
     */
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    /**
     * Gets the creator of the training sheet
     * @return The creator ID
     */
    public String getCreatedBy() {
        return this.createdBy;
    }
    
    /**
     * Sets the creator of the training sheet
     * @param createdBy The creator ID
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}