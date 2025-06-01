package com.fittrack.backend.dto;

import com.fittrack.backend.module.report.ReportType;

import java.time.LocalDateTime;
import java.util.UUID;

public class ReportDTO {
    private UUID id;
    private String title;
    private String content;
    private UUID athleteId;
    private String athleteName;
    private UUID coachId;
    private String coachName;
    private ReportType reportType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ReportDTO() {}

    public ReportDTO(UUID id, String title, String content, UUID athleteId, String athleteName, 
                    UUID coachId, String coachName, ReportType reportType, 
                    LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.athleteId = athleteId;
        this.athleteName = athleteName;
        this.coachId = coachId;
        this.coachName = coachName;
        this.reportType = reportType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public UUID getAthleteId() {
        return athleteId;
    }

    public void setAthleteId(UUID athleteId) {
        this.athleteId = athleteId;
    }

    public String getAthleteName() {
        return athleteName;
    }

    public void setAthleteName(String athleteName) {
        this.athleteName = athleteName;
    }

    public UUID getCoachId() {
        return coachId;
    }

    public void setCoachId(UUID coachId) {
        this.coachId = coachId;
    }

    public String getCoachName() {
        return coachName;
    }

    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }

    public ReportType getReportType() {
        return reportType;
    }

    public void setReportType(ReportType reportType) {
        this.reportType = reportType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}