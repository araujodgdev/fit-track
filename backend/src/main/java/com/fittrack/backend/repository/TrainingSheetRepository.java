package com.fittrack.backend.repository;

import com.fittrack.backend.domain.TrainingSheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingSheetRepository extends JpaRepository<TrainingSheet, Long> {
    // Métodos personalizados podem ser adicionados aqui
}