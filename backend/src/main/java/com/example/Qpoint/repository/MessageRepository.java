package com.example.Qpoint.repository;

import com.example.Qpoint.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationIdOrderByCreatedAtAsc(Long conversationId);
    
    // Count unread messages for a specific conversation and receiver
    long countByConversationIdAndReceiverUserIdAndIsReadFalse(Long conversationId, Long receiverId);
}
