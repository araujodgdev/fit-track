package com.fittrack.backend.module.trainingSheet;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fittrack.backend.module.athlete.AthleteGoal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity(name = "training_sheet")
public class TrainingSheetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String description;
    private AthleteGoal goal;

    private String duration;


    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    /**
     * Sets the name of the training sheet
     * @param name The training sheet name
     */
    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * Gets the name of the training sheet
     * @return The training sheet name
     */
    public String getName() {
        return this.name;
    }
    
    /**
     * Sets the description of the training sheet
     * @param description The training sheet description
     */
    public void setDescription(String description) {
        this.description = description;
    }
    
    /**
     * Gets the description of the training sheet
     * @return The training sheet description
     */
    public String getDescription() {
        return this.description;
    }
    
    /**
     * Sets the duration of the training sheet
     * @param duration The training sheet duration
     */
    public void setDuration(String duration) {
        this.duration = duration;
    }
    
    /**
     * Gets the duration of the training sheet
     * @return The training sheet duration
     */
    public String getDuration() {
        return this.duration;
    }

}