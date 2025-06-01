package com.fittrack.backend.module.trainingSheet;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity(name = "exercise")
public class ExerciseEntity {
    
    /**
     * Sets the weight for this exercise
     * @param weight The weight as a string (e.g., "50kg", "bodyweight")
     */
    public void setWeight(String weight) {
        this.weight = weight;
    }
    
    /**
     * Gets the weight for this exercise
     * @return The weight as a string
     */
    public String getWeight() {
        return this.weight;
    }
    
    /**
     * Sets the rest period for this exercise
     * @param rest The rest period as a string (e.g., "60s", "2min")
     */
    public void setRest(String rest) {
        this.rest = rest;
    }
    
    /**
     * Gets the rest period for this exercise
     * @return The rest period as a string
     */
    public String getRest() {
        return this.rest;
    }
    
    /**
     * Sets the notes for this exercise
     * @param notes The notes as a string
     */
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    /**
     * Gets the notes for this exercise
     * @return The notes as a string
     */
    public String getNotes() {
        return this.notes;
    }
    
    /**
     * Sets the name for this exercise
     * @param name The exercise name
     */
    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * Gets the name for this exercise
     * @return The exercise name
     */
    public String getName() {
        return this.name;
    }
    
    /**
     * Sets the muscle group for this exercise
     * @param muscleGroup The muscle group
     */
    public void setMuscleGroup(String muscleGroup) {
        this.muscleGroup = muscleGroup;
    }
    
    /**
     * Gets the muscle group for this exercise
     * @return The muscle group
     */
    public String getMuscleGroup() {
        return this.muscleGroup;
    }
    
    /**
     * Sets the number of sets for this exercise
     * @param sets The number of sets
     */
    public void setSets(Integer sets) {
        this.sets = sets;
    }
    
    /**
     * Gets the number of sets for this exercise
     * @return The number of sets
     */
    public Integer getSets() {
        return this.sets;
    }
    
    /**
     * Sets the reps for this exercise
     * @param reps The reps as a string
     */
    public void setReps(String reps) {
        this.reps = reps;
    }
    
    /**
     * Gets the reps for this exercise
     * @return The reps as a string
     */
    public String getReps() {
        return this.reps;
    }
    
    /**
     * Sets the order for this exercise
     * @param order The exercise order
     */
    public void setOrder(Integer order) {
        this.order = order;
    }
    
    /**
     * Gets the order for this exercise
     * @return The exercise order
     */
    public Integer getOrder() {
        return this.order;
    }
    
    /**
     * Sets the training sheet for this exercise
     * @param trainingSheet The training sheet entity
     */
    public void setTrainingSheet(TrainingSheetEntity trainingSheet) {
        this.trainingSheet = trainingSheet;
    }
    
    /**
     * Gets the training sheet for this exercise
     * @return The training sheet entity
     */
    public TrainingSheetEntity getTrainingSheet() {
        return this.trainingSheet;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String muscleGroup;
    private Integer sets;
    private String reps;
    private String weight;
    private String rest;
    private String notes;
    
    @Column(name = "exercise_order")
    private Integer order;

    @ManyToOne
    @JoinColumn(name = "training_sheet_id")
    private TrainingSheetEntity trainingSheet;
}