package com.example.Qpoint.repository;

import com.example.Qpoint.models.OtpToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OtpTokenRepository extends JpaRepository<OtpToken, Long> {
    Optional<OtpToken> findTopByEmailAndCodeAndUsedFalseOrderByCreatedAtDesc(String email, String code);
}
