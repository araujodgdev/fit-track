package com.fittrack.backend.module.report;

public enum ReportType {
    PROGRESS("Progress Report"),
    ASSESSMENT("Assessment Report"),
    INJURY("Injury Report"),
    GENERAL("General Report");

    private final String displayName;

    ReportType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}