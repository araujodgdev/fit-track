package com.fittrack.backend.dto;

import com.fittrack.backend.domain.Exercise;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseDTO {
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
    
    // Método para converter entidade para DTO
    public static ExerciseDTO fromEntity(Exercise exercise) {
        ExerciseDTO dto = new ExerciseDTO();
        dto.setId(exercise.getId());
        dto.setName(exercise.getName());
        dto.setMuscleGroup(exercise.getMuscleGroup());
        dto.setCategory(exercise.getCategory());
        dto.setEquipment(exercise.getEquipment());
        dto.setDifficulty(exercise.getDifficulty());
        dto.setSets(exercise.getSets());
        dto.setReps(exercise.getReps());
        dto.setRest(exercise.getRest());
        dto.setWeight(exercise.getWeight());
        return dto;
    }
    
    // Método para converter DTO para entidade
    public Exercise toEntity() {
        Exercise entity = new Exercise();
        entity.setName(this.name);
        entity.setMuscleGroup(this.muscleGroup);
        entity.setCategory(this.category);
        entity.setEquipment(this.equipment);
        entity.setDifficulty(this.difficulty);
        entity.setSets(this.sets);
        entity.setReps(this.reps);
        entity.setRest(this.rest);
        entity.setWeight(this.weight);
        return entity;
    }
}