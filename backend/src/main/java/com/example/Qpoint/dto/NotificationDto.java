package com.example.Qpoint.dto;

import com.example.Qpoint.models.Notification;
import lombok.Data;

import java.util.Date;
import java.time.Instant;

@Data
public class NotificationDto {
    private Long id;
    private String type;
    private Long referenceId;
    private String message;
    private Boolean isRead;
    private Date createdAt;
    
    // Sender details (without full User object to avoid lazy loading)
    private Long senderId;
    private String senderUsername;
    private String senderFullName;
    private String senderAvatarUrl;
    
    public static NotificationDto fromEntity(Notification notification) {
        NotificationDto dto = new NotificationDto();
        dto.setId(notification.getId());
        Notification.NotificationType type = notification.getTypeEnum();
        dto.setType(type != null ? type.toString() : null);
        dto.setReferenceId(notification.getReferenceId());
        dto.setMessage(notification.getMessage());
        dto.setIsRead(notification.getIsRead());
        dto.setCreatedAt(Date.from(notification.getCreatedAt()));
        
        if (notification.getSender() != null) {
            dto.setSenderId(notification.getSender().getUserId());
            dto.setSenderUsername(notification.getSender().getUsername());
            dto.setSenderFullName(notification.getSender().getFullName());
            dto.setSenderAvatarUrl(notification.getSender().getAvatarUrl());
        }
        
        return dto;
    }
}