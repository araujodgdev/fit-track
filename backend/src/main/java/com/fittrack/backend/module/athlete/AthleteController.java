package com.fittrack.backend.module.athlete;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fittrack.backend.module.athlete.useCases.RegisterAthleteUseCase;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/athlete")
public class AthleteController {
    @Autowired
    private RegisterAthleteUseCase registerAthleteUseCase;

    @PostMapping("")
    private ResponseEntity<Object> register(@Valid @RequestBody AthleteEntity athlete) {
        try {
            var result = registerAthleteUseCase.execute(athlete);

            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
