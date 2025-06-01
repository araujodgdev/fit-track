package com.fittrack.backend.module.report;

import com.fittrack.backend.dto.CreateReportRequest;
import com.fittrack.backend.dto.ReportDTO;
import com.fittrack.backend.module.report.useCases.CreateReportUseCase;
import com.fittrack.backend.module.report.useCases.GetReportsUseCase;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/reports")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class ReportController {

    @Autowired
    private CreateReportUseCase createReportUseCase;

    @Autowired
    private GetReportsUseCase getReportsUseCase;

    @Autowired
    private ReportRepository reportRepository;

    @PostMapping("")
    public ResponseEntity<Object> createReport(@Valid @RequestBody CreateReportRequest request,
                                             @RequestParam(name = "coachId") UUID coachId) {
        try {
            ReportEntity result = createReportUseCase.execute(request, coachId);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<List<ReportDTO>> getAllReports(@RequestParam(name = "coachId") UUID coachId) {
        try {
            List<ReportDTO> reports = getReportsUseCase.getAllReportsByCoach(coachId);
            return ResponseEntity.ok().body(reports);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getReportById(@PathVariable("id") UUID reportId) {
        try {
            ReportDTO report = getReportsUseCase.getReportById(reportId);
            return ResponseEntity.ok().body(report);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/athlete/{athleteId}")
    public ResponseEntity<List<ReportDTO>> getReportsByAthlete(@PathVariable("athleteId") UUID athleteId) {
        try {
            List<ReportDTO> reports = getReportsUseCase.getReportsByAthlete(athleteId);
            return ResponseEntity.ok().body(reports);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/type/{reportType}")
    public ResponseEntity<List<ReportDTO>> getReportsByType(@PathVariable("reportType") ReportType reportType) {
        try {
            List<ReportDTO> reports = getReportsUseCase.getReportsByType(reportType);
            return ResponseEntity.ok().body(reports);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteReport(@PathVariable("id") UUID reportId) {
        try {
            if (!reportRepository.existsById(reportId)) {
                return ResponseEntity.badRequest().body("Report with ID " + reportId + " not found");
            }
            reportRepository.deleteById(reportId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateReport(@PathVariable("id") UUID reportId, 
                                             @Valid @RequestBody CreateReportRequest request) {
        try {
            ReportEntity report = reportRepository.findById(reportId)
                    .orElseThrow(() -> new IllegalArgumentException("Report with ID " + reportId + " not found"));
            
            report.setTitle(request.getTitle());
            report.setContent(request.getContent());
            report.setReportType(request.getReportType());
            
            ReportEntity updatedReport = reportRepository.save(report);
            return ResponseEntity.ok().body(updatedReport);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}