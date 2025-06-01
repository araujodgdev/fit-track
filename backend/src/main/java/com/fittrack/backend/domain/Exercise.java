package com.fittrack.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String muscleGroup;
    private String category;
    private String equipment;
    private String difficulty;
    private Integer sets;
    private String reps;
    private String rest;
    private String weight;
    
    @ManyToOne
    @JoinColumn(name = "training_sheet_id")
    private TrainingSheet trainingSheet;
    
    /**
     * Gets the ID of the exercise
     * @return The exercise ID
     */
    public Long getId() {
        return this.id;
    }
    
    /**
     * Sets the ID of the exercise
     * @param id The exercise ID
     */
    public void setId(Long id) {
        this.id = id;
    }
    
    /**
     * Gets the name of the exercise
     * @return The exercise name
     */
    public String getName() {
        return this.name;
    }
    
    /**
     * Sets the name of the exercise
     * @param name The exercise name
     */
    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * Gets the muscle group of the exercise
     * @return The muscle group
     */
    public String getMuscleGroup() {
        return this.muscleGroup;
    }
    
    /**
     * Sets the muscle group of the exercise
     * @param muscleGroup The muscle group
     */
    public void setMuscleGroup(String muscleGroup) {
        this.muscleGroup = muscleGroup;
    }
    
    /**
     * Gets the category of the exercise
     * @return The exercise category
     */
    public String getCategory() {
        return this.category;
    }
    
    /**
     * Sets the category of the exercise
     * @param category The exercise category
     */
    public void setCategory(String category) {
        this.category = category;
    }
    
    /**
     * Gets the equipment needed for the exercise
     * @return The equipment
     */
    public String getEquipment() {
        return this.equipment;
    }
    
    /**
     * Sets the equipment needed for the exercise
     * @param equipment The equipment
     */
    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }
    
    /**
     * Gets the difficulty of the exercise
     * @return The difficulty level
     */
    public String getDifficulty() {
        return this.difficulty;
    }
    
    /**
     * Sets the difficulty of the exercise
     * @param difficulty The difficulty level
     */
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
    
    /**
     * Gets the number of sets
     * @return The number of sets
     */
    public Integer getSets() {
        return this.sets;
    }
    
    /**
     * Sets the number of sets
     * @param sets The number of sets
     */
    public void setSets(Integer sets) {
        this.sets = sets;
    }
    
    /**
     * Gets the reps information
     * @return The reps
     */
    public String getReps() {
        return this.reps;
    }
    
    /**
     * Sets the reps information
     * @param reps The reps
     */
    public void setReps(String reps) {
        this.reps = reps;
    }
    
    /**
     * Gets the rest time
     * @return The rest time
     */
    public String getRest() {
        return this.rest;
    }
    
    /**
     * Sets the rest time
     * @param rest The rest time
     */
    public void setRest(String rest) {
        this.rest = rest;
    }
    
    /**
     * Gets the weight
     * @return The weight
     */
    public String getWeight() {
        return this.weight;
    }
    
    /**
     * Sets the weight
     * @param weight The weight
     */
    public void setWeight(String weight) {
        this.weight = weight;
    }
    
    /**
     * Gets the training sheet
     * @return The training sheet
     */
    public TrainingSheet getTrainingSheet() {
        return this.trainingSheet;
    }
    
    /**
     * Sets the training sheet
     * @param trainingSheet The training sheet
     */
    public void setTrainingSheet(TrainingSheet trainingSheet) {
        this.trainingSheet = trainingSheet;
    }
}