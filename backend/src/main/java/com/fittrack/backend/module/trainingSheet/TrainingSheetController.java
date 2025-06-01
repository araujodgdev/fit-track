package com.fittrack.backend.module.trainingSheet;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fittrack.backend.dto.CreateTrainingSheetRequest;
import com.fittrack.backend.module.trainingSheet.useCases.CreateTrainingSheetUseCase;
import com.fittrack.backend.module.trainingSheet.useCases.DeleteTrainingSheetUseCase;
import com.fittrack.backend.module.trainingSheet.useCases.UpdateExerciseLoadUseCase;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/training-sheet")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class TrainingSheetController {
    @Autowired
    private CreateTrainingSheetUseCase createTrainingSheetUseCase;
    
    @Autowired
    private UpdateExerciseLoadUseCase updateExerciseLoadUseCase;
    
    @Autowired
    private DeleteTrainingSheetUseCase deleteTrainingSheetUseCase;
    
    @Autowired
    private TrainingSheetEntityRepository trainingSheetRepository;

    /**
     * Retrieves all training sheets
     * @return List of all training sheets
     */
    @GetMapping("")
    public ResponseEntity<List<TrainingSheetEntity>> getAllTrainingSheets() {
        try {
            List<TrainingSheetEntity> trainingSheets = trainingSheetRepository.findAll();
            return ResponseEntity.ok().body(trainingSheets);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Creates a new training sheet with exercises and athlete assignments
     * @param request The complete training sheet creation request
     * @return The created training sheet with all exercises
     */
    @PostMapping("")
    public ResponseEntity<Object> createTrainingSheet(@Valid @RequestBody CreateTrainingSheetRequest request) {
        try {
            var result = createTrainingSheetUseCase.execute(request);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/exercise/{id}/weight")
    public ResponseEntity<Object> updateExerciseWeight(@PathVariable("id") UUID exerciseId, @RequestBody UpdateWeightRequest request) {
        try {
            var result = updateExerciseLoadUseCase.execute(exerciseId, request.getWeight());
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTrainingSheet(@PathVariable("id") UUID trainingSheetId) {
        try {
            deleteTrainingSheetUseCase.execute(trainingSheetId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
