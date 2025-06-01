package com.fittrack.backend.module.report;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ReportRepository extends JpaRepository<ReportEntity, UUID> {
    
    List<ReportEntity> findByCoachIdOrderByCreatedAtDesc(UUID coachId);
    
    List<ReportEntity> findByAthleteIdOrderByCreatedAtDesc(UUID athleteId);
    
    List<ReportEntity> findByCoachIdAndAthleteIdOrderByCreatedAtDesc(UUID coachId, UUID athleteId);
    
    List<ReportEntity> findByReportTypeOrderByCreatedAtDesc(ReportType reportType);
    
    @Query("SELECT r FROM ReportEntity r WHERE r.coachId = :coachId AND r.reportType = :reportType ORDER BY r.createdAt DESC")
    List<ReportEntity> findByCoachIdAndReportType(@Param("coachId") UUID coachId, @Param("reportType") ReportType reportType);
}