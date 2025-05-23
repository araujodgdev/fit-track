package com.fittrack.backend.module.trainingSheet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fittrack.backend.module.trainingSheet.useCases.CreateTrainingSheetUseCase;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/training-sheet")
public class TrainingSheetController {
    @Autowired
    private CreateTrainingSheetUseCase createTrainingSheetUseCase;

    @PostMapping("")
    public ResponseEntity<Object> createTrainingSheet(@Valid @RequestBody TrainingSheetEntity trainingSheet) {
        try {
            var result = createTrainingSheetUseCase.execute(trainingSheet);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
