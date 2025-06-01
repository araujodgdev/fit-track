package com.fittrack.backend.module.trainingSheet;

import lombok.Data;

@Data
public class UpdateWeightRequest {
    private String weight;
    
    /**
     * Gets the weight value
     * @return The weight as a String
     */
    public String getWeight() {
        return this.weight;
    }
    
    /**
     * Sets the weight value
     * @param weight The weight as a String
     */
    public void setWeight(String weight) {
        this.weight = weight;
    }
}