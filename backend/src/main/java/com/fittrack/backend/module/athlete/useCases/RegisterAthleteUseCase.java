package com.fittrack.backend.module.athlete.useCases;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fittrack.backend.module.athlete.AthleteEntity;
import com.fittrack.backend.module.athlete.AthleteRepository;

@Service
public class RegisterAthleteUseCase {

    @Autowired
    private AthleteRepository repo;

    public AthleteEntity execute(AthleteEntity athlete) {
        this.repo
            .findByEmail(athlete.getEmail())
            .ifPresent((user) -> {
                throw new UserFoundException("Atleta já registrado no sistema!");
            });

        return repo.save(athlete);
    }
}
