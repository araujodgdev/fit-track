package com.fittrack.backend.module.trainingSheet.useCases;

import com.fittrack.backend.module.trainingSheet.TrainingSheetEntityRepository;
import com.fittrack.backend.module.trainingSheet.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class DeleteTrainingSheetUseCase {
    @Autowired
    private TrainingSheetEntityRepository trainingSheetRepository;
    
    @Autowired
    private ExerciseRepository exerciseRepository;

    @Transactional
    public void execute(UUID trainingSheetId) {
        if (!trainingSheetRepository.existsById(trainingSheetId)) {
            throw new IllegalArgumentException("Training sheet with ID " + trainingSheetId + " not found");
        }

        exerciseRepository.deleteByTrainingSheetId(trainingSheetId);
        trainingSheetRepository.deleteById(trainingSheetId);
    }
}