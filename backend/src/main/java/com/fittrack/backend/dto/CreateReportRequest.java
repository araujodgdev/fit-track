package com.fittrack.backend.dto;

import com.fittrack.backend.module.report.ReportType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class CreateReportRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Content is required")
    private String content;

    @NotNull(message = "Athlete ID is required")
    private UUID athleteId;

    @NotNull(message = "Report type is required")
    private ReportType reportType;

    public CreateReportRequest() {}

    public CreateReportRequest(String title, String content, UUID athleteId, ReportType reportType) {
        this.title = title;
        this.content = content;
        this.athleteId = athleteId;
        this.reportType = reportType;
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

    public ReportType getReportType() {
        return reportType;
    }

    public void setReportType(ReportType reportType) {
        this.reportType = reportType;
    }
}