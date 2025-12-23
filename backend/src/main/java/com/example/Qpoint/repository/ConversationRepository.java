package com.example.Qpoint.repository;

import com.example.Qpoint.models.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    @Query("SELECT c FROM Conversation c WHERE (c.user1.userId = :userId1 AND c.user2.userId = :userId2) OR (c.user1.userId = :userId2 AND c.user2.userId = :userId1)")
    Optional<Conversation> findConversationByUsers(@Param("userId1") Long userId1, @Param("userId2") Long userId2);

    @Query("SELECT c FROM Conversation c WHERE c.user1.userId = :userId OR c.user2.userId = :userId ORDER BY c.updatedAt DESC")
    List<Conversation> findByUserId(@Param("userId") Long userId);
}
