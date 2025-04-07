package com.fittrack.backend.module.coach;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fittrack.backend.module.coach.useCases.RegisterCoachUseCase;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/coach")
public class CoachController {

    @Autowired
    private RegisterCoachUseCase registerCoachUseCaserepo;

    @PostMapping("")
    public ResponseEntity<Object> register(@Valid @RequestBody CoachEntity coach) {
        try {
            var result = registerCoachUseCaserepo.execute(coach);

            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}