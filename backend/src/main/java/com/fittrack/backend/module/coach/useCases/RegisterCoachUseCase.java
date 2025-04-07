package com.fittrack.backend.module.coach.useCases;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fittrack.backend.module.coach.CoachEntity;
import com.fittrack.backend.module.coach.CoachRepository;
import com.fittrack.backend.module.exceptions.UserFoundException;

@Service
public class RegisterCoachUseCase {

    @Autowired
    private CoachRepository repo;

    public CoachEntity execute(CoachEntity coach) {
        this.repo
            .findByEmail(coach.getEmail())
            .ifPresent((c) -> {
                throw new UserFoundException("Instrutor já cadastrado no sistema!");
            });

        return repo.save(coach);
    }
}
