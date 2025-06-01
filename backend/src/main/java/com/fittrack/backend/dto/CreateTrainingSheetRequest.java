package com.fittrack.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

/**
 * DTO for creating a new training sheet with embedded exercises
 * Handles the complete request payload including exercises and athlete assignments
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTrainingSheetRequest {
    
    @NotBlank(message = "Training sheet name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;
    
    @NotBlank(message = "Goal is required")
    @Size(max = 100, message = "Goal cannot exceed 100 characters")
    private String goal;
    
    @NotBlank(message = "Duration is required")
    @Size(max = 50, message = "Duration cannot exceed 50 characters")
    private String duration;
    
    @Valid
    @NotNull(message = "Exercises list cannot be null")
    @Size(min = 1, message = "At least one exercise is required")
    private List<CreateExerciseRequest> exercises = new ArrayList<>();
    
    @NotNull(message = "Assigned athletes list cannot be null")
    private List<String> assignedTo = new ArrayList<>();
    
    /**
     * Gets the list of exercises for this training sheet
     * @return The list of exercise requests
     */
    public List<CreateExerciseRequest> getExercises() {
        return this.exercises;
    }
    
    /**
     * Gets the list of assigned athletes
     * @return The list of athlete IDs
     */
    public List<String> getAssignedTo() {
        return this.assignedTo;
    }
    
    /**
     * Gets the name of the training sheet
     * @return The training sheet name
     */
    public String getName() {
        return this.name;
    }
    
    /**
     * Gets the description of the training sheet
     * @return The training sheet description
     */
    public String getDescription() {
        return this.description;
    }
    
    /**
     * Gets the goal of the training sheet
     * @return The training sheet goal
     */
    public String getGoal() {
        return this.goal;
    }
    
    /**
     * Gets the duration of the training sheet
     * @return The training sheet duration
     */
    public String getDuration() {
        return this.duration;
    }
    
    /**
     * DTO for creating exercises within a training sheet
     * Contains only the essential fields needed for exercise creation
     */
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateExerciseRequest {
        
        /**
         * Gets the rest period for this exercise
         * @return The rest period as a string
         */
        public String getRest() {
            return this.rest;
        }
        
        /**
         * Gets the weight for this exercise
         * @return The weight as a string
         */
        public String getWeight() {
            return this.weight;
        }
        
        /**
         * Gets the notes for this exercise
         * @return The notes as a string
         */
        public String getNotes() {
            return this.notes;
        }
        
        /**
         * Gets the name of this exercise
         * @return The exercise name
         */
        public String getName() {
            return this.name;
        }
        
        /**
         * Gets the muscle group for this exercise
         * @return The muscle group
         */
        public String getMuscleGroup() {
            return this.muscleGroup;
        }
        
        /**
         * Gets the number of sets for this exercise
         * @return The number of sets
         */
        public Integer getSets() {
            return this.sets;
        }
        
        /**
         * Gets the reps for this exercise
         * @return The reps as a string
         */
        public String getReps() {
            return this.reps;
        }
        
        @NotBlank(message = "Exercise name is required")
        @Size(max = 100, message = "Exercise name cannot exceed 100 characters")
        private String name;
        
        @NotBlank(message = "Muscle group is required")
        @Size(max = 50, message = "Muscle group cannot exceed 50 characters")
        private String muscleGroup;
        
        @NotNull(message = "Sets is required")
        private Integer sets;
        
        @NotBlank(message = "Reps is required")
        @Size(max = 20, message = "Reps cannot exceed 20 characters")
        private String reps;
        
        @Size(max = 20, message = "Weight cannot exceed 20 characters")
        private String weight;
        
        @Size(max = 20, message = "Rest cannot exceed 20 characters")
        private String rest;
        
        @Size(max = 200, message = "Notes cannot exceed 200 characters")
        private String notes;
    }
}