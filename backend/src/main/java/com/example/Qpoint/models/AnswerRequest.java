package com.example.Qpoint.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "answer_requests", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"question_id", "requested_to_user_id"})
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AnswerRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Post question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requested_by_user_id", nullable = false)
    private User requestedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requested_to_user_id", nullable = false)
    private User requestedTo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private RequestStatus status = RequestStatus.PENDING;

    @Column(nullable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();

    public enum RequestStatus {
        PENDING,
        ANSWERED,
        DECLINED,
        EXPIRED
    }
}
