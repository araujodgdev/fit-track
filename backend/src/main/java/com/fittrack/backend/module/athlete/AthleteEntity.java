package com.fittrack.backend.module.athlete;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.fittrack.backend.module.user.UserRole;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
@Entity(name="athlete")
public class AthleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @Email(message = "O campo [email] deve conter um email válido!")
    private String email;

    private String phone;
    private String address;

    private String notes;

    private Integer age;
    private Double kgWeight;
    private Integer cmHeight;
    private AthleteGoal goal;

    @CreationTimestamp
    private LocalDateTime joinedAt;

    private Integer activeSheets;

    private UserRole role;
}