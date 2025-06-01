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
    
    /**
     * Gets the email of the athlete
     * @return The athlete's email
     */
    public String getEmail() {
        return this.email;
    }
    
    /**
     * Sets the email of the athlete
     * @param email The athlete's email
     */
    public void setEmail(String email) {
        this.email = email;
    }
    
    /**
     * Gets the name of the athlete
     * @return The athlete's name
     */
    public String getName() {
        return this.name;
    }
    
    /**
     * Sets the name of the athlete
     * @param name The athlete's name
     */
    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * Gets the phone of the athlete
     * @return The athlete's phone
     */
    public String getPhone() {
        return this.phone;
    }
    
    /**
     * Sets the phone of the athlete
     * @param phone The athlete's phone
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    /**
     * Gets the address of the athlete
     * @return The athlete's address
     */
    public String getAddress() {
        return this.address;
    }
    
    /**
     * Sets the address of the athlete
     * @param address The athlete's address
     */
    public void setAddress(String address) {
        this.address = address;
    }
    
    /**
     * Gets the notes of the athlete
     * @return The athlete's notes
     */
    public String getNotes() {
        return this.notes;
    }
    
    /**
     * Sets the notes of the athlete
     * @param notes The athlete's notes
     */
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    /**
     * Gets the age of the athlete
     * @return The athlete's age
     */
    public Integer getAge() {
        return this.age;
    }
    
    /**
     * Sets the age of the athlete
     * @param age The athlete's age
     */
    public void setAge(Integer age) {
        this.age = age;
    }
    
    /**
     * Gets the weight of the athlete
     * @return The athlete's weight in kg
     */
    public Double getKgWeight() {
        return this.kgWeight;
    }
    
    /**
     * Sets the weight of the athlete
     * @param kgWeight The athlete's weight in kg
     */
    public void setKgWeight(Double kgWeight) {
        this.kgWeight = kgWeight;
    }
    
    /**
     * Gets the height of the athlete
     * @return The athlete's height in cm
     */
    public Integer getCmHeight() {
        return this.cmHeight;
    }
    
    /**
     * Sets the height of the athlete
     * @param cmHeight The athlete's height in cm
     */
    public void setCmHeight(Integer cmHeight) {
        this.cmHeight = cmHeight;
    }
    
    /**
     * Gets the goal of the athlete
     * @return The athlete's goal
     */
    public AthleteGoal getGoal() {
        return this.goal;
    }
    
    /**
     * Sets the goal of the athlete
     * @param goal The athlete's goal
     */
    public void setGoal(AthleteGoal goal) {
        this.goal = goal;
    }
    
    /**
     * Gets the join date of the athlete
     * @return The athlete's join date
     */
    public LocalDateTime getJoinedAt() {
        return this.joinedAt;
    }
    
    /**
     * Sets the join date of the athlete
     * @param joinedAt The athlete's join date
     */
    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }
    
    /**
     * Gets the number of active sheets
     * @return The number of active sheets
     */
    public Integer getActiveSheets() {
        return this.activeSheets;
    }
    
    /**
     * Sets the number of active sheets
     * @param activeSheets The number of active sheets
     */
    public void setActiveSheets(Integer activeSheets) {
        this.activeSheets = activeSheets;
    }
    
    /**
     * Gets the role of the athlete
     * @return The athlete's role
     */
    public UserRole getRole() {
        return this.role;
    }
    
    /**
     * Sets the role of the athlete
     * @param role The athlete's role
     */
    public void setRole(UserRole role) {
        this.role = role;
    }
}