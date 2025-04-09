package com.fittrack.backend.module.trainingSheet;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingSheetRepository extends JpaRepository<TrainingSheetEntity, UUID>{
    Optional<TrainingSheetEntity> findByName(String name);
}
