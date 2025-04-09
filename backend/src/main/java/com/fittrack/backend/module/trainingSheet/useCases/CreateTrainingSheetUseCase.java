package com.fittrack.backend.module.trainingSheet.useCases;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fittrack.backend.module.exceptions.UserFoundException;
import com.fittrack.backend.module.trainingSheet.TrainingSheetEntity;
import com.fittrack.backend.module.trainingSheet.TrainingSheetRepository;

@Service
public class CreateTrainingSheetUseCase {
    @Autowired
    private TrainingSheetRepository trainingSheetRepository;

    public TrainingSheetEntity execute(TrainingSheetEntity trainingSheet) {
        this.trainingSheetRepository
            .findByName(trainingSheet.getName())
            .ifPresent((sheet) -> {
                throw new UserFoundException("Uma ficha de treino com esse nome já existe!");
            });

        return trainingSheetRepository.save(trainingSheet);
    }
}
