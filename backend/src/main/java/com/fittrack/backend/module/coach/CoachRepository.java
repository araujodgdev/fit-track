package com.fittrack.backend.module.coach;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CoachRepository extends JpaRepository<CoachEntity, UUID> {
    Optional<CoachEntity> findByEmail(String email);
}
