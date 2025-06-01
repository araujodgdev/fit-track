package com.fittrack.backend.module.trainingSheet.useCases;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fittrack.backend.module.trainingSheet.ExerciseEntity;
import com.fittrack.backend.module.trainingSheet.ExerciseRepository;

@Service
public class UpdateExerciseLoadUseCase {
    @Autowired
    private ExerciseRepository exerciseRepository;

    public ExerciseEntity execute(UUID exerciseId, String newWeight) {
        Optional<ExerciseEntity> exerciseOptional = exerciseRepository.findById(exerciseId);
        
        if (exerciseOptional.isEmpty()) {
            throw new RuntimeException("Exercício não encontrado");
        }
        
        ExerciseEntity exercise = exerciseOptional.get();
        exercise.setWeight(newWeight);
        
        return exerciseRepository.save(exercise);
    }
}