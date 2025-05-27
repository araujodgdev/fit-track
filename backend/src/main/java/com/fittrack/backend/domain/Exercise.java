package com.fittrack.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String muscleGroup;
    private String category;
    private String equipment;
    private String difficulty;
    private Integer sets;
    private String reps;
    private String rest;
    private String weight;
    
    @ManyToOne
    @JoinColumn(name = "training_sheet_id")
    private TrainingSheet trainingSheet;
}