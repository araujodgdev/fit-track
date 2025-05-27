package com.fittrack.backend.module.trainingSheet;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<ExerciseEntity, UUID> {
    List<ExerciseEntity> findByTrainingSheetId(UUID trainingSheetId);
}