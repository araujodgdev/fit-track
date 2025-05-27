package com.fittrack.backend.module.trainingSheet;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity(name = "exercise")
public class ExerciseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String muscleGroup;
    private Integer sets;
    private String reps;
    private Double weight;
    private String rest;
    private String notes;
    private Integer order;

    @ManyToOne
    @JoinColumn(name = "training_sheet_id")
    private TrainingSheetEntity trainingSheet;
}