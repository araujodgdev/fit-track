package com.fittrack.backend.service;

import com.fittrack.backend.domain.Exercise;
import com.fittrack.backend.domain.TrainingSheet;
import com.fittrack.backend.repository.TrainingSheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TrainingSheetService {

    @Autowired
    private TrainingSheetRepository trainingSheetRepository;

    public List<TrainingSheet> getAllTrainingSheets() {
        return trainingSheetRepository.findAll();
    }

    public Optional<TrainingSheet> getTrainingSheetById(Long id) {
        return trainingSheetRepository.findById(id);
    }

    public TrainingSheet createTrainingSheet(TrainingSheet trainingSheet) {
        trainingSheet.setCreatedAt(LocalDateTime.now());
        trainingSheet.setUpdatedAt(LocalDateTime.now());
        return trainingSheetRepository.save(trainingSheet);
    }

    public Optional<TrainingSheet> updateTrainingSheet(Long id, TrainingSheet updatedSheet) {
        return trainingSheetRepository.findById(id)
                .map(sheet -> {
                    sheet.setName(updatedSheet.getName());
                    sheet.setDescription(updatedSheet.getDescription());
                    sheet.setGoal(updatedSheet.getGoal());
                    sheet.setDuration(updatedSheet.getDuration());
                    sheet.setUpdatedAt(LocalDateTime.now());
                    
                    // Atualizar exercícios se fornecidos
                    if (updatedSheet.getExercises() != null && !updatedSheet.getExercises().isEmpty()) {
                        // Limpar exercícios existentes
                        sheet.getExercises().clear();
                        
                        // Adicionar novos exercícios
                        updatedSheet.getExercises().forEach(exercise -> {
                            exercise.setTrainingSheet(sheet);
                            sheet.getExercises().add(exercise);
                        });
                    }
                    
                    return trainingSheetRepository.save(sheet);
                });
    }

    public boolean deleteTrainingSheet(Long id) {
        if (trainingSheetRepository.existsById(id)) {
            trainingSheetRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean assignTrainingSheet(Long sheetId, String clientId) {
        return trainingSheetRepository.findById(sheetId)
                .map(sheet -> {
                    if (!sheet.getAssignedTo().contains(clientId)) {
                        sheet.getAssignedTo().add(clientId);
                        sheet.setUpdatedAt(LocalDateTime.now());
                        trainingSheetRepository.save(sheet);
                    }
                    return true;
                })
                .orElse(false);
    }

    public boolean unassignTrainingSheet(Long sheetId, String clientId) {
        return trainingSheetRepository.findById(sheetId)
                .map(sheet -> {
                    boolean removed = sheet.getAssignedTo().remove(clientId);
                    if (removed) {
                        sheet.setUpdatedAt(LocalDateTime.now());
                        trainingSheetRepository.save(sheet);
                    }
                    return removed;
                })
                .orElse(false);
    }
    
    public Optional<TrainingSheet> updateExerciseWeight(Long sheetId, Long exerciseId, String weight) {
        return trainingSheetRepository.findById(sheetId)
                .map(sheet -> {
                    boolean exerciseFound = false;
                    
                    for (Exercise exercise : sheet.getExercises()) {
                        if (exercise.getId().equals(exerciseId)) {
                            exercise.setWeight(weight);
                            exerciseFound = true;
                            break;
                        }
                    }
                    
                    if (exerciseFound) {
                        sheet.setUpdatedAt(LocalDateTime.now());
                        return trainingSheetRepository.save(sheet);
                    } else {
                        return null;
                    }
                });
    }
}