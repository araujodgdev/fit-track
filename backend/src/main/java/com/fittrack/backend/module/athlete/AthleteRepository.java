package com.fittrack.backend.module.athlete;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AthleteRepository extends JpaRepository<AthleteEntity, UUID> {
    Optional<AthleteEntity> findByEmail(String email);
}
