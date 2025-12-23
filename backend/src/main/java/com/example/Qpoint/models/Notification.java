package com.example.Qpoint.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "notifications")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_id", nullable = false)
    private User recipient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender; // Who triggered the notification

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private NotificationType type;

    // To link to the relevant entity (Post, Answer, Comment)
    private Long referenceId;

    @Column(nullable = false)
    private String message;

    @Builder.Default
    @Column(nullable = false)
    private Boolean isRead = false;

    @Builder.Default
    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    public enum NotificationType {
        VOTE_QUESTION, VOTE_ANSWER,
        COMMENT_REPLY, ANSWER_POST, COMMENT_POST,
        MENTION, FOLLOW, ANSWER_REQUEST
    }
}
