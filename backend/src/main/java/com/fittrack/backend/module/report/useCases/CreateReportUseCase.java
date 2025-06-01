package com.fittrack.backend.module.report.useCases;

import com.fittrack.backend.dto.CreateReportRequest;
import com.fittrack.backend.module.athlete.AthleteRepository;
import com.fittrack.backend.module.coach.CoachRepository;
import com.fittrack.backend.module.report.ReportEntity;
import com.fittrack.backend.module.report.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class CreateReportUseCase {
    
    @Autowired
    private ReportRepository reportRepository;
    
    @Autowired
    private AthleteRepository athleteRepository;
    
    @Autowired
    private CoachRepository coachRepository;

    @Transactional
    public ReportEntity execute(CreateReportRequest request, UUID coachId) {
        // Validate that athlete exists
        if (!athleteRepository.existsById(request.getAthleteId())) {
            throw new IllegalArgumentException("Athlete with ID " + request.getAthleteId() + " not found");
        }
        
        // Validate that coach exists
        if (!coachRepository.existsById(coachId)) {
            throw new IllegalArgumentException("Coach with ID " + coachId + " not found");
        }

        // Create new report entity
        ReportEntity report = new ReportEntity();
        report.setTitle(request.getTitle());
        report.setContent(request.getContent());
        report.setAthleteId(request.getAthleteId());
        report.setCoachId(coachId);
        report.setReportType(request.getReportType());

        return reportRepository.save(report);
    }
}