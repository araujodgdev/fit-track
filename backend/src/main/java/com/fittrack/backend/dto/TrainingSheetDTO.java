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
}