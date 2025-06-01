package com.fittrack.backend.module.report.useCases;

import com.fittrack.backend.dto.ReportDTO;
import com.fittrack.backend.module.athlete.AthleteEntity;
import com.fittrack.backend.module.athlete.AthleteRepository;
import com.fittrack.backend.module.coach.CoachEntity;
import com.fittrack.backend.module.coach.CoachRepository;
import com.fittrack.backend.module.report.ReportEntity;
import com.fittrack.backend.module.report.ReportRepository;
import com.fittrack.backend.module.report.ReportType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GetReportsUseCase {
    
    @Autowired
    private ReportRepository reportRepository;
    
    @Autowired
    private AthleteRepository athleteRepository;
    
    @Autowired
    private CoachRepository coachRepository;

    public List<ReportDTO> getAllReportsByCoach(UUID coachId) {
        List<ReportEntity> reports = reportRepository.findByCoachIdOrderByCreatedAtDesc(coachId);
        return reports.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ReportDTO> getReportsByAthlete(UUID athleteId) {
        List<ReportEntity> reports = reportRepository.findByAthleteIdOrderByCreatedAtDesc(athleteId);
        return reports.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ReportDTO> getReportsByCoachAndAthlete(UUID coachId, UUID athleteId) {
        List<ReportEntity> reports = reportRepository.findByCoachIdAndAthleteIdOrderByCreatedAtDesc(coachId, athleteId);
        return reports.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ReportDTO> getReportsByType(ReportType reportType) {
        List<ReportEntity> reports = reportRepository.findByReportTypeOrderByCreatedAtDesc(reportType);
        return reports.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ReportDTO getReportById(UUID reportId) {
        ReportEntity report = reportRepository.findById(reportId)
                .orElseThrow(() -> new IllegalArgumentException("Report with ID " + reportId + " not found"));
        return convertToDTO(report);
    }

    private ReportDTO convertToDTO(ReportEntity report) {
        // Get athlete name
        String athleteName = athleteRepository.findById(report.getAthleteId())
                .map(AthleteEntity::getName)
                .orElse("Unknown Athlete");

        // Get coach name
        String coachName = coachRepository.findById(report.getCoachId())
                .map(CoachEntity::getName)
                .orElse("Unknown Coach");

        return new ReportDTO(
                report.getId(),
                report.getTitle(),
                report.getContent(),
                report.getAthleteId(),
                athleteName,
                report.getCoachId(),
                coachName,
                report.getReportType(),
                report.getCreatedAt(),
                report.getUpdatedAt()
        );
    }
}