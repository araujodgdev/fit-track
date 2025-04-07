package com.fittrack.backend.module.coach;

import java.util.UUID;

import org.hibernate.validator.constraints.Length;

import com.fittrack.backend.module.user.UserRole;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
@Entity(name = "coach")
public class CoachEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    
    @Email(message = "O campo [email] deve conter um email válido!")
    private String email;

    @Length(min = 8, max = 25, message = "O campo [password] deve conter entre 8 e 25 caracteres!")
    private String password;

    private UserRole role;
}
