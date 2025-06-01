package com.fittrack.backend.repository;

import com.fittrack.backend.domain.TrainingSheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for TrainingSheet domain entity
 * Provides data access operations for training sheets
 */
@Repository
public interface TrainingSheetRepository extends JpaRepository<TrainingSheet, Long> {
    
    /**
     * Finds a training sheet by its name
     * @param name The name of the training sheet
     * @return Optional containing the training sheet if found
     */
    Optional<TrainingSheet> findByName(String name);
    
    /**
     * Finds all training sheets assigned to a specific athlete
     * @param athleteId The ID of the athlete
     * @return List of training sheets assigned to the athlete
     */
    // Optional<List<TrainingSheet>> findByAssignedToContaining(String athleteId);
}