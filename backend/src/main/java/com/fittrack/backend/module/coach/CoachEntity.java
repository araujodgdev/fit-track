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
    
    /**
     * Gets the email of the coach
     * @return The coach's email
     */
    public String getEmail() {
        return this.email;
    }
    
    /**
     * Sets the email of the coach
     * @param email The coach's email
     */
    public void setEmail(String email) {
        this.email = email;
    }
    
    /**
     * Gets the name of the coach
     * @return The coach's name
     */
    public String getName() {
        return this.name;
    }
    
    /**
     * Sets the name of the coach
     * @param name The coach's name
     */
    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * Gets the password of the coach
     * @return The coach's password
     */
    public String getPassword() {
        return this.password;
    }
    
    /**
     * Sets the password of the coach
     * @param password The coach's password
     */
    public void setPassword(String password) {
        this.password = password;
    }
    
    /**
     * Gets the role of the coach
     * @return The coach's role
     */
    public UserRole getRole() {
        return this.role;
    }
    
    /**
     * Sets the role of the coach
     * @param role The coach's role
     */
    public void setRole(UserRole role) {
        this.role = role;
    }
}
