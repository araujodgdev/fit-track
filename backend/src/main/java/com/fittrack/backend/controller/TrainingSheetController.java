package com.fittrack.backend.controller;

import com.fittrack.backend.domain.TrainingSheet;
import com.fittrack.backend.dto.TrainingSheetDTO;
import com.fittrack.backend.service.TrainingSheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/training-sheets")
@CrossOrigin(origins = "*")
public class TrainingSheetController {

    @Autowired
    private TrainingSheetService trainingSheetService;

    @GetMapping
    public ResponseEntity<List<TrainingSheetDTO>> getAllTrainingSheets() {
        List<TrainingSheetDTO> dtos = trainingSheetService.getAllTrainingSheets().stream()
                .map(TrainingSheetDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainingSheetDTO> getTrainingSheetById(@PathVariable Long id) {
        return trainingSheetService.getTrainingSheetById(id)
                .map(TrainingSheetDTO::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TrainingSheetDTO> createTrainingSheet(@RequestBody TrainingSheetDTO trainingSheetDTO) {
        TrainingSheet created = trainingSheetService.createTrainingSheet(trainingSheetDTO.toEntity());
        return new ResponseEntity<>(TrainingSheetDTO.fromEntity(created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrainingSheetDTO> updateTrainingSheet(@PathVariable Long id, @RequestBody TrainingSheetDTO trainingSheetDTO) {
        return trainingSheetService.updateTrainingSheet(id, trainingSheetDTO.toEntity())
                .map(TrainingSheetDTO::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainingSheet(@PathVariable Long id) {
        if (trainingSheetService.deleteTrainingSheet(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{sheetId}/assign/{clientId}")
    public ResponseEntity<Void> assignTrainingSheet(@PathVariable Long sheetId, @PathVariable String clientId) {
        if (trainingSheetService.assignTrainingSheet(sheetId, clientId)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{sheetId}/assign/{clientId}")
    public ResponseEntity<Void> unassignTrainingSheet(@PathVariable Long sheetId, @PathVariable String clientId) {
        if (trainingSheetService.unassignTrainingSheet(sheetId, clientId)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/{sheetId}/exercise/{exerciseId}/weight")
    public ResponseEntity<TrainingSheetDTO> updateExerciseWeight(
            @PathVariable Long sheetId,
            @PathVariable Long exerciseId,
            @RequestBody Map<String, String> payload) {
        
        String weight = payload.get("weight");
        if (weight == null) {
            return ResponseEntity.badRequest().build();
        }
        
        return trainingSheetService.updateExerciseWeight(sheetId, exerciseId, weight)
                .map(TrainingSheetDTO::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}