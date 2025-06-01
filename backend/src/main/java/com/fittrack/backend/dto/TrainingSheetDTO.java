package com.fittrack.backend.dto;

import com.fittrack.backend.domain.Exercise;
import com.fittrack.backend.domain.TrainingSheet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingSheetDTO {
    private Long id;
    private String name;
    private String description;
    private String goal;
    private String duration;
    private List<ExerciseDTO> exercises = new ArrayList<>();
    private String createdAt;
    private String updatedAt;
    private String createdBy;
    private List<String> assignedTo = new ArrayList<>();
    
    // Método para converter entidade para DTO
    public static TrainingSheetDTO fromEntity(TrainingSheet trainingSheet) {
        TrainingSheetDTO dto = new TrainingSheetDTO();
        dto.setId(trainingSheet.getId());
        dto.setName(trainingSheet.getName());
        dto.setDescription(trainingSheet.getDescription());
        dto.setGoal(trainingSheet.getGoal());
        dto.setDuration(trainingSheet.getDuration());
        dto.setCreatedBy(trainingSheet.getCreatedBy());
        dto.setAssignedTo(trainingSheet.getAssignedTo());
        
        // Converter LocalDateTime para String
        if (trainingSheet.getCreatedAt() != null) {
            dto.setCreatedAt(trainingSheet.getCreatedAt().toString());
        }
        if (trainingSheet.getUpdatedAt() != null) {
            dto.setUpdatedAt(trainingSheet.getUpdatedAt().toString());
        }
        
        // Converter exercícios
        if (trainingSheet.getExercises() != null) {
            dto.setExercises(trainingSheet.getExercises().stream()
                    .map(ExerciseDTO::fromEntity)
                    .collect(Collectors.toList()));
        }
        
        return dto;
    }
    
    // Método para converter DTO para entidade
    public TrainingSheet toEntity() {
        TrainingSheet entity = new TrainingSheet();
        entity.setName(this.name);
        entity.setDescription(this.description);
        entity.setGoal(this.goal);
        entity.setDuration(this.duration);
        entity.setCreatedBy(this.createdBy);
        entity.setAssignedTo(this.assignedTo);
        
        // Converter exercícios
        if (this.exercises != null) {
            List<Exercise> exerciseEntities = this.exercises.stream()
                    .map(ExerciseDTO::toEntity)
                    .collect(Collectors.toList());
            exerciseEntities.forEach(entity::addExercise);
        }
        
        return entity;
    }
    
    /**
     * Gets the list of exercises
     * @return The list of exercises
     */
    public List<ExerciseDTO> getExercises() {
        return this.exercises;
    }
    
    /**
     * Sets the list of exercises
     * @param exercises The list of exercises
     */
    public void setExercises(List<ExerciseDTO> exercises) {
        this.exercises = exercises;
    }
    
    /**
     * Gets the ID
     * @return The training sheet ID
     */
    public Long getId() {
        return this.id;
    }
    
    /**
     * Sets the ID
     * @param id The training sheet ID
     */
    public void setId(Long id) {
        this.id = id;
    }
    
    /**
     * Gets the name
     * @return The training sheet name
     */
    public String getName() {
        return this.name;
    }
    
    /**
     * Sets the name
     * @param name The training sheet name
     */
    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * Gets the description
     * @return The training sheet description
     */
    public String getDescription() {
        return this.description;
    }
    
    /**
     * Sets the description
     * @param description The training sheet description
     */
    public void setDescription(String description) {
        this.description = description;
    }
    
    /**
     * Gets the goal
     * @return The training sheet goal
     */
    public String getGoal() {
        return this.goal;
    }
    
    /**
     * Sets the goal
     * @param goal The training sheet goal
     */
    public void setGoal(String goal) {
        this.goal = goal;
    }
    
    /**
     * Gets the duration
     * @return The training sheet duration
     */
    public String getDuration() {
        return this.duration;
    }
    
    /**
     * Sets the duration
     * @param duration The training sheet duration
     */
    public void setDuration(String duration) {
        this.duration = duration;
    }
    
    /**
     * Gets the created at timestamp
     * @return The created at timestamp
     */
    public String getCreatedAt() {
        return this.createdAt;
    }
    
    /**
     * Sets the created at timestamp
     * @param createdAt The created at timestamp
     */
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
    
    /**
     * Gets the updated at timestamp
     * @return The updated at timestamp
     */
    public String getUpdatedAt() {
        return this.updatedAt;
    }
    
    /**
     * Sets the updated at timestamp
     * @param updatedAt The updated at timestamp
     */
    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    /**
     * Gets the creator
     * @return The creator ID
     */
    public String getCreatedBy() {
        return this.createdBy;
    }
    
    /**
     * Sets the creator
     * @param createdBy The creator ID
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    
    /**
     * Gets the assigned to list
     * @return The list of assigned client IDs
     */
    public List<String> getAssignedTo() {
        return this.assignedTo;
    }
    
    /**
     * Sets the assigned to list
     * @param assignedTo The list of assigned client IDs
     */
    public void setAssignedTo(List<String> assignedTo) {
        this.assignedTo = assignedTo;
    }
}