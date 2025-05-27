package com.fittrack.backend.repository;

import com.fittrack.backend.domain.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    // Métodos personalizados podem ser adicionados aqui
}