package com.fittrack.backend.module.trainingSheet.useCases;

import com.fittrack.backend.dto.CreateTrainingSheetRequest;
import com.fittrack.backend.module.trainingSheet.TrainingSheetEntity;
import com.fittrack.backend.module.trainingSheet.TrainingSheetEntityRepository;
import com.fittrack.backend.module.trainingSheet.ExerciseEntity;
import com.fittrack.backend.module.trainingSheet.ExerciseRepository;
import com.fittrack.backend.module.athlete.AthleteGoal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import com.fittrack.backend.module.exceptions.UserFoundException;

/**
 * Use case for creating a new training sheet with embedded exercises
 * Handles the complete creation process in a single transaction
 */
@Service
public class CreateTrainingSheetUseCase {
    @Autowired
    private TrainingSheetEntityRepository trainingSheetRepository;
    
    @Autowired
    private ExerciseRepository exerciseRepository;

    /**
     * Creates a new training sheet with exercises
     * @param request The training sheet creation request containing basic info and exercises
     * @return The created training sheet entity
     * @throws UserFoundException if a training sheet with the same name already exists
     */
    @Transactional
    public TrainingSheetEntity execute(CreateTrainingSheetRequest request) {
        // Check if training sheet with same name already exists
        Optional<TrainingSheetEntity> existingSheet = trainingSheetRepository.findByName(request.getName());
        if (existingSheet.isPresent()) {
            throw new UserFoundException("Training sheet with name '" + request.getName() + "' already exists");
        }

        // Create new training sheet entity
        TrainingSheetEntity trainingSheet = new TrainingSheetEntity();
        trainingSheet.setName(request.getName());
        trainingSheet.setDescription(request.getDescription());
        
        // Convert String goal to AthleteGoal enum
        try {
            AthleteGoal goal = AthleteGoal.valueOf(request.getGoal().toUpperCase());
            trainingSheet.setGoal(goal);
        } catch (IllegalArgumentException e) {
            // If goal doesn't match enum values, set to a default or throw exception
            trainingSheet.setGoal(AthleteGoal.SAUDE); // Default to SAUDE if invalid
        }
        
        trainingSheet.setDuration(request.getDuration());
        // CreatedAt and UpdatedAt are automatically managed by @CreationTimestamp and @UpdateTimestamp

        // Save training sheet first to get the ID
        TrainingSheetEntity savedSheet = trainingSheetRepository.save(trainingSheet);

        // Create and save exercises
         for (CreateTrainingSheetRequest.CreateExerciseRequest exerciseRequest : request.getExercises()) {
             ExerciseEntity exercise = new ExerciseEntity();
             exercise.setName(exerciseRequest.getName());
             exercise.setMuscleGroup(exerciseRequest.getMuscleGroup());
             exercise.setSets(exerciseRequest.getSets());
             exercise.setReps(exerciseRequest.getReps());
             exercise.setWeight(exerciseRequest.getWeight());
             exercise.setRest(exerciseRequest.getRest());
             exercise.setNotes(exerciseRequest.getNotes());
             exercise.setTrainingSheet(savedSheet);
             
             // Save each exercise
             exerciseRepository.save(exercise);
         }

        return savedSheet;
    }
    
    /**
     * Creates an ExerciseEntity from the request data
     * @param exerciseRequest The exercise creation request
     * @return The created ExerciseEntity
     */
    private ExerciseEntity createExerciseFromRequest(CreateTrainingSheetRequest.CreateExerciseRequest exerciseRequest) {
        ExerciseEntity exercise = new ExerciseEntity();
        exercise.setName(exerciseRequest.getName());
        exercise.setMuscleGroup(exerciseRequest.getMuscleGroup());
        exercise.setSets(exerciseRequest.getSets());
        exercise.setReps(exerciseRequest.getReps());
        exercise.setWeight(exerciseRequest.getWeight());
        exercise.setRest(exerciseRequest.getRest());
        exercise.setNotes(exerciseRequest.getNotes());
        return exercise;
    }
}
