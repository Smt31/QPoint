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

    @Column(nullable = false, columnDefinition = "VARCHAR(50)")
    private String type;

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
    
    @Transient
    public NotificationType getTypeEnum() {
        try {
            return NotificationType.valueOf(this.type);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
    
    public void setTypeEnum(NotificationType type) {
        this.type = type != null ? type.name() : null;
    }
    
    public enum NotificationType {
        VOTE_QUESTION, VOTE_ANSWER,
        COMMENT_REPLY, ANSWER_POST, COMMENT_POST,
        MENTION, FOLLOW, ANSWER_REQUEST
    }
}
